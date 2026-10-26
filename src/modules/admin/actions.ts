"use server";

import { randomBytes } from "node:crypto";
import { and, count, eq, gt, isNull } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { adminPasswordResets, adminSessions, adminUsers } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email/send";
import { passwordResetEmail } from "@/lib/email/templates";
import { siteUrl } from "@/modules/content/site";
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "./password";
import { createSession, destroyOtherSessions, destroySession, hashToken, requireAdmin } from "./session";

export type FormState = { error?: string; ok?: string };

// Verified against when the email is unknown, so both paths cost one scrypt.
const DUMMY_HASH = `scrypt$16384$8$1$${"A".repeat(22)}$${"A".repeat(86)}`;

const emailSchema = z.email("Email tidak valid").transform((v) => v.trim().toLowerCase());
const passwordSchema = z.string().min(MIN_PASSWORD_LENGTH, `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter`).max(200);

/** Only same-site admin paths, never an absolute URL (open redirect). */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const email = emailSchema.safeParse(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const [user] = email.success
    ? await getDb().select().from(adminUsers).where(eq(adminUsers.email, email.data)).limit(1)
    : [];
  // Same message and similar timing whether the email exists or not.
  const valid = user ? await verifyPassword(password, user.passwordHash) : await verifyPassword(password, DUMMY_HASH);
  if (!user || !valid) {
    await new Promise((r) => setTimeout(r, 400));
    return { error: "Email atau kata sandi salah." };
  }
  await createSession(user.id);
  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

const newUserSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(80),
  email: emailSchema,
  password: passwordSchema,
});

export async function createAdminUser(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = newUserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const db = getDb();
  const [exists] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, parsed.data.email));
  if (exists) return { error: "Email ini sudah terdaftar." };
  await db.insert(adminUsers).values({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash: await hashPassword(parsed.data.password),
  });
  refresh();
  return { ok: `${parsed.data.name} sudah bisa masuk ke admin.` };
}

export async function deleteAdminUser(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id || id === admin.id) return; // Can't remove yourself, so there is always one admin left.
  await getDb().delete(adminUsers).where(eq(adminUsers.id, id));
  refresh();
}

const changePasswordSchema = z
  .object({ current: z.string(), password: passwordSchema, confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: "Konfirmasi kata sandi tidak sama", path: ["confirm"] });

export async function changePassword(_: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const parsed = changePasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const db = getDb();
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, admin.id));
  if (!user || !(await verifyPassword(parsed.data.current, user.passwordHash))) {
    return { error: "Kata sandi saat ini salah." };
  }
  await db.update(adminUsers).set({ passwordHash: await hashPassword(parsed.data.password) }).where(eq(adminUsers.id, admin.id));
  await destroyOtherSessions(admin.id);
  return { ok: "Kata sandi diperbarui. Perangkat lain sudah dikeluarkan." };
}

const RESET_MINUTES = 60;
const RESETS_PER_HOUR = 3;

/**
 * Emails a one-time reset link to the admin. The answer is the same whether or not the
 * email belongs to an admin, and the email goes out after the response, so the form
 * can't be used to find out who has an account.
 */
export async function requestPasswordReset(_: FormState, formData: FormData): Promise<FormState> {
  const email = emailSchema.safeParse(formData.get("email"));
  if (!email.success) return { error: "Isi alamat email yang valid." };
  const ok = { ok: "Bila email ini terdaftar sebagai admin, tautan untuk mengatur ulang kata sandi sudah dikirim. Periksa juga folder spam." };
  const db = getDb();
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email.data)).limit(1);
  if (!user) return ok;
  const [{ recent }] = await db
    .select({ recent: count() })
    .from(adminPasswordResets)
    .where(and(eq(adminPasswordResets.userId, user.id), gt(adminPasswordResets.createdAt, new Date(Date.now() - 60 * 60 * 1000))));
  if (recent >= RESETS_PER_HOUR) return ok;
  const token = randomBytes(32).toString("base64url");
  await db.insert(adminPasswordResets).values({
    id: hashToken(token),
    userId: user.id,
    expiresAt: new Date(Date.now() + RESET_MINUTES * 60 * 1000),
  });
  const resetUrl = `${siteUrl}/admin/reset?token=${token}`;
  after(() => sendEmail({ to: user.email, ...passwordResetEmail({ name: user.name, resetUrl, siteUrl }) }));
  return ok;
}

const resetSchema = z
  .object({ token: z.string().min(20), password: passwordSchema, confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: "Konfirmasi kata sandi tidak sama", path: ["confirm"] });

/** Sets the new password from a valid reset link, signs out every session and signs this browser in. */
export async function resetPassword(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = resetSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const db = getDb();
  const [reset] = await db
    .select()
    .from(adminPasswordResets)
    .where(and(eq(adminPasswordResets.id, hashToken(parsed.data.token)), isNull(adminPasswordResets.usedAt), gt(adminPasswordResets.expiresAt, new Date())))
    .limit(1);
  if (!reset) return { error: "Tautan ini sudah kedaluwarsa atau sudah dipakai. Minta tautan baru." };
  await db.update(adminPasswordResets).set({ usedAt: new Date() }).where(eq(adminPasswordResets.userId, reset.userId));
  await db.update(adminUsers).set({ passwordHash: await hashPassword(parsed.data.password) }).where(eq(adminUsers.id, reset.userId));
  await db.delete(adminSessions).where(eq(adminSessions.userId, reset.userId));
  await createSession(reset.userId);
  redirect("/admin");
}

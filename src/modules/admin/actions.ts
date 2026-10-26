"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "./password";
import { createSession, destroyOtherSessions, destroySession, requireAdmin } from "./session";

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

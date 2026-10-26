"use server";

import { and, count, eq, ne } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { adminSessions, adminUsers } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email/send";
import { inviteEmail, passwordResetEmail } from "@/lib/email/templates";
import { siteUrl } from "@/modules/content/site";
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "./password";
import { canDeleteUser, isRole, roleLabel, type Role } from "./roles";
import { createSession, destroyOtherSessions, destroySession, requireAdmin } from "./session";
import { closeTokens, findToken, issueToken, recentLinks } from "./tokens";

export type FormState = { error?: string; ok?: string };

// Verified against when the email is unknown, so both paths cost one scrypt.
const DUMMY_HASH = `scrypt$16384$8$1$${"A".repeat(22)}$${"A".repeat(86)}`;

const emailSchema = z.email("Email tidak valid").transform((v) => v.trim().toLowerCase());
const passwordSchema = z.string().min(MIN_PASSWORD_LENGTH, `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter`).max(200);
const nameSchema = z.string().trim().min(2, "Nama minimal 2 karakter").max(80);
const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{9,20}$/, "Isi nomor HP yang valid, contoh 0812-3456-7890.");
const roleSchema = z.string().refine(isRole, "Pilih role.").transform((v) => v as Role);

const RESET_MINUTES = 60;
const INVITE_HOURS = 8;
const LINKS_PER_HOUR = 3;

/** Only same-site admin paths, never an absolute URL (open redirect). */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}

async function sendInvite(user: { id: string; name: string; email: string; role: Role }, invitedBy: string) {
  await closeTokens(user.id);
  const token = await issueToken(user.id, "invite", INVITE_HOURS * 60);
  const activateUrl = `${siteUrl}/admin/activate?token=${token}`;
  after(() =>
    sendEmail({
      to: user.email,
      ...inviteEmail({ name: user.name, invitedBy, role: roleLabel(user.role), activateUrl, hours: INVITE_HOURS, siteUrl }),
    }),
  );
}

/** Super admins other than `exceptId`; there must always be at least one. */
async function otherSuperAdmins(exceptId: string) {
  const [{ n }] = await getDb()
    .select({ n: count() })
    .from(adminUsers)
    .where(and(eq(adminUsers.role, "super_admin"), ne(adminUsers.id, exceptId)));
  return n;
}

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const email = emailSchema.safeParse(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const [user] = email.success
    ? await getDb().select().from(adminUsers).where(eq(adminUsers.email, email.data)).limit(1)
    : [];
  // Same message and similar timing whether the email exists, is still invited, or not.
  const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user?.passwordHash || !valid) {
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

const inviteSchema = z.object({ name: nameSchema, email: emailSchema, phone: phoneSchema, role: roleSchema });

/** Super admin: adds a user without a password and emails an activation link valid for 8 hours. */
export async function inviteAdminUser(_: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin("users");
  const parsed = inviteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const db = getDb();
  const [exists] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, parsed.data.email));
  if (exists) return { error: "Email ini sudah terdaftar." };
  const [user] = await db.insert(adminUsers).values(parsed.data).returning();
  await sendInvite(user, admin.name);
  refresh();
  return { ok: `Undangan dikirim ke ${user.email}. Tautan aktivasi berlaku ${INVITE_HOURS} jam.` };
}

/** Super admin: a fresh 8-hour link for someone who hasn't activated yet; older links stop working. */
export async function resendInvite(id: string) {
  const admin = await requireAdmin("users");
  const [user] = await getDb().select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  if (!user || user.activatedAt) return;
  await sendInvite(user, admin.name);
  refresh();
}

const updateSchema = z.object({ id: z.uuid(), name: nameSchema, phone: phoneSchema.or(z.literal("")), role: roleSchema });

export async function updateAdminUser(_: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin("users");
  const parsed = updateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { id, name, phone, role } = parsed.data;
  if (id === admin.id && role !== "super_admin") return { error: "Anda tidak bisa menurunkan role akun sendiri." };
  if (role !== "super_admin" && (await otherSuperAdmins(id)) === 0) return { error: "Harus ada minimal satu super admin." };
  await getDb()
    .update(adminUsers)
    .set({ name, phone: phone || null, role })
    .where(eq(adminUsers.id, id));
  refresh();
  return { ok: `Data ${name} diperbarui.` };
}

export async function deleteAdminUser(formData: FormData) {
  const admin = await requireAdmin("users.view");
  const id = String(formData.get("id") ?? "");
  const [target] = id ? await getDb().select({ id: adminUsers.id, role: adminUsers.role }).from(adminUsers).where(eq(adminUsers.id, id)).limit(1) : [];
  if (!target || !canDeleteUser(admin, target) || (await otherSuperAdmins(id)) === 0) return;
  await getDb().delete(adminUsers).where(eq(adminUsers.id, id));
  redirect("/admin/users");
}

const profileSchema = z.object({ name: nameSchema, phone: phoneSchema.or(z.literal("")) });

/** Everyone: their own name and phone number. */
export async function updateProfile(_: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  await getDb()
    .update(adminUsers)
    .set({ name: parsed.data.name, phone: parsed.data.phone || null })
    .where(eq(adminUsers.id, admin.id));
  refresh();
  return { ok: "Profil diperbarui." };
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
  if (!user?.passwordHash || !(await verifyPassword(parsed.data.current, user.passwordHash))) {
    return { error: "Kata sandi saat ini salah." };
  }
  await db.update(adminUsers).set({ passwordHash: await hashPassword(parsed.data.password) }).where(eq(adminUsers.id, admin.id));
  await destroyOtherSessions(admin.id);
  return { ok: "Kata sandi diperbarui. Perangkat lain sudah dikeluarkan." };
}

/**
 * Emails a one-time reset link to an active admin. The answer is the same whether or not
 * the email belongs to an admin, and the email goes out after the response, so the form
 * can't be used to find out who has an account.
 */
export async function requestPasswordReset(_: FormState, formData: FormData): Promise<FormState> {
  const email = emailSchema.safeParse(formData.get("email"));
  if (!email.success) return { error: "Isi alamat email yang valid." };
  const ok = { ok: "Bila email ini terdaftar sebagai admin, tautan untuk mengatur ulang kata sandi sudah dikirim. Periksa juga folder spam." };
  const [user] = await getDb().select().from(adminUsers).where(eq(adminUsers.email, email.data)).limit(1);
  if (!user?.passwordHash || (await recentLinks(user.id)) >= LINKS_PER_HOUR) return ok;
  const token = await issueToken(user.id, "reset", RESET_MINUTES);
  const resetUrl = `${siteUrl}/admin/reset?token=${token}`;
  after(() => sendEmail({ to: user.email, ...passwordResetEmail({ name: user.name, resetUrl, siteUrl }) }));
  return ok;
}

const newPasswordSchema = z
  .object({ token: z.string().min(20), password: passwordSchema, confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: "Konfirmasi kata sandi tidak sama", path: ["confirm"] });

/** Sets the password from a reset or invitation link, signs out every session and signs this browser in. */
async function setPasswordFromLink(formData: FormData, kind: "reset" | "invite"): Promise<FormState> {
  const parsed = newPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const link = await findToken(parsed.data.token, kind);
  if (!link) {
    return {
      error:
        kind === "invite"
          ? "Tautan aktivasi sudah kedaluwarsa atau sudah dipakai. Minta super admin mengirim ulang undangan."
          : "Tautan ini sudah kedaluwarsa atau sudah dipakai. Minta tautan baru.",
    };
  }
  const db = getDb();
  await closeTokens(link.userId);
  await db
    .update(adminUsers)
    .set({ passwordHash: await hashPassword(parsed.data.password), ...(kind === "invite" ? { activatedAt: new Date() } : {}) })
    .where(eq(adminUsers.id, link.userId));
  await db.delete(adminSessions).where(eq(adminSessions.userId, link.userId));
  await createSession(link.userId);
  redirect("/admin");
}

export async function resetPassword(_: FormState, formData: FormData): Promise<FormState> {
  return setPasswordFromLink(formData, "reset");
}

export async function activateAccount(_: FormState, formData: FormData): Promise<FormState> {
  return setPasswordFromLink(formData, "invite");
}

import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { and, eq, gt, isNotNull, lt, ne } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getDb } from "@/lib/db";
import { adminSessions, adminUsers } from "@/lib/db/schema";
import { can, type Permission, type Role } from "./roles";

export const SESSION_COOKIE = "tp_admin";
const SESSION_DAYS = 14;

export type Admin = { id: string; email: string; name: string; phone: string | null; role: Role };

export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

/** Starts a session for the admin and sets the httpOnly cookie. */
export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const db = getDb();
  await db.insert(adminSessions).values({ id: hashToken(token), userId, expiresAt });
  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, userId));
  // Housekeeping: drop this admin's expired sessions.
  await db.delete(adminSessions).where(and(eq(adminSessions.userId, userId), lt(adminSessions.expiresAt, new Date())));
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await getDb().delete(adminSessions).where(eq(adminSessions.id, hashToken(token)));
  jar.delete(SESSION_COOKIE);
}

/** Signs the admin out everywhere except this browser (after a password change). */
export async function destroyOtherSessions(userId: string) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value ?? "";
  await getDb()
    .delete(adminSessions)
    .where(and(eq(adminSessions.userId, userId), ne(adminSessions.id, hashToken(token))));
}

/** The signed-in admin for this request, or null. Deduplicated per request. */
export const getCurrentAdmin = cache(async (): Promise<Admin | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const [row] = await getDb()
    .select({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name, phone: adminUsers.phone, role: adminUsers.role })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminUsers.id, adminSessions.userId))
    .where(and(eq(adminSessions.id, hashToken(token)), gt(adminSessions.expiresAt, new Date()), isNotNull(adminUsers.passwordHash)))
    .limit(1);
  return row ?? null;
});

/**
 * Use at the top of every admin page and Server Action: authorization never trusts the client.
 * With a permission, a signed-in user whose role lacks it is sent back to the dashboard.
 */
export async function requireAdmin(permission: Permission = "content") {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  if (!can(admin.role, permission)) redirect("/admin?akses=ditolak");
  return admin;
}

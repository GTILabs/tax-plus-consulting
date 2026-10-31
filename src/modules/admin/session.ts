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
/** Absolute limit: sign in again after this many days, however active. */
const SESSION_DAYS = 14;
/** Idle limit: each authenticated request pushes the expiry this far ahead. */
export const IDLE_MINUTES = 30;
const IDLE_MS = IDLE_MINUTES * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type Admin = { id: string; email: string; name: string; phone: string | null; role: Role };

export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

/** Starts a session for the admin and sets the httpOnly cookie. */
export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const db = getDb();
  await db.insert(adminSessions).values({ id: hashToken(token), userId, expiresAt: new Date(Date.now() + IDLE_MS) });
  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, userId));
  // Housekeeping: drop this admin's expired sessions.
  await db.delete(adminSessions).where(and(eq(adminSessions.userId, userId), lt(adminSessions.expiresAt, new Date())));
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + SESSION_DAYS * DAY_MS),
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

/**
 * The signed-in admin for this request, or null. Deduplicated per request.
 * Activity slides the idle expiry forward, written at most once a minute.
 */
export const getCurrentAdmin = cache(async (): Promise<Admin | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = getDb();
  const now = Date.now();
  const [row] = await db
    .select({
      id: adminUsers.id,
      email: adminUsers.email,
      name: adminUsers.name,
      phone: adminUsers.phone,
      role: adminUsers.role,
      expiresAt: adminSessions.expiresAt,
    })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminUsers.id, adminSessions.userId))
    .where(
      and(
        eq(adminSessions.id, hashToken(token)),
        gt(adminSessions.expiresAt, new Date(now)),
        gt(adminSessions.createdAt, new Date(now - SESSION_DAYS * DAY_MS)),
        isNotNull(adminUsers.passwordHash),
      ),
    )
    .limit(1);
  if (!row) return null;
  const { expiresAt, ...admin } = row;
  if (Math.abs(expiresAt.getTime() - (now + IDLE_MS)) > 60_000) {
    await db.update(adminSessions).set({ expiresAt: new Date(now + IDLE_MS) }).where(eq(adminSessions.id, hashToken(token)));
  }
  return admin;
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

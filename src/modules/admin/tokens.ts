import "server-only";

import { randomBytes } from "node:crypto";
import { and, count, eq, gt, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { adminPasswordResets, adminUsers } from "@/lib/db/schema";
import { hashToken } from "./session";

/* One-time links (password reset, invitation). Kept out of the "use server" file so none of these are callable from the browser. */

/** Stores a new one-time link for the user and returns the raw token (only its hash is kept). */
export async function issueToken(userId: string, kind: "reset" | "invite", minutes: number) {
  const token = randomBytes(32).toString("base64url");
  await getDb()
    .insert(adminPasswordResets)
    .values({ id: hashToken(token), userId, kind, expiresAt: new Date(Date.now() + minutes * 60 * 1000) });
  return token;
}

/** The unused, unexpired link of this kind, or undefined. */
export async function findToken(token: string, kind: "reset" | "invite") {
  const [row] = await getDb()
    .select()
    .from(adminPasswordResets)
    .where(
      and(
        eq(adminPasswordResets.id, hashToken(token)),
        eq(adminPasswordResets.kind, kind),
        isNull(adminPasswordResets.usedAt),
        gt(adminPasswordResets.expiresAt, new Date()),
      ),
    )
    .limit(1);
  return row;
}

/** Invalidates every open link of the user (after one is used, or before a new invite). */
export async function closeTokens(userId: string) {
  await getDb()
    .update(adminPasswordResets)
    .set({ usedAt: new Date() })
    .where(and(eq(adminPasswordResets.userId, userId), isNull(adminPasswordResets.usedAt)));
}

export async function recentLinks(userId: string) {
  const [{ n }] = await getDb()
    .select({ n: count() })
    .from(adminPasswordResets)
    .where(and(eq(adminPasswordResets.userId, userId), gt(adminPasswordResets.createdAt, new Date(Date.now() - 60 * 60 * 1000))));
  return n;
}

/** For the activation page: who the link is for, without using it. */
export async function inviteeFor(token: string) {
  const link = await findToken(token, "invite");
  if (!link) return null;
  const [user] = await getDb()
    .select({ name: adminUsers.name, email: adminUsers.email })
    .from(adminUsers)
    .where(eq(adminUsers.id, link.userId))
    .limit(1);
  return user ?? null;
}

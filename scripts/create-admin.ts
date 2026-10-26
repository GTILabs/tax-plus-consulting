/**
 * Creates (or resets the password of) a CMS admin.
 *
 *   ADMIN_PASSWORD='…' bun scripts/create-admin.ts email@example.com "Nama Lengkap"
 */
import { eq } from "drizzle-orm";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../src/modules/admin/password";
import { db, pool, schema } from "./db";

const [emailArg, ...nameParts] = process.argv.slice(2);
const password = process.env.ADMIN_PASSWORD ?? "";
const email = (emailArg ?? "").trim().toLowerCase();
const name = nameParts.join(" ").trim() || email.split("@")[0];

if (!email.includes("@") || password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Usage: ADMIN_PASSWORD='min ${MIN_PASSWORD_LENGTH} chars' bun scripts/create-admin.ts <email> [name]`);
  process.exit(1);
}

const passwordHash = await hashPassword(password);
const [existing] = await db.select().from(schema.adminUsers).where(eq(schema.adminUsers.email, email));
if (existing) {
  await db.update(schema.adminUsers).set({ passwordHash }).where(eq(schema.adminUsers.id, existing.id));
  await db.delete(schema.adminSessions).where(eq(schema.adminSessions.userId, existing.id));
  console.log(`Password reset for ${email}; existing sessions signed out.`);
} else {
  await db.insert(schema.adminUsers).values({ email, name, passwordHash });
  console.log(`Admin created: ${name} <${email}>`);
}
await pool.end();

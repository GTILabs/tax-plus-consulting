import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import { withVerifiedSsl } from "./src/lib/db/url";

loadEnvConfig(process.cwd());

// Migrations need a direct connection; Neon's pooled URL runs PgBouncer in transaction mode.
const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL_UNPOOLED is not set. Run `vercel env pull .env.local` to fetch it.");

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: withVerifiedSsl(url) },
  strict: true,
});

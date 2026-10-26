import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../src/lib/db/schema";
import { withVerifiedSsl } from "../src/lib/db/url";

/* Database access for CLI scripts (src/lib/db is "server-only" and can't load outside Next). */
loadEnvConfig(process.cwd());

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local` to fetch it.");

export const pool = new Pool({ connectionString: withVerifiedSsl(url) });
export const db = drizzle({ client: pool, schema });
export { schema };

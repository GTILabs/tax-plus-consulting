import "server-only";

import { attachDatabasePool } from "@vercel/functions";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { withVerifiedSsl } from "./url";

let instance: NodePgDatabase<typeof schema> | undefined;

/**
 * Drizzle over a node-postgres pool on Neon's pooled URL. On Vercel Fluid
 * compute the pool is reused across invocations, and attachDatabasePool closes
 * idle clients before an instance is suspended. Created lazily so builds
 * without DATABASE_URL still succeed.
 */
export function getDb() {
  if (!instance) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local` to fetch it.");
    }
    const pool = new Pool({ connectionString: withVerifiedSsl(process.env.DATABASE_URL) });
    attachDatabasePool(pool);
    instance = drizzle({ client: pool, schema });
  }
  return instance;
}

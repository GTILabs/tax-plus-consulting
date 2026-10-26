import "server-only";

import { and, asc, desc, eq, sql, type SQL } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { cmsEntries, cmsSettings } from "@/lib/db/schema";
import { collections, settings, type CollectionKey, type SettingsKey } from "./collections";
import { schemaFor } from "./fields";

export const collectionTag = (key: CollectionKey) => `cms:${key}`;
export const settingsTag = (key: SettingsKey) => `cms:settings:${key}`;

export function orderFor(key: CollectionKey): SQL[] {
  const order = collections[key].order;
  return order === "manual"
    ? [asc(cmsEntries.sort), asc(cmsEntries.createdAt)]
    : [desc(sql`${cmsEntries.data}->>${order.field}`), desc(cmsEntries.createdAt)];
}

/** Every entry of a collection, drafts included (admin). */
export function listEntries(key: CollectionKey) {
  return getDb()
    .select()
    .from(cmsEntries)
    .where(eq(cmsEntries.collection, key))
    .orderBy(...orderFor(key));
}

export async function getEntry(key: CollectionKey, id: string) {
  const [row] = await getDb()
    .select()
    .from(cmsEntries)
    .where(and(eq(cmsEntries.collection, key), eq(cmsEntries.id, id)))
    .limit(1);
  return row;
}

/** Published entries, parsed with the collection schema. Invalid rows are skipped and logged. */
export async function readPublished(key: CollectionKey) {
  const rows = await getDb()
    .select({ id: cmsEntries.id, data: cmsEntries.data })
    .from(cmsEntries)
    .where(and(eq(cmsEntries.collection, key), eq(cmsEntries.status, "published")))
    .orderBy(...orderFor(key));
  const schema = schemaFor(collections[key].fields);
  return rows.flatMap((row) => {
    const parsed = schema.safeParse(row.data);
    if (!parsed.success) console.error(`cms: skipped invalid ${key} entry ${row.id}`, parsed.error.issues[0]);
    return parsed.success ? [parsed.data] : [];
  });
}

export async function readSettingsRaw(key: SettingsKey) {
  const [row] = await getDb().select().from(cmsSettings).where(eq(cmsSettings.key, key)).limit(1);
  return row;
}

/** Settings parsed with their schema; missing fields fall back to empty values. */
export async function readSettings(key: SettingsKey) {
  const row = await readSettingsRaw(key);
  const parsed = schemaFor(settings[key].fields).safeParse(row?.data ?? {});
  if (!parsed.success) {
    console.error(`cms: invalid settings ${key}`, parsed.error.issues[0]);
    return schemaFor(settings[key].fields).parse({});
  }
  return parsed.data;
}

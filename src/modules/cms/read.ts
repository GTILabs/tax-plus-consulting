import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import type { CollectionData, CollectionKey, SettingsData, SettingsKey } from "./collections";
import { collectionTag, readPublished, readSettings, settingsTag } from "./repo";

/*
 * Public reads. Cached until an admin saves (the Server Action calls updateTag),
 * so pages stay in the static shell and change without a redeploy.
 */

export async function getCollection<K extends CollectionKey>(key: K): Promise<CollectionData<K>[]> {
  "use cache";
  cacheLife("max");
  cacheTag(collectionTag(key));
  return (await readPublished(key)) as unknown as CollectionData<K>[];
}

export async function getSettings<K extends SettingsKey>(key: K): Promise<SettingsData<K>> {
  "use cache";
  cacheLife("max");
  cacheTag(settingsTag(key));
  return (await readSettings(key)) as unknown as SettingsData<K>;
}

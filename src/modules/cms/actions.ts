"use server";

import { put } from "@vercel/blob";
import { and, eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import type { z } from "zod";
import { getDb } from "@/lib/db";
import { cmsEntries, cmsSettings } from "@/lib/db/schema";
import { requireAdmin } from "@/modules/admin/session";
import { collections, isCollectionKey, isSettingsKey, settings } from "./collections";
import { MAX_UPLOAD_BYTES, schemaFor, type FileValue } from "./fields";
import { collectionTag, listEntries, settingsTag } from "./repo";
import { sanitizeData } from "./sanitize";

export type SaveResult = { ok: true; id?: string } | { ok: false; error: string; fieldErrors?: Record<string, string> };

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) out[issue.path.join(".")] ??= issue.message;
  return out;
}

const invalid = (errors: Record<string, string>): SaveResult => ({
  ok: false,
  error: "Periksa kembali isian yang ditandai.",
  fieldErrors: errors,
});

export async function saveEntry(input: { collection: string; id: string | null; data: unknown; status: "draft" | "published" }): Promise<SaveResult> {
  const admin = await requireAdmin();
  if (!isCollectionKey(input.collection)) return { ok: false, error: "Koleksi tidak dikenal." };
  const def = collections[input.collection];
  const parsed = schemaFor(def.fields).safeParse(input.data);
  if (!parsed.success) return invalid(fieldErrors(parsed.error));
  const data = sanitizeData(def.fields, parsed.data as Record<string, unknown>);

  let slug: string | null = null;
  if ("slugField" in def) {
    slug = String(data[def.slugField] ?? "");
    if (!SLUG.test(slug)) return invalid({ [def.slugField]: "Gunakan huruf kecil, angka, dan tanda hubung saja." });
  }
  const status = "drafts" in def && def.drafts ? input.status : "published";
  const db = getDb();
  try {
    if (input.id) {
      const updated = await db
        .update(cmsEntries)
        .set({ data, slug, status, updatedAt: new Date(), updatedBy: admin.id })
        .where(and(eq(cmsEntries.id, input.id), eq(cmsEntries.collection, input.collection)))
        .returning({ id: cmsEntries.id });
      if (!updated.length) return { ok: false, error: "Data ini sudah dihapus." };
    } else {
      const existing = await listEntries(input.collection);
      const sort = existing.reduce((max, e) => Math.max(max, e.sort), -1) + 1;
      const [row] = await db
        .insert(cmsEntries)
        .values({ collection: input.collection, data, slug, status, sort, updatedBy: admin.id })
        .returning({ id: cmsEntries.id });
      input.id = row.id;
    }
  } catch (error) {
    if ((error as { code?: string }).code === "23505" && "slugField" in def) {
      return invalid({ [def.slugField]: "Slug ini sudah dipakai item lain." });
    }
    throw error;
  }
  updateTag(collectionTag(input.collection));
  return { ok: true, id: input.id };
}

export async function deleteEntry(collection: string, id: string) {
  await requireAdmin("content.delete");
  if (!isCollectionKey(collection)) return;
  await getDb()
    .delete(cmsEntries)
    .where(and(eq(cmsEntries.id, id), eq(cmsEntries.collection, collection)));
  updateTag(collectionTag(collection));
}

/** Moves an entry one place up or down in a manually ordered collection. */
export async function moveEntry(collection: string, id: string, direction: -1 | 1) {
  await requireAdmin();
  if (!isCollectionKey(collection) || collections[collection].order !== "manual") return;
  const ids = (await listEntries(collection)).map((e) => e.id);
  const from = ids.indexOf(id);
  const to = from + direction;
  if (from < 0 || to < 0 || to >= ids.length) return;
  [ids[from], ids[to]] = [ids[to], ids[from]];
  const db = getDb();
  await Promise.all(ids.map((entryId, sort) => db.update(cmsEntries).set({ sort }).where(eq(cmsEntries.id, entryId))));
  updateTag(collectionTag(collection));
  refresh();
}

export async function saveSettings(input: { key: string; data: unknown }): Promise<SaveResult> {
  const admin = await requireAdmin("settings");
  if (!isSettingsKey(input.key)) return { ok: false, error: "Pengaturan tidak dikenal." };
  const def = settings[input.key];
  const parsed = schemaFor(def.fields).safeParse(input.data);
  if (!parsed.success) return invalid(fieldErrors(parsed.error));
  const data = sanitizeData(def.fields, parsed.data as Record<string, unknown>);
  await getDb()
    .insert(cmsSettings)
    .values({ key: input.key, data, updatedBy: admin.id })
    .onConflictDoUpdate({ target: cmsSettings.key, set: { data, updatedAt: new Date(), updatedBy: admin.id } });
  updateTag(settingsTag(input.key));
  return { ok: true };
}

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"];
const FILE_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export type UploadResult = ({ ok: true } & FileValue) | { ok: false; error: string };

/** Stores an image or document in Vercel Blob and returns its public URL. */
export async function uploadAsset(formData: FormData): Promise<UploadResult> {
  await requireAdmin();
  const file = formData.get("file");
  const kind = formData.get("kind") === "file" ? "file" : "image";
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Pilih file terlebih dahulu." };
  if (file.size > MAX_UPLOAD_BYTES) return { ok: false, error: "Ukuran file maksimal 4 MB." };
  if (!(kind === "image" ? IMAGE_TYPES : FILE_TYPES).includes(file.type)) {
    return { ok: false, error: kind === "image" ? "Format gambar harus JPG, PNG, WebP, GIF, AVIF, atau SVG." : "Format file harus PDF, Excel, atau Word." };
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { ok: false, error: "Penyimpanan file (Vercel Blob) belum dikonfigurasi." };
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "file";
  const blob = await put(`cms/${kind === "image" ? "images" : "files"}/${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });
  return { ok: true, url: blob.url, name: file.name, sizeKb: Math.max(1, Math.round(file.size / 1024)) };
}

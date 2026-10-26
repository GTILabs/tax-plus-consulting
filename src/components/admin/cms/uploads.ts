"use client";

import { uploadAsset } from "@/modules/cms/actions";
import { MAX_UPLOAD_BYTES, type FileValue, type ImageValue } from "@/modules/cms/fields";

const MAX_SIDE = 2000;

/**
 * Large photos are scaled down to 2000 px on the long side and re-encoded as WebP
 * in the browser before upload, so phone photos fit the 4 MB limit and load fast.
 * SVG and GIF are uploaded as they are.
 */
async function prepareImage(file: File): Promise<{ file: File; width: number; height: number }> {
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    const { width, height } = await naturalSize(file);
    return { file, width, height };
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size <= 1.5 * 1024 * 1024) {
    const size = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return { file, ...size };
  }
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.86));
  if (!blob) return { file, width, height };
  const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
  return { file: new File([blob], name, { type: "image/webp" }), width, height };
}

function naturalSize(file: File) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth || 300, height: img.naturalHeight || 300 });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => resolve({ width: 300, height: 300 });
    img.src = url;
  });
}

export async function uploadImage(file: File): Promise<ImageValue> {
  const prepared = await prepareImage(file);
  if (prepared.file.size > MAX_UPLOAD_BYTES) throw new Error("Gambar masih lebih dari 4 MB setelah dikompres.");
  const body = new FormData();
  body.set("file", prepared.file);
  body.set("kind", "image");
  const result = await uploadAsset(body);
  if (!result.ok) throw new Error(result.error);
  return { src: result.url, width: prepared.width, height: prepared.height };
}

export async function uploadFile(file: File): Promise<FileValue> {
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Ukuran file maksimal 4 MB.");
  const body = new FormData();
  body.set("file", file);
  body.set("kind", "file");
  const result = await uploadAsset(body);
  if (!result.ok) throw new Error(result.error);
  return { url: result.url, name: result.name, sizeKb: result.sizeKb };
}

import { z } from "zod";

/*
 * Field definitions drive the whole CMS: the admin form, the Zod schema that
 * validates a save, and the TypeScript type of the data the site reads. They are
 * plain objects, so they can be passed to the client-side form as props.
 */

/** Uploads go through a Server Action; Vercel Functions accept request bodies up to 4.5 MB. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export type ImageValue = { src: string; width: number; height: number };
export type FileValue = { url: string; name: string; sizeKb: number };
export type Option = { value: string; label: string };

type Base = { name: string; label: string; hint?: string; required?: boolean };

export type TextField = Base & { type: "text"; placeholder?: string; max?: number };
export type TextareaField = Base & { type: "textarea"; rows?: number; max?: number };
/** Sanitized HTML from the rich text editor. */
export type RichTextField = Base & { type: "richtext" };
export type UrlField = Base & { type: "url"; placeholder?: string };
export type NumberField = Base & { type: "number"; min?: number; max?: number; step?: number };
/** ISO date, YYYY-MM-DD. */
export type DateField = Base & { type: "date" };
export type SelectField = Base & { type: "select"; options: readonly Option[] };
export type BooleanField = Base & { type: "boolean" };
export type ColorField = Base & { type: "color" };
export type ImageField = Base & { type: "image" };
export type FileField = Base & { type: "file"; accept?: string };
export type ListField = Base & { type: "list"; itemLabel?: string };
export type ObjectsField = Base & { type: "objects"; fields: readonly LeafField[]; itemLabel?: string; titleField?: string };

export type LeafField =
  | TextField
  | TextareaField
  | RichTextField
  | UrlField
  | NumberField
  | DateField
  | SelectField
  | BooleanField
  | ColorField
  | ImageField
  | FileField
  | ListField;

export type Field = LeafField | ObjectsField;

/* ---------- Types of the stored data ---------- */

type ValueOf<F> = F extends { type: "select"; options: readonly { value: infer V }[] }
  ? V
  : F extends { type: "text" | "textarea" | "richtext" | "url" | "date" | "color" }
    ? string
    : F extends { type: "number" }
      ? number
      : F extends { type: "boolean" }
        ? boolean
        : F extends { type: "image" }
          ? ImageValue | null
          : F extends { type: "file" }
            ? FileValue | null
            : F extends { type: "list" }
              ? string[]
              : F extends { type: "objects"; fields: infer S extends readonly Field[] }
                ? DataOf<S>[]
                : never;

export type DataOf<S extends readonly Field[]> = { [F in S[number] as F["name"]]: ValueOf<F> };

/* ---------- Validation ---------- */

const imageSchema = z.object({ src: z.string().min(1), width: z.number().int().positive(), height: z.number().int().positive() });
const fileSchema = z.object({ url: z.string().min(1), name: z.string(), sizeKb: z.number().nonnegative() });

function fieldSchema(f: Field): z.ZodType {
  const req = (s: z.ZodString) => (f.required ? s.trim().min(1, `${f.label} wajib diisi`) : s.trim());
  switch (f.type) {
    case "text":
    case "textarea":
      return req(z.string().max(f.max ?? 20000)).default("");
    case "richtext":
      return req(z.string().max(200000)).default("");
    case "url":
      return z
        .string()
        .trim()
        .refine((v) => (!f.required && v === "") || /^(https?:\/\/|\/|mailto:|tel:)/.test(v), `${f.label} harus berupa tautan`)
        .default("");
    case "date":
      return z
        .string()
        .refine((v) => (!f.required && v === "") || /^\d{4}-\d{2}-\d{2}$/.test(v), `${f.label} harus berupa tanggal`)
        .default("");
    case "color":
      return z.string().regex(/^#[0-9a-fA-F]{6}$/, `${f.label} harus berupa warna`).or(z.literal("")).default("");
    case "number": {
      let s = z.coerce.number({ error: `${f.label} harus berupa angka` });
      if (f.min !== undefined) s = s.min(f.min, `${f.label} minimal ${f.min}`);
      if (f.max !== undefined) s = s.max(f.max, `${f.label} maksimal ${f.max}`);
      return s.default(0);
    }
    case "boolean":
      return z.boolean().default(false);
    case "select": {
      const values = f.options.map((o) => o.value);
      return z
        .string()
        .refine((v) => values.includes(v), `Pilih ${f.label.toLowerCase()}`)
        .default(values[0] ?? "");
    }
    case "image":
      return (f.required ? imageSchema : imageSchema.nullable()).default(null as never);
    case "file":
      return (f.required ? fileSchema : fileSchema.nullable()).default(null as never);
    case "list":
      return z
        .array(z.string().trim())
        .transform((a) => a.filter(Boolean))
        .refine((a) => !f.required || a.length > 0, `${f.label} wajib diisi`)
        .default([]);
    case "objects":
      return z
        .array(schemaFor(f.fields))
        .refine((a) => !f.required || a.length > 0, `${f.label} wajib diisi`)
        .default([]);
  }
}

export function schemaFor<S extends readonly Field[]>(fields: S) {
  return z.object(Object.fromEntries(fields.map((f) => [f.name, fieldSchema(f)]))) as unknown as z.ZodType<DataOf<S>>;
}

/** Empty value for a new item, matching what the schema would default to. */
export function emptyValue(f: Field): unknown {
  switch (f.type) {
    case "number":
      return 0;
    case "boolean":
      return false;
    case "select":
      return f.options[0]?.value ?? "";
    case "image":
    case "file":
      return null;
    case "list":
    case "objects":
      return [];
    default:
      return "";
  }
}

export function emptyData(fields: readonly Field[]) {
  return Object.fromEntries(fields.map((f) => [f.name, emptyValue(f)]));
}

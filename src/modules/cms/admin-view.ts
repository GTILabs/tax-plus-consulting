import type { CollectionDef } from "./collections";
import type { Field, ImageValue } from "./fields";

const dateFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Short text for a field value in the admin list. */
export function displayValue(field: Field | undefined, value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (!field) return String(value);
  switch (field.type) {
    case "select":
      return field.options.find((o) => o.value === value)?.label ?? String(value);
    case "date":
      return /^\d{4}-\d{2}-\d{2}$/.test(String(value)) ? dateFmt.format(new Date(`${value}T00:00:00Z`)) : String(value);
    case "boolean":
      return value ? "Ya" : "Tidak";
    case "list":
    case "objects":
      return `${(value as unknown[]).length} item`;
    default: {
      const text = String(value);
      return text.length > 70 ? `${text.slice(0, 70)}…` : text;
    }
  }
}

export function fieldOf(def: CollectionDef, name: string) {
  return def.fields.find((f) => f.name === name);
}

export function imageOf(def: CollectionDef, data: Record<string, unknown>) {
  return def.imageField ? ((data[def.imageField] as ImageValue | null) ?? null) : null;
}

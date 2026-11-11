import "server-only";

import type { Field, Option } from "./fields";
import { readPublished } from "./repo";

/**
 * Fills selects whose options come from another collection, for the admin form.
 * A saved value that is no longer among them (say, a team member who left) stays
 * selectable, so opening and saving an entry never changes it silently.
 */
export async function withLiveOptions<F extends readonly Field[]>(fields: F, data?: Record<string, unknown>): Promise<F> {
  if (!fields.some((f) => f.type === "select" && f.optionsFrom)) return fields;
  const team = await readPublished("team");
  const teamOptions: Option[] = [
    { value: "", label: "Tim TaxPlus Consulting (tanpa nama)" },
    ...team.map((p) => ({ value: p.name, label: `${p.name} (${p.role})` })),
  ];
  return fields.map((f) => {
    if (f.type !== "select" || f.optionsFrom !== "team") return f;
    const current = String(data?.[f.name] ?? "");
    const missing = current && !teamOptions.some((o) => o.value === current);
    return { ...f, options: missing ? [...teamOptions, { value: current, label: `${current} (tidak ada di Tim)` }] : teamOptions };
  }) as unknown as F;
}

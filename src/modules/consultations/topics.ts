/** "Kebutuhan" options: one per service (from the CMS) plus a general option. The slug is stored. */
export type Topic = { slug: string; label: string };

export const GENERAL_TOPIC: Topic = { slug: "umum", label: "Belum tahu – ingin konsultasi dulu" };

export function consultationTopics(services: { slug: string; name: string; subtitle: string }[]): Topic[] {
  return [...services.map((s) => ({ slug: s.slug, label: `${s.name} – ${s.subtitle}` })), GENERAL_TOPIC];
}

export function topicLabel(topics: Topic[], slug: string) {
  return topics.find((t) => t.slug === slug)?.label ?? slug;
}

import { serviceLinks } from "@/modules/content/navigation";

/** "Kebutuhan" options. The slug is stored and can be pre-selected with `?topik=`. */
export const CONSULTATION_TOPICS = [
  ...serviceLinks.map((s) => ({ slug: s.slug, label: `${s.name} – ${s.description}` })),
  { slug: "umum", label: "Belum tahu – ingin konsultasi dulu" },
] as const;

export type TopicSlug = (typeof CONSULTATION_TOPICS)[number]["slug"];

export const TOPIC_SLUGS = CONSULTATION_TOPICS.map((t) => t.slug) as [TopicSlug, ...TopicSlug[]];

export const DEFAULT_TOPIC: TopicSlug = "tax-compliance";

export function isTopicSlug(value: string | null | undefined): value is TopicSlug {
  return !!value && (TOPIC_SLUGS as readonly string[]).includes(value);
}

export function topicLabel(slug: TopicSlug) {
  return CONSULTATION_TOPICS.find((t) => t.slug === slug)!.label;
}

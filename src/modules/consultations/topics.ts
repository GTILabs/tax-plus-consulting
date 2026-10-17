/** What the visitor needs help with. The slug is stored and used in `?topik=` links. */
export const CONSULTATION_TOPICS = [
  { slug: "umum", label: "Belum tahu — ingin konsultasi dulu", group: "Umum" },
  { slug: "tax-compliance", label: "Tax Compliance — pelaporan rutin", group: "Layanan" },
  { slug: "tax-accounting", label: "Tax Accounting — pembukuan & laporan fiskal", group: "Layanan" },
  { slug: "tax-management", label: "Tax Management — perencanaan pajak", group: "Layanan" },
  { slug: "tax-audit", label: "Tax Audit — SP2DK & pemeriksaan", group: "Layanan" },
  { slug: "tax-litigation", label: "Tax Litigation — keberatan & banding", group: "Layanan" },
  { slug: "panduan-kreator", label: "Panduan gratis: Manajemen Kreator & Talent", group: "Panduan 3 Kebocoran Pajak" },
  { slug: "panduan-fnb", label: "Panduan gratis: Bisnis F&B", group: "Panduan 3 Kebocoran Pajak" },
  { slug: "panduan-fashion", label: "Panduan gratis: Brand Fashion & Retail", group: "Panduan 3 Kebocoran Pajak" },
  { slug: "panduan-agensi", label: "Panduan gratis: Perusahaan Manajemen & Agensi", group: "Panduan 3 Kebocoran Pajak" },
] as const;

export type TopicSlug = (typeof CONSULTATION_TOPICS)[number]["slug"];

export const TOPIC_SLUGS = CONSULTATION_TOPICS.map((t) => t.slug) as [TopicSlug, ...TopicSlug[]];

export const DEFAULT_TOPIC: TopicSlug = "umum";

export function isTopicSlug(value: string | null | undefined): value is TopicSlug {
  return !!value && (TOPIC_SLUGS as readonly string[]).includes(value);
}

export function topicLabel(slug: TopicSlug) {
  return CONSULTATION_TOPICS.find((t) => t.slug === slug)!.label;
}

/** Link to the homepage form with a topic pre-selected. */
export function consultationHref(topic: TopicSlug = DEFAULT_TOPIC) {
  return topic === DEFAULT_TOPIC ? "/#kontak" : `/?topik=${topic}#kontak`;
}

/** Fired on the homepage to pre-select a topic without navigating. */
export const TOPIC_EVENT = "taxplus:consult-topic";

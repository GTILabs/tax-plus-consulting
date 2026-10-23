/* Kept apart from articles.ts so client components don't bundle the article bodies. */

export const ARTICLE_CATEGORIES = ["PPh", "PPN", "Coretax", "Pemeriksaan", "Sengketa", "UMKM"] as const;
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export function formatArticleDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/* Kept apart from articles.ts so client components don't bundle server helpers. */

export { ARTICLE_CATEGORIES } from "@/modules/cms/collections";

export function formatArticleDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

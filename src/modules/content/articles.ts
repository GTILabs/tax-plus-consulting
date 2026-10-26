import type { CollectionData } from "@/modules/cms/collections";

export type ArticleCoverData = { src: string; width: number; height: number; background: string };

export type Article = Omit<CollectionData<"articles">, "body" | "cover" | "coverBackground"> & {
  /** Sanitized HTML (src/modules/cms/sanitize.ts). */
  bodyHtml: string;
  cover: ArticleCoverData;
};

export const ARTICLE_AUTHOR = "Tim TaxPlus Consulting";

/** Used until an article gets its own cover. */
const FALLBACK_COVER = { src: "/images/photos/office-front.jpg", width: 1400, height: 1052 };

export function toArticle({ body, cover, coverBackground, ...rest }: CollectionData<"articles">): Article {
  return { ...rest, bodyHtml: body, cover: { ...(cover ?? FALLBACK_COVER), background: coverBackground || "var(--soft)" } };
}

/** Same category first, then the newest from other categories. */
export function relatedArticles(article: Article, all: Article[], count = 3) {
  const others = all.filter((a) => a.slug !== article.slug);
  return [...others.filter((a) => a.category === article.category), ...others.filter((a) => a.category !== article.category)].slice(0, count);
}

export function articleWhatsappMessage(article: Pick<Article, "title">) {
  return `Halo TaxPlus, saya membaca artikel "${article.title}" dan ingin konsultasi.`;
}

/** Fields shown on article cards (no body). */
export function articleCardData({ slug, category, title, excerpt, publishedAt, readingMinutes, cover }: Article) {
  return { slug, category, title, excerpt, publishedAt, readingMinutes, cover };
}

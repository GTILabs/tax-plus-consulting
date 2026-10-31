import type { MetadataRoute } from "next";
import { getEditedAt } from "@/modules/cms/read";
import { getArticles, getServices } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";
import { siteUrl } from "@/modules/content/site";

/**
 * lastmod only where a real date exists: the last CMS edit, or an article's publish date.
 * Static pages have no stored date, so they go without one rather than claim "today".
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, articles, servicesEdited, articlesEdited] = await Promise.all([
    getServices(),
    getArticles(),
    getEditedAt("services"),
    getEditedAt("articles"),
  ]);
  const entry = (path: string, lastModified?: string) => ({ url: `${siteUrl}${path === "/" ? "" : path}`, lastModified });
  return [
    entry(routes.home),
    entry(routes.about),
    entry(routes.services),
    ...services.map((s) => entry(routes.service(s.slug), servicesEdited[s.slug])),
    entry(routes.articles, articles[0]?.publishedAt),
    ...articles.map((a) => entry(routes.article(a.slug), latest(articlesEdited[a.slug], a.publishedAt))),
    entry(routes.career),
    entry(routes.contact),
    entry(routes.faq),
    entry(routes.forms),
    entry(routes.privacy),
  ];
}

const latest = (a: string | undefined, b: string) => (a && a > b ? a : b);

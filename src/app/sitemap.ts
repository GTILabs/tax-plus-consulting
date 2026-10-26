import type { MetadataRoute } from "next";
import { getArticles, getServices } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";
import { siteUrl } from "@/modules/content/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, articles] = await Promise.all([getServices(), getArticles()]);
  const paths = [
    routes.home,
    routes.about,
    routes.services,
    ...services.map((s) => routes.service(s.slug)),
    routes.articles,
    ...articles.map((a) => routes.article(a.slug)),
    routes.career,
    routes.contact,
    routes.faq,
    routes.forms,
    routes.privacy,
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}` }));
}

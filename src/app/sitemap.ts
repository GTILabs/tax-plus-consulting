import type { MetadataRoute } from "next";
import { articles } from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";
import { services } from "@/modules/content/services";
import { site } from "@/modules/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    routes.home,
    routes.about,
    routes.services,
    ...services.map((s) => routes.service(s.slug)),
    routes.specialization,
    routes.articles,
    ...articles.map((a) => routes.article(a.slug)),
    routes.career,
    routes.faq,
    routes.forms,
  ];
  return paths.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}` }));
}

import { routes } from "@/modules/content/navigation";
import type { CollectionKey } from "./collections";

/** Where an entry appears on the site, for the admin's "Lihat di situs" button. */
export function publicUrlFor(collection: CollectionKey, slug: string | null): string | null {
  switch (collection) {
    case "articles":
      return slug ? routes.article(slug) : routes.articles;
    case "services":
      return slug ? routes.service(slug) : routes.services;
    case "faqCategories":
      return slug ? `${routes.faq}#${slug}` : routes.faq;
    case "team":
      return routes.about;
    case "jobs":
      return routes.career;
    case "taxForms":
      return routes.forms;
    default:
      return routes.home;
  }
}

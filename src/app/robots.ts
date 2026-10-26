import type { MetadataRoute } from "next";
import { site } from "@/modules/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    // Staging: crawlable so AI agents can review it; noindex (meta + X-Robots-Tag) keeps it out of search results.
    return { rules: { userAgent: "*", allow: "/", disallow: "/api/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

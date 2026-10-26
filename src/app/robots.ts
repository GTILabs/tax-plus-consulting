import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/modules/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    // Staging: crawlable so AI agents can review it; noindex (meta + X-Robots-Tag) keeps it out of search results.
    return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

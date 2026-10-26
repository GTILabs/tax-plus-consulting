import type { NextConfig } from "next";
import { legacyRedirects } from "./legacy-redirects";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // CMS uploads (src/modules/cms/actions.ts) allow 4 MB files plus multipart overhead.
    serverActions: { bodySizeLimit: "4.2mb" },
  },
  images: {
    // Images uploaded through the CMS live in Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    // Staging stays out of search results, including images and files under /public.
    if (process.env.SITE_INDEXABLE === "true") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;

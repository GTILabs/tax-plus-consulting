import type { NextConfig } from "next";
import { legacyRedirects } from "./legacy-redirects";

/*
 * Baseline security headers for every response. No full Content-Security-Policy yet:
 * a script policy needs per-request nonces, which would take pages out of the static shell.
 * HSTS stays without includeSubDomains until every subdomain of the domain serves HTTPS.
 */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
    const all = [{ source: "/:path*", headers: securityHeaders }];
    if (process.env.SITE_INDEXABLE === "true") return all;
    // Staging stays out of search results, including images and files under /public.
    return [...all, { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;

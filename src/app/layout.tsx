import type { Metadata } from "next";
import { site } from "@/modules/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  robots: site.indexable ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/images/logo.png", width: 360, height: 115, alt: site.name }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>
        <div className="site">{children}</div>
      </body>
    </html>
  );
}

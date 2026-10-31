import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { getSite } from "@/modules/content/data";
import { indexable, SITE_NAME, siteUrl } from "@/modules/content/site";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: site.title, template: `%s — ${SITE_NAME}` },
    description: site.description,
    robots: indexable ? undefined : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: SITE_NAME,
      title: site.title,
      description: site.description,
      // Article pages set their own cover instead.
      images: [{ url: "/images/og/taxplus-share.jpg", width: 1200, height: 630, alt: `${SITE_NAME}, kantor konsultan pajak di Bandung` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

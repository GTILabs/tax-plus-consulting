import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { site, socialProfiles } from "@/modules/content/site";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });

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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  image: `${site.url}/images/photos/office-front.jpg`,
  telephone: `+${site.contact.whatsappNumber}`,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Cherry Field, Cipagalo, Kec. Bojongsoang",
    addressLocality: "Kabupaten Bandung",
    addressRegion: "Jawa Barat",
    postalCode: "40287",
    addressCountry: "ID",
  },
  openingHours: "Mo-Fr 09:00-17:00",
  sameAs: socialProfiles.map((p) => p.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

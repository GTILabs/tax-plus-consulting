import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { JsonLd } from "@/components/sections/Faq";
import { articleWhatsappMessage } from "@/modules/content/articles";
import { getArticles, getServices, getSite, getTeam, serviceWhatsappMessage, waLink } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";
import { SITE_NAME, siteUrl } from "@/modules/content/site";
import { BackToTop } from "./BackToTop";
import { GatePanels } from "./GatePanels";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppFloat } from "./WhatsAppFloat";

/** From the deed of establishment ("18 Agustus 2022" in the CMS general settings). */
const FOUNDING_DATE = "2022-08-18";
/** Greater Bandung, where clients can meet at the office; consultations also run online. */
const AREA_SERVED = ["Kota Bandung", "Kabupaten Bandung", "Kabupaten Bandung Barat", "Kota Cimahi", "Jawa Barat"];

/** Header, footer, photo panels and floating buttons around every public page (also the 404). */
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [site, services, articles, { pioneer }] = await Promise.all([getSite(), getServices(), getArticles(), getTeam()]);
  /** Opening WhatsApp message per page, so the floating button carries the page's context. */
  const waLinks: Record<string, string> = Object.fromEntries([
    ...services.map((s) => [routes.service(s.slug), waLink(site, serviceWhatsappMessage(s))]),
    ...articles.map((a) => [routes.article(a.slug), waLink(site, articleWhatsappMessage(a))]),
    [routes.career, waLink(site, "Halo TaxPlus, saya ingin bertanya tentang lowongan.")],
  ]);
  // Profiles without "taxplus" in the handle or URL are the founder's own (LinkedIn, Threads).
  const isCompanyProfile = (p: (typeof site.social)[number]) => /taxplus/i.test(p.handle + p.url);
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: SITE_NAME,
    description: site.description,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/photos/office-front.jpg`,
    telephone: `+${site.contact.whatsappNumber}`,
    email: site.contact.email,
    foundingDate: FOUNDING_DATE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Cherry Field, Cipagalo, Kec. Bojongsoang",
      addressLocality: "Kabupaten Bandung",
      addressRegion: "Jawa Barat",
      postalCode: "40287",
      addressCountry: "ID",
    },
    geo: { "@type": "GeoCoordinates", latitude: -6.9721806, longitude: 107.6428063 },
    hasMap: site.googleReviewUrl,
    areaServed: AREA_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    ...(pioneer && {
      founder: {
        "@type": "Person",
        name: pioneer.name,
        jobTitle: pioneer.role,
        sameAs: site.social.filter((p) => !isCompanyProfile(p)).map((p) => p.url),
      },
    }),
    sameAs: [...site.social.filter(isCompanyProfile).map((p) => p.url), site.googleReviewUrl],
  };
  return (
    <>
      <JsonLd data={organization} />
      <GoogleAnalytics />
      <SiteHeader services={services.map((s) => ({ slug: s.slug, name: s.name, description: s.subtitle }))} consultHref={waLink(site, site.messages.freeConsult)} />
      <main id="app">{children}</main>
      <GatePanels />
      <SiteFooter />
      <BackToTop />
      <WhatsAppFloat links={waLinks} fallback={waLink(site)} />
    </>
  );
}

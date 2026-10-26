import { JsonLd } from "@/components/sections/Faq";
import { articleWhatsappMessage } from "@/modules/content/articles";
import { getArticles, getServices, getSite, serviceWhatsappMessage, waLink } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";
import { SITE_NAME, siteUrl } from "@/modules/content/site";
import { BackToTop } from "./BackToTop";
import { GatePanels } from "./GatePanels";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppFloat } from "./WhatsAppFloat";

/** Header, footer, photo panels and floating buttons around every public page (also the 404). */
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [site, services, articles] = await Promise.all([getSite(), getServices(), getArticles()]);
  /** Opening WhatsApp message per page, so the floating button carries the page's context. */
  const waLinks: Record<string, string> = Object.fromEntries([
    ...services.map((s) => [routes.service(s.slug), waLink(site, serviceWhatsappMessage(s))]),
    ...articles.map((a) => [routes.article(a.slug), waLink(site, articleWhatsappMessage(a))]),
    [routes.career, waLink(site, "Halo TaxPlus, saya ingin bertanya tentang lowongan.")],
  ]);
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/photos/office-front.jpg`,
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
    sameAs: site.social.map((p) => p.url),
  };
  return (
    <>
      <JsonLd data={organization} />
      <SiteHeader services={services.map((s) => ({ slug: s.slug, name: s.name, description: s.subtitle }))} consultHref={waLink(site, site.messages.freeConsult)} />
      <main id="app">{children}</main>
      <GatePanels />
      <SiteFooter />
      <BackToTop />
      <WhatsAppFloat links={waLinks} fallback={waLink(site)} />
    </>
  );
}

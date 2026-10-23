import { BackToTop } from "@/components/layout/BackToTop";
import { GatePanels } from "@/components/layout/GatePanels";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { articles, articleWhatsappMessage } from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";
import { services, serviceWhatsappMessage } from "@/modules/content/services";

/** Opening WhatsApp message per page, so the floating button carries the page's context. */
const waMessages: Record<string, string> = Object.fromEntries([
  ...services.map((s) => [routes.service(s.slug), serviceWhatsappMessage(s)]),
  ...articles.map((a) => [routes.article(a.slug), articleWhatsappMessage(a)]),
  [routes.career, "Halo TaxPlus, saya ingin bertanya tentang lowongan."],
]);

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="app">{children}</main>
      <GatePanels />
      <SiteFooter />
      <BackToTop />
      <WhatsAppFloat messages={waMessages} />
    </>
  );
}

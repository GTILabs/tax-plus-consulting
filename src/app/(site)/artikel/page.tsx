import type { Metadata } from "next";
import { ArticleBrowser } from "@/components/articles/ArticleBrowser";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { SocialSection } from "@/components/sections/SocialSection";
import { articleCardData, articles } from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/modules/content/site";

export const metadata: Metadata = {
  title: "Artikel Pajak",
  description:
    "Ringkasan regulasi pajak terbaru, panduan Coretax, dan pelajaran dari kasus pemeriksaan dan sengketa pajak dari tim TaxPlus Consulting.",
  alternates: { canonical: routes.articles },
};

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Artikel" }]}
        kicker="Artikel & Insight"
        title={
          <>
            Aturan pajak,
            <br />
            <Mark>dijelaskan singkat.</Mark>
          </>
        }
        sub="Ringkasan regulasi terbaru, panduan Coretax, dan pelajaran dari kasus pemeriksaan dan sengketa."
        photo="/images/photos/team/team-10.jpg"
        actions={
          <div className="ctas">
            <a className="btn btn-gold" href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Tanya lewat WhatsApp
            </a>
          </div>
        }
      />
      <section>
        <div className="in">
          <ArticleBrowser articles={articles.map(articleCardData)} />
        </div>
      </section>
      <SocialSection />
    </>
  );
}

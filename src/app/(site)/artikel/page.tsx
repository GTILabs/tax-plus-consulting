import type { Metadata } from "next";
import { ArticleBrowser } from "@/components/articles/ArticleBrowser";
import { DownloadSection } from "@/components/sections/DownloadSection";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { SocialSection } from "@/components/sections/SocialSection";
import { articleCardData } from "@/modules/content/articles";
import { getArticles, getSite, waLink } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";

export const metadata: Metadata = {
  title: "Artikel Pajak",
  description:
    "Ringkasan regulasi pajak terbaru, panduan Coretax, dan pelajaran dari kasus pemeriksaan dan sengketa pajak dari tim TaxPlus Consulting.",
  alternates: { canonical: routes.articles },
};

export default async function ArticlesPage() {
  const [site, articles] = await Promise.all([getSite(), getArticles()]);
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
        photoPosition="50% 25%"
        actions={
          <div className="ctas">
            <a className="btn btn-gold" href={waLink(site)} target="_blank" rel="noopener noreferrer">
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
      <DownloadSection />
      <SocialSection />
    </>
  );
}

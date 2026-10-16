import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StagingNote } from "@/components/ui/StagingNote";
import { articles, upcomingArticles } from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Pajak, dijelaskan tanpa berbelit. Ditulis konsultan pajak berizin dari perkara yang benar-benar ditangani.",
  alternates: { canonical: routes.articles },
};

export default function ArticlesPage() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a !== featured);

  return (
    <>
      <Breadcrumb items={[{ label: "Artikel" }]} />
      <div className="pg-art">
        <header className="xh">
          <div className="gwrap">
            <span className="xeb">Artikel</span>
            <h1>Pajak, dijelaskan tanpa berbelit.</h1>
            <p>
              Ditulis konsultan berizin dari perkara yang benar-benar kami tangani &mdash; bukan salinan peraturan.
            </p>
          </div>
        </header>

        <section className="xs">
          <div className="gwrap">
            <Link className="feat" href={routes.article(featured.slug)}>
              <div className="bd" style={{ padding: "30px 0 30px 30px" }}>
                <div className="cat">{featured.category}</div>
                <h3>{featured.title}</h3>
                <p>{featured.excerpt}</p>
                <div className="mt">{featured.readingMinutes} menit baca &middot; Artikel unggulan</div>
              </div>
              <div className="img">
                <span style={{ whiteSpace: "pre-line" }}>{featured.featureLabel ?? featured.thumbLabel}</span>
              </div>
            </Link>

            <div className="arts2">
              {rest.map((article) => (
                <Link className="ac" key={article.slug} href={routes.article(article.slug)}>
                  <div className="th">
                    <span>{article.thumbLabel}</span>
                  </div>
                  <div className="bd">
                    <h4>{article.title}</h4>
                    <p>{article.excerpt}</p>
                    <div className="mt">{article.readingMinutes} menit baca</div>
                  </div>
                </Link>
              ))}
              {upcomingArticles.map((article) => (
                <div className="ac soon" key={article.title}>
                  <div className="th">
                    <span>{article.thumbLabel}</span>
                  </div>
                  <div className="bd">
                    <h4>{article.title}</h4>
                    <p>{article.excerpt}</p>
                    <span className="badge">Segera</span>
                  </div>
                </div>
              ))}
            </div>

            <StagingNote className="xnote">
              <b>Untuk pengelola web.</b> Setiap artikel menjadi satu URL tersendiri, misalnya{" "}
              <code>/artikel/sp2dk-apa-yang-harus-dilakukan</code>. Inilah mesin SEO situs: orang mencari &ldquo;SP2DK
              itu apa&rdquo;, mendarat di artikel, lalu menemukan bahwa penulisnya bisa menanganinya. Halaman beranda
              hanya melayani orang yang sudah kenal TaxPlus.
            </StagingNote>
          </div>
        </section>
      </div>
    </>
  );
}

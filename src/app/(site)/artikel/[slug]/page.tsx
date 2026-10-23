import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, ArticleCover } from "@/components/articles/ArticleCard";
import { JsonLd } from "@/components/sections/AboutSection";
import { SectionHead } from "@/components/sections/SectionHead";
import { formatArticleDate } from "@/modules/content/article-meta";
import {
  ARTICLE_AUTHOR,
  articleCardData,
  articleCover,
  articleOgImage,
  articles,
  articleWhatsappMessage,
  getArticle,
  relatedArticles,
} from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";
import { site, whatsappLink } from "@/modules/content/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/artikel/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const image = { url: articleOgImage(article.slug), width: 1200, height: 675, alt: article.title };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: routes.article(article.slug) },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [ARTICLE_AUTHOR],
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image.url] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/artikel/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    image: `${site.url}${articleOgImage(article.slug)}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` } },
    mainEntityOfPage: `${site.url}${routes.article(article.slug)}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <header className="ar-head">
        <div className="in">
          <div className="ar-wrap">
            <nav className="ar-crumb" aria-label="Breadcrumb">
              <Link href={routes.home}>Beranda</Link> / <Link href={routes.articles}>Artikel</Link> / {article.category}
            </nav>
            <span className="tagc">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="ar-lead">{article.excerpt}</p>
            <div className="ar-by">
              <span className="ar-av" aria-hidden="true">
                TP
              </span>
              <span>
                <b>{ARTICLE_AUTHOR}</b>
                <br />
                <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time> &middot;{" "}
                {article.readingMinutes} menit baca
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="in">
        <ArticleCover svg={articleCover(article.slug)} className="ar-cover cov" />
        <article className="ar-wrap ar-body">
          <div dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
          <p className="ar-ref">
            <b>Dasar hukum:</b> {article.legalBasis}
          </p>
          <p className="ar-note">
            Artikel ini bersifat informasi umum dan bukan pendapat hukum atas kasus tertentu. Ketentuan dapat berubah;
            hubungi kami untuk menilai situasi Anda.
          </p>
          <div className="ar-cta">
            <div>
              <h4>Punya kasus serupa?</h4>
              <p>Konsultasi awal 15 menit tanpa biaya.</p>
            </div>
            <a className="btn btn-gold" href={whatsappLink(articleWhatsappMessage(article))} target="_blank" rel="noopener noreferrer">
              Tanya lewat WhatsApp
            </a>
          </div>
        </article>
      </div>
      <section className="soft">
        <div className="in">
          <SectionHead title="Artikel terkait" sub="Bacaan lanjutan dari tim kami." />
          <div className="art-grid">
            {relatedArticles(article).map((a) => (
              <ArticleCard key={a.slug} article={articleCardData(a)} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link className="btn btn-line" href={routes.articles} style={{ color: "var(--navy)" }}>
              Semua artikel
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

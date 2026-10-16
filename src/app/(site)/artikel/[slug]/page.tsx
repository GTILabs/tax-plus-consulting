import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArrowLeft } from "@/components/ui/icons";
import { articles, getArticle } from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";
import { site } from "@/modules/content/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/artikel/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: routes.article(slug) },
    openGraph: { type: "article", title: article.title, description: article.excerpt },
  };
}

export default async function ArticlePage(props: PageProps<"/artikel/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: "Kalam Al-Iqbal" },
    publisher: { "@type": "Organization", name: site.name, logo: `${site.url}/images/logo.png` },
    mainEntityOfPage: `${site.url}${routes.article(slug)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Breadcrumb items={[{ label: "Artikel", href: routes.articles }, { label: article.category }]} />
      <div className="pg-art">
        <section className="xs" style={{ borderTop: "none", paddingTop: 44 }}>
          <div className="gwrap">
            <article className="post">
              <Link className="back" href={routes.articles}>
                <ArrowLeft />
                Kembali ke Artikel
              </Link>
              <div className="cat">{article.category}</div>
              <h1>{article.title}</h1>
              <div className="mt">
                Ditulis oleh {article.byline} &middot; {article.readingMinutes} menit baca
              </div>
              <p className="lead">{article.lead}</p>
              {/* Trusted, repository-authored HTML; see Article.bodyHtml. */}
              <div dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
              <div className="cta3">
                <h4>{article.cta.title}</h4>
                <p>{article.cta.text}</p>
                <Link href={article.cta.href}>
                  <span>{article.cta.label}</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { formatArticleDate } from "@/modules/content/article-meta";
import type { Article, ArticleCoverData } from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";

export type ArticleCardData = Pick<Article, "slug" | "category" | "title" | "excerpt" | "publishedAt" | "readingMinutes"> & {
  cover: ArticleCoverData;
};

/** 16:9 WebP cover; the wrapper takes the cover's background so it can letterbox in taller boxes. */
export function ArticleCover({
  cover,
  alt,
  sizes,
  className = "cov",
  preload = false,
}: {
  cover: ArticleCoverData;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div className={className} style={{ background: cover.background }}>
      <Image src={cover.src} alt={alt} width={1200} height={675} sizes={sizes} preload={preload} />
    </div>
  );
}

function Meta({ article }: { article: ArticleCardData }) {
  return (
    <span className="meta">
      {formatArticleDate(article.publishedAt)} &middot; {article.readingMinutes} menit baca
    </span>
  );
}

/** Card with 16:9 cover, category label, title, two-sentence summary, date and reading time. */
export function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <Link className="art" href={routes.article(article.slug)}>
      <ArticleCover cover={article.cover} alt={article.title} sizes="(max-width: 760px) 100vw, 380px" className="a-img cov" />
      <div className="a-bd">
        <span className="tagc">{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <Meta article={article} />
      </div>
    </Link>
  );
}

/** Large card for the newest article. */
export function ArticleFeature({ article }: { article: ArticleCardData }) {
  return (
    <Link className="art-feat" href={routes.article(article.slug)}>
      <ArticleCover cover={article.cover} alt={article.title} sizes="(max-width: 860px) 100vw, 600px" className="af-img cov" />
      <div className="af-bd">
        <span className="tagc">Terbaru &middot; {article.category}</span>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <Meta article={article} />
        <span className="sr-go">Baca artikel &rarr;</span>
      </div>
    </Link>
  );
}

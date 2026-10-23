import Link from "next/link";
import { formatArticleDate } from "@/modules/content/article-meta";
import type { Article } from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";

export type ArticleCardData = Pick<Article, "slug" | "category" | "title" | "excerpt" | "publishedAt" | "readingMinutes"> & {
  cover: string;
};

/** Inline SVG cover (trusted markup generated in src/modules/content/article-covers.ts). */
export function ArticleCover({ svg, className = "cov", style }: { svg: string; className?: string; style?: React.CSSProperties }) {
  return <div className={className} style={style} dangerouslySetInnerHTML={{ __html: svg }} />;
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
      <ArticleCover svg={article.cover} className="a-img cov" />
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
  const background = article.cover.match(/<rect width="1200" height="675" fill="([^"]+)"/)?.[1] ?? "var(--soft)";
  return (
    <Link className="art-feat" href={routes.article(article.slug)}>
      <ArticleCover svg={article.cover.replace("xMidYMid slice", "xMidYMid meet")} className="af-img cov" style={{ background }} />
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

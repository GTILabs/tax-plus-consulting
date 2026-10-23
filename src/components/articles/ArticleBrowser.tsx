"use client";

import { useState } from "react";
import { ARTICLE_CATEGORIES } from "@/modules/content/article-meta";
import { ArticleCard, ArticleFeature, type ArticleCardData } from "./ArticleCard";

const ALL = "Semua";

/** Category filter: "Semua" shows the newest article large and the rest in a grid; a category shows only its articles. */
export function ArticleBrowser({ articles }: { articles: ArticleCardData[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const list = category === ALL ? articles.slice(1) : articles.filter((a) => a.category === category);

  return (
    <>
      <div className="chips c" style={{ marginTop: 0 }} role="group" aria-label="Filter kategori artikel">
        {[ALL, ...ARTICLE_CATEGORIES].map((c) => (
          <button
            key={c}
            type="button"
            className={c === category ? "chip on" : "chip"}
            data-cat={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      {category === ALL && articles[0] && <ArticleFeature article={articles[0]} />}
      <div className="art-grid">
        {list.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
      <p className="art-count" aria-live="polite">
        {category === ALL ? `${articles.length} artikel` : `${list.length} artikel kategori ${category}`}
      </p>
    </>
  );
}

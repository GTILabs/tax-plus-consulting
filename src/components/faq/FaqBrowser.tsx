"use client";

import { useDeferredValue, useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import type { FaqCategory } from "@/modules/content/faqs";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Category jump links, instant search and an accordion per category. */
export function FaqBrowser({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const terms = normalize(deferredQuery).split(/\s+/).filter(Boolean);

  const visible = categories
    .map((c) => ({
      ...c,
      faqs: terms.length
        ? c.faqs.filter((f) => {
            const haystack = normalize(`${f.question} ${f.answer}`);
            return terms.every((t) => haystack.includes(t));
          })
        : c.faqs,
    }))
    .filter((c) => c.faqs.length > 0);
  const total = visible.reduce((n, c) => n + c.faqs.length, 0);

  return (
    <div className="faqb">
      <div className="faqb-tools">
        <label className="faqb-search">
          <span className="sr-only">Cari pertanyaan</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari pertanyaan, misalnya: PPh 21, SPT, banding"
            autoComplete="off"
          />
        </label>
        {terms.length > 0 ? (
          <p className="faqb-count" role="status">
            {total} pertanyaan cocok
          </p>
        ) : (
          <nav className="faqb-cats" aria-label="Kategori FAQ">
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`}>
                {c.title} <span>{c.faqs.length}</span>
              </a>
            ))}
          </nav>
        )}
      </div>

      {visible.map((c) => (
        <section key={`${c.id}-${deferredQuery}`} id={c.id} className="faqb-group" aria-labelledby={`${c.id}-title`}>
          <h2 id={`${c.id}-title`}>{c.title}</h2>
          <Accordion items={c.faqs} itemClassName="fq" answerClassName="ans" />
        </section>
      ))}

      {total === 0 && (
        <div className="faqb-empty">
          <b>Tidak ada pertanyaan yang cocok.</b>
          Coba kata lain, atau tanyakan langsung lewat konsultasi gratis 15 menit.
        </div>
      )}
    </div>
  );
}

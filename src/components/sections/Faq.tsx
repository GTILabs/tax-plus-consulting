/* No server imports: the client-side FAQ search (FaqBrowser) renders FaqList too. */

/** Answer text with **bold** key phrases. */
function RichText({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/** Open/close FAQ list (native <details>); answers sit in a highlighted box. */
export function FaqList({ items, openFirst = true }: { items: { question: string; answer: string }[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.question} open={openFirst && i === 0}>
          <summary>{f.question}</summary>
          <p>
            <RichText text={f.answer} />
          </p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.replaceAll("**", "") },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}

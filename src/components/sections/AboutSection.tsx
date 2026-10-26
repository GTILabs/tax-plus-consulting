import { site } from "@/modules/content/site";

/** Bordered office profile box. */
export function AboutBox() {
  return (
    <article className="about-box">
      <span className="ab-badge">Tentang TaxPlus</span>
      <h2>
        Kantor Konsultan Pajak
        <br />
        <span className="ab-mark">di Bandung</span>
      </h2>
      <p>
        <strong>TaxPlus Consulting</strong> adalah kantor konsultan pajak di Bojongsoang, Kabupaten Bandung, yang
        berdiri sejak {site.founded} dan dipimpin oleh Kalam Al-Iqbal, S.Ak., S.H., M.Ak., BKP, pemegang Izin Praktik
        Konsultan Pajak tingkat A dan B serta Izin Kuasa Hukum Pengadilan Pajak.
      </p>
      <p>
        Kami mendampingi <strong>perusahaan, UMKM, dan orang pribadi</strong>, termasuk figur publik, dari sektor
        hiburan dan media, properti, manufaktur, kesehatan, ritel, hingga logistik.
      </p>
      <p>
        Layanan kami mencakup{" "}
        <strong>
          kepatuhan pajak, pembukuan dan laporan keuangan fiskal, perencanaan pajak, pendampingan pemeriksaan, serta
          keberatan dan banding
        </strong>{" "}
        di Pengadilan Pajak.
      </p>
      <div className="about-facts">
        <span>
          <b>2022</b>berdiri
        </span>
        <span>
          <b>
            {site.stats.clients.replace("+", "")}
            <i>+</i>
          </b>
          klien
        </span>
        <span>
          <b>5</b>lini layanan
        </span>
      </div>
    </article>
  );
}

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

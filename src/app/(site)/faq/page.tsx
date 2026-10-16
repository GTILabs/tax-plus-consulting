import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FaqBrowser } from "@/components/faq/FaqBrowser";
import { ContactOptions } from "@/components/sections/ContactOptions";
import { faqCategories } from "@/modules/content/faqs";
import { routes } from "@/modules/content/navigation";

export const metadata: Metadata = {
  title: "FAQ Pajak",
  description:
    "Jawaban atas pertanyaan pajak yang paling sering muncul: NPWP, SPT, PPh 21/23/25, PKP, sanksi, pemeriksaan, banding, dan perencanaan pajak.",
  alternates: { canonical: routes.faq },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((c) =>
      c.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Breadcrumb items={[{ label: "FAQ" }]} />
      <div className="pg-svc">
        <header className="xh">
          <div className="wrap">
            <span className="xeb">FAQ</span>
            <h1>Pertanyaan pajak yang paling sering muncul.</h1>
            <p>
              Jawaban singkat untuk hal-hal dasar. Untuk kondisi Anda sendiri, angka dan dasar hukumnya tetap perlu
              dihitung per kasus.
            </p>
          </div>
        </header>
        <section className="xs" style={{ borderTop: "none" }}>
          <div className="wrap">
            <FaqBrowser categories={faqCategories} />
          </div>
        </section>
        <section className="blk tint">
          <div className="wrap">
            <div className="cta2">
              <div>
                <h3>Pertanyaan Anda tidak ada di sini?</h3>
                <p>15 menit, tanpa biaya. Ceritakan kondisinya, kami jawab dengan angka dan dasar hukumnya.</p>
              </div>
              <div className="opts">
                <ContactOptions />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

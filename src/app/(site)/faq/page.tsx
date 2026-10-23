import type { Metadata } from "next";
import { FaqBrowser } from "@/components/faq/FaqBrowser";
import { faqJsonLd, JsonLd } from "@/components/sections/AboutSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { faqCategories } from "@/modules/content/faqs";
import { routes } from "@/modules/content/navigation";

export const metadata: Metadata = {
  title: "FAQ Pajak",
  description:
    "Jawaban atas pertanyaan pajak yang paling sering muncul: NPWP, SPT, PPh 21/23/25, PKP, sanksi, pemeriksaan, banding, dan perencanaan pajak.",
  alternates: { canonical: routes.faq },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqCategories.flatMap((c) => c.faqs))} />
      <PageHero
        crumbs={[{ label: "FAQ" }]}
        kicker="FAQ Pajak"
        title={
          <>
            Pertanyaan pajak
            <br />
            <Mark>paling sering muncul.</Mark>
          </>
        }
        sub="Jawaban singkat untuk hal-hal dasar. Untuk kondisi Anda sendiri, angka dan dasar hukumnya tetap perlu dihitung per kasus."
      />
      <section>
        <div className="in">
          <FaqBrowser categories={faqCategories} />
        </div>
      </section>
      <CtaBand title="Pertanyaan Anda tidak ada di sini?" />
    </>
  );
}

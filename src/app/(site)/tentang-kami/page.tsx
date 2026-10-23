import type { Metadata } from "next";
import { AboutBox } from "@/components/sections/AboutSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { MemberBand } from "@/components/sections/MemberLogos";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhySection } from "@/components/sections/WhySection";
import { Icon } from "@/components/ui/icons";
import { aboutPromises, companyLegal } from "@/modules/content/company";
import { routes } from "@/modules/content/navigation";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "TaxPlus Consulting, kantor konsultan pajak di Bandung yang dipimpin konsultan berizin dan advokat: profil, tim, legalitas, dan keanggotaan.",
  alternates: { canonical: routes.about },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Tentang Kami" }]}
        kicker="Tentang Kami"
        title={
          <>
            Your Trusted
            <br />
            <Mark>Tax Partner.</Mark>
          </>
        }
        sub="Kantor konsultan pajak di Bandung yang menangani kepatuhan, pemeriksaan, sampai sengketa pajak, dipimpin langsung oleh konsultan berizin dan advokat."
        photo="/images/photos/office-front.jpg"
      />
      <section>
        <div className="in about-faq">
          <AboutBox />
          <div className="faq-col">
            <h3>Cara kami bekerja</h3>
            <div className="promise-list">
              {aboutPromises.map((p) => (
                <div key={p.title}>
                  <span className="pl-i">
                    <Icon name={p.icon} size={26} />
                  </span>
                  <div>
                    <b>{p.title}</b>
                    <p>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <WhySection />
      <TeamSection full />
      <section className="soft" id="legalitas">
        <div className="in">
          <SectionHead title="Legalitas perusahaan" sub="Terdaftar resmi dan dapat diverifikasi." />
          <div className="legal-grid">
            {companyLegal.map((l) => (
              <div key={l.label} className="lg">
                <span className="pl-i">
                  <Icon name={l.icon} size={26} />
                </span>
                <span className="lg-k">{l.label}</span>
                <b>{l.value}</b>
                <span>{l.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MemberBand />
      <CtaBand />
    </>
  );
}

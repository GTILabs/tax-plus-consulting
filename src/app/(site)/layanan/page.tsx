import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FlowSection } from "@/components/sections/FlowSection";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { SectorSection } from "@/components/sections/SectorSection";
import { ServiceBoxes, ServiceRows } from "@/components/sections/ServiceCards";
import { routes } from "@/modules/content/navigation";

export const metadata: Metadata = {
  title: "Layanan Konsultan Pajak",
  description:
    "Lima layanan TaxPlus Consulting: Tax Compliance, Tax Accounting, Tax Management, Tax Audit, dan Tax Litigation. Pilih layanannya, atau ceritakan masalahnya.",
  alternates: { canonical: routes.services },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Layanan" }]}
        kicker="Layanan TaxPlus"
        title={
          <>
            Ada urusan pajak?
            <br />
            <Mark>Mulai dari sini.</Mark>
          </>
        }
        sub="Pilih layanannya, atau ceritakan masalahnya. Kami arahkan langkahnya dalam 15 menit."
        photo="/images/photos/team/team-05.jpg"
        photoPosition="50% 22%"
      />
      <section className="soft">
        <div className="in">
          <SectionHead title="Lima lini layanan" sub="Pilih satu, atau kombinasikan untuk pendampingan menyeluruh." />
          <ServiceBoxes />
        </div>
      </section>
      <section>
        <div className="in">
          <SectionHead title="Cakupan tiap layanan" sub="Klik layanan untuk melihat detail dan konsultasi." />
          <ServiceRows />
        </div>
      </section>
      <FlowSection />
      <SectorSection />
      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ConsultBand } from "@/components/sections/ConsultBand";
import { routes } from "@/modules/content/navigation";
import { getService, serviceGroups } from "@/modules/content/services";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Lima layanan pajak TaxPlus Consulting: Tax Compliance, Tax Accounting, Tax Management, Tax Audit, dan Tax Litigation.",
  alternates: { canonical: routes.services },
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Layanan" }]} />
      <div className="pg-svc">
        <header className="hero">
          <div className="wrap">
            <span className="eyebrow">Layanan TaxPlus Consulting</span>
            <h1>Dari lapor bulanan sampai Mahkamah Agung.</h1>
            <p>Pilih berdasarkan kondisi Anda sekarang, bukan istilah teknisnya.</p>
            <div className="hbadge">
              <span><b>BKP</b> KIP-6837/IP.A/PJ/2020</span>
              <span><b>Kuasa Hukum Pengadilan Pajak</b> 1507/PP/IKH/2023</span>
              <span><b>Advokat PERADI</b> 08-02598</span>
              <span><b>IKPI</b></span>
            </div>
          </div>
        </header>

        <section className="sec">
          <div className="wrap">
            {serviceGroups.map((group) => (
              <div className="grp" key={group.number}>
                <div className="gh">
                  <span className="gn">{group.number}</span>
                  <h3>{group.title}</h3>
                  <span className="gs">{group.subtitle}</span>
                </div>
                <div className="cards">
                  {group.services.map((slug) => {
                    const service = getService(slug)!;
                    return (
                      <Link
                        key={slug}
                        href={routes.service(slug)}
                        className={service.hub.wide ? "card wide" : "card"}
                        style={{ display: "block" }}
                      >
                        <h4>{service.name}</h4>
                        <div className="idn">{service.hub.label}</div>
                        <p>{service.hub.summary}</p>
                        <div className="tags">
                          {service.hub.tags.map((tag) => (
                            <span className="tg" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="go">Lihat rinciannya &rarr;</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <ConsultBand
        title="Belum yakin layanan mana yang Anda butuhkan?"
        text="Ceritakan kondisinya dalam 15 menit, gratis. Kami arahkan ke layanan yang tepat — atau katakan terus terang bila Anda belum membutuhkannya."
      />
    </>
  );
}

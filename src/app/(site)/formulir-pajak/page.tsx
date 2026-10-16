import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { taxForms } from "@/modules/content/forms";
import { routes } from "@/modules/content/navigation";
import { whatsappLink } from "@/modules/content/site";

export const metadata: Metadata = {
  title: "Formulir Pajak",
  description:
    "Unduh formulir pajak: pendaftaran NPWP orang pribadi dan badan, SPT Tahunan 1770, 1770 S, 1771, serta bukti potong PPh 21 (1721 A1).",
  alternates: { canonical: routes.forms },
};

const groups = [...new Set(taxForms.map((f) => f.group))];

export default function TaxFormsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Formulir Pajak" }]} />
      <div className="pg-svc">
        <header className="xh">
          <div className="wrap">
            <span className="xeb">Formulir Pajak</span>
            <h1>Formulir pajak yang paling sering dicari.</h1>
            <p>Pendaftaran NPWP, SPT Tahunan, dan bukti potong PPh 21 — siap diunduh.</p>
          </div>
        </header>

        <section className="xs" style={{ borderTop: "none" }}>
          <div className="wrap">
            <div className="fnote" role="note">
              <b>Periksa dulu sebelum dipakai.</b> Formulir di bawah ini adalah format sebelum Coretax. Sejak 2025
              pendaftaran, pelaporan, dan bukti potong umumnya dilakukan langsung di Coretax, dan sebagian format sudah
              berubah. <a href={whatsappLink("Halo TaxPlus, saya ingin menanyakan formulir pajak.")}>Tanyakan ke kami</a>{" "}
              bila ragu formulir mana yang berlaku untuk Anda.
            </div>

            {groups.map((group) => (
              <div key={group} className="fgroup">
                <h2>{group}</h2>
                <ul className="flist">
                  {taxForms
                    .filter((f) => f.group === group)
                    .map((f) => (
                      <li key={f.file}>
                        <span className={`fbadge f-${f.format.toLowerCase()}`} aria-hidden="true">
                          {f.format}
                        </span>
                        <div className="fbody">
                          <h3>{f.title}</h3>
                          <p>{f.description}</p>
                        </div>
                        <a className="fdl" href={f.file} download>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
                          </svg>
                          Unduh
                          <span className="sr-only">
                            {" "}
                            {f.title} ({f.format}, {f.sizeKb} KB)
                          </span>
                          <small aria-hidden="true">
                            {f.format} &middot; {f.sizeKb} KB
                          </small>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="blk tint">
          <div className="wrap">
            <div className="cta2">
              <div>
                <h3>Lebih suka diurus sekalian?</h3>
                <p>Pelaporan rutin, SPT Tahunan, dan bukti potong bisa kami kerjakan lewat Coretax untuk Anda.</p>
              </div>
              <div className="opts">
                <Link className="op" href={routes.service("tax-compliance")}>
                  <b>Tax Compliance</b>
                  <span>Pelaporan pajak rutin bulanan &amp; tahunan.</span>
                </Link>
                <Link className="op" href={routes.contact}>
                  <b>Konsultasi gratis 15 menit</b>
                  <span>Ceritakan kondisinya, kami balas di hari kerja yang sama.</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

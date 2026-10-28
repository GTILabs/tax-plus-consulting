import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { Mark, PageHero } from "@/components/sections/PageHero";
import { downloadHref } from "@/modules/cms/files";
import { getSite, getTaxForms, waLink } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";

export const metadata: Metadata = {
  title: "Formulir Pajak",
  description:
    "Unduh formulir pajak: pendaftaran NPWP orang pribadi dan badan, SPT Tahunan 1770, 1770 S, 1771, serta bukti potong PPh 21 (1721 A1).",
  alternates: { canonical: routes.forms },
};

export default async function TaxFormsPage() {
  const [site, all] = await Promise.all([getSite(), getTaxForms()]);
  const taxForms = all.flatMap((f) => (f.file ? [{ ...f, file: f.file }] : []));
  const groups = [...new Set(taxForms.map((f) => f.group))];
  return (
    <>
      <PageHero
        crumbs={[{ label: "Formulir Pajak" }]}
        kicker="Formulir Pajak"
        title={
          <>
            Formulir pajak yang
            <br />
            <Mark>paling sering dicari.</Mark>
          </>
        }
        sub="Pendaftaran NPWP, SPT Tahunan, dan bukti potong PPh 21, siap diunduh."
      />
      <section>
        <div className="in">
          <div className="fnote" role="note">
            <b>Periksa dulu sebelum dipakai.</b> Formulir di bawah ini adalah format sebelum Coretax. Sejak 2025
            pendaftaran, pelaporan, dan bukti potong umumnya dilakukan langsung di Coretax, dan sebagian format sudah
            berubah.{" "}
            <a
              href={waLink(site, "Halo TaxPlus, saya ingin menanyakan formulir pajak.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanyakan ke kami
            </a>{" "}
            bila ragu formulir mana yang berlaku untuk Anda.
          </div>

          {groups.map((group) => (
            <div key={group} className="fgroup">
              <h2>{group}</h2>
              <ul className="flist">
                {taxForms
                  .filter((f) => f.group === group)
                  .map((f) => (
                    <li key={f.file.url}>
                      <span className={`fbadge f-${f.format.toLowerCase()}`} aria-hidden="true">
                        {f.format}
                      </span>
                      <div className="fbody">
                        <h3>{f.title}</h3>
                        <p>{f.description}</p>
                      </div>
                      <a className="fdl" href={downloadHref(f.file.url)} download>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
                        </svg>
                        Unduh
                        <span className="sr-only">
                          {" "}
                          {f.title} ({f.format}, {f.file.sizeKb} KB)
                        </span>
                        <small aria-hidden="true">
                          {f.format} &middot; {f.file.sizeKb} KB
                        </small>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand
        title="Lebih suka diurus sekalian? Kami kerjakan lewat Coretax."
        waMessage="Halo TaxPlus, saya ingin konsultasi Tax Compliance."
      />
    </>
  );
}

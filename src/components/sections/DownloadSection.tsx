import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { SectionHead } from "./SectionHead";

/** Company documents offered for download; the PDFs live in public/unduhan, covers in public/images/unduhan. */
const downloads = [
  {
    title: "Company Profile 2026",
    text: "Profil lengkap: layanan, cara kerja, tim, pengalaman sektor, dan legalitas kami.",
    meta: "PDF · 18 halaman · 2,6 MB",
    href: "/unduhan/Company_Profile_TaxPlus_Consulting_2026.pdf",
    cover: { src: "/images/unduhan/company-profile-2026.webp", width: 800, height: 450 },
  },
  {
    title: "Brosur TaxPlus 2026",
    text: "Ringkasan layanan dan kontak dalam satu brosur lipat, siap dibagikan.",
    meta: "PDF · brosur lipat · 506 KB",
    href: "/unduhan/Brosur_Lipat_TaxPlus_Consulting_2026.pdf",
    cover: { src: "/images/unduhan/brosur-2026.webp", width: 800, height: 565 },
  },
];

/** "Unduh profil kami": its own navy band with the company profile and brochure, right before "Ikuti kami". */
export function DownloadSection() {
  return (
    <section className="dark dl" id="unduh">
      <div className="in">
        <SectionHead title="Unduh profil kami" sub="Kenali TaxPlus lebih dekat. Gratis, tanpa perlu mendaftar." variant="on-dark" />
        <div className="dl-grid">
          {downloads.map((d) => (
            <a key={d.href} className="dl-card" href={d.href} download>
              <span className="dl-cover">
                <Image src={d.cover.src} alt={`Sampul ${d.title}`} width={d.cover.width} height={d.cover.height} sizes="(max-width: 760px) 100vw, 540px" />
              </span>
              <span className="dl-body">
                <b>{d.title}</b>
                <span className="dl-text">{d.text}</span>
                <span className="dl-foot">
                  <span className="dl-meta">
                    <Icon name="doc" size={18} />
                    {d.meta}
                  </span>
                  <span className="btn btn-gold dl-btn">
                    <Icon name="download" size={18} />
                    Unduh PDF
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

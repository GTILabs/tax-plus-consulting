import Image from "next/image";
import Link from "next/link";
import { routes } from "@/modules/content/navigation";

const panels = [
  {
    href: routes.about,
    title: "Tentang Kami",
    links: ["Profil & legalitas", "Pioneer & partner", "Izin dan keanggotaan"],
    more: "Kenali TaxPlus",
    photo: "/images/photos/office-reception.jpg",
  },
  {
    href: routes.services,
    title: "Layanan",
    links: ["Tax Compliance & Accounting", "Tax Management", "Tax Audit & Litigation"],
    more: "Lihat layanan",
    photo: "/images/photos/team/team-08.jpg",
  },
  {
    href: routes.career,
    title: "Karier",
    links: ["Lowongan kerja", "Program magang", "Kirim lamaran"],
    more: "Bergabung bersama kami",
    photo: "/images/photos/team/career-panel.webp",
    /** Team on the right, navy fade from the left keeps the text readable. */
    fade: true,
  },
];

/** Three dark photo panels above the footer (01 Tentang Kami, 02 Layanan, 03 Karier). */
export function GatePanels() {
  return (
    <nav className="gate" aria-label="Jelajahi TaxPlus">
      {panels.map((p, i) => (
        <Link key={p.href} className={"fade" in p ? "gp gp-fade" : "gp"} href={p.href}>
          <span className={`gp-photo g${i + 1}`} aria-hidden="true">
            <Image src={p.photo} alt="" fill sizes="(max-width: 860px) 100vw, 34vw" />
          </span>
          <span className="gp-body">
            <span className="gp-h">
              <span className="gp-k">{String(i + 1).padStart(2, "0")}</span>
              <b>{p.title}</b>
            </span>
            <span className="gp-l">
              {p.links.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </span>
            <span className="gp-go">{p.more} &rarr;</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}

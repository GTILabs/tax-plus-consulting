import Image from "next/image";
import Link from "next/link";
import { Tick } from "@/components/ui/icons";
import { partners, pioneer, staff, type Person } from "@/modules/content/company";
import { routes } from "@/modules/content/navigation";
import { HighlightTitle } from "./SectionHead";

function PersonCard({ person: p, className }: { person: Person; className: string }) {
  return (
    <div className={className}>
      {p.photo ? (
        <div className="ph">
          <Image src={p.photo.src} alt={`Foto ${p.name}`} width={p.photo.width} height={p.photo.height} sizes="340px" />
        </div>
      ) : (
        <div className="ph ini">{p.initials}</div>
      )}
      <div className="lc-bd">
        <div className="role">{p.role}</div>
        <h3>{p.name}</h3>
        <p>{p.profile}</p>
        <ul className="ticks">
          {p.points.map((x) => (
            <li key={x}>
              <Tick />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StaffGrid() {
  return (
    <>
      <HighlightTitle small>Our Team</HighlightTitle>
      <div className="staff-grid">
        {staff.map((m) => (
          <div key={m.photo} className="st-card">
            <div className="st-ph">
              <Image src={m.photo} alt={`Foto ${m.role} TaxPlus Consulting`} width={640} height={800} sizes="(max-width: 760px) 50vw, 270px" />
            </div>
            <div className="st-role">{m.role}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/** "Meet the Pioneer and Partner": full-width pioneer card, then partners alternating left/right. */
export function TeamSection({ full = false }: { full?: boolean }) {
  return (
    <section>
      <div className="in">
        <HighlightTitle>Meet the Pioneer and Partner</HighlightTitle>
        <PersonCard person={pioneer} className="lead-card" />
        <HighlightTitle small>Partner</HighlightTitle>
        <div className="p-list">
          {partners.map((p, i) => (
            <PersonCard key={p.name} person={p} className={i % 2 ? "lead-card partner rev" : "lead-card partner"} />
          ))}
        </div>
        {full ? (
          <StaffGrid />
        ) : (
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link className="btn btn-line" href={routes.about} style={{ color: "var(--navy)" }}>
              Kenali tim selengkapnya
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

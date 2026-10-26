import Image from "next/image";
import Link from "next/link";
import { Tick } from "@/components/ui/icons";
import { getTeam, type Person } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";
import { HighlightTitle } from "./SectionHead";

function PersonCard({ person: p, className }: { person: Person; className: string }) {
  return (
    <div className={className}>
      {p.photo ? (
        <div className="ph">
          <Image src={p.photo.src} alt={`Foto ${p.name.split(",")[0]}, ${p.role} TaxPlus Consulting`} width={p.photo.width} height={p.photo.height} sizes="340px" />
        </div>
      ) : (
        <div className="ph ini">{p.initials}</div>
      )}
      <div className="lc-bd">
        <div className="role">{p.role}</div>
        <h3>{p.name}</h3>
        {p.profile && <p>{p.profile}</p>}
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

function StaffGrid({ staff }: { staff: Person[] }) {
  return (
    <>
      <HighlightTitle small>Our Team</HighlightTitle>
      <div className="staff-grid">
        {staff.map((m) => (
          <div key={m.name} className="st-card">
            <div className="st-ph">
              {m.photo ? (
                <Image src={m.photo.src} alt={`Foto ${m.name}, ${m.role} TaxPlus Consulting`} width={m.photo.width} height={m.photo.height} sizes="(max-width: 760px) 50vw, 270px" />
              ) : (
                <span className="st-ini">{m.initials}</span>
              )}
            </div>
            <div className="st-role">
              <span className="st-name">{m.name}</span>
              {m.role}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** "Meet the Pioneer and Partner": full-width pioneer card, then partners, photo on the left like the pioneer. */
export async function TeamSection({ full = false }: { full?: boolean }) {
  const { pioneer, partners, staff } = await getTeam();
  return (
    <section>
      <div className="in">
        <HighlightTitle>Meet the Pioneer and Partner</HighlightTitle>
        {pioneer && <PersonCard person={pioneer} className="lead-card" />}
        {partners.length > 0 && (
          <>
            <HighlightTitle small>Partner</HighlightTitle>
            <div className="p-list">
              {partners.map((p) => (
                <PersonCard key={p.name} person={p} className="lead-card partner" />
              ))}
            </div>
          </>
        )}
        {full ? (
          staff.length > 0 && <StaffGrid staff={staff} />
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

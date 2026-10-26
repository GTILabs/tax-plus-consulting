import Image from "next/image";

/**
 * Logos from public sources: IKPI from ikpi.or.id/ikpi.svg, Asosiasi Advokat
 * Indonesia (AAI) from seeklogo.com (aai.or.id is not reachable).
 * Replace with the high-resolution files from Pak Kalam when they arrive.
 */
const members: { name: string; logo?: { src: string; width: number; height: number } }[] = [
  { name: "IKPI", logo: { src: "/images/members/ikpi.png", width: 232, height: 154 } },
  { name: "Asosiasi Advokat Indonesia", logo: { src: "/images/members/aai.png", width: 320, height: 321 } },
];

export function MemberLogos({ big = false }: { big?: boolean }) {
  return (
    <div className="m-row" style={big ? { justifyContent: "center" } : undefined}>
      {members.map((m) => (
        <span key={m.name} className={big ? "m-logo big" : "m-logo"} role="img" aria-label={`Logo ${m.name}`}>
          {m.logo ? (
            <Image src={m.logo.src} alt="" width={m.logo.width} height={m.logo.height} unoptimized />
          ) : (
            <span className="m-ph">{m.name}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/** "Member of" band, centered. */
export function MemberBand() {
  return (
    <section className="mband">
      <div className="in">
        <span className="m-lbl" style={{ textAlign: "center" }}>
          Member of
        </span>
        <MemberLogos big />
      </div>
    </section>
  );
}

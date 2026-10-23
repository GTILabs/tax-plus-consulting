import Image from "next/image";

/** Logo files go in public/images/members/ once received (brief: "Aset yang ditunggu"). */
const members: { name: string; logo?: string }[] = [
  { name: "IKPI" },
  { name: "Ikatan Advokat Indonesia" },
];

export function MemberLogos({ big = false }: { big?: boolean }) {
  return (
    <div className="m-row" style={big ? { justifyContent: "center" } : undefined}>
      {members.map((m) => (
        <span key={m.name} className={big ? "m-logo big" : "m-logo"} role="img" aria-label={`Logo ${m.name}`}>
          {m.logo ? (
            <Image src={m.logo} alt="" width={180} height={110} />
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

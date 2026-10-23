import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { routes } from "@/modules/content/navigation";
import { FREE_CONSULT_WA_MESSAGE, whatsappLink } from "@/modules/content/site";

type Crumb = { label: string; href?: string };

/** Hero buttons: yellow WhatsApp consultation + white outline "Hubungi kami". */
export function HeroButtons({ waMessage = FREE_CONSULT_WA_MESSAGE }: { waMessage?: string }) {
  return (
    <div className="ctas">
      <a className="btn btn-gold" href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer">
        Konsultasi awal gratis &middot; 15 menit
      </a>
      <Link className="btn btn-line" href={routes.contact} style={{ color: "#fff", borderColor: "rgba(255,255,255,.55)" }}>
        Hubungi kami
      </Link>
    </div>
  );
}

/**
 * Photo hero of inner pages: breadcrumb, kicker, two-line title (second line
 * yellow italic via <Mark>), one-line sub and buttons.
 */
export function PageHero({
  crumbs,
  kicker,
  title,
  sub,
  photo,
  actions,
}: {
  crumbs: Crumb[];
  kicker: string;
  title: React.ReactNode;
  sub: string;
  photo?: string;
  /** Defaults to <HeroButtons />; pass `false` to hide. */
  actions?: React.ReactNode | false;
}) {
  return (
    <section className="ph-hero">
      <div className="vbg" aria-hidden="true">
        {photo ? (
          <Image src={photo} alt="" fill priority sizes="100vw" />
        ) : (
          <div className="vph">
            <span className="b1" />
            <span className="b2" />
            <span className="b3" />
          </div>
        )}
      </div>
      <div className="vshade" aria-hidden="true" />
      <div className="in ph-in">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href={routes.home}>Beranda</Link>
          {crumbs.map((c) => (
            <Fragment key={c.label}>
              {" / "}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </Fragment>
          ))}
        </nav>
        <span className="pre">{kicker}</span>
        <h1>{title}</h1>
        <p>{sub}</p>
        {actions === false ? null : (actions ?? <HeroButtons />)}
      </div>
    </section>
  );
}

/** Yellow italic emphasis inside headings. */
export function Mark({ children }: { children: React.ReactNode }) {
  return <span className="mk">{children}</span>;
}

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { routes } from "@/modules/content/navigation";
import { getSite, waLink } from "@/modules/content/data";

type Crumb = { label: string; href?: string };

/** Hero buttons: yellow WhatsApp consultation + white outline "Hubungi kami". */
export async function HeroButtons({ waMessage }: { waMessage?: string }) {
  const site = await getSite();
  return (
    <div className="ctas">
      <a className="btn btn-gold" href={waLink(site, waMessage ?? site.messages.freeConsult)} target="_blank" rel="noopener noreferrer">
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
  blurPhoto = false,
  actions,
}: {
  crumbs: Crumb[];
  kicker: string;
  title: React.ReactNode;
  sub: string;
  photo?: string;
  /** Blur a photo whose signage clashes with the title, until a text-free photo replaces it. */
  blurPhoto?: boolean;
  /** Defaults to <HeroButtons />; pass `false` to hide. */
  actions?: React.ReactNode | false;
}) {
  return (
    <section className="ph-hero">
      <div className={blurPhoto ? "vbg blur" : "vbg"} aria-hidden="true">
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

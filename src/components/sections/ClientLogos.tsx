import Image from "next/image";
import type { CSSProperties } from "react";
import { getClientLogos } from "@/modules/content/data";

/** Height that gives every logo about the same area, so square marks don't look tiny next to wide wordmarks. */
const logoHeight = (w: number, h: number) => Math.round(Math.min(84, Math.sqrt(9600 / (w / h))));

/**
 * Client logos scrolling sideways in an endless loop, shown right before "Klien & ulasan".
 * The list is rendered twice so the strip can slide by half its width and start over
 * without a gap; the copy is hidden from screen readers.
 */
export async function ClientLogos() {
  const logos = (await getClientLogos()).filter((l) => l.logo);
  if (logos.length === 0) return null;
  const list = (copy: boolean) => (
    <ul className="cl-list" aria-hidden={copy || undefined}>
      {logos.map((l) => (
        <li key={l.name} className="cl-item">
          <Image
            src={l.logo!.src}
            alt={copy ? "" : `Logo ${l.name}`}
            width={l.logo!.width}
            height={l.logo!.height}
            sizes="200px"
            style={{ "--h": logoHeight(l.logo!.width, l.logo!.height) } as CSSProperties}
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="clients" aria-labelledby="clients-title">
      <div className="in">
        <p id="clients-title" className="eyebrow cl-title">
          Dipercaya klien dari berbagai sektor
        </p>
      </div>
      <div className="cl-marquee" style={{ "--cl-duration": `${Math.max(20, logos.length * 5)}s` } as CSSProperties}>
        <div className="cl-track">
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}

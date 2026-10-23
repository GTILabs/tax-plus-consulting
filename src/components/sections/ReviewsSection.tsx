import Image from "next/image";
import { SolidStar } from "@/components/ui/icons";
import { showStagingContent } from "@/components/ui/StagingNote";
import { clientLogos } from "@/modules/content/company";
import { featuredReviews } from "@/modules/content/reviews";
import { mapsLink, site } from "@/modules/content/site";
import { SectionHead } from "./SectionHead";

/** "Klien & ulasan": approved client logos (up to 10) and real Google reviews. */
export function ReviewsSection() {
  const logoSlots = clientLogos.length === 0 && showStagingContent();
  return (
    <section className="soft">
      <div className="in">
        <SectionHead title="Klien & ulasan" sub="Dipercaya perusahaan dan figur publik." />
        {clientLogos.length > 0 && (
          <div className="logos">
            {clientLogos.map((l) => (
              <div key={l.name} className="logo-slot">
                <Image src={l.src} alt={l.name} width={150} height={60} style={{ objectFit: "contain" }} />
              </div>
            ))}
          </div>
        )}
        {logoSlots && (
          <div className="logos">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="logo-slot">
                Logo klien {i + 1}
                <br />
                (yang sudah setuju)
              </div>
            ))}
          </div>
        )}
        <div className="review">
          <b>{site.rating.score}</b>
          <div>
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <SolidStar key={i} />
              ))}
            </div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>{site.rating.count} ulasan di Google Business Profile</div>
          </div>
          <a className="btn btn-line rv-link" href={mapsLink} target="_blank" rel="noopener noreferrer">
            Lihat semua ulasan
          </a>
        </div>
        <div className="rv-list">
          {featuredReviews.map((r) => (
            <figure key={r.author} className="rv">
              <div className="stars" aria-label="5 dari 5 bintang">
                {Array.from({ length: 5 }, (_, i) => (
                  <SolidStar key={i} />
                ))}
              </div>
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <b>{r.author}</b> &middot; Ulasan Google
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

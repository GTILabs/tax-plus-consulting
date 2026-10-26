import Image from "next/image";
import { SolidStar } from "@/components/ui/icons";
import { showStagingContent } from "@/components/ui/StagingNote";
import { getClientLogos, getReviews, getSite } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

/** "Klien & ulasan": approved client logos (up to 10) and real Google reviews. */
export async function ReviewsSection() {
  const [site, clientLogos, featuredReviews] = await Promise.all([getSite(), getClientLogos(), getReviews()]);
  const logoSlots = clientLogos.length === 0 && showStagingContent();
  return (
    <section className="soft">
      <div className="in">
        <SectionHead title="Klien & ulasan" sub="Dipercaya perusahaan dan figur publik." />
        {clientLogos.length > 0 && (
          <div className="logos">
            {clientLogos.slice(0, 10).map((l) => (
              <div key={l.name} className="logo-slot">
                <Image src={l.logo!.src} alt={`Logo ${l.name}`} width={l.logo!.width} height={l.logo!.height} sizes="150px" style={{ objectFit: "contain", width: "100%", height: "100%" }} />
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
          <a className="btn btn-line rv-link" href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer">
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

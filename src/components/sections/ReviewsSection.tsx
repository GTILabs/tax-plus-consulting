import { SolidStar } from "@/components/ui/icons";
import { getReviews, getSite } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

/** "Klien & ulasan": Google rating and real Google reviews. The client logos scroll above it (ClientLogos). */
export async function ReviewsSection() {
  const [site, featuredReviews] = await Promise.all([getSite(), getReviews()]);
  return (
    <section className="soft">
      <div className="in">
        <SectionHead title="Klien & ulasan" sub="Dipercaya perusahaan dan figur publik." />
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

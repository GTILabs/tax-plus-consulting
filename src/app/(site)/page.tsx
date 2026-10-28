import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { AboutBox } from "@/components/sections/AboutSection";
import { FaqList, faqJsonLd, JsonLd } from "@/components/sections/Faq";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ConsultSection } from "@/components/sections/ConsultSection";
import { DownloadSection } from "@/components/sections/DownloadSection";
import { FlowSection } from "@/components/sections/FlowSection";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { SectionHead } from "@/components/sections/SectionHead";
import { SectorSection } from "@/components/sections/SectorSection";
import { ServiceBoxes } from "@/components/sections/ServiceCards";
import { SocialSection } from "@/components/sections/SocialSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhySection } from "@/components/sections/WhySection";
import { Icon, SolidStar } from "@/components/ui/icons";
import { showStagingContent } from "@/components/ui/StagingNote";
import { articleCardData } from "@/modules/content/articles";
import { getArticles, getHome, getSite, waLink, type Site } from "@/modules/content/data";
import { routes } from "@/modules/content/navigation";

export const metadata = {
  alternates: { canonical: routes.home },
};

/**
 * Hero background video. Set once the MP4 (15–30 s, no sound) and poster from
 * Pak Kalam are in public/video/; until then animated navy shapes stand in.
 */
const heroVideo: { src: string; poster: string } | null = null;

function HeroVideo({ site }: { site: Site }) {
  return (
    <section className="hero hero-vid">
      <div className="vbg" aria-hidden="true">
        {heroVideo ? (
          <video autoPlay muted loop playsInline poster={heroVideo.poster}>
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        ) : (
          <div className="vph">
            <span className="b1" />
            <span className="b2" />
            <span className="b3" />
          </div>
        )}
        {!heroVideo && showStagingContent() && <div className="vlabel">Area video latar (MP4, 15–30 detik, tanpa suara)</div>}
      </div>
      <div className="vshade" aria-hidden="true" />
      <div className="in hv-in">
        <h1 className="hv-title">
          <span className="pre">Kantor Konsultan Pajak &amp; Kuasa Hukum Pengadilan Pajak</span>
          Dari <span className="ul">lapor bulanan</span>
          <br />
          sampai <span className="mk">ruang sidang.</span>
        </h1>
        <p className="hv-sub">
          Teliti dalam angka, <strong>tegas dalam pembelaan.</strong>
        </p>
        <div className="ctas">
          <a className="btn btn-gold" href={waLink(site, site.messages.freeConsult)} target="_blank" rel="noopener noreferrer">
            Konsultasi awal gratis &middot; 15 menit
          </a>
          <a
            className="btn btn-line"
            href={waLink(site, "Halo TaxPlus, saya ingin meminta panduan pajak gratis.")}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,.55)" }}
          >
            Minta panduan gratis
          </a>
        </div>
        <ul className="dots">
          <li>Gratis</li>
          <li>Tanpa komitmen</li>
          <li>Dibalas di hari kerja yang sama</li>
        </ul>
        <div className="hv-lic2">
          <div className="lic-c">
            <span className="lic-i">
              <Icon name="shield" size={20} strokeWidth={1.8} />
            </span>
            <span className="lic-t">
              <small>Izin Praktik Konsultan Pajak A &amp; B</small>
              <b>
                {site.licenses.practiceA} &middot; {site.licenses.practiceB}
              </b>
            </span>
          </div>
          <div className="lic-c">
            <span className="lic-i">
              <Icon name="scale" size={20} strokeWidth={1.8} />
            </span>
            <span className="lic-t">
              <small>Izin Kuasa Hukum Pengadilan Pajak</small>
              <b>{site.licenses.taxCourt}</b>
            </span>
          </div>
        </div>
      </div>
      <div className="scrollcue" aria-hidden="true">
        Gulir ke bawah
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

/** "10+" with the plus in yellow. */
function StatValue({ value }: { value: string }) {
  return value.endsWith("+") ? (
    <span className="st-num">
      {value.slice(0, -1)}
      <i>+</i>
    </span>
  ) : (
    value
  );
}

export default async function HomePage() {
  const [site, home, articles] = await Promise.all([getSite(), getHome(), getArticles()]);
  const { homeFaqs } = home;
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      {/* 1. Hero video */}
      <HeroVideo site={site} />
      {/* 2. Angka */}
      <div className="in">
        <div className="stats">
          <div className="stat">
            <span className="st-ic">
              <Icon name="calendar" size={18} />
            </span>
            <b>
              <StatValue value={site.stats.years} />
            </b>
            <span className="st-lbl">tahun pengalaman pimpinan</span>
          </div>
          <div className="stat">
            <span className="st-ic">
              <Icon name="team" size={18} />
            </span>
            <b>
              <StatValue value={site.stats.clients} />
            </b>
            <span className="st-lbl">klien dilayani</span>
          </div>
          <div className="stat">
            <span className="st-ic">
              <Icon name="star" size={18} />
            </span>
            <b>
              {site.rating.score}
              <span className="st-stars" aria-label="5 dari 5 bintang">
                {[1, 2, 3, 4, 5].map((n) => (
                  <SolidStar key={n} />
                ))}
              </span>
            </b>
            <span className="st-lbl">rating Google dari {site.rating.count} ulasan</span>
          </div>
        </div>
      </div>
      {/* 3. Layanan kami */}
      <section className="soft">
        <div className="in">
          <SectionHead title="Layanan kami" sub="Lima layanan untuk seluruh siklus pajak perusahaan." />
          <ServiceBoxes />
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link className="btn btn-line" href={routes.services} style={{ color: "var(--navy)" }}>
              Lihat layanan
            </Link>
          </div>
        </div>
      </section>
      {/* 4. Kami paham sektor Anda */}
      <SectorSection />
      {/* 5. Cara kerja */}
      <FlowSection />
      {/* 6. Mengapa TaxPlus? */}
      <WhySection />
      {/* 7. Meet the Pioneer and Partner */}
      <TeamSection />
      {/* 8. Klien & ulasan, with the moving client logos above it */}
      <ClientLogos />
      <ReviewsSection />
      {/* 9. Tentang + FAQ */}
      <section>
        <div className="in about-faq">
          <AboutBox />
          <div className="faq-col">
            <h3>Pertanyaan yang sering diajukan</h3>
            <FaqList items={homeFaqs} />
          </div>
        </div>
      </section>
      {/* 10. Artikel terbaru */}
      <section className="soft">
        <div className="in">
          <SectionHead title="Artikel terbaru" sub="Aturan pajak terbaru, dijelaskan singkat." />
          <div className="art-grid">
            {articles.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={articleCardData(a)} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link className="btn btn-line" href={routes.articles} style={{ color: "var(--navy)" }}>
              Semua artikel
            </Link>
          </div>
        </div>
      </section>
      {/* 11. Dari Instagram kami */}
      <InstagramSection />
      {/* 12. Konsultasi gratis */}
      <ConsultSection />
      {/* 13. Lokasi kantor */}
      <LocationSection />
      {/* 14. Unduh profil kami, then Ikuti kami */}
      <DownloadSection />
      <SocialSection />
    </>
  );
}

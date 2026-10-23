import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { AboutBox, FaqList, faqJsonLd, JsonLd } from "@/components/sections/AboutSection";
import { ConsultSection } from "@/components/sections/ConsultSection";
import { FlowSection } from "@/components/sections/FlowSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { SectionHead } from "@/components/sections/SectionHead";
import { SectorSection } from "@/components/sections/SectorSection";
import { ServiceBoxes } from "@/components/sections/ServiceCards";
import { SocialSection } from "@/components/sections/SocialSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhySection } from "@/components/sections/WhySection";
import { Icon } from "@/components/ui/icons";
import { showStagingContent } from "@/components/ui/StagingNote";
import { articleCardData, articles } from "@/modules/content/articles";
import { homeFaqs } from "@/modules/content/company";
import { routes } from "@/modules/content/navigation";
import { FREE_CONSULT_WA_MESSAGE, licenses, site, whatsappLink } from "@/modules/content/site";

export const metadata = {
  alternates: { canonical: routes.home },
};

/**
 * Hero background video. Set once the MP4 (15–30 s, no sound) and poster from
 * Pak Kalam are in public/video/; until then animated navy shapes stand in.
 */
const heroVideo: { src: string; poster: string } | null = null;

function HeroVideo() {
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
          <a className="btn btn-gold" href={whatsappLink(FREE_CONSULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
            Konsultasi awal gratis &middot; 15 menit
          </a>
          <a
            className="btn btn-line"
            href={whatsappLink("Halo TaxPlus, saya ingin meminta panduan pajak gratis.")}
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
                {licenses.practiceA} &middot; {licenses.practiceB}
              </b>
            </span>
          </div>
          <div className="lic-c">
            <span className="lic-i">
              <Icon name="scale" size={20} strokeWidth={1.8} />
            </span>
            <span className="lic-t">
              <small>Izin Kuasa Hukum Pengadilan Pajak</small>
              <b>{licenses.taxCourt}</b>
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      {/* 1. Hero video */}
      <HeroVideo />
      {/* 2. Angka */}
      <div className="in">
        <div className="stats">
          <div className="stat">
            <b>{site.stats.years}</b>
            <span>tahun pengalaman</span>
          </div>
          <div className="stat">
            <b>{site.stats.clients}</b>
            <span>klien dilayani</span>
          </div>
          <div className="stat">
            <b>{site.rating.score}</b>
            <span>rating Google dari {site.rating.count} ulasan</span>
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
      {/* 8. Klien & ulasan */}
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
      {/* 11. Konsultasi gratis */}
      <ConsultSection />
      {/* 12. Lokasi kantor */}
      <LocationSection />
      {/* 13. Ikuti kami */}
      <SocialSection />
    </>
  );
}

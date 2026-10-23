import { Icon } from "@/components/ui/icons";
import { sectors } from "@/modules/content/company";
import { site, whatsappLink } from "@/modules/content/site";
import { SectionHead } from "./SectionHead";

/** "Kami paham sektor Anda" (navy): client count + button left, sector cards right. */
export function SectorSection() {
  return (
    <section className="dark">
      <div className="in sek-wrap">
        <div className="sek-intro">
          <SectionHead title="Kami paham sektor Anda" sub="Setiap industri punya kebocoran pajaknya sendiri." variant="on-dark" left />
          <div className="big">{site.stats.clients}</div>
          <span>klien dari {site.stats.sectors} sektor usaha</span>
          <a
            className="btn btn-gold"
            style={{ marginTop: 22 }}
            href={whatsappLink("Halo TaxPlus, saya ingin konsultasi pajak untuk sektor usaha saya.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Konsultasi untuk sektor Anda
          </a>
        </div>
        <div className="sek-grid">
          {sectors.map((s) => (
            <div key={s.icon} className={s.featured ? "sek top" : "sek"}>
              <span className="sic">
                <Icon name={s.icon} size={26} />
              </span>
              <div>
                {s.featured && <span className="tag">Unggulan</span>}
                <h3>{s.name}</h3>
                <p>{s.issue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

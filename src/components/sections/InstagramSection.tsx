import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { instagramImage, instagramPostUrl, instagramPosts } from "@/modules/content/instagram";
import { socialProfiles } from "@/modules/content/site";
import { SectionHead } from "./SectionHead";

const dateFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" });

/** "Dari Instagram kami": latest posts, 6×2 grid on desktop, a swipeable row below. */
export function InstagramSection() {
  const ig = socialProfiles.find((p) => p.id === "instagram");
  if (!ig) return null;
  return (
    <section className="ig">
      <div className="in">
        <SectionHead title="Dari Instagram kami" sub="Update aturan pajak dan tips singkat setiap minggu." />
        <ul className="ig-grid">
          {instagramPosts.map((p) => (
            <li key={p.code}>
              <a className="ig-post" href={instagramPostUrl(p.code)} target="_blank" rel="noopener noreferrer">
                <Image src={instagramImage(p.code)} alt={`Post Instagram TaxPlus: ${p.title}`} width={480} height={640} sizes="(max-width: 999px) 46vw, 180px" />
                <span className="ig-ov" aria-hidden="true">
                  <Icon name="instagram" size={20} />
                  <b>{p.title}</b>
                  <time dateTime={p.date}>{dateFmt.format(new Date(`${p.date}T12:00:00+07:00`))}</time>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="ig-cta">
          <a className="btn btn-navy" href={ig.url} target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" size={20} />
            Ikuti {ig.handle}
          </a>
        </div>
      </div>
    </section>
  );
}

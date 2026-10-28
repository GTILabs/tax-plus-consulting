import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { downloadHref } from "@/modules/cms/files";
import { getDownloads } from "@/modules/content/data";
import { SectionHead } from "./SectionHead";

const sizeFmt = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 });

/** "2,6 MB" from 1 MB up, "506 KB" below. */
function fileSize(kb: number) {
  return kb >= 1024 ? `${sizeFmt.format(kb / 1024)} MB` : `${kb} KB`;
}

/** "Unduh profil kami": its own navy band with the documents from the CMS "Unduhan" collection, right before "Ikuti kami". */
export async function DownloadSection() {
  const downloads = (await getDownloads()).flatMap((d) => (d.file && d.cover ? [{ ...d, file: d.file, cover: d.cover }] : []));
  if (downloads.length === 0) return null;
  return (
    <section className="dark dl" id="unduh">
      <div className="in">
        <SectionHead title="Unduh profil kami" sub="Kenali TaxPlus lebih dekat. Gratis, tanpa perlu mendaftar." variant="on-dark" />
        <div className="dl-grid">
          {downloads.map((d) => (
            <a key={d.file.url} className="dl-card" href={downloadHref(d.file.url)} download>
              <span className="dl-cover">
                <Image src={d.cover.src} alt={`Sampul ${d.title}`} width={d.cover.width} height={d.cover.height} sizes="(max-width: 760px) 100vw, 540px" />
              </span>
              <span className="dl-body">
                <b>{d.title}</b>
                {d.text && <span className="dl-text">{d.text}</span>}
                <span className="dl-foot">
                  <span className="dl-meta">
                    <Icon name="doc" size={18} />
                    {["PDF", d.detail, fileSize(d.file.sizeKb)].filter(Boolean).join(" · ")}
                  </span>
                  <span className="btn btn-gold dl-btn">
                    <Icon name="download" size={18} />
                    Unduh PDF
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

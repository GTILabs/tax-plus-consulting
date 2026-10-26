import { getServices, getSite } from "@/modules/content/data";

/** Bordered office profile box. */
export async function AboutBox() {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  return (
    <article className="about-box">
      <span className="ab-badge">Tentang TaxPlus</span>
      <h2>
        Kantor Konsultan Pajak
        <br />
        <span className="ab-mark">di Bandung</span>
      </h2>
      <p>
        <strong>TaxPlus Consulting</strong> adalah kantor konsultan pajak di Bojongsoang, Kabupaten Bandung, yang
        berdiri sejak {site.founded} dan dipimpin oleh Kalam Al-Iqbal, S.Ak., S.H., M.Ak., BKP, pemegang Izin Praktik
        Konsultan Pajak tingkat A dan B serta Izin Kuasa Hukum Pengadilan Pajak.
      </p>
      <p>
        Kami mendampingi <strong>perusahaan, UMKM, dan orang pribadi</strong>, termasuk figur publik, dari sektor
        hiburan dan media, properti, manufaktur, kesehatan, ritel, hingga logistik.
      </p>
      <p>
        Layanan kami mencakup{" "}
        <strong>
          kepatuhan pajak, pembukuan dan laporan keuangan fiskal, perencanaan pajak, pendampingan pemeriksaan, serta
          keberatan dan banding
        </strong>{" "}
        di Pengadilan Pajak.
      </p>
      <div className="about-facts">
        <span>
          <b>2022</b>berdiri
        </span>
        <span>
          <b>
            {site.stats.clients.replace("+", "")}
            <i>+</i>
          </b>
          klien
        </span>
        <span>
          <b>{services.length}</b>lini layanan
        </span>
      </div>
    </article>
  );
}

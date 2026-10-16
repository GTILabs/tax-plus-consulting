import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactOptions } from "@/components/sections/ContactOptions";
import { GoogleG, Stars } from "@/components/ui/icons";
import { ReviewButton } from "@/components/ui/ReviewButton";
import { StagingNote, StagingOnly } from "@/components/ui/StagingNote";
import { routes } from "@/modules/content/navigation";
import { featuredReviews, moreReviews } from "@/modules/content/reviews";
import { mapsEmbedUrl, mapsLink, site } from "@/modules/content/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "TaxPlus Consulting: konsultan pajak berizin di Bandung dengan izin praktik, izin kuasa hukum Pengadilan Pajak, dan advokat PERADI.",
  alternates: { canonical: routes.about },
};

const licenses = [
  {
    highlight: true,
    title: "Izin Praktik Konsultan Pajak (BKP)",
    issuer: "Direktorat Jenderal Pajak · Tingkat A dan B",
    ids: ["KIP-6837/IP.A/PJ/2020", "KP-10818/IP.B/2025"],
    text: "Izin praktik sebagai konsultan pajak dan kuasa wajib pajak. Tingkat B memperluas kewenangan ke wajib pajak badan dengan cakupan yang lebih luas, termasuk penanaman modal asing dan bentuk usaha tetap.",
  },
  {
    highlight: true,
    title: "Izin Kuasa Hukum Pengadilan Pajak",
    issuer: "Sekretariat Pengadilan Pajak · Keputusan 8 November 2025",
    ids: ["1507/PP/IKH/2023"],
    text: "Izin untuk mewakili wajib pajak dalam persidangan di Pengadilan Pajak. Tanpa izin ini, seorang konsultan tidak dapat beracara di ruang sidang.",
  },
  {
    title: "Kartu Advokat PERADI",
    issuer: "Perhimpunan Advokat Indonesia · Terbit Mei 2025 · Berlaku s.d. Mei 2035",
    ids: ["08-02598/PERADI-PKPA/V/25"],
    text: "Profesi advokat, yang memperluas kewenangan pendampingan hukum di luar lingkup perpajakan.",
  },
  {
    title: "Anggota Tetap IKPI",
    issuer: "Ikatan Konsultan Pajak Indonesia · Anggota Tetap A dan B",
    ids: ["No. Anggota 006388"],
    text: "Organisasi profesi konsultan pajak; keanggotaan disertai kewajiban menjaga kode etik dan mengikuti pendidikan berkelanjutan.",
  },
  {
    title: "Brevet A & B",
    issuer: "Universitas Padjadjaran · Terbit November 2019 · Berlaku s.d. April 2035",
    ids: ["15.00754"],
    text: "Sertifikasi kompetensi teknis perpajakan tingkat dasar dan menengah.",
  },
  {
    title: "Sertifikasi Kepabeanan & Cukai",
    issuer: "Direktorat Jenderal Bea dan Cukai · Terbit Januari 2021 · Berlaku s.d. Januari 2035",
    ids: [],
    text: "Kompetensi di bidang kepabeanan dan cukai, relevan untuk klien dengan aktivitas impor dan ekspor.",
  },
];

const education = [
  { degree: "D-III Pajak", school: "Universitas Padjadjaran" },
  { degree: "S-1 Akuntansi", school: "Universitas Widyatama" },
  { degree: "S-1 Ilmu Hukum", school: "Universitas Maranatha" },
  { degree: "S-2 Akuntansi", school: "Universitas Padjadjaran" },
];

const sectors = [
  "Manajemen Talent & Agensi",
  "Properti & Developer",
  "Manufaktur",
  "Kesehatan & Klinik",
  "Perkebunan",
  "Konstruksi & Perizinan",
  "Klub Olahraga",
  "F&B",
  "Fashion & Retail",
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Tentang Kami" }]} />
      <div className="pg-about">
        <header className="ab-hero">
          <div className="gwrap">
            <span className="ab-eb">Tentang Kami</span>
            <h1>Konsultan pajak yang tidak berhenti di meja kantor.</h1>
            <p>
              Berdiri di Bandung, dengan lebih dari sepuluh tahun praktik perpajakan. Klien kami tersebar di
              berbagai kota dan sektor.
            </p>
          </div>
        </header>

        <section className="ab-stats">
          <div className="gwrap">
            <div className="g">
              <div className="c">
                <div className="n">10+</div>
                <div className="l">Tahun praktik</div>
              </div>
              <div className="c">
                <div className="n">50+</div>
                <div className="l">Klien dilayani</div>
              </div>
              <div className="c">
                <div className="n">{site.rating.score}</div>
                <div className="l">Rating Google ({site.rating.count} ulasan)</div>
              </div>
              <div className="c">
                <div className="n">7</div>
                <div className="l">Sektor industri</div>
              </div>
            </div>
          </div>
        </section>

        <section className="ab-sec">
          <div className="gwrap">
            <div className="ab-k">Posisi kami</div>
            <h2>Kami tidak berhenti saat SKP terbit</h2>
            <p className="ab-p">
              Kebanyakan konsultan berhenti ketika Surat Ketetapan Pajak terbit, karena mewakili klien di
              pengadilan butuh izin berbeda. Di situlah klien harus mencari pihak baru dan mengulang cerita
              dari awal.
            </p>
            <p className="ab-p">
              TaxPlus dibangun untuk menutup jarak itu.{" "}
              <b>
                Managing Partner kami memegang Izin Praktik Konsultan Pajak, Izin Kuasa Hukum Pengadilan
                Pajak, dan Kartu Advokat PERADI sekaligus
              </b>{" "}
              &mdash; sehingga satu perkara dapat didampingi dari surat pertama sampai Peninjauan Kembali di
              Mahkamah Agung, oleh orang yang sama.
            </p>
            <p className="ab-p">
              Efeknya pada cara kerja: pembukuan kami susun sambil membayangkan bagaimana ia akan
              dipertanyakan, dan perencanaan pajak hanya kami tawarkan bila sanggup kami pertahankan di ruang
              sidang.
            </p>
          </div>
        </section>

        <section className="ab-sec tintb">
          <div className="gwrap">
            <div className="ab-k">Managing Partner</div>
            <h2>Kalam Al-Iqbal</h2>
            <div className="ab-prof" style={{ marginTop: 22 }}>
              <div className="ab-photo has-img">
                <Image
                  src="/images/photos/kalam-al-iqbal.jpg"
                  alt="Kalam Al-Iqbal, Managing Partner TaxPlus Consulting"
                  width={900}
                  height={1200}
                  sizes="(max-width: 820px) 100vw, 300px"
                />
              </div>
              <div>
                <h3>Kalam Al-Iqbal, S.Ak., S.H., M.Ak., BKP</h3>
                <div className="role">
                  Managing Partner &mdash; Konsultan Pajak &amp; Kuasa Hukum Pengadilan Pajak
                </div>
                <p className="ab-p" style={{ marginBottom: 0 }}>
                  Berlatar akuntansi sekaligus hukum. Kombinasi itu yang membuat angka dan argumen hukum
                  disusun dalam satu tangan &mdash; dari kepatuhan rutin sampai sengketa di Mahkamah Agung.
                </p>
                <div className="ab-edu">
                  {education.map((e) => (
                    <div key={e.degree}>
                      <b>{e.degree}</b>
                      {e.school}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ab-sec">
          <div className="gwrap">
            <div className="ab-k">Izin &amp; keanggotaan profesi</div>
            <h2>Tiga izin, tiga kewenangan berbeda</h2>
            <p className="ab-sub">
              Perbedaannya menentukan sampai tahap mana seorang konsultan boleh mewakili Anda.
            </p>
            <div className="ab-lic">
              {licenses.map((lic) => (
                <div className={lic.highlight ? "ab-card hl" : "ab-card"} key={lic.title}>
                  <div className="t">{lic.title}</div>
                  <div className="iss">{lic.issuer}</div>
                  {lic.ids.length > 0 ? (
                    lic.ids.map((id, i) => (
                      <span className="id" key={id} style={i > 0 ? { marginLeft: 6 } : undefined}>
                        {id}
                      </span>
                    ))
                  ) : (
                    <StagingOnly>
                      <span className="id" style={{ color: "#9AA3B5" }}>
                        Nomor kredensial &mdash; untuk dilengkapi
                      </span>
                    </StagingOnly>
                  )}
                  <div className="d">{lic.text}</div>
                </div>
              ))}
            </div>
            <StagingNote className="ab-note">
              <b>Koreksi dari halaman lama.</b> Nomor <i>KIP-6837/IP.A/PJ/2020</i> sebelumnya dicantumkan
              sebagai sertifikasi IKPI, padahal itu Izin Praktik dari Direktorat Jenderal Pajak &mdash; kini
              dilengkapi izin tingkat B <i>KP-10818/IP.B/2025</i>. Izin Kuasa Hukum sebelumnya dicantumkan
              sebagai sertifikasi Mahkamah Agung dan memakai nomor lama; kini diperbarui ke{" "}
              <i>1507/PP/IKH/2023</i>. Tinggal nomor kredensial Bea Cukai yang perlu dilengkapi.
            </StagingNote>
          </div>
        </section>

        <section className="ab-sec tintb" id="legalitas">
          <div className="gwrap">
            <div className="ab-k">Legalitas perusahaan</div>
            <h2>Legalitas yang bisa Anda cek sendiri</h2>
            <p className="ab-sub">Nomornya kami cantumkan, bukan sekadar menyebut diri resmi.</p>
            <table className="ab-legal">
              <tbody>
                <tr>
                  <th>Dokumen</th>
                  <th>Keterangan</th>
                </tr>
                <tr>
                  <td>Akta Pendirian</td>
                  <td>
                    Nomor 01, tanggal 18 Agustus 2022
                    <br />
                    Notaris Diana Roselina, S.H., M.Kn.
                  </td>
                </tr>
                <tr>
                  <td>Surat Keterangan Terdaftar Kemenkumham</td>
                  <td>
                    Tanggal 25 Agustus 2022 &middot; Bidang jasa konsultan pajak
                    <StagingOnly>
                      <br />
                      <span style={{ color: "#A8452F" }}>Nomor SKT &mdash; untuk dilengkapi</span>
                    </StagingOnly>
                  </td>
                </tr>
                <tr>
                  <td>Nomor Induk Berusaha (NIB)</td>
                  <td>
                    1609220272616
                    <br />
                    KBLI 69201 dan 69202 &mdash; aktivitas konsultan pajak serta akuntansi, pembukuan, dan
                    pemeriksa
                  </td>
                </tr>
                <tr>
                  <td>Alamat kantor</td>
                  <td>
                    Jl. Cherry Field, Cipagalo, Kec. Bojongsoang,
                    <br />
                    Kabupaten Bandung, Jawa Barat 40287
                  </td>
                </tr>
              </tbody>
            </table>
            <StagingOnly>
              <div className="ab-doc">
                <div>Pindaian Akta Pendirian</div>
                <div>Pindaian NIB</div>
                <div>Pindaian Izin Praktik &amp; Kuasa Hukum</div>
              </div>
            </StagingOnly>
            <StagingNote className="ab-note">
              <b>Perlu dikoreksi.</b> Di halaman Legalitas yang sekarang, kolom <i>Nomor</i> pada Surat
              Keterangan Terdaftar Kemenkumham terisi nama notaris, bukan nomor surat. Mohon dilengkapi dengan
              nomor yang benar.
            </StagingNote>
          </div>
        </section>

        <section className="ab-sec">
          <div className="gwrap">
            <div className="ab-k">Tim</div>
            <h2>Siapa yang mengerjakan punya Anda</h2>
            <p className="ab-sub">
              Satu PIC tetap per klien, dengan Reviewer yang memeriksa ulang sebelum apa pun dilaporkan.
            </p>
            <figure className="ab-figure">
              <Image
                src="/images/photos/team.jpg"
                alt="Tim TaxPlus Consulting di kantor Bandung"
                width={1600}
                height={1064}
                sizes="(max-width: 1120px) 100vw, 1076px"
              />
              <figcaption>Tim TaxPlus Consulting di kantor kami, Bandung.</figcaption>
            </figure>
            <StagingNote className="ab-note">
              <b>Untuk diisi.</b> Cukup nama dan peran, tanpa gelar panjang. Menampilkan tim menjawab
              kekhawatiran yang jarang ditanyakan calon klien secara terbuka: &ldquo;kalau Managing
              Partner-nya sibuk, siapa yang mengerjakan punya saya?&rdquo;
            </StagingNote>
          </div>
        </section>

        <section className="ab-sec tintb">
          <div className="gwrap">
            <div className="ab-k">Pengalaman sektor</div>
            <h2>Sektor yang kami tangani</h2>
            <p className="ab-sub">
              Sektor yang benar-benar ada dalam portofolio kami. Hiburan dan industri kreatif yang terbesar.
            </p>
            <div className="ab-chips">
              <span className="ab-chip">
                Hiburan &amp; Media <i>terbesar</i>
              </span>
              {sectors.map((s) => (
                <span className="ab-chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <StagingNote className="ab-note">
              <b>Catatan.</b> Halaman <i>Experience Services</i> yang sekarang menampilkan persentase tanpa
              angka dasar &mdash; misalnya &ldquo;Banding di Pengadilan Pajak 50%&rdquo; &mdash; yang justru
              terbaca seolah jumlah perkaranya sangat sedikit. Daftar sektor tanpa persentase lebih kuat dan
              lebih jujur.
            </StagingNote>
          </div>
        </section>

        <section className="ab-sec">
          <div className="gwrap">
            <div className="ab-k">Kata klien</div>
            <h2>
              {site.rating.score} dari {site.rating.count} ulasan di Google
            </h2>
            <p className="ab-sub">Diambil langsung dari Google Business Profile kami, jadi bisa Anda cek sendiri.</p>
            <div className="ab-rev">
              {[...featuredReviews, ...moreReviews].map((r) => (
                <figure className="ab-rc" key={r.author}>
                  <Stars className="st" />
                  <blockquote>
                    <p>&ldquo;{r.text}&rdquo;</p>
                  </blockquote>
                  <figcaption className="who">
                    {r.author}
                    <span>Ulasan Google</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="revmore">
              <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer">
                <GoogleG /> Baca semua {site.rating.count} ulasan di Google
              </a>
            </p>
          </div>
        </section>

        <section className="ab-sec tintb" id="rvcta">
          <div className="gwrap">
            <div className="rvbar">
              <div>
                <div className="k2">Untuk klien kami</div>
                <h3>Pernah kami bantu? Ceritakan di Google</h3>
                <p>
                  Satu ulasan jujur dari Anda menolong pemilik usaha lain yang sedang mencari konsultan dan
                  tidak tahu harus percaya siapa. Cukup dua kalimat.
                </p>
              </div>
              <div>
                <ReviewButton className="b" />
              </div>
            </div>
            <StagingNote className="ab-note">
              <b>Untuk pengelola web.</b> Tautkan tombol ini ke <i>link ulasan langsung</i> dari Google
              Business Profile (Kelola Profil &rarr; Minta ulasan), supaya pengunjung langsung masuk ke kotak
              tulis ulasan. Pasang tautan yang sama di tanda tangan email dan di pesan penutup setiap
              pekerjaan yang selesai &mdash; hanya ke klien, tanpa imbalan apa pun. Itu satu-satunya cara
              menambah ulasan yang tidak melanggar kebijakan Google.
            </StagingNote>
          </div>
        </section>

        <section className="ab-sec tintb">
          <div className="gwrap">
            <div className="ab-k">Kantor kami</div>
            <h2>Kantor kami</h2>
            <p className="ab-sub">
              {site.contact.addressFull} &middot; {site.contact.hours}
            </p>
            <div className="ab-office">
              <figure className="ab-figure">
                <Image
                  src="/images/photos/office-front.jpg"
                  alt="Tampak depan kantor TaxPlus Consulting"
                  width={1400}
                  height={1052}
                  sizes="(max-width: 860px) 100vw, 350px"
                />
                <figcaption>Tampak depan kantor</figcaption>
              </figure>
              <figure className="ab-figure">
                <Image
                  src="/images/photos/office-reception.jpg"
                  alt="Ruang tunggu kantor TaxPlus Consulting"
                  width={1400}
                  height={782}
                  sizes="(max-width: 860px) 100vw, 350px"
                />
                <figcaption>Ruang tunggu &amp; konsultasi</figcaption>
              </figure>
              <figure className="ab-figure ab-map">
                <iframe
                  src={mapsEmbedUrl}
                  title="Peta lokasi kantor TaxPlus Consulting"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <figcaption>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                    Buka di Google Maps &rarr;
                  </a>
                </figcaption>
              </figure>
            </div>
            <StagingNote className="ab-note">
              <b>Penting untuk SEO lokal.</b> Peta tersemat dan foto kantor asli adalah dua sinyal yang paling
              sering hilang di situs kantor jasa profesional, padahal keduanya memengaruhi peringkat Google
              Maps dan tingkat kepercayaan pengunjung.
            </StagingNote>
          </div>
        </section>

        <section className="ab-sec">
          <div className="gwrap">
            <div className="ab-cta">
              <div>
                <h3>Ceritakan dulu masalahnya</h3>
                <p>15 menit, tanpa biaya. Kami tidak menawarkan paket sebelum tahu kondisi Anda.</p>
                <Link className="ab-btn" href={routes.services}>
                  Lihat layanan kami
                </Link>
              </div>
              <div className="row">
                <ContactOptions />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

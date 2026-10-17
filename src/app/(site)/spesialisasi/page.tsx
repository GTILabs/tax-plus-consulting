import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ConsultLink } from "@/components/sections/ConsultLink";
import { Check } from "@/components/ui/icons";
import { StagingNote } from "@/components/ui/StagingNote";
import { routes } from "@/modules/content/navigation";

export const metadata: Metadata = {
  title: "Spesialisasi",
  description:
    "Sektor yang kami tangani: hiburan & kreator, properti, manufaktur, manajemen talent, kesehatan, serta F&B, fashion & retail.",
  alternates: { canonical: routes.specialization },
};

const mainSectors = [
  {
    tag: "Portofolio terbesar",
    title: "Hiburan, Media & Kreator",
    text: "Production house, label musik, dan kreator dengan penghasilan dari banyak sumber.",
    issues: [
      "Fee yang tidak dipotong oleh brand, sehingga muncul PPh Pasal 29 besar di akhir tahun",
      "Barang endorse yang tidak dinilai dan tidak dilaporkan sebagai penghasilan",
      "Penghasilan dari platform luar negeri dan perlakuan pajaknya",
    ],
  },
  {
    tag: "Portofolio besar",
    title: "Properti & Developer",
    text: "Pengembang perumahan dan properti komersial.",
    issues: [
      "Saat terutangnya penghasilan atas unit yang belum diserahkan",
      "PPh final pengalihan hak atas tanah dan bangunan serta pemungutannya",
      "Selisih antara uang muka pembeli dan omzet yang diakui di SPT",
    ],
  },
  {
    title: "Manufaktur & Industri",
    text: "Pabrik dan industri pengolahan dengan persediaan dan aset besar.",
    issues: [
      "Perhitungan harga pokok penjualan dan pencatatan persediaan",
      "Restitusi PPN dan kesiapan menghadapi pemeriksaannya",
      "Penyusutan fiskal yang berbeda dari penyusutan komersial",
    ],
  },
  {
    title: "Manajemen Talent & Agensi",
    text: "Manajemen artis, agensi kreatif, dan event organizer.",
    issues: [
      "Dana talent tercatat sebagai omzet agensi, sehingga omzet membengkak semu",
      "Kewajiban memotong PPh 21 dan PPh 23 atas talent dan vendor produksi",
      "Penghasilan proyek yang diakui berbeda antara pembukuan dan SPT",
    ],
  },
  {
    title: "Kesehatan & Klinik",
    text: "Klinik, laboratorium, dan praktik bersama.",
    issues: [
      "Pemotongan atas jasa dokter dan perbedaan status hubungan kerjanya",
      "Selisih antara pembayaran jasa medis dan bukti potong yang dilaporkan",
      "Pembukuan klinik multi-cabang yang tidak terkonsolidasi",
    ],
  },
  {
    title: "F&B, Fashion & Retail",
    text: "Restoran, kafe, brand pakaian, dan penjual daring.",
    issues: [
      "Omzet aplikasi, QRIS, dan marketplace yang tidak direkonsiliasi dengan setoran bank",
      "Hubungan PB1 restoran dengan PPh Badan yang sering disalahpahami",
      "Pemotongan atas kerja sama endorse dan afiliasi",
    ],
  },
];

const otherSectors = [
  "Perkebunan",
  "Konstruksi & Perizinan",
  "Klub Olahraga",
  "Pelayaran & Logistik",
  "Arsitektur & Konsultan",
  "Orang Pribadi Berpenghasilan Tinggi",
];

const trackRecord = [
  {
    title: "Pemeriksaan & keberatan",
    caption: "Tahap pengawasan sampai sebelum pengadilan",
    items: [
      "Pemeriksaan seluruh jenis pajak untuk wajib pajak badan",
      "Pemeriksaan atas permohonan restitusi PPN",
      "Keberatan atas koreksi Pajak Penghasilan",
      "Pemeriksaan dan keberatan wajib pajak orang pribadi",
      "Pemeriksaan bukti permulaan wajib pajak orang pribadi",
    ],
  },
  {
    title: "Sengketa di pengadilan",
    caption: "Diwakili kuasa hukum berizin",
    items: ["Banding di Pengadilan Pajak", "Gugatan atas tindakan penagihan", "Peninjauan Kembali di Mahkamah Agung"],
    footnote:
      "Mewakili wajib pajak dalam persidangan memerlukan Izin Kuasa Hukum Pengadilan Pajak — izin yang terpisah dari izin praktik konsultan pajak.",
  },
];

export default function SpecializationPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Spesialisasi" }]} />
      <div className="pg-spec">
        <header className="sp-hero">
          <div className="gwrap">
            <span className="sp-eb">Spesialisasi</span>
            <h1>Setiap industri punya kebocoran pajaknya sendiri.</h1>
            <p>
              Aturannya sama untuk semua. Yang berbeda adalah di mana masalahnya biasanya muncul &mdash; dan itu hanya
              diketahui dari pengalaman.
            </p>
          </div>
        </header>

        <section className="sp-sec">
          <div className="gwrap">
            <div className="sp-k">Mengapa ini penting</div>
            <h2>Belajar di sektor Anda, dengan biaya Anda</h2>
            <p className="sp-p">
              Bedanya bukan pada hafalan undang-undang, tapi pada apa yang ditanyakan di pertemuan pertama. Konsultan
              yang rutin menangani manajemen artis langsung menanyakan pemisahan dana talent dari omzet agensi. Yang
              belum pernah, baru tahu ketika pemeriksa yang menanyakan.
            </p>
            <p className="sp-p">
              <b>Daftar di bawah ini nyata</b> &mdash; bukan dipanjangkan agar terlihat serba bisa.
            </p>
          </div>
        </section>

        <section className="sp-sec tintb">
          <div className="gwrap">
            <div className="sp-k">Sektor utama</div>
            <h2>Enam sektor utama kami</h2>
            <p className="sp-sub">Klik untuk melihat isu khas tiap sektor.</p>
            <div className="sp-grid">
              {mainSectors.map((s) => (
                <ConsultLink className="sp-card" key={s.title}>
                  {s.tag && <span className="tag">{s.tag}</span>}
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <div className="lbl">Isu yang paling sering muncul</div>
                  <ul>
                    {s.issues.map((issue) => (
                      <li key={issue}>
                        <i />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="go">Bicarakan sektor ini &rarr;</span>
                </ConsultLink>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-sec">
          <div className="gwrap">
            <div className="sp-k">Sektor lain dalam portofolio</div>
            <h2>Kami juga menangani</h2>
            <div className="sp-chips">
              {otherSectors.map((s) => (
                <span className="sp-chip" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-sec tintb">
          <div className="gwrap">
            <div className="sp-k">Rekam jejak</div>
            <h2>Perkara yang pernah kami tangani</h2>
            <p className="sp-sub">Daftar, bukan persentase &mdash; karena persentase tanpa angka dasar tidak berarti apa-apa.</p>
            <div className="sp-track">
              {trackRecord.map((t) => (
                <div className="sp-tb" key={t.title}>
                  <h4>{t.title}</h4>
                  <div className="cap">{t.caption}</div>
                  <ul>
                    {t.items.map((item) => (
                      <li key={item}>
                        <Check />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {t.footnote && (
                    <div
                      style={{
                        marginTop: 18,
                        paddingTop: 15,
                        borderTop: "1px solid var(--line)",
                        fontSize: 14.3,
                        lineHeight: 1.6,
                        color: "var(--body)",
                      }}
                    >
                      {t.footnote}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <StagingNote className="sp-note">
              <b>Untuk dilengkapi.</b> Bila Anda memiliki angka yang dapat dipertanggungjawabkan &mdash; misalnya jumlah
              perkara banding yang pernah ditangani, atau nilai koreksi yang berhasil diturunkan &mdash; cantumkan di
              sini. Angka nyata jauh lebih kuat daripada daftar. Yang tidak boleh dilakukan adalah menampilkan persentase
              seperti &ldquo;Banding 50%&rdquo; tanpa menyebut dari berapa perkara.
            </StagingNote>
          </div>
        </section>

        <section className="sp-sec">
          <div className="gwrap">
            <div className="sp-cta">
              <div>
                <h3>Sektor Anda tidak ada di daftar?</h3>
                <p>
                  Ceritakan jenis usaha dan masalah Anda. Kalau memang bukan bidang kami, kami katakan sejak awal.
                </p>
                <div className="cta-pair">
                  <ConsultLink className="sp-btn">Jadwalkan konsultasi gratis</ConsultLink>
                  <Link className="cta-sec" href={routes.services}>
                    Lihat layanan kami &rarr;
                  </Link>
                </div>
              </div>
              <div className="row">
                <ConsultLink className="op">
                  <b>Konsultasi gratis 15 menit</b>
                  <span>Tanpa biaya dan tanpa komitmen.</span>
                </ConsultLink>
                <Link className="op" href="/#unduh">
                  <b>Unduh panduan sektor Anda</b>
                  <span>Tiga kebocoran pajak yang paling sering terjadi di bisnis seperti milik Anda.</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

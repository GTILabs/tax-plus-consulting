import Image from "next/image";
import Link from "next/link";
import { ConsultationForm } from "@/components/home/ConsultationForm";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowDown, ArrowRight, ContactIcon, ServiceIcon, Stars } from "@/components/ui/icons";
import { ReviewButton } from "@/components/ui/ReviewButton";
import { StagingNote } from "@/components/ui/StagingNote";
import { articles } from "@/modules/content/articles";
import { routes } from "@/modules/content/navigation";
import { services } from "@/modules/content/services";
import { mailtoLink, site, whatsappLink } from "@/modules/content/site";

const painPoints = [
  {
    tag: "Surat dari KPP",
    title: "Menerima SP2DK",
    text: "Ada permintaan penjelasan atas data yang berbeda dengan SPT Anda, dan tenggatnya dekat.",
    service: "tax-audit",
  },
  {
    tag: "Pemeriksaan",
    title: "Ditetapkan diperiksa",
    text: "Perlu menyiapkan dokumen dan menghadapi pemeriksa tanpa salah langkah.",
    service: "tax-audit",
  },
  {
    tag: "SPT Tahunan",
    title: "Muncul kurang bayar besar",
    text: "Pajak sudah dipotong pemberi kerja, tetapi tetap timbul PPh Pasal 29 yang harus disetor.",
    service: "tax-management",
  },
  {
    tag: "Pertumbuhan usaha",
    title: "Omzet melewati Rp4,8 miliar",
    text: "Status PKP, kewajiban PPN, dan perubahan skema pajak setelah PP 20/2026.",
    service: "tax-management",
  },
  {
    tag: "Industri kreatif",
    title: "Pajak endorse & royalti",
    text: "Fee yang tidak dipotong brand, barang endorse, dan pemasukan platform luar negeri.",
    service: "tax-management",
  },
  {
    tag: "Pembukuan",
    title: "Laporan tidak siap diperiksa",
    text: "Catatan berantakan, biaya tanpa bukti, laba fiskal membengkak tanpa alasan.",
    service: "tax-accounting",
  },
];

const sectors = [
  {
    featured: true,
    title: "Hiburan, Media & Kreator",
    text: "Manajemen artis, production house, label musik, dan influencer — PPh honor, royalti, barang endorse, dan pemasukan platform.",
  },
  {
    featured: true,
    title: "Manajemen Talent & Agensi",
    text: "Pemisahan dana talent dari omzet agensi, kewajiban pemotongan PPh 21 dan PPh 23 atas vendor produksi.",
  },
  {
    title: "Manufaktur & Industri",
    text: "Harga pokok penjualan, restitusi PPN, dan penyusutan fiskal atas aset produksi.",
  },
  {
    title: "F&B, Fashion & Retail",
    text: "Omzet aplikasi, QRIS, dan marketplace yang tidak terekonsiliasi dengan setoran bank.",
  },
  {
    title: "Kesehatan & Klinik",
    text: "Perpajakan tenaga medis, pemotongan atas jasa dokter, dan pembukuan klinik multi-cabang.",
  },
  {
    title: "Properti & Developer",
    text: "Saat terutangnya penghasilan atas unit yang belum diserahkan, dan PPh final pengalihan hak.",
  },
];

const reviews = [
  {
    quote:
      "Responsif dan detail. Proses pemeriksaan kami berjalan jauh lebih tenang karena semua dokumen sudah disiapkan sejak awal.",
    who: "Klien sektor manufaktur",
  },
  {
    quote:
      "Penjelasannya mudah dipahami untuk orang yang bukan orang pajak. Kami jadi tahu apa yang sebenarnya kami bayar.",
    who: "Klien sektor F&B",
  },
  {
    quote: "Sangat membantu untuk urusan pajak talent dan royalti. Tim lain sebelumnya tidak sedetail ini.",
    who: "Klien industri hiburan",
  },
];

const sectorChips = [
  "Entertainment & Media",
  "Manufaktur & Industri",
  "Properti & Developer",
  "Kesehatan",
  "Pelayaran & Logistik",
  "Fashion & Retail",
  "F&B",
];

const guides = [
  "Manajemen Kreator & Talent",
  "Bisnis F&B",
  "Brand Fashion & Retail",
  "Perusahaan Manajemen & Agensi",
];

const steps = [
  {
    title: "Konsultasi awal — gratis",
    text: "15 menit, daring atau tatap muka. Kami petakan risiko Anda saat ini.",
  },
  { title: "Analisis & rekomendasi", text: "Simulasi angka dari data Anda, lengkap dengan dasar hukumnya." },
  {
    title: "Pendampingan berkelanjutan",
    text: "Dikerjakan, dilaporkan, dan dipantau. Anda terima laporan status berkala.",
  },
];

const faqs = [
  {
    question: "Saya menerima SP2DK. Apakah itu berarti saya diperiksa?",
    answer:
      "Belum tentu. SP2DK adalah permintaan penjelasan atas data yang berbeda dengan SPT Anda, dan masih berada di tahap pengawasan — bukan pemeriksaan. Tetapi tanggapan yang keliru atau terlambat dapat membuatnya berlanjut menjadi pemeriksaan. Karena itu tanggapan pertama sangat menentukan.",
  },
  {
    question: "Berapa biaya jasa konsultan pajak, dan apakah sepadan?",
    answer:
      "Biaya disesuaikan dengan jumlah entitas, jenis pajak, dan volume transaksi. Sebagai pembanding: denda keterlambatan lapor SPT Badan saja Rp1.000.000 per SPT, sementara kurang bayar yang ditemukan lewat pemeriksaan dikenai bunga hingga 24 bulan. Kami sampaikan estimasi biaya di konsultasi awal, sebelum ada komitmen apa pun.",
  },
  {
    question: "Pajak saya sudah dipotong kantor. Kenapa masih muncul kurang bayar?",
    answer:
      "Karena pemberi kerja hanya menghitung penghasilan yang ia bayarkan sendiri. Bila Anda punya penghasilan lain — usaha sampingan, honor, sewa, royalti — seluruhnya wajib digabung di SPT Tahunan dan dihitung ulang dengan tarif progresif hingga 35%. Selisihnya menjadi PPh Pasal 29 yang harus disetor sendiri sebelum SPT dilaporkan.",
  },
  {
    question: "Apakah TaxPlus bisa mewakili saya di Pengadilan Pajak?",
    answer:
      "Bisa. Managing Partner kami memegang Izin Kuasa Hukum Pengadilan Pajak No. 1507/PP/IKH/2023 dan Kartu Advokat PERADI, sehingga dapat bertindak sebagai kuasa hukum untuk keberatan, banding, maupun gugatan.",
  },
  {
    question: "Klien saya di luar Bandung. Apakah tetap bisa dilayani?",
    answer:
      "Bisa. Kantor kami di Bandung, tetapi klien kami tersebar di berbagai kota. Seluruh administrasi perpajakan kini berjalan lewat Coretax, dan koordinasi dilakukan daring dengan laporan status berkala.",
  },
];

export default function HomePage() {
  return (
    <div className="pg-home">
      <header className="hero">
        <div className="wrap">
          <div className="grid">
            <div>
              <span className="eyebrow">Konsultan Pajak Berizin &middot; Bandung</span>
              <h1>
                Konsultan Pajak Bandung.
                <br />
                Dari lapor bulanan sampai ruang sidang.
              </h1>
              <p className="lead">
                Berizin, berpengalaman, dan tidak berhenti ketika perkara masuk pengadilan.
              </p>
              <div className="acts">
                <a className="btn btn-y" href="#kontak">
                  Konsultasi awal gratis &middot; 15 menit
                </a>
                <a className="btn btn-o" href="#unduh">
                  Unduh panduan gratis
                </a>
              </div>
              <div className="rev">
                <Stars className="stars" /> <b style={{ color: "#fff" }}>{site.rating.score}</b> dari{" "}
                {site.rating.count} ulasan Google
              </div>
            </div>
            <div className="hcard">
              <div className="t">Ditangani Langsung Oleh</div>
              <div className="who">
                <Image
                  src="/images/photos/kalam-al-iqbal-avatar.jpg"
                  alt="Kalam Al-Iqbal"
                  width={256}
                  height={256}
                  sizes="64px"
                  priority
                />
                <div>
                  <h3>Kalam Al-Iqbal</h3>
                  <div className="deg">S.Ak., S.H., M.Ak., BKP &mdash; Managing Partner</div>
                </div>
              </div>
              <ul>
                <li>
                  <span className="dot" />
                  <div>
                    <b>Izin Praktik Konsultan Pajak</b>
                    <span>BKP tingkat A &amp; B</span>
                  </div>
                </li>
                <li>
                  <span className="dot" />
                  <div>
                    <b>Kuasa Hukum Pengadilan Pajak</b>
                    <span>1507/PP/IKH/2023</span>
                  </div>
                </li>
                <li>
                  <span className="dot" />
                  <div>
                    <b>Advokat PERADI</b>
                    <span>08-02598/PERADI-PKPA/V/25</span>
                  </div>
                </li>
                <li>
                  <span className="dot" />
                  <div>
                    <b>Anggota Tetap IKPI</b>
                    <span>No. Anggota 006388</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="creds">
            <span>
              <b>10+</b> tahun praktik
            </span>
            <span>
              <b>6</b> izin, sertifikasi &amp; keanggotaan profesi
            </span>
            <span>
              <b>10</b> sektor industri
            </span>
            <span>
              <b>Bandung</b> &middot; melayani klien se-Indonesia
            </span>
          </div>
        </div>
      </header>

      <section className="stats">
        <div className="wrap">
          <div className="g">
            <div className="c">
              <div className="n">10+</div>
              <div className="l">Tahun pengalaman</div>
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
              <div className="n">24 jam</div>
              <div className="l">Komitmen waktu respons</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="k">Masalah yang sering muncul</div>
            <h2>Mana yang sedang Anda alami?</h2>
            <p>Hampir semua kasus kami berawal dari salah satu situasi ini.</p>
          </div>
          <div className="pain">
            {painPoints.map((p) => (
              <Link className="pcard" key={p.title} href={routes.service(p.service)}>
                <div className="q">{p.tag}</div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-tint" id="layanan">
        <div className="wrap">
          <div className="sec-head">
            <div className="k">Layanan kami</div>
            <h2>Lima layanan, satu siklus penuh</h2>
            <p>Satu kantor, satu PIC, dari kepatuhan rutin sampai pengadilan.</p>
          </div>
          <div className="svc">
            {services.map((s) => (
              <Link className="scard" key={s.slug} href={routes.service(s.slug)}>
                <div className="ico">
                  <ServiceIcon name={s.icon} />
                </div>
                <h3>{s.name}</h3>
                <p>{s.homeSummary}</p>
                <span className="more">
                  Selengkapnya <ArrowRight />
                </span>
              </Link>
            ))}
            <div className="scard" style={{ background: "var(--navy)", borderColor: "var(--navy)" }}>
              <div className="ico" style={{ background: "var(--yel)" }}>
                <ServiceIcon name="spark" style={{ stroke: "var(--navy)" }} />
              </div>
              <h3 style={{ color: "#fff" }}>Cara kami bekerja</h3>
              <p style={{ color: "#B9C6E0" }}>
                Respons dalam 24 jam &middot; Satu PIC khusus per klien &middot; Laporan status berkala lewat
                dashboard monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec niche" id="spesialisasi">
        <div className="wrap">
          <div className="sec-head">
            <div className="k">Yang membedakan kami</div>
            <h2>Kami paham sektor Anda</h2>
            <p>Setiap industri punya kebocoran pajaknya sendiri.</p>
          </div>
          <div className="ngrid">
            {sectors.map((s) => (
              <Link className="ncard" key={s.title} href={routes.specialization}>
                {s.featured && <span className="tag">Unggulan</span>}
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="bukti">
        <div className="wrap">
          <div className="sec-head" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            <div className="k">Kata klien kami</div>
            <h2>
              {site.rating.score} dari {site.rating.count} ulasan di Google
            </h2>
            <p>Dari berbagai sektor, di berbagai kota.</p>
          </div>
          <div className="revs">
            {reviews.map((r) => (
              <div className="rcard" key={r.who}>
                <Stars className="s" />
                <p>&ldquo;{r.quote}&rdquo;</p>
                <div className="who">
                  &mdash; {r.who}
                  <span>Ulasan Google</span>
                </div>
              </div>
            ))}
          </div>
          <div className="sect-logos">
            {sectorChips.map((chip) => (
              <span className="slog" key={chip}>
                {chip}
              </span>
            ))}
          </div>
          <StagingNote className="tag-note">
            <b>Catatan untuk tim:</b> ganti tiga kutipan di atas dengan ulasan Google asli (salin teks + nama
            depan penulisnya). Ulasan nyata yang bisa dicek jauh lebih meyakinkan daripada kutipan umum.
          </StagingNote>
        </div>
      </section>

      <section className="sec sec-tint" id="unduh">
        <div className="wrap">
          <div className="mag">
            <div>
              <span className="eyebrow">Gratis &middot; tanpa biaya</span>
              <h3 style={{ marginTop: 14 }}>3 Kebocoran Pajak di Bisnis Anda</h3>
              <p>
                Satu halaman, tiga kesalahan paling umum di sektor Anda, dan cara membetulkannya. Pilih yang
                sesuai.
              </p>
              <a className="btn btn-n" href="#kontak">
                Minta panduannya
              </a>
            </div>
            <div className="mlist">
              {guides.map((g, i) => (
                <a className="mitem" key={g} href="#kontak">
                  <span className="n">{String(i + 1).padStart(2, "0")}</span> {g}{" "}
                  <span className="ar">
                    <ArrowDown />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="k">Cara kerja</div>
            <h2>Tiga langkah, tanpa komitmen</h2>
          </div>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="num">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-tint" id="artikel">
        <div className="wrap">
          <div className="sec-head">
            <div className="k">Artikel &amp; wawasan</div>
            <h2>Pajak, dijelaskan tanpa berbelit</h2>
            <p>Ditulis konsultan berizin, bukan salinan peraturan.</p>
          </div>
          <div className="arts">
            {articles.slice(0, 3).map((a) => (
              <Link className="acard" key={a.slug} href={routes.article(a.slug)}>
                <div className="thumb">
                  <span>{a.thumbLabel}</span>
                </div>
                <div className="bd">
                  <h4>{a.title}</h4>
                  <p>{a.excerpt}</p>
                  <div className="meta">{a.readingMinutes} menit baca</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head" style={{ margin: "0 auto 30px", textAlign: "center" }}>
            <div className="k">FAQ</div>
            <h2>Pertanyaan yang sering muncul</h2>
          </div>
          <div className="faq">
            <Accordion items={faqs} itemClassName="fitem" buttonClassName="hfq" answerClassName="fa" />
          </div>
        </div>
      </section>

      <section className="sec kontak" id="kontak">
        <div className="wrap">
          <div className="kgrid">
            <div>
              <span className="eyebrow">Konsultasi awal gratis</span>
              <h2 style={{ marginTop: 15 }}>Ceritakan dulu masalahnya. Solusinya belakangan.</h2>
              <p className="p">
                Kami tidak menawarkan paket sebelum memahami kondisi Anda. Konsultasi pertama 15 menit, tanpa
                biaya dan tanpa komitmen.
              </p>
              <div className="kinfo">
                <div className="krow">
                  <div className="ic">
                    <ContactIcon name="phone" />
                  </div>
                  <div>
                    <div className="lb">WhatsApp</div>
                    <div className="vl">
                      <a href={whatsappLink()}>{site.contact.whatsappDisplay}</a>
                    </div>
                  </div>
                </div>
                <div className="krow">
                  <div className="ic">
                    <ContactIcon name="mail" />
                  </div>
                  <div>
                    <div className="lb">Email</div>
                    <div className="vl">
                      <a href={mailtoLink()}>{site.contact.email}</a>
                    </div>
                  </div>
                </div>
                <div className="krow">
                  <div className="ic">
                    <ContactIcon name="pin" />
                  </div>
                  <div>
                    <div className="lb">Alamat kantor</div>
                    <div className="vl">
                      Jl. Cherry Field, Cipagalo,
                      <br />
                      Kec. Bojongsoang, Kabupaten Bandung 40287
                    </div>
                  </div>
                </div>
                <div className="krow">
                  <div className="ic">
                    <ContactIcon name="clock" />
                  </div>
                  <div>
                    <div className="lb">Jam operasional</div>
                    <div className="vl">{site.contact.hours}</div>
                  </div>
                </div>
              </div>
            </div>
            <ConsultationForm />
          </div>
        </div>
      </section>

      <section className="sec" style={{ padding: "44px 0 66px" }}>
        <div className="wrap">
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
        </div>
      </section>
    </div>
  );
}

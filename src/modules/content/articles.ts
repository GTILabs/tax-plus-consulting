import { routes } from "./navigation";

export type Article = {
  slug: string;
  status: "published";
  category: string;
  title: string;
  excerpt: string;
  /** Label on the navy thumbnail of article cards. */
  thumbLabel: string;
  featured?: boolean;
  /** Label on the large featured-article image; newlines are line breaks. */
  featureLabel?: string;
  readingMinutes: number;
  byline: string;
  lead: string;
  /**
   * Trusted HTML authored in this repository (p, h3, b, ul/li and the
   * .kb / .law callouts). Must be sanitized once articles come from the CMS.
   */
  bodyHtml: string;
  cta: { title: string; text: string; label: string; href: string };
};

/** Announced on the article index as "Segera" (coming soon); no detail page yet. */
export type UpcomingArticle = { thumbLabel: string; title: string; excerpt: string };

/* Content extracted from docs/design/TaxPlus-Web.html. */
export const articles: Article[] = [
  {
    slug: "sp2dk-apa-yang-harus-dilakukan",
    status: "published",
    category: "Pemeriksaan",
    title: "Menerima SP2DK? Ini yang harus Anda lakukan dalam 14 hari",
    excerpt:
      "SP2DK bukan pemeriksaan. Tapi tanggapan yang keliru di tahap ini yang paling sering membuatnya berubah menjadi pemeriksaan. Berikut urutan yang benar.",
    thumbLabel: "SP2DK",
    featured: true,
    featureLabel: "SP2DK\nTahap Pengawasan",
    readingMinutes: 6,
    byline: "Kalam Al-Iqbal, BKP · Kuasa Hukum Pengadilan Pajak",
    lead: "SP2DK bukan pemeriksaan. Tetapi tanggapan yang keliru di tahap ini adalah sebab paling umum sebuah selisih kecil berkembang menjadi ketetapan yang besar.",
    bodyHtml: `
      <p>SP2DK adalah Surat Permintaan Penjelasan atas Data dan/atau Keterangan. Isinya sederhana: kantor pajak memegang data yang berbeda dengan yang Anda laporkan, dan mereka meminta penjelasan. Datanya bisa berasal dari lawan transaksi Anda, dari bank, dari marketplace, atau dari sistem Coretax yang mencocokkan SPT Badan dengan SPT PPN Anda sendiri.</p>
      <p>Yang penting dipahami: pada tahap ini Anda masih berada di ruang pengawasan, bukan pemeriksaan. Posisi Anda masih longgar, dan justru itulah alasan tahap ini menentukan.</p>
      <h3>Empat langkah, sesuai urutan</h3>
      <p><b>1. Baca dulu, jangan langsung menjawab.</b> Cari tahu tiga hal: data apa yang dipermasalahkan, masa pajak berapa, dan berapa tenggat yang diberikan. Banyak wajib pajak langsung menelepon Account Representative dan memberi penjelasan lisan yang kemudian sulit ditarik.</p>
      <p><b>2. Telusuri sumber selisihnya di pembukuan Anda.</b> Sering kali tidak ada kesalahan sama sekali — yang terjadi hanya perbedaan cara membaca data. Contoh yang paling sering kami temui: omzet marketplace dicatat neto setelah potongan komisi, sedangkan data yang diterima kantor pajak adalah nilai bruto.</p>
      <p><b>3. Susun tanggapan tertulis, bukan lisan.</b> Tanggapan Anda menjadi bagian berkas perkara dan akan dibaca kembali bila perkara berlanjut ke pemeriksaan, keberatan, bahkan banding. Tanggapan yang baik menjelaskan dan melampirkan bukti, bukan sekadar membantah.</p>
      <p><b>4. Kalau memang ada kesalahan, pertimbangkan pembetulan.</b> Pasal 8 UU KUP memberi ruang membetulkan SPT atas kemauan sendiri. Konsekuensinya jauh lebih ringan dibanding bila kesalahan yang sama ditemukan lewat pemeriksaan.</p>
      <div class="kb"><b>Yang membuat keadaan lebih buruk</b>
        <ul>
          <li>Mendiamkan surat sampai tenggat lewat — kantor pajak dapat menetapkan pajak berdasarkan data mereka sendiri, tanpa versi Anda</li>
          <li>Memberi penjelasan lisan yang tidak sesuai pembukuan</li>
          <li>Melampirkan dokumen yang tidak diminta, yang justru membuka pertanyaan baru</li>
          <li>Mengakui koreksi tanpa lebih dulu menghitung dampaknya</li>
        </ul>
      </div>
      <h3>Berapa lama waktu Anda</h3>
      <p>SP2DK umumnya memberi waktu 14 hari sejak surat diterima. Angka ini yang paling sering terlewat, karena suratnya kerap sampai ke tangan yang salah di kantor Anda lebih dulu. Begitu perkara berlanjut ke pemeriksaan, tenggatnya makin ketat: permintaan peminjaman dokumen satu bulan, dan tanggapan atas SPHP hanya tujuh hari kerja.</p>
      <div class="law"><b>Dasar hukum</b>
        Pasal 8 UU KUP (pembetulan SPT atas kemauan sendiri) · Pasal 13 UU KUP (penerbitan Surat Ketetapan Pajak) · PMK 18/PMK.03/2021 (tata cara pemeriksaan). Prosedur SP2DK diatur lewat Surat Edaran Direktur Jenderal Pajak tentang pengawasan kepatuhan wajib pajak.
      </div>
    `,
    cta: {
      title: "Sedang memegang SP2DK?",
      text: "Tenggatnya berjalan sejak surat diterima, bukan sejak Anda membacanya. Konsultasi awal 15 menit, tanpa biaya.",
      label: "Lihat layanan pendampingan pemeriksaan",
      href: routes.service("tax-audit"),
    },
  },
  {
    slug: "pt-cv-tidak-lagi-pph-final-0-5-persen",
    status: "published",
    category: "Perencanaan Pajak",
    title: "PT dan CV tidak lagi dapat PPh final 0,5%. Apa gantinya?",
    excerpt: "Aturan yang berlaku tahun lalu sudah berubah. Untuk sebagian usaha ini justru menguntungkan.",
    thumbLabel: "PP 20/2026",
    readingMinutes: 5,
    byline: "Kalam Al-Iqbal, BKP",
    lead: "Perhitungan yang benar tahun lalu belum tentu benar sekarang. Dan untuk sebagian usaha, perubahan ini justru menguntungkan.",
    bodyHtml: `
      <p>Selama bertahun-tahun, skema PPh final 0,5% dari peredaran bruto menjadi pilihan favorit pelaku usaha kecil: mudah dihitung, tidak perlu pembukuan rumit. PP 20 Tahun 2026 mengubah peta itu dengan mencabut kelayakan PT biasa dan CV dari skema tersebut.</p>
      <p>Reaksi pertama kebanyakan pemilik usaha adalah panik. Reaksi itu belum tentu tepat.</p>
      <h3>Kenapa 0,5% belum tentu lebih murah</h3>
      <p>Tarif final dihitung dari <b>omzet</b>, bukan dari laba. Artinya Anda tetap membayar meskipun sedang rugi. Tarif umum dihitung dari <b>laba kena pajak</b>, sehingga mengikuti kondisi usaha Anda yang sebenarnya.</p>
      <p>Sederhananya: bila margin laba usaha Anda tipis, tarif final 0,5% dari omzet bisa jadi lebih mahal daripada tarif umum atas laba. Titik baliknya bergantung pada margin Anda, dan itu harus dihitung per kasus — tidak bisa disimpulkan secara umum.</p>
      <h3>Fasilitas yang sering terlupakan</h3>
      <p>Pasal 31E UU PPh memberi pengurangan tarif sebesar 50% atas bagian penghasilan kena pajak yang berasal dari peredaran bruto sampai dengan Rp4,8 miliar, bagi wajib pajak badan dengan peredaran bruto sampai Rp50 miliar setahun.</p>
      <p>Untuk banyak usaha yang selama ini memakai skema final, fasilitas ini menurunkan tarif efektif jauh di bawah yang mereka bayangkan.</p>
      <div class="kb"><b>Yang perlu Anda siapkan sekarang</b>
        <ul>
          <li>Hitung ulang beban pajak Anda dengan tarif umum, bandingkan dengan yang selama ini dibayar</li>
          <li>Pastikan pembukuan memadai — tarif umum menuntut laba fiskal yang bisa dipertahankan</li>
          <li>Siapkan kertas kerja koreksi fiskal, karena tidak semua biaya diakui secara fiskal</li>
          <li>Tinjau ulang bentuk badan usaha, bila memang masih relevan diubah</li>
        </ul>
      </div>
      <h3>Bagaimana dengan CV?</h3>
      <p>CV sering disebut lebih hemat karena bagian laba yang diterima sekutu dikecualikan dari objek pajak. Itu benar, tetapi tidak lengkap: Pasal 9 ayat (1) huruf j UU PPh melarang gaji yang dibayarkan kepada sekutu dibiayakan. Keunggulan CV jauh lebih sempit daripada yang umum dibayangkan, dan hasil akhirnya bergantung pada struktur penghasilan Anda.</p>
      <div class="law"><b>Dasar hukum</b>
        PP 20 Tahun 2026 · Pasal 17 dan Pasal 31E UU PPh · Pasal 4 ayat (3) huruf i dan Pasal 9 ayat (1) huruf j UU PPh.
      </div>
    `,
    cta: {
      title: "Perlu dihitung untuk kasus Anda?",
      text: "Kami buatkan perbandingan angka berdampingan untuk setiap skenario, lengkap dengan dasar hukumnya.",
      label: "Lihat layanan perencanaan pajak",
      href: routes.service("tax-management"),
    },
  },
  {
    slug: "pajak-endorse-dan-royalti",
    status: "published",
    category: "Industri Kreatif",
    title: "Pajak endorse dan royalti: tiga hal yang paling sering terlewat",
    excerpt: "Fee yang tidak dipotong, barang endorse, dan pemasukan dari platform luar negeri.",
    thumbLabel: "Industri Kreatif",
    readingMinutes: 5,
    byline: "Kalam Al-Iqbal, BKP",
    lead: "Penghasilan kreator datang dari banyak arah sekaligus. Yang membuat repot bukan jumlahnya, melainkan bahwa sebagian besar tidak dipotong pihak mana pun.",
    bodyHtml: `
      <p>Kami rutin menangani klien dari industri hiburan dan kreatif. Pola masalahnya hampir selalu sama, dan hampir selalu bermuara pada satu titik: PPh Pasal 29 yang membengkak di akhir tahun, padahal sepanjang tahun terasa tidak ada masalah.</p>
      <h3>1. Fee yang tidak dipotong brand</h3>
      <p>Ketika brand memotong PPh 21 atau PPh 23 atas fee Anda, pajaknya sudah dibayar di muka dan menjadi kredit pajak. Tetapi banyak kerja sama — terutama dengan UMKM, agensi kecil, atau brand luar negeri — dibayar penuh tanpa pemotongan.</p>
      <p>Penghasilan itu tetap wajib dilaporkan dan tetap terutang pajak. Bedanya, tidak ada kredit pajak yang mengurangi. Seluruhnya menjadi kekurangan bayar yang harus Anda setor sendiri.</p>
      <h3>2. Barang endorse</h3>
      <p>Tas, gawai, kendaraan, menginap di hotel. Karena tidak berbentuk uang, banyak yang menganggapnya bukan penghasilan. Secara pajak, imbalan dalam bentuk natura atas suatu pekerjaan atau jasa tetap merupakan penghasilan, dan dinilai berdasarkan nilai pasarnya.</p>
      <p>Ini yang paling sering menjadi temuan, karena jejaknya terbuka: unggahan Anda sendiri.</p>
      <h3>3. Pemasukan dari platform luar negeri</h3>
      <p>AdSense, royalti platform musik, pembayaran dari agensi luar negeri. Penghasilan ini masuk ke rekening Anda tanpa bukti potong Indonesia, dan karena itu sering dianggap tidak perlu dilaporkan.</p>
      <p>Wajib pajak dalam negeri dikenai pajak atas penghasilan dari mana pun sumbernya. Bila ada pajak yang telah dipotong di negara lain, perjanjian penghindaran pajak berganda dapat dimanfaatkan — tetapi itu baru bisa dilakukan bila penghasilannya dilaporkan lebih dulu.</p>
      <div class="kb"><b>Tiga langkah yang bisa Anda lakukan sekarang</b>
        <ul>
          <li>Catat seluruh pemasukan dalam satu tempat, termasuk yang berbentuk barang</li>
          <li>Kumpulkan bukti potong dari setiap brand yang memotong pajak Anda</li>
          <li>Bila nilainya sudah besar, hitung apakah bentuk badan usaha lebih menguntungkan — termasuk sesudah PP 20 Tahun 2026</li>
        </ul>
      </div>
      <div class="law"><b>Dasar hukum</b>
        Pasal 4 ayat (1) UU PPh (pengertian penghasilan, termasuk natura) · Pasal 17 UU PPh (tarif progresif hingga 35%) · Pasal 29 UU PPh (kekurangan pembayaran pajak) · Pasal 21 dan Pasal 23 UU PPh (pemotongan oleh pihak lain).
      </div>
    `,
    cta: {
      title: "Penghasilan Anda dari banyak sumber?",
      text: "Kami rutin menangani kreator dan manajemen talent. Konsultasi awal 15 menit, tanpa biaya.",
      label: "Lihat spesialisasi industri kreatif",
      href: routes.specialization,
    },
  },
];

export const upcomingArticles: UpcomingArticle[] = [
  {
    thumbLabel: "SPT Tahunan",
    title: "Pajak sudah dipotong kantor, kenapa masih muncul kurang bayar?",
    excerpt: "Penjelasan PPh Pasal 29 untuk karyawan yang punya penghasilan lain.",
  },
  {
    thumbLabel: "PKP & PPN",
    title: "Omzet mendekati Rp4,8 miliar: apa yang berubah",
    excerpt: "Kewajiban PKP, PPN, dan hal yang sebaiknya disiapkan sebelum ambang itu terlewati.",
  },
  {
    thumbLabel: "Coretax",
    title: "Ekualisasi omzet: kenapa Coretax bisa menemukan selisih Anda",
    excerpt: "Bagaimana sistem mencocokkan SPT Badan, SPT PPN, dan data lawan transaksi.",
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

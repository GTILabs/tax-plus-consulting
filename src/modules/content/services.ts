import type { ServiceSlug } from "./navigation";

export type ServiceIcon = "compliance" | "accounting" | "management" | "audit" | "litigation";

export type Service = {
  slug: ServiceSlug;
  name: string;
  icon: ServiceIcon;
  /** Kicker in the hero and subtitle on cards. */
  subtitle: string;
  /** One-line summary on the service cards. */
  summary: string;
  /** Final hero intro (brief: "Intro hero (final)"). */
  intro: string;
  /** "Yang kami kerjakan": sub-service cards. */
  scope: { title: string; text: string }[];
  /** "Untuk siapa": three client situations. */
  forWhom: string[];
  /** Draft until confirmed by Pak Kalam (from the staging design, docs/design/TaxPlus-Web.html). */
  included: string[];
  excluded: string[];
  /** Service-specific process with a time estimate per step. */
  steps: { title: string; text: string; timing: string }[];
  faqs: { question: string; answer: string }[];
};

/* Approved copy from the prototype (taxplus-website-prototipe.html) and the brief. */
export const services: Service[] = [
  {
    slug: "tax-compliance",
    name: "Tax Compliance",
    icon: "compliance",
    subtitle: "Kepatuhan pajak bulanan dan tahunan",
    summary: "Perhitungan dan pelaporan SPT bulanan dan tahunan, dipantau lewat sistem monitoring internal.",
    intro:
      "Kami menghitung, menyetor, dan melaporkan pajak bulanan dan tahunan perusahaan Anda. Setiap tenggat dipantau, sehingga tidak ada yang terlewat.",
    scope: [
      { title: "PPh 21/26", text: "Perhitungan gaji, bukti potong, dan SPT Masa" },
      { title: "PPh Unifikasi", text: "PPh 23, PPh 4 ayat (2), dan potong pungut lain" },
      { title: "PPN dan Faktur Pajak", text: "Pembuatan faktur dan SPT Masa PPN" },
      { title: "SPT Tahunan", text: "PPh Badan dan Orang Pribadi" },
      { title: "Administrasi Coretax", text: "NPWP, PKP, aktivasi akun, dan sertifikat elektronik" },
    ],
    forWhom: [
      "Perusahaan yang belum punya staf pajak",
      "Usaha yang sedang tumbuh dan transaksinya makin banyak",
      "Figur publik dengan beberapa sumber penghasilan",
    ],
    included: [
      "Pemetaan kewajiban pajak perusahaan Anda di awal",
      "Perhitungan PPh 21, 23, 4 ayat (2), 25, dan PPN setiap masa",
      "Kode billing, konfirmasi setor, dan penyimpanan NTPN",
      "Pelaporan SPT Masa dan SPT Tahunan lewat Coretax",
      "Bukti potong untuk karyawan dan lawan transaksi",
      "Arsip digital dan laporan status setiap bulan",
    ],
    excluded: [
      "Penyusunan pembukuan dari nol (lihat Tax Accounting)",
      "Pendampingan bila terbit SP2DK (lihat Tax Audit)",
      "Pembayaran pajak memakai dana kami; setoran tetap dari rekening Anda",
    ],
    steps: [
      { title: "Pemetaan kewajiban", text: "Jenis pajak, status PKP, dan riwayat pelaporan dua tahun terakhir.", timing: "Minggu pertama" },
      { title: "Penarikan data", text: "PIC meminta data transaksi lewat satu kanal yang disepakati.", timing: "Tanggal 1–5" },
      { title: "Hitung dan review", text: "PIC menghitung, Reviewer memeriksa ulang sebelum dilaporkan.", timing: "Tanggal 5–9" },
      { title: "Setor dan lapor", text: "Kode billing kami kirim, SPT dilaporkan, BPE diteruskan ke Anda.", timing: "Sebelum tanggal 20" },
      { title: "Laporan status", text: "Posisi seluruh jenis pajak bulan itu dalam satu halaman.", timing: "Akhir bulan" },
    ],
    faqs: [
      {
        question: "Bagaimana data dikirim ke TaxPlus?",
        answer: "Data dikirim melalui **folder bersama atau email** setiap bulan sesuai daftar yang kami berikan di awal kerja sama.",
      },
      {
        question: "Kalau ada pelaporan tahun lalu yang terlambat?",
        answer: "Kami telaah dulu **kewajiban yang tertunggak**, lalu susun **urutan pembetulan dan pelaporan susulannya**.",
      },
      {
        question: "Apakah bisa untuk klien di luar Bandung?",
        answer: "Bisa. Sebagian besar pekerjaan kepatuhan **dikerjakan secara daring**.",
      },
    ],
  },
  {
    slug: "tax-accounting",
    name: "Tax Accounting",
    icon: "accounting",
    subtitle: "Pembukuan dan laporan keuangan fiskal",
    summary: "Pembukuan, rekonsiliasi, laporan keuangan fiskal, dan ekualisasi.",
    intro:
      "Pembukuan yang rapi adalah dasar SPT yang benar. Kami menyusun pembukuan dan laporan keuangan fiskal yang konsisten dengan SPT Anda.",
    scope: [
      { title: "Pembukuan bulanan", text: "Pencatatan transaksi dan jurnal penyesuaian" },
      { title: "Rekonsiliasi", text: "Bank, utang, dan piutang" },
      { title: "Laporan keuangan fiskal", text: "Laporan keuangan dan koreksi fiskal untuk SPT Tahunan" },
      { title: "Ekualisasi", text: "Pencocokan omzet, PPN, dan PPh dengan pembukuan" },
    ],
    forWhom: [
      "Perusahaan yang pembukuannya tertinggal",
      "Usaha yang ingin laporan keuangan siap diperiksa",
      "Perusahaan yang sedang menyiapkan pembiayaan bank",
    ],
    included: [
      "Penyusunan bagan akun sesuai jenis usaha Anda",
      "Penjurnalan, buku besar, dan rekonsiliasi bank bulanan",
      "Pencatatan persediaan dan harga pokok penjualan",
      "Penyusutan aset menurut ketentuan fiskal",
      "Koreksi fiskal beserta kertas kerjanya",
      "Ekualisasi omzet: SPT Badan, PPN, dan laporan keuangan",
    ],
    excluded: [
      "Audit laporan keuangan, yang merupakan kewenangan Kantor Akuntan Publik",
      "Pemrosesan penggajian dan administrasi BPJS",
      "Penilaian aset yang memerlukan penilai publik berizin",
    ],
    steps: [
      { title: "Diagnosis", text: "Apa yang sudah ada, apa yang hilang, dan sejauh mana bisa direkonstruksi.", timing: "Minggu 1–2" },
      { title: "Penataan struktur", text: "Bagan akun disusun ulang agar setiap transaksi punya tempat yang benar.", timing: "Minggu 2–3" },
      { title: "Rekonstruksi", text: "Transaksi dicatat mundur sampai titik yang disepakati.", timing: "Menyesuaikan volume" },
      { title: "Rekonsiliasi", text: "Kas, bank, piutang, utang, dan persediaan. Setiap selisih dijelaskan.", timing: "Setiap bulan" },
      { title: "Koreksi fiskal dan ekualisasi", text: "Laba komersial menjadi laba fiskal, dengan kertas kerja yang bisa ditunjukkan.", timing: "Bulanan dan tahunan" },
    ],
    faqs: [
      {
        question: "Apakah memakai software tertentu?",
        answer: "Kami **menyesuaikan dengan software yang Anda pakai**, atau menyarankan yang sesuai skala usaha.",
      },
      {
        question: "Berapa lama menyusun pembukuan yang tertinggal?",
        answer: "Tergantung jumlah transaksi dan kelengkapan dokumen. Estimasinya kami sampaikan **setelah penelaahan awal**.",
      },
      {
        question: "Apakah laporan ini sama dengan laporan audit?",
        answer: "Bukan. Laporan kami adalah **laporan keuangan fiskal untuk kebutuhan perpajakan**, bukan opini akuntan publik.",
      },
    ],
  },
  {
    slug: "tax-management",
    name: "Tax Management",
    icon: "management",
    subtitle: "Perencanaan dan efisiensi pajak",
    summary: "Perencanaan pajak dan efisiensi beban pajak sesuai ketentuan.",
    intro:
      "Keputusan bisnis selalu punya akibat pajak. Kami menyusun perencanaan agar beban pajak efisien, tetap sesuai ketentuan.",
    scope: [
      { title: "Tax review", text: "Pemeriksaan kesehatan pajak sebelum diperiksa DJP" },
      { title: "Perencanaan transaksi", text: "Restrukturisasi, investasi, dan transaksi afiliasi" },
      { title: "Review kontrak", text: "Dampak pajak dari perjanjian dan skema pembayaran" },
      { title: "Fasilitas dan insentif", text: "Identifikasi fasilitas pajak yang bisa dimanfaatkan" },
    ],
    forWhom: [
      "Perusahaan yang merencanakan ekspansi atau restrukturisasi",
      "Grup usaha dengan transaksi antarperusahaan",
      "Pemilik usaha yang ingin tahu risiko pajaknya",
    ],
    included: [
      "Pemetaan posisi pajak Anda saat ini, termasuk risiko yang belum disadari",
      "Simulasi angka untuk setiap skenario, dibandingkan berdampingan",
      "Kajian pemilihan bentuk badan usaha: pribadi, CV, atau PT",
      "Penataan struktur kepemilikan aset",
      "Pemanfaatan fasilitas yang berlaku, termasuk Pasal 31E",
      "Dokumen kajian tertulis dengan dasar hukum setiap rekomendasi",
    ],
    excluded: [
      "Skema tanpa dasar hukum, atau yang bergantung pada data yang tidak dilaporkan",
      "Janji beban pajak nol; perencanaan menekan beban, bukan menghapusnya",
      "Pengalihan penghasilan dari hubungan kerja ke badan usaha",
    ],
    steps: [
      { title: "Pemetaan kondisi", text: "Penghasilan, aset, struktur usaha, dan rencana Anda dua sampai tiga tahun ke depan.", timing: "Pertemuan pertama" },
      { title: "Hitung posisi sekarang", text: "Berapa sebenarnya beban pajak Anda hari ini, dari data nyata.", timing: "Minggu 1" },
      { title: "Susun skenario", text: "Dua sampai empat skenario, masing-masing dengan angka, syarat, dan risikonya.", timing: "Minggu 1–2" },
      { title: "Presentasi perbandingan", text: "Selisihnya ditunjukkan berdampingan, mudah dibaca tanpa latar akuntansi.", timing: "Pertemuan kedua" },
      { title: "Kajian tertulis", text: "Skenario pilihan Anda dituangkan menjadi dokumen dengan dasar hukum lengkap.", timing: "Minggu 3" },
    ],
    faqs: [
      {
        question: "Apa bedanya perencanaan pajak dengan penghindaran pajak?",
        answer: "Perencanaan pajak memakai **pilihan yang disediakan peraturan**. Kami **tidak menyarankan skema yang melanggar ketentuan**.",
      },
      {
        question: "Kapan sebaiknya tax review dilakukan?",
        answer: "**Sebelum tutup buku**, **sebelum transaksi besar**, atau ketika ada **perubahan regulasi**.",
      },
      { question: "Apakah hasilnya tertulis?", answer: "Ya, dalam bentuk **memo perpajakan beserta dasar hukumnya**." },
    ],
  },
  {
    slug: "tax-audit",
    name: "Tax Audit",
    icon: "audit",
    subtitle: "Pendampingan SP2DK dan pemeriksaan",
    summary: "Pendampingan SP2DK dan pemeriksaan pajak dari awal sampai pembahasan akhir.",
    intro:
      "Surat dari kantor pajak perlu ditanggapi dengan tepat dan tepat waktu. Kami mendampingi Anda dari SP2DK sampai pembahasan akhir pemeriksaan.",
    scope: [
      { title: "Tanggapan SP2DK", text: "Penelaahan data dan penyusunan tanggapan tertulis" },
      { title: "Pendampingan pemeriksaan", text: "Pemeriksaan kantor maupun lapangan" },
      { title: "Tanggapan SPHP", text: "Penyusunan sanggahan atas temuan pemeriksa" },
      { title: "Pembahasan akhir", text: "Pendampingan closing conference dan Panel Kualitas Pemeriksaan" },
    ],
    forWhom: [
      "Wajib pajak yang menerima SP2DK atau surat pemeriksaan",
      "Perusahaan dengan SPT lebih bayar yang diperiksa",
      "Usaha yang ingin mengecek risiko sebelum diperiksa",
    ],
    included: [
      "Analisis isi surat dan identifikasi data yang dipermasalahkan",
      "Penelusuran sumber selisih pada pembukuan dan SPT",
      "Penyusunan tanggapan tertulis beserta lampirannya",
      "Penyiapan dan penataan dokumen yang diminta",
      "Pendampingan di setiap pertemuan dan permintaan keterangan di KPP",
      "Tanggapan atas SPHP dan pendampingan Pembahasan Akhir",
    ],
    excluded: [
      "Janji bebas koreksi; tidak ada konsultan yang bisa menjanjikannya secara jujur",
      "Penyusunan dokumen yang tidak mencerminkan transaksi sebenarnya",
      "Upaya hukum setelah SKP terbit (lihat Tax Litigation)",
    ],
    steps: [
      { title: "Baca surat, jangan langsung jawab", text: "Kami identifikasi dasar hukumnya, data yang dipermasalahkan, dan tenggat sebenarnya.", timing: "Hari 1–2" },
      { title: "Telusuri sumber selisih", text: "Apakah benar ada kesalahan, atau hanya beda cara membaca data.", timing: "Hari 2–5" },
      { title: "Susun tanggapan", text: "Tanggapan yang menjelaskan, bukan sekadar membantah.", timing: "Tenggat SP2DK: 14 hari" },
      { title: "Siapkan dokumen dan dampingi", text: "Dokumen ditata, setiap pertemuan kami buatkan notulen.", timing: "Peminjaman dokumen: 1 bulan" },
      { title: "Tanggapi SPHP", text: "Kesempatan terakhir menurunkan koreksi sebelum SKP terbit.", timing: "7 hari kerja" },
    ],
    faqs: [
      {
        question: "Saya baru menerima SP2DK, apa yang harus dilakukan?",
        answer: "**Jangan langsung membalas.** Kirim salinannya kepada kami agar data dan batas waktunya kami telaah lebih dulu.",
      },
      {
        question: "Apakah pendampingan bisa dimulai di tengah pemeriksaan?",
        answer: "Bisa. Kami pelajari **dokumen yang sudah diserahkan** lalu lanjutkan pendampingannya.",
      },
      {
        question: "Siapa yang hadir saat pemeriksaan?",
        answer: "**Konsultan pajak berizin dari TaxPlus**, bersama **PIC dari perusahaan Anda**.",
      },
    ],
  },
  {
    slug: "tax-litigation",
    name: "Tax Litigation",
    icon: "litigation",
    subtitle: "Keberatan, banding, gugatan, dan PK",
    summary: "Keberatan, banding, gugatan, dan peninjauan kembali sengketa pajak.",
    intro:
      "Tidak sependapat dengan ketetapan pajak? Ada jalur hukum yang bisa ditempuh. Kami menangani sengketa dari keberatan sampai Mahkamah Agung, langsung oleh kuasa hukum yang juga advokat.",
    scope: [
      { title: "Keberatan", text: "Diajukan ke DJP atas surat ketetapan pajak" },
      { title: "Banding", text: "Diajukan ke Pengadilan Pajak atas keputusan keberatan" },
      { title: "Gugatan", text: "Diajukan ke Pengadilan Pajak atas pelaksanaan penagihan dan keputusan tertentu" },
      { title: "Peninjauan Kembali", text: "Diajukan ke Mahkamah Agung atas putusan Pengadilan Pajak" },
    ],
    forWhom: [
      "Wajib pajak yang menerima SKPKB yang tidak disetujui",
      "Perusahaan yang keberatannya ditolak",
      "Wajib pajak yang menghadapi tindakan penagihan",
    ],
    included: [
      "Analisis kelayakan: layakkah perkara ini diperjuangkan, dan pada tingkat mana",
      "Penyusunan Surat Keberatan beserta lampirannya",
      "Penyusunan Surat Banding dan Surat Bantahan ke Pengadilan Pajak",
      "Penyusunan Surat Gugatan atas tindakan penagihan",
      "Penyusunan Memori Peninjauan Kembali ke Mahkamah Agung",
      "Representasi sebagai kuasa hukum dalam persidangan",
    ],
    excluded: [
      "Janji kemenangan; tidak ada kuasa hukum yang dapat menjanjikan putusan",
      "Upaya hukum yang tenggatnya sudah lewat; hak yang gugur tidak dapat dipulihkan",
      "Perkara pidana perpajakan pada tahap penyidikan",
    ],
    steps: [
      { title: "Analisis kelayakan", text: "Kami sampaikan terbuka bila perkara ini lebih baik tidak dilanjutkan.", timing: "Sebelum langkah apa pun" },
      { title: "Keberatan ke DJP", text: "Diajukan atas SKP, diputus oleh Direktorat Jenderal Pajak.", timing: "3 bulan sejak SKP dikirim" },
      { title: "Banding ke Pengadilan Pajak", text: "Diajukan atas Keputusan Keberatan yang tidak memuaskan.", timing: "3 bulan sejak keputusan diterima" },
      { title: "Gugatan ke Pengadilan Pajak", text: "Jalur terpisah untuk tindakan penagihan dan keputusan tertentu.", timing: "14 hari (penagihan) · 30 hari (keputusan lain)" },
      { title: "Peninjauan Kembali ke Mahkamah Agung", text: "Upaya luar biasa atas Putusan Pengadilan Pajak, dengan alasan yang dibatasi undang-undang.", timing: "3 bulan" },
    ],
    faqs: [
      {
        question: "Berapa batas waktu mengajukan keberatan?",
        answer: "**Tiga bulan sejak tanggal surat ketetapan dikirim.** Segera hubungi kami agar ada cukup waktu menyusun dalil.",
      },
      {
        question: "Apakah harus membayar dulu sebelum banding?",
        answer: "Ketentuannya bergantung pada **jenis ketetapan dan tahapannya**. Kami jelaskan sesuai posisi kasus Anda.",
      },
      {
        question: "Siapa yang bersidang di Pengadilan Pajak?",
        answer: "**Kalam Al-Iqbal**, pemegang **Izin Kuasa Hukum Pengadilan Pajak** 1507/PP/IKH/2023.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function serviceWhatsappMessage(service: Pick<Service, "name">) {
  return `Halo TaxPlus, saya ingin konsultasi ${service.name}.`;
}

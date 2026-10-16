import type { ServiceIconName } from "@/components/ui/icons";
import type { ServiceSlug } from "./navigation";

export type Service = {
  slug: ServiceSlug;
  name: string;
  eyebrow: string;
  subtitle: string;
  intro: string;
  icon: ServiceIconName;
  /** Short description for the homepage service card. */
  homeSummary: string;
  hub: { label: string; summary: string; tags: string[]; wide: boolean };
  forMe: { title: string; text: string }[];
  included: string[];
  excluded: string[];
  steps: { title: string; text: string; timing: string }[];
  deliverables: { title: string; text: string }[];
  caseStudy: { title: string; situation: string; action: string; result: string };
  whyUs: { title: string; text: string; credentials: { label: string; detail?: string }[] };
  faqs: { question: string; answer: string }[];
  related: { slug: ServiceSlug; text: string }[];
};

export type ServiceGroup = { number: string; title: string; subtitle: string; services: ServiceSlug[] };

/* Content extracted from docs/design/TaxPlus-Web.html. */
export const services: Service[] = [
  {
    slug: "tax-compliance",
    name: "Tax Compliance",
    eyebrow: "Tax Compliance",
    subtitle: "Pelaporan Pajak Rutin",
    intro: "Kewajiban bulanan dan tahunan Anda dihitung, disetor, dan dilaporkan tepat waktu lewat Coretax.",
    icon: "shield",
    homeSummary:
      "Penyusunan dan pelaporan SPT bulanan & tahunan, dipantau lewat sistem monitoring internal kami.",
    hub: {
      label: "Pelaporan pajak rutin bulanan & tahunan",
      summary: "Dihitung, disetor, dan dilaporkan tepat waktu lewat Coretax.",
      tags: ["PPh 21", "PPh 23", "PPh 4(2)", "PPh 25", "PPN", "SPT Tahunan"],
      wide: false,
    },
    forMe: [
      {
        title: "Tidak ada yang mengurus",
        text: "Staf pajak keluar, atau memang belum pernah ada.",
      },
      {
        title: "Sering telat lapor",
        text: "Denda mulai berulang dan jejaknya hilang.",
      },
      {
        title: "Perusahaan baru berdiri",
        text: "Belum tahu kewajiban apa saja yang melekat.",
      },
      {
        title: "Ragu SPT sudah benar",
        text: "Sudah dilaporkan, tapi tidak pernah diperiksa ulang.",
      },
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
      "Penyusunan pembukuan dari nol — itu Tax Accounting",
      "Pendampingan bila terbit SP2DK — itu Tax Audit",
      "Pembayaran pajak memakai dana kami; setoran tetap dari rekening Anda",
    ],
    steps: [
      {
        title: "Pemetaan kewajiban",
        text: "Jenis pajak, status PKP, dan riwayat pelaporan dua tahun terakhir.",
        timing: "Minggu pertama",
      },
      {
        title: "Penarikan data",
        text: "PIC meminta data transaksi lewat satu kanal yang disepakati.",
        timing: "Tanggal 1–5",
      },
      {
        title: "Hitung dan review",
        text: "PIC menghitung, Reviewer memeriksa ulang. Tidak ada angka tanpa dua pasang mata.",
        timing: "Tanggal 5–9",
      },
      {
        title: "Setor dan lapor",
        text: "Kode billing kami kirim, SPT dilaporkan, BPE diteruskan ke Anda.",
        timing: "Sebelum tanggal 20",
      },
      {
        title: "Laporan status",
        text: "Posisi seluruh jenis pajak bulan itu dalam satu halaman.",
        timing: "Akhir bulan",
      },
    ],
    deliverables: [
      {
        title: "Kertas kerja perhitungan",
        text: "Anda bisa melihat dari mana angkanya berasal.",
      },
      {
        title: "Bukti setor dan bukti lapor",
        text: "NTPN dan BPE, terarsip dan bisa diminta kapan saja.",
      },
      {
        title: "Rekap status bulanan",
        text: "Termasuk apa yang tertunda dan sebabnya.",
      },
    ],
    caseStudy: {
      title: "Perusahaan dagang, Bandung",
      situation:
        "Pelaporan tertinggal tujuh bulan setelah staf pajaknya resign. Tidak ada yang tahu persis mana yang sudah dan belum dilaporkan.",
      action: "Kami petakan ulang seluruh kewajiban, susun pembetulan, dan kejar tunggakan pelaporan.",
      result: "Selesai dalam enam minggu. Sejak itu tidak ada lagi denda keterlambatan.",
    },
    whyUs: {
      title: "Kenapa kami",
      text: "Pelaporan rutin gagal bukan karena hitungannya sulit, tapi karena tidak ada yang memantau tenggatnya. Kami memakai sistem monitoring internal yang melacak status setiap jenis pajak, setiap klien, setiap bulan.",
      credentials: [
        {
          label: "Izin Praktik Konsultan Pajak (BKP)",
          detail: "Tingkat A: KIP-6837/IP.A/PJ/2020\nTingkat B: KP-10818/IP.B/2025",
        },
        {
          label: "Brevet A & B Universitas Padjadjaran",
          detail: "15.00754",
        },
        {
          label: "Sistem monitoring internal",
        },
      ],
    },
    faqs: [
      {
        question: "Data apa yang harus saya siapkan tiap bulan?",
        answer:
          "Rekap penjualan dan pembelian, daftar gaji, faktur pajak, dan bukti potong yang Anda terima. Di awal kerja sama kami berikan daftar khusus untuk jenis usaha Anda, dan PIC mengingatkan setiap bulan.",
      },
      {
        question: "Bagaimana kalau laporan tahun lalu berantakan?",
        answer:
          "Kami telusuri posisi sebenarnya dulu. Bila ada yang salah, pembetulan dapat diajukan berdasarkan Pasal 8 UU KUP — dan pembetulan atas inisiatif sendiri jauh lebih ringan daripada yang ditemukan lewat pemeriksaan.",
      },
      {
        question: "Apakah TaxPlus yang membayarkan pajaknya?",
        answer:
          "Tidak. Kami terbitkan kode billing, pembayaran tetap dari rekening perusahaan Anda, agar jejaknya tetap atas nama Anda.",
      },
      {
        question: "Perusahaan saya di luar Bandung, bisa?",
        answer: "Bisa. Seluruh administrasi kini lewat Coretax dan koordinasi dilakukan daring.",
      },
    ],
    related: [
      {
        slug: "tax-accounting",
        text: "Agar angka yang dilaporkan benar sejak sumbernya",
      },
      {
        slug: "tax-audit",
        text: "Bila kantor pajak mempertanyakan laporan Anda",
      },
      {
        slug: "tax-management",
        text: "Menekan beban pajak sebelum transaksi terjadi",
      },
      {
        slug: "tax-litigation",
        text: "Bila terbit ketetapan yang Anda tidak setujui",
      },
    ],
  },
  {
    slug: "tax-accounting",
    name: "Tax Accounting",
    eyebrow: "Tax Accounting",
    subtitle: "Pembukuan & Laporan Keuangan Fiskal",
    intro:
      "Bukan sekadar rapi, tapi tahan diuji ketika pemeriksa menanyakan satu baris biaya dari tiga tahun lalu.",
    icon: "document",
    homeSummary: "Pembukuan, rekonsiliasi, dan laporan keuangan fiskal yang siap diperiksa kapan pun.",
    hub: {
      label: "Pembukuan & laporan keuangan fiskal",
      summary: "Rapi, terekonsiliasi, dan siap diperiksa kapan pun.",
      tags: ["Pembukuan", "Rekonsiliasi", "Koreksi Fiskal", "Ekualisasi"],
      wide: false,
    },
    forMe: [
      {
        title: "Catatan masih tersebar",
        text: "Excel, WhatsApp, dan buku tulis, tanpa ada yang merekonsiliasi.",
      },
      {
        title: "Banyak biaya tanpa bukti",
        text: "Uang keluar tercatat, dokumennya tidak ada.",
      },
      {
        title: "Laba terasa tidak masuk akal",
        text: "Angka di laporan tidak sesuai kenyataan dan tak ada yang bisa menjelaskan.",
      },
      {
        title: "Omzet mendekati Rp4,8 miliar",
        text: "Kewajiban menjadi jauh lebih ketat, dan Excel tidak lagi memadai.",
      },
    ],
    included: [
      "Penyusunan bagan akun sesuai jenis usaha Anda",
      "Penjurnalan, buku besar, dan rekonsiliasi bank bulanan",
      "Pencatatan persediaan dan harga pokok penjualan",
      "Penyusutan aset menurut ketentuan fiskal",
      "Koreksi fiskal beserta kertas kerjanya",
      "Ekualisasi omzet: SPT Badan versus PPN versus laporan keuangan",
    ],
    excluded: [
      "Audit laporan keuangan — itu kewenangan Kantor Akuntan Publik",
      "Pemrosesan penggajian dan administrasi BPJS",
      "Penilaian aset yang memerlukan penilai publik berizin",
    ],
    steps: [
      {
        title: "Diagnosis",
        text: "Apa yang sudah ada, apa yang hilang, dan sejauh mana bisa direkonstruksi.",
        timing: "Minggu 1–2",
      },
      {
        title: "Penataan struktur",
        text: "Bagan akun disusun ulang agar setiap transaksi punya tempat yang benar.",
        timing: "Minggu 2–3",
      },
      {
        title: "Rekonstruksi",
        text: "Transaksi dicatat mundur sampai titik yang disepakati.",
        timing: "Menyesuaikan volume",
      },
      {
        title: "Rekonsiliasi",
        text: "Kas, bank, piutang, utang, persediaan. Selisih tidak ditutup, selisih dijelaskan.",
        timing: "Setiap bulan",
      },
      {
        title: "Koreksi fiskal dan ekualisasi",
        text: "Laba komersial menjadi laba fiskal, dengan kertas kerja yang bisa ditunjukkan.",
        timing: "Bulanan dan tahunan",
      },
    ],
    deliverables: [
      {
        title: "Laporan keuangan bulanan",
        text: "Neraca, laba rugi, arus kas — bukan hanya saat tutup tahun.",
      },
      {
        title: "Kertas kerja koreksi fiskal",
        text: "Dokumen pertama yang diminta pemeriksa. Banyak perusahaan tidak punya.",
      },
      {
        title: "Kertas kerja ekualisasi",
        text: "Menjelaskan selisih omzet sebelum ditanyakan.",
      },
    ],
    caseStudy: {
      title: "Restoran tiga cabang",
      situation:
        "Omzet dari aplikasi pesan-antar dan QRIS tidak pernah dicocokkan dengan setoran bank, sehingga omzet di SPT selalu meleset.",
      action:
        "Kami bangun pembukuan dari rekening koran dan laporan aplikasi, lalu susun kertas kerja ekualisasi.",
      result:
        "Selisih yang sebelumnya tidak bisa dijelaskan kini punya dokumen pendukung yang siap ditunjukkan.",
    },
    whyUs: {
      title: "Kenapa kami",
      text: "Kami menyusun pembukuan sambil membayangkan bagaimana ia akan dipertanyakan. Karena kami rutin mendampingi pemeriksaan, kami tahu dokumen mana yang selalu diminta dan pos mana yang selalu dikoreksi.",
      credentials: [
        {
          label: "Izin Praktik Konsultan Pajak (BKP)",
          detail: "Tingkat A: KIP-6837/IP.A/PJ/2020\nTingkat B: KP-10818/IP.B/2025",
        },
        {
          label: "S2 Akuntansi Universitas Padjadjaran",
        },
        {
          label: "Pengalaman pendampingan pemeriksaan",
        },
      ],
    },
    faqs: [
      {
        question: "Catatan saya sangat berantakan, masih bisa?",
        answer:
          "Bisa, dan itu kondisi paling umum yang kami temui. Yang dibutuhkan bukan catatan rapi, melainkan bukti transaksinya: rekening koran, faktur, nota, bukti potong.",
      },
      {
        question: "Apa bedanya laba komersial dan laba fiskal?",
        answer:
          "Laba komersial menurut standar akuntansi; laba fiskal menurut UU PPh, yang tidak mengakui sebagian biaya. Selisihnya diuraikan dalam koreksi fiskal, dan pajak dihitung dari laba fiskal.",
      },
      {
        question: "Kenapa ekualisasi penting?",
        answer:
          "Karena Coretax mencocokkan otomatis omzet di SPT Badan dengan SPT PPN dan data lawan transaksi. Selisih yang tidak terjelaskan berpotensi memicu SP2DK.",
      },
      {
        question: "Software apa yang dipakai?",
        answer:
          "Menyesuaikan yang sudah Anda gunakan. Bila belum ada, kami usulkan yang sesuai skala usaha — dan datanya tetap milik Anda.",
      },
    ],
    related: [
      {
        slug: "tax-compliance",
        text: "Angka dari pembukuan ini yang dilaporkan",
      },
      {
        slug: "tax-audit",
        text: "Pembukuan rapi memperpendek pemeriksaan",
      },
      {
        slug: "tax-management",
        text: "Perencanaan hanya bisa dihitung dari angka yang benar",
      },
      {
        slug: "tax-litigation",
        text: "Kertas kerja adalah alat bukti dalam sengketa",
      },
    ],
  },
  {
    slug: "tax-management",
    name: "Tax Management",
    eyebrow: "Tax Management",
    subtitle: "Perencanaan Pajak",
    intro:
      "Setelah transaksi selesai, Anda tinggal menghitung pajaknya. Sebelum terjadi, pilihan Anda masih banyak.",
    icon: "trend",
    homeSummary: "Perencanaan pajak yang sah untuk menekan beban pajak dan mendukung ekspansi usaha.",
    hub: {
      label: "Perencanaan pajak",
      summary:
        "Bentuk badan usaha, kepemilikan aset, dan skema transaksi yang menekan pajak secara sah — dengan simulasi angka dan dasar hukumnya. Termasuk pemetaan ulang setelah PP 20 Tahun 2026.",
      tags: ["PT vs CV", "Pembelian aset", "Pasal 31E", "Dividen", "Royalti & endorse", "PP 20/2026"],
      wide: true,
    },
    forMe: [
      {
        title: "Akan membeli aset besar",
        text: "Atas nama siapa dan dari sumber dana apa menentukan konsekuensinya bertahun-tahun.",
      },
      {
        title: "Menimbang PT, CV, atau pribadi",
        text: "PP 20 Tahun 2026 mengubah perhitungan yang tahun lalu masih benar.",
      },
      {
        title: "Omzet mendekati Rp4,8 miliar",
        text: "Status PKP dan skema PPh berubah, lebih baik disiapkan daripada ditunggu.",
      },
      {
        title: "Penghasilan dari royalti atau endorse",
        text: "Yang tidak dipotong pihak lain hampir selalu menimbulkan PPh Pasal 29 besar.",
      },
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
      "Jaminan beban pajak nol — perencanaan menekan, bukan menghapus",
      "Restrukturisasi penghasilan dari hubungan kerja; itu tidak dapat dialihkan ke badan usaha",
    ],
    steps: [
      {
        title: "Pemetaan kondisi",
        text: "Penghasilan, aset, struktur usaha, dan rencana Anda dua sampai tiga tahun ke depan.",
        timing: "Pertemuan pertama",
      },
      {
        title: "Hitung posisi sekarang",
        text: "Berapa sebenarnya beban pajak Anda hari ini, dari data nyata.",
        timing: "Minggu 1",
      },
      {
        title: "Susun skenario",
        text: "Dua sampai empat skenario, masing-masing dengan angka, syarat, dan risikonya.",
        timing: "Minggu 1–2",
      },
      {
        title: "Presentasi perbandingan",
        text: "Selisihnya ditunjukkan berdampingan, dalam bentuk yang bisa dibaca tanpa latar akuntansi.",
        timing: "Pertemuan kedua",
      },
      {
        title: "Kajian tertulis",
        text: "Skenario pilihan Anda dituangkan menjadi dokumen dengan dasar hukum lengkap.",
        timing: "Minggu 3",
      },
    ],
    deliverables: [
      {
        title: "Perbandingan skenario",
        text: "Tabel angka berdampingan, bukan penjelasan naratif.",
      },
      {
        title: "Dokumen kajian",
        text: "Setiap rekomendasi disertai pasal yang menjadi dasarnya.",
      },
      {
        title: "Daftar risiko dan syarat",
        text: "Apa yang menjaga skema tetap sah, dan apa yang membatalkannya.",
      },
    ],
    caseStudy: {
      title: "Kreator dengan penghasilan endorse dan royalti",
      situation:
        "Seluruh penghasilan diterima atas nama pribadi tanpa pemotongan, sehingga PPh Pasal 29 membengkak setiap akhir tahun.",
      action:
        "Kami hitung ulang tiga skenario bentuk badan usaha, lengkap dengan syarat dan risiko masing-masing.",
      result: "Klien memilih skema dengan beban pajak terendah yang tetap bisa dipertahankan bila diperiksa.",
    },
    whyUs: {
      title: "Kenapa kami",
      text: "Banyak skema perencanaan terlihat menarik di atas kertas dan runtuh saat pemeriksaan. Kami menyusunnya dengan pertanyaan lain: kalau ini dipertanyakan pemeriksa, sanggupkah kami mempertahankannya sampai Pengadilan Pajak? Kalau tidak, skema itu tidak kami tawarkan.",
      credentials: [
        {
          label: "Izin Praktik Konsultan Pajak (BKP)",
          detail: "Tingkat A: KIP-6837/IP.A/PJ/2020\nTingkat B: KP-10818/IP.B/2025",
        },
        {
          label: "Kuasa Hukum Pengadilan Pajak",
          detail: "1507/PP/IKH/2023",
        },
        {
          label: "Advokat PERADI",
          detail: "08-02598/PERADI-PKPA/V/25",
        },
      ],
    },
    faqs: [
      {
        question: "Apakah perencanaan pajak itu legal?",
        answer:
          "Ya. Perencanaan pajak memanfaatkan ketentuan yang berlaku, berbeda dengan penggelapan yang menyembunyikan data. Setiap rekomendasi kami disertai dasar hukumnya.",
      },
      {
        question: "Apa yang berubah setelah PP 20 Tahun 2026?",
        answer:
          "PT biasa dan CV tidak lagi memenuhi syarat PPh final 0,5% dan beralih ke tarif umum. Bagi sebagian usaha ini justru menguntungkan karena fasilitas Pasal 31E; bagi yang margin tipis bisa berat. Harus dihitung per kasus.",
      },
      {
        question: "Apakah CV selalu lebih hemat dari PT?",
        answer:
          "Tidak. Bagian laba sekutu CV memang dikecualikan menurut Pasal 4 ayat (3) huruf i UU PPh, tetapi Pasal 9 ayat (1) huruf j melarang gaji sekutu dibiayakan. Keunggulannya jauh lebih sempit daripada yang umum dibayangkan.",
      },
      {
        question: "Bisakah penghasilan saya sebagai karyawan dialihkan ke PT?",
        answer:
          "Tidak. Penghasilan dari hubungan kerja melekat pada orang pribadi, dan upaya semacam ini termasuk temuan pemeriksaan yang paling mudah dibuktikan.",
      },
    ],
    related: [
      {
        slug: "tax-accounting",
        text: "Perencanaan dihitung dari angka yang benar",
      },
      {
        slug: "tax-compliance",
        text: "Skema yang dipilih harus dijalankan konsisten",
      },
      {
        slug: "tax-audit",
        text: "Bila skema dipertanyakan, kami yang mempertahankan",
      },
      {
        slug: "tax-litigation",
        text: "Upaya hukum bila koreksi tetap terbit",
      },
    ],
  },
  {
    slug: "tax-audit",
    name: "Tax Audit",
    eyebrow: "Tax Audit",
    subtitle: "Pendampingan SP2DK & Pemeriksaan",
    intro:
      "Surat pertama menentukan arah seluruh perkara. Tanggapan yang keliru di tahap awal yang membuat selisih kecil berubah jadi ketetapan besar.",
    icon: "checklist",
    homeSummary: "Pendampingan penuh selama pemeriksaan pajak — dari penyiapan dokumen hingga selesai.",
    hub: {
      label: "Pendampingan SP2DK & pemeriksaan pajak",
      summary: "Ditangani sebelum selisih berubah menjadi ketetapan.",
      tags: ["SP2DK", "Pemeriksaan", "SPHP", "Restitusi PPN"],
      wide: false,
    },
    forMe: [
      {
        title: "Menerima SP2DK",
        text: "Ada data yang berbeda dengan SPT Anda, dan tenggatnya dekat.",
      },
      {
        title: "Terbit Surat Perintah Pemeriksaan",
        text: "Pemeriksaan resmi dimulai dan seluruh dokumen Anda akan diuji.",
      },
      {
        title: "Ada permintaan peminjaman dokumen",
        text: "Apa yang Anda serahkan, dan apa yang tidak, punya konsekuensi hukum.",
      },
      {
        title: "Mengajukan restitusi PPN",
        text: "Setiap permohonan restitusi berujung pemeriksaan.",
      },
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
      "Jaminan tidak ada koreksi — tidak ada konsultan yang bisa menjanjikan itu secara jujur",
      "Penyusunan dokumen yang tidak mencerminkan transaksi sebenarnya",
      "Upaya hukum setelah SKP terbit — itu Tax Litigation",
    ],
    steps: [
      {
        title: "Baca surat, jangan langsung jawab",
        text: "Kami identifikasi dasar hukumnya, data yang dipermasalahkan, dan tenggat sebenarnya.",
        timing: "Hari 1–2",
      },
      {
        title: "Telusuri sumber selisih",
        text: "Apakah benar ada kesalahan, atau hanya beda cara membaca data.",
        timing: "Hari 2–5",
      },
      {
        title: "Susun tanggapan",
        text: "Tanggapan yang menjelaskan, bukan sekadar membantah.",
        timing: "Tenggat SP2DK: 14 hari",
      },
      {
        title: "Siapkan dokumen dan dampingi",
        text: "Dokumen ditata, setiap pertemuan kami buatkan notulen.",
        timing: "Peminjaman dokumen: 1 bulan",
      },
      {
        title: "Tanggapi SPHP",
        text: "Kesempatan terakhir menurunkan koreksi sebelum SKP terbit.",
        timing: "7 hari kerja",
      },
    ],
    deliverables: [
      {
        title: "Analisis surat",
        text: "Apa yang sebenarnya ditanyakan, atas dasar apa, dan apa risikonya.",
      },
      {
        title: "Tanggapan tertulis dan lampiran",
        text: "Jejak resmi posisi Anda sepanjang perkara.",
      },
      {
        title: "Notulen setiap pertemuan",
        text: "Berguna bila perkara berlanjut ke keberatan atau banding.",
      },
    ],
    caseStudy: {
      title: "Klinik kesehatan, menerima SP2DK",
      situation:
        "Selisih muncul karena pembayaran jasa dokter dicatat berbeda dengan bukti potong yang dilaporkan.",
      action:
        "Kami telusuri sumber selisihnya dan susun tanggapan berikut lampiran pendukung dalam sembilan hari.",
      result: "Perkara selesai di tahap pengawasan, tanpa berlanjut menjadi pemeriksaan.",
    },
    whyUs: {
      title: "Kenapa kami",
      text: "Pemeriksaan sebaiknya ditangani pihak yang tahu ke mana perkara bisa berlanjut. Konsultan tanpa izin kuasa hukum akan berhenti saat SKP terbit, dan Anda harus menjelaskan ulang seluruh perkara kepada orang baru.",
      credentials: [
        {
          label: "Izin Praktik Konsultan Pajak (BKP)",
          detail: "Tingkat A: KIP-6837/IP.A/PJ/2020\nTingkat B: KP-10818/IP.B/2025",
        },
        {
          label: "Kuasa Hukum Pengadilan Pajak",
          detail: "1507/PP/IKH/2023",
        },
        {
          label: "Advokat PERADI",
          detail: "08-02598/PERADI-PKPA/V/25",
        },
      ],
    },
    faqs: [
      {
        question: "Saya menerima SP2DK, apakah berarti diperiksa?",
        answer:
          "Belum. SP2DK adalah permintaan penjelasan pada tahap pengawasan. Tetapi tanggapan yang keliru atau terlambat dapat membuatnya berlanjut menjadi pemeriksaan, dan di tahap itu ruang gerak Anda jauh lebih sempit.",
      },
      {
        question: "Berapa lama waktu untuk menanggapi?",
        answer:
          "SP2DK umumnya 14 hari. Peminjaman dokumen dalam pemeriksaan satu bulan. Tanggapan SPHP hanya tujuh hari kerja. Tenggat inilah yang paling sering terlewat oleh yang menangani sendiri.",
      },
      {
        question: "Boleh saya menjawab sendiri?",
        answer:
          "Boleh. Yang perlu disadari: tanggapan tertulis Anda menjadi bagian berkas perkara dan akan dibaca kembali di tahap keberatan maupun banding. Pernyataan yang terlanjur diberikan sulit ditarik.",
      },
      {
        question: "Bisakah dijamin tidak ada koreksi?",
        answer:
          "Tidak, dan konsultan yang menjanjikan itu sebaiknya dihindari. Yang bisa kami pastikan: setiap koreksi diuji dasar hukumnya, dan yang tidak berdasar tidak Anda terima begitu saja.",
      },
    ],
    related: [
      {
        slug: "tax-litigation",
        text: "Langkah berikutnya bila SKP tetap terbit",
      },
      {
        slug: "tax-accounting",
        text: "Pembukuan rapi memperpendek pemeriksaan",
      },
      {
        slug: "tax-compliance",
        text: "Pencegahan terbaik adalah pelaporan konsisten",
      },
      {
        slug: "tax-management",
        text: "Menutup celah yang berpotensi dipertanyakan",
      },
    ],
  },
  {
    slug: "tax-litigation",
    name: "Tax Litigation",
    eyebrow: "Tax Litigation",
    subtitle: "Keberatan, Banding, Gugatan & Peninjauan Kembali",
    intro: "SKP bukan kata akhir. Tapi tenggatnya tidak bisa dimundurkan — terlewat sehari, hak Anda gugur.",
    icon: "scale",
    homeSummary: "Keberatan, banding, dan gugatan di Pengadilan Pajak — diwakili kuasa hukum berizin.",
    hub: {
      label: "Keberatan, banding, gugatan & peninjauan kembali",
      summary: "Diwakili kuasa hukum berizin, sampai Mahkamah Agung.",
      tags: ["Keberatan", "Banding", "Gugatan", "Peninjauan Kembali"],
      wide: false,
    },
    forMe: [
      {
        title: "Terbit SKPKB atau SKPKBT",
        text: "Ada ketetapan kurang bayar yang menurut Anda tidak berdasar.",
      },
      {
        title: "Keberatan Anda ditolak",
        text: "Langkah berikutnya adalah Pengadilan Pajak.",
      },
      {
        title: "Ada tindakan penagihan",
        text: "Surat Paksa atau penyitaan ditempuh lewat Gugatan, bukan Banding.",
      },
      {
        title: "Putusan Pengadilan Pajak merugikan",
        text: "Masih tersisa satu upaya luar biasa: Peninjauan Kembali.",
      },
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
      "Jaminan kemenangan — tidak ada kuasa hukum yang dapat menjanjikan putusan",
      "Upaya hukum yang tenggatnya sudah lewat; hak yang gugur tidak dapat dipulihkan",
      "Perkara pidana perpajakan pada tahap penyidikan",
    ],
    steps: [
      {
        title: "Analisis kelayakan",
        text: "Kami sampaikan terbuka bila perkara ini lebih baik tidak dilanjutkan.",
        timing: "Sebelum langkah apa pun",
      },
      {
        title: "Keberatan ke DJP",
        text: "Diajukan atas SKP, diputus oleh Direktorat Jenderal Pajak.",
        timing: "3 bulan sejak SKP dikirim (Pasal 25 UU KUP)",
      },
      {
        title: "Banding ke Pengadilan Pajak",
        text: "Diajukan atas Keputusan Keberatan yang tidak memuaskan.",
        timing: "3 bulan sejak keputusan diterima (Pasal 27 UU KUP)",
      },
      {
        title: "Gugatan",
        text: "Jalur terpisah untuk tindakan penagihan dan keputusan tertentu.",
        timing: "30 hari (Pasal 40 UU Pengadilan Pajak)",
      },
      {
        title: "Peninjauan Kembali",
        text: "Upaya luar biasa atas Putusan Pengadilan Pajak, dengan alasan yang dibatasi undang-undang.",
        timing: "3 bulan (Pasal 91–92 UU PP)",
      },
    ],
    deliverables: [
      {
        title: "Analisis kelayakan tertulis",
        text: "Penilaian jujur atas peluang Anda, termasuk ketika jawabannya jangan dilanjutkan.",
      },
      {
        title: "Seluruh berkas upaya hukum",
        text: "Keberatan, Banding, Bantahan, Gugatan, atau Memori PK.",
      },
      {
        title: "Perhitungan risiko sanksi",
        text: "Agar keputusan Anda berbasis angka, bukan perasaan.",
      },
    ],
    caseStudy: {
      title: "Developer properti, koreksi peredaran usaha",
      situation:
        "Pemeriksa mengoreksi omzet atas penyerahan yang menurut klien belum terjadi. Keberatan ditolak.",
      action:
        "Kami lanjutkan ke Banding di Pengadilan Pajak sebagai kuasa hukum, dengan argumen pada saat terutangnya penghasilan menurut UU PPh.",
      result: "Perkara diperiksa majelis dengan posisi klien terdokumentasi lengkap sejak tahap pemeriksaan.",
    },
    whyUs: {
      title: "Kenapa kami",
      text: "Tidak semua konsultan pajak dapat mewakili Anda di Pengadilan Pajak; itu memerlukan Izin Kuasa Hukum yang diterbitkan khusus. Managing Partner kami memegang izin tersebut sekaligus Kartu Advokat PERADI.",
      credentials: [
        {
          label: "Kuasa Hukum Pengadilan Pajak",
          detail: "1507/PP/IKH/2023",
        },
        {
          label: "Advokat PERADI",
          detail: "08-02598/PERADI-PKPA/V/25",
        },
        {
          label: "Izin Praktik Konsultan Pajak (BKP)",
          detail: "Tingkat A: KIP-6837/IP.A/PJ/2020\nTingkat B: KP-10818/IP.B/2025",
        },
      ],
    },
    faqs: [
      {
        question: "Apa bedanya Keberatan, Banding, dan Gugatan?",
        answer:
          "<b>Keberatan</b> diajukan ke Direktorat Jenderal Pajak atas Surat Ketetapan Pajak. <b>Banding</b> diajukan ke Pengadilan Pajak atas Keputusan Keberatan. <b>Gugatan</b> adalah jalur terpisah ke Pengadilan Pajak, terutama atas pelaksanaan penagihan. Salah memilih jalur dapat membuat permohonan tidak diterima.",
      },
      {
        question: "Berapa tenggat setiap upaya hukum?",
        answer:
          "Keberatan 3 bulan sejak SKP dikirim. Banding 3 bulan sejak Keputusan Keberatan diterima. Gugatan atas penagihan 30 hari. Peninjauan Kembali 3 bulan. Tenggat ini bersifat gugur.",
      },
      {
        question: "Ada risiko kalau permohonan saya ditolak?",
        answer:
          "Ada, dan harus dihitung sejak awal. UU KUP mengenakan sanksi administrasi berupa denda atas pajak yang belum dibayar bila keberatan atau banding ditolak atau dikabulkan sebagian. Karena itu langkah pertama kami selalu analisis kelayakan.",
      },
      {
        question: "Apakah saya harus hadir di persidangan?",
        answer:
          "Umumnya tidak. Sebagai kuasa hukum, kami yang mewakili Anda. Kehadiran Anda diperlukan hanya bila majelis memintanya.",
      },
    ],
    related: [
      {
        slug: "tax-audit",
        text: "Tahap sebelum ketetapan terbit",
      },
      {
        slug: "tax-accounting",
        text: "Kertas kerja menjadi alat bukti",
      },
      {
        slug: "tax-management",
        text: "Mencegah sengketa berikutnya",
      },
      {
        slug: "tax-compliance",
        text: "Menjaga kepatuhan selama perkara berjalan",
      },
    ],
  },
];

export const serviceGroups: ServiceGroup[] = [
  {
    number: "01",
    title: "Rutin belum ada yang pegang",
    subtitle: "Berjalan tanpa Anda harus memikirkannya.",
    services: ["tax-compliance", "tax-accounting"],
  },
  {
    number: "02",
    title: "Sedang berurusan dengan kantor pajak",
    subtitle: "Dari surat pertama sampai putusan akhir.",
    services: ["tax-audit", "tax-litigation"],
  },
  {
    number: "03",
    title: "Ingin tumbuh, tanpa pajak ikut meledak",
    subtitle: "Diputuskan sebelum transaksi, bukan sesudah.",
    services: ["tax-management"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

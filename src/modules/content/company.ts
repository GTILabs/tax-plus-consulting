import { licenses } from "./site";

/* Approved copy from the prototype (taxplus-website-prototipe.html). */

export type SectorIcon = "hiburan" | "talent" | "properti" | "manufaktur" | "kesehatan" | "retail" | "logistik";

/** "Kami paham sektor Anda". No client names. */
export const sectors: { icon: SectorIcon; name: string; issue: string; featured?: boolean }[] = [
  { icon: "hiburan", name: "Hiburan, Media & Kreator", issue: "Honor, royalti, endorsement, dan pendapatan platform.", featured: true },
  { icon: "talent", name: "Manajemen Talent & Agensi", issue: "Pemisahan dana talent dan pemotongan PPh.", featured: true },
  { icon: "properti", name: "Properti & Developer", issue: "PPh final pengalihan hak dan saat terutangnya." },
  { icon: "manufaktur", name: "Manufaktur & Industri", issue: "HPP, restitusi PPN, dan penyusutan fiskal." },
  { icon: "kesehatan", name: "Kesehatan & Klinik", issue: "PPh jasa dokter dan pembukuan multi-cabang." },
  { icon: "retail", name: "F&B, Fashion & Retail", issue: "Rekonsiliasi omzet QRIS, aplikasi, dan marketplace." },
  { icon: "logistik", name: "Pelayaran & Logistik", issue: "PPh jasa pelayaran dan PPN jasa angkutan." },
];

/** General "Cara kerja" (homepage and services hub). */
export const workSteps = [
  { title: "Konsultasi awal", text: "Ceritakan kebutuhan Anda melalui WhatsApp atau pertemuan.", timing: "Hari pertama" },
  { title: "Penelaahan dokumen", text: "Kami pelajari data, surat, dan posisi pajak Anda.", timing: "1–3 hari kerja" },
  { title: "Rekomendasi dan eksekusi", text: "Langkah kerja, jadwal, dan biaya disepakati lalu dijalankan.", timing: "Sesuai jadwal" },
  { title: "Laporan berkala", text: "Satu PIC melaporkan status pekerjaan secara rutin.", timing: "Rutin sampai selesai" },
];

export const servicePromises = ["Dibalas di hari kerja yang sama", "Satu PIC untuk setiap klien", "Laporan status berkala"];

export type CredentialIcon = "shield" | "scale" | "briefcase" | "medal";

/** "Mengapa TaxPlus?": four verifiable credentials. */
export const credentials: { icon: CredentialIcon; title: string; text: string; issuer: string; number: string }[] = [
  {
    icon: "shield",
    title: "Izin Praktik Konsultan Pajak tingkat A dan B",
    text: "Berwenang menangani wajib pajak orang pribadi dan badan.",
    issuer: "Direktorat Jenderal Pajak",
    number: `${licenses.practiceA} · ${licenses.practiceB}`,
  },
  {
    icon: "scale",
    title: "Kuasa Hukum Pengadilan Pajak",
    text: "Sengketa ditangani langsung sampai persidangan, tanpa dialihkan ke pihak lain.",
    issuer: "Sekretariat Pengadilan Pajak",
    number: licenses.taxCourt,
  },
  {
    icon: "briefcase",
    title: "Advokat",
    text: "Pemahaman hukum acara dan perjanjian, di luar urusan teknis pajak.",
    issuer: "PERADI",
    number: "Kartu Advokat aktif",
  },
  {
    icon: "medal",
    title: "Anggota Tetap IKPI",
    text: "Terikat kode etik dan standar profesi konsultan pajak.",
    issuer: "Ikatan Konsultan Pajak Indonesia",
    number: `No. Anggota ${licenses.ikpiMember}`,
  },
];

export const homeFaqs = [
  {
    question: "Kapan perusahaan perlu konsultan pajak?",
    answer: "Ketika transaksi makin banyak, tidak ada staf pajak khusus, atau ada surat dari kantor pajak yang harus ditanggapi.",
  },
  {
    question: "Bagaimana kerahasiaan data klien dijaga?",
    answer: "Data hanya diakses tim yang menangani, disimpan di penyimpanan terkendali, dan dilindungi kewajiban kerahasiaan profesi.",
  },
  {
    question: "Apakah melayani klien di luar Bandung?",
    answer: "Ya. Pekerjaan kepatuhan dikerjakan daring, dan pendampingan tatap muka bisa diatur.",
  },
  {
    question: "Berapa biaya jasa TaxPlus?",
    answer:
      "Konsultasi awal 15 menit tidak dipungut biaya. Biaya jasa selanjutnya disesuaikan dengan ruang lingkup dan volume pekerjaan, dan disampaikan tertulis sebelum pekerjaan dimulai.",
  },
  {
    question: "Apakah bisa mendampingi pemeriksaan sampai sengketa?",
    answer: "Bisa. Pimpinan kami memegang Izin Kuasa Hukum Pengadilan Pajak dan Kartu Advokat PERADI.",
  },
];

export type Person = {
  name: string;
  role: string;
  photo?: { src: string; width: number; height: number };
  initials: string;
  profile: string;
  points: string[];
};

export const pioneer: Person = {
  name: "Kalam Al-Iqbal, S.Ak., S.H., M.Ak., BKP",
  role: "Pioneer & Managing Partner",
  photo: { src: "/images/photos/kalam-al-iqbal.jpg", width: 900, height: 1200 },
  initials: "KA",
  profile:
    "Lebih dari 10 tahun menangani kepatuhan dan sengketa pajak, dengan latar pendidikan perpajakan, akuntansi, dan hukum.",
  points: [
    "Izin Praktik Konsultan Pajak tingkat A dan B",
    "Izin Kuasa Hukum Pengadilan Pajak",
    "Advokat, Kartu PERADI",
    "Anggota Tetap IKPI",
    "S-2 Akuntansi Universitas Padjadjaran, S-1 Ilmu Hukum Universitas Kristen Maranatha",
  ],
};

export const partners: Person[] = [
  {
    name: "Adv. Budi Indratno, S.H., S.E., M.Ak., BKP, CTL, C-Med",
    role: "Partner",
    photo: { src: "/images/photos/partners/budi-indratno.jpg", width: 270, height: 374 },
    initials: "BI",
    profile:
      "Praktisi perpajakan dan akuntansi dengan pengalaman lebih dari 27 tahun. Pernah menjabat Kepala Departemen Pajak dan Akuntansi di PT Agansa Primatama.",
    points: [
      "Konsultan Pajak bersertifikat (BKP) dengan izin praktik dari Direktorat Jenderal Pajak",
      "Sertifikat Brevet B",
      "Anggota IKPI Cabang Bandung",
      "Advokat, anggota Asosiasi Advokat Indonesia (AAI)",
      "Dosen di perguruan tinggi di Bandung",
    ],
  },
  {
    name: "Nazmi Muslim, S.E., M.Ak., BKP",
    role: "Partner",
    photo: { src: "/images/photos/partners/nazmi-muslim.jpg", width: 250, height: 357 },
    initials: "NM",
    profile:
      "Berkarier di bidang perpajakan sejak 2007, termasuk di Sinarmas dan PT Nindya Karya (Persero). Berpengalaman di sektor kontraktor, dari kepatuhan sampai pemeriksaan, keberatan, dan banding.",
    points: [
      "Izin Praktik Konsultan Pajak tingkat B",
      "Sertifikat Brevet B",
      "Anggota IKPI Cabang Bandung",
      "Instruktur Brevet Pajak A dan B, dosen tamu",
      "S-1 Akuntansi Universitas Pancasila, D-III Perpajakan Universitas Padjadjaran",
    ],
  },
];

/** "Our Team": roles only, no names. Roles are still examples (brief); photos pending. */
export const staffRoles = ["Tax Supervisor", "Senior Tax Staff", "Tax Staff", "Accounting Staff", "Admin & Finance"];

export const companyLegal = [
  { icon: "doc", label: "Akta Pendirian", value: "No. 01, 18 Agustus 2022", note: "Notaris Diana Roselina, S.H., M.Kn" },
  { icon: "id", label: "Nomor Induk Berusaha", value: "1609220272616", note: "Terdaftar di OSS" },
  { icon: "grid", label: "KBLI", value: "69201 · 69202", note: "Konsultan pajak; akuntansi, pembukuan, dan pemeriksaan" },
] as const;

export const aboutPromises = [
  { icon: "chat", title: "Dibalas di hari kerja yang sama", text: "Pertanyaan klien tidak dibiarkan menggantung." },
  { icon: "team", title: "Satu PIC untuk setiap klien", text: "Satu penanggung jawab yang mengenal data dan riwayat pajak Anda." },
  { icon: "doc", title: "Laporan status berkala", text: "Anda selalu tahu sampai mana pekerjaan berjalan." },
  { icon: "scale", title: "Didampingi sampai ruang sidang", text: "Sengketa tidak dialihkan ke pihak lain." },
] as const;

/** Client logos that have been approved for display (brief: up to 10). Empty until provided. */
export const clientLogos: { name: string; src: string }[] = [];

/* Career page. Positions are maintained by the admin. */
export const careerPerks = [
  { icon: "book", title: "Belajar dari praktisi berizin", text: "Bekerja langsung dengan konsultan pajak tingkat A dan B serta kuasa hukum Pengadilan Pajak." },
  { icon: "scale", title: "Kasus nyata, beragam sektor", text: "Dari hiburan dan media, properti, manufaktur, sampai kesehatan." },
  { icon: "ladder", title: "Jalur pengembangan", text: "Didorong mengikuti Brevet dan sertifikasi konsultan pajak." },
  { icon: "team", title: "Tim kecil, peran besar", text: "Kontribusi Anda terlihat langsung oleh klien dan pimpinan." },
] as const;

export const jobOpenings = [
  {
    title: "Sales Marketing",
    type: "Penuh waktu",
    location: "Bandung",
    text: "Mengembangkan klien baru untuk layanan pajak dan pembukuan, menindaklanjuti prospek, dan menjaga hubungan dengan klien.",
  },
  {
    title: "Program Magang Pajak & Akuntansi",
    type: "Magang",
    location: "Bandung",
    text: "Untuk mahasiswa akuntansi dan perpajakan yang ingin belajar langsung pekerjaan kepatuhan, pembukuan, dan pendampingan klien.",
  },
];

export const recruitmentSteps = [
  { title: "Kirim lamaran", text: "CV, surat lamaran, dan portofolio bila ada." },
  { title: "Seleksi berkas", text: "Tim meninjau kesesuaian dengan posisi." },
  { title: "Tes & wawancara", text: "Tes dasar pajak atau akuntansi, lalu wawancara." },
  { title: "Bergabung", text: "Orientasi dan pendampingan di minggu pertama." },
];

export const APPLICATION_SUBJECT = "Lamaran - [Posisi] - [Nama]";

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
    answer: "Ketika **transaksi makin banyak**, **tidak ada staf pajak khusus**, atau ada **surat dari kantor pajak** yang harus ditanggapi.",
  },
  {
    question: "Bagaimana kerahasiaan data klien dijaga?",
    answer: "Data **hanya diakses tim yang menangani**, disimpan di penyimpanan terkendali, dan dilindungi **kewajiban kerahasiaan profesi**.",
  },
  {
    question: "Apakah melayani klien di luar Bandung?",
    answer: "Ya. Pekerjaan kepatuhan **dikerjakan daring**, dan **pendampingan tatap muka** bisa diatur.",
  },
  {
    question: "Berapa biaya jasa TaxPlus?",
    answer:
      "Konsultasi awal **15 menit tidak dipungut biaya**. Biaya jasa selanjutnya disesuaikan dengan ruang lingkup dan volume pekerjaan, dan **disampaikan tertulis sebelum pekerjaan dimulai**.",
  },
  {
    question: "Apakah bisa mendampingi pemeriksaan sampai sengketa?",
    answer: "Bisa. Pimpinan kami memegang **Izin Kuasa Hukum Pengadilan Pajak** dan **Kartu Advokat PERADI**.",
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
  photo: { src: "/images/photos/kalam-al-iqbal-2026.webp", width: 900, height: 1351 },
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
    photo: { src: "/images/photos/partners/budi-indratno.webp", width: 460, height: 688 },
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
    photo: { src: "/images/photos/partners/nazmi-muslim.webp", width: 900, height: 1350 },
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

/**
 * "Our Team": portrait 4:5, full name and role. Order, names and roles from the
 * "STRUKTUR ORGANISASI" document on the TaxPlus Google Drive (photos cropped to 4:5).
 */
export const staff: { name: string; role: string; photo: string }[] = [
  { name: "Intan Aprilliyanti", role: "Finance & Legal", photo: "/images/photos/staff/intan-aprilliyanti.webp" },
  { name: "Muhammad Lutfy Fauzan", role: "Head of Accounting", photo: "/images/photos/staff/staff-02.webp" },
  { name: "Resa Septiani", role: "Head of Tax", photo: "/images/photos/staff/staff-03.webp" },
  { name: "Naura Syifa Annisa", role: "Tax & Accounting Staff", photo: "/images/photos/staff/staff-04.webp" },
  { name: "Sean Clasica Rahma", role: "Tax & Accounting Staff", photo: "/images/photos/staff/staff-05.webp" },
  { name: "Dwi Agustina", role: "Tax & Accounting Staff", photo: "/images/photos/staff/dwi-agustina.webp" },
  { name: "Xeisha Neville Evangeline", role: "Tax & Accounting Staff", photo: "/images/photos/staff/staff-07.webp" },
  { name: "Haris Yoviana Iskandar Putra", role: "Tax & Accounting Staff", photo: "/images/photos/staff/haris-yoviana.webp" },
];

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

/** Client logos approved for display, from the "Logo Klien" Drive folder (Oct 2026). */
export const clientLogos: { name: string; src: string; width: number; height: number }[] = [
  { name: "Rumah Sakit Humana Prima", src: "/images/clients/humana-prima.webp", width: 253, height: 200 },
  { name: "SSOM Studio", src: "/images/clients/ssom-studio.webp", width: 384, height: 149 },
  { name: "BNI", src: "/images/clients/bni.webp", width: 431, height: 126 },
  { name: "Yaoyao", src: "/images/clients/yaoyao.webp", width: 200, height: 200 },
  { name: "Chitose", src: "/images/clients/chitose.webp", width: 480, height: 147 },
  { name: "Pasming Space", src: "/images/clients/pasming-space.webp", width: 441, height: 200 },
  { name: "PT Hongyi Asset Manajemen", src: "/images/clients/hongyi-asset-manajemen.webp", width: 203, height: 200 },
  { name: "Petit Bite", src: "/images/clients/petit-bite.webp", width: 200, height: 200 },
  { name: "CV Bhakti Putra Gemilang", src: "/images/clients/bhakti-putra-gemilang.webp", width: 199, height: 200 },
  { name: "CV Abadi Daya Perkasa", src: "/images/clients/abadi-daya-perkasa.webp", width: 455, height: 200 },
  { name: "CV Laju Gerak Pemuda", src: "/images/clients/laju-gerak-pemuda.webp", width: 356, height: 200 },
  { name: "CV Karunia Amanah", src: "/images/clients/karunia-amanah.webp", width: 200, height: 200 },
];

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

export const APPLICATION_SUBJECT = "Lamaran – [Posisi] – [Nama]";

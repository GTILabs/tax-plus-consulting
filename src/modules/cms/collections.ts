import type { IconName } from "@/components/ui/icons";
import type { DataOf, Field, Option } from "./fields";

/* Every CMS collection and settings group. Adding a field here adds it to the admin form. */

const ICONS: Record<IconName, string> = {
  compliance: "Kepatuhan",
  accounting: "Akuntansi",
  management: "Manajemen",
  audit: "Pemeriksaan",
  litigation: "Litigasi",
  hiburan: "Hiburan & media",
  talent: "Talent",
  properti: "Properti",
  manufaktur: "Manufaktur",
  kesehatan: "Kesehatan",
  retail: "Retail",
  logistik: "Logistik",
  shield: "Perisai",
  scale: "Timbangan",
  briefcase: "Tas kerja",
  medal: "Medali",
  pin: "Lokasi",
  chat: "Percakapan",
  mail: "Surat",
  clock: "Jam",
  book: "Buku",
  ladder: "Tangga",
  team: "Tim",
  doc: "Dokumen",
  download: "Unduh",
  id: "Kartu identitas",
  grid: "Kisi",
  form: "Formulir",
  trend: "Grafik naik",
  report: "Laporan",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  threads: "Threads",
  youtube: "YouTube",
  star: "Bintang",
  calendar: "Kalender",
};

const iconOptions = Object.entries(ICONS).map(([value, label]) => ({ value: value as IconName, label }));
const options = <const T extends string>(values: readonly T[]) => values.map((value) => ({ value, label: value }));

export const ARTICLE_CATEGORIES = ["PPh", "PPN", "Coretax", "Pemeriksaan", "Sengketa", "UMKM"] as const;

const qa = [
  { type: "text", name: "question", label: "Pertanyaan", required: true },
  { type: "textarea", name: "answer", label: "Jawaban", required: true, hint: "Tulis **teks** untuk menebalkan kata kunci." },
] as const satisfies readonly Field[];

const step = [
  { type: "text", name: "title", label: "Judul", required: true },
  { type: "textarea", name: "text", label: "Keterangan", rows: 2 },
  { type: "text", name: "timing", label: "Waktu", placeholder: "mis. 1–3 hari kerja" },
] as const satisfies readonly Field[];

const iconCard = [
  { type: "select", name: "icon", label: "Ikon", options: iconOptions },
  { type: "text", name: "title", label: "Judul", required: true },
  { type: "textarea", name: "text", label: "Keterangan", rows: 2 },
] as const satisfies readonly Field[];

export type CollectionDef = {
  key: string;
  label: string;
  singular: string;
  icon: IconName;
  description: string;
  fields: readonly Field[];
  /** Field whose value becomes the unique slug (used in URLs). */
  slugField?: string;
  /** Field shown as the item title in lists. */
  titleField: string;
  /** Extra columns in the list. */
  columns?: readonly string[];
  imageField?: string;
  /** Manual order (drag up/down) or by a date field, newest first. */
  order: "manual" | { field: string };
  /** Items can be saved as draft (hidden on the site). */
  drafts?: boolean;
};

export const collections = {
  articles: {
    key: "articles",
    label: "Artikel",
    singular: "artikel",
    icon: "doc",
    description: "Artikel di halaman Artikel dan beranda.",
    slugField: "slug",
    titleField: "title",
    columns: ["category", "publishedAt"],
    imageField: "cover",
    order: { field: "publishedAt" },
    drafts: true,
    fields: [
      { type: "text", name: "title", label: "Judul", required: true, max: 160 },
      { type: "text", name: "slug", label: "Slug (alamat URL)", required: true, hint: "Huruf kecil, angka, dan tanda hubung. Contoh: pph-21-desember" },
      { type: "select", name: "category", label: "Kategori", options: options(ARTICLE_CATEGORIES) },
      { type: "date", name: "publishedAt", label: "Tanggal terbit", required: true },
      { type: "number", name: "readingMinutes", label: "Lama baca (menit)", min: 1, max: 60 },
      { type: "textarea", name: "excerpt", label: "Ringkasan", required: true, rows: 3, hint: "Dua kalimat. Juga dipakai sebagai deskripsi di Google.", max: 400 },
      { type: "text", name: "legalBasis", label: "Dasar hukum" },
      { type: "image", name: "cover", label: "Gambar sampul", hint: "Rasio 16:9, idealnya 1200×675. Juga dipakai saat tautan dibagikan." },
      { type: "color", name: "coverBackground", label: "Warna latar sampul", hint: "Mengisi ruang kosong di kartu artikel utama." },
      { type: "richtext", name: "body", label: "Isi artikel", required: true },
    ],
  },
  services: {
    key: "services",
    label: "Layanan",
    singular: "layanan",
    icon: "briefcase",
    description: "Lima layanan utama beserta halaman detailnya.",
    slugField: "slug",
    titleField: "name",
    columns: ["subtitle"],
    order: "manual",
    fields: [
      { type: "text", name: "name", label: "Nama layanan", required: true },
      { type: "text", name: "slug", label: "Slug (alamat URL)", required: true },
      { type: "select", name: "icon", label: "Ikon", options: iconOptions },
      { type: "text", name: "subtitle", label: "Subjudul", required: true, hint: "Tampil di kartu dan menu." },
      { type: "textarea", name: "summary", label: "Ringkasan di kartu", rows: 2, required: true },
      { type: "textarea", name: "intro", label: "Intro halaman", rows: 3, required: true },
      { type: "objects", name: "scope", label: "Yang kami kerjakan", itemLabel: "lingkup", titleField: "title", fields: [
        { type: "text", name: "title", label: "Judul", required: true },
        { type: "text", name: "text", label: "Keterangan" },
      ] },
      { type: "list", name: "forWhom", label: "Untuk siapa", itemLabel: "situasi" },
      { type: "list", name: "included", label: "Termasuk", itemLabel: "poin" },
      { type: "list", name: "excluded", label: "Tidak termasuk", itemLabel: "poin" },
      { type: "objects", name: "steps", label: "Alur kerja", itemLabel: "langkah", titleField: "title", fields: step },
      { type: "objects", name: "faqs", label: "FAQ layanan", itemLabel: "pertanyaan", titleField: "question", fields: qa },
    ],
  },
  faqCategories: {
    key: "faqCategories",
    label: "FAQ",
    singular: "kategori FAQ",
    icon: "chat",
    description: "Kategori dan pertanyaan di halaman FAQ Pajak.",
    slugField: "slug",
    titleField: "title",
    order: "manual",
    fields: [
      { type: "text", name: "title", label: "Nama kategori", required: true },
      { type: "text", name: "slug", label: "ID kategori", required: true, hint: "Dipakai sebagai penanda di URL (#id)." },
      { type: "objects", name: "faqs", label: "Pertanyaan", itemLabel: "pertanyaan", titleField: "question", fields: qa },
    ],
  },
  team: {
    key: "team",
    label: "Tim",
    singular: "anggota tim",
    icon: "team",
    description: "Pioneer, partner, dan staf di halaman Tentang Kami.",
    titleField: "name",
    columns: ["group", "role"],
    imageField: "photo",
    order: "manual",
    fields: [
      { type: "select", name: "group", label: "Kelompok", options: [
        { value: "staff", label: "Staf (Our Team)" },
        { value: "partner", label: "Partner" },
        { value: "pioneer", label: "Pioneer" },
      ] },
      { type: "text", name: "name", label: "Nama lengkap dan gelar", required: true },
      { type: "text", name: "role", label: "Jabatan", required: true },
      { type: "image", name: "photo", label: "Foto", hint: "Potret tegak. Staf 4:5, pioneer/partner 2:3." },
      { type: "text", name: "initials", label: "Inisial", hint: "Dipakai bila belum ada foto.", max: 3 },
      { type: "textarea", name: "profile", label: "Profil singkat", rows: 3, hint: "Untuk pioneer dan partner." },
      { type: "list", name: "points", label: "Kredensial", itemLabel: "kredensial" },
    ],
  },
  reviews: {
    key: "reviews",
    label: "Ulasan",
    singular: "ulasan",
    icon: "star",
    description: "Ulasan Google yang ditampilkan di beranda.",
    titleField: "author",
    columns: ["context"],
    order: "manual",
    drafts: true,
    fields: [
      { type: "text", name: "author", label: "Nama (nama depan + inisial)", required: true },
      { type: "text", name: "context", label: "Konteks layanan" },
      { type: "textarea", name: "text", label: "Isi ulasan", required: true, hint: "Salin apa adanya dari Google." },
    ],
  },
  instagram: {
    key: "instagram",
    label: "Instagram",
    singular: "post Instagram",
    icon: "instagram",
    description: "Post di section Dari Instagram kami.",
    titleField: "title",
    columns: ["date"],
    imageField: "image",
    order: { field: "date" },
    drafts: true,
    fields: [
      { type: "url", name: "url", label: "Tautan post", required: true, placeholder: "https://www.instagram.com/p/…" },
      { type: "text", name: "title", label: "Judul post", required: true, hint: "Juga dipakai sebagai teks alternatif gambar." },
      { type: "date", name: "date", label: "Tanggal post", required: true },
      { type: "image", name: "image", label: "Gambar", required: true, hint: "Rasio 3:4 seperti grid Instagram." },
    ],
  },
  taxForms: {
    key: "taxForms",
    label: "Formulir pajak",
    singular: "formulir",
    icon: "form",
    description: "File di halaman Download Formulir Pajak.",
    titleField: "title",
    columns: ["group", "format"],
    order: "manual",
    fields: [
      { type: "select", name: "group", label: "Kelompok", options: options(["Pendaftaran NPWP", "SPT Tahunan", "Bukti potong"] as const) },
      { type: "text", name: "title", label: "Judul", required: true },
      { type: "textarea", name: "description", label: "Keterangan", rows: 3 },
      { type: "file", name: "file", label: "File", required: true, accept: ".pdf,.xls,.xlsx,.doc,.docx" },
      { type: "select", name: "format", label: "Format", options: options(["PDF", "XLS", "XLSX", "DOC", "DOCX"] as const) },
    ],
  },
  downloads: {
    key: "downloads",
    label: "Unduhan",
    singular: "unduhan",
    icon: "download",
    description: "Company profile, brosur, dan dokumen lain di bagian \"Unduh profil kami\" (beranda, Artikel, Kontak). Simpan sebagai draf untuk menyembunyikan.",
    titleField: "title",
    imageField: "cover",
    columns: ["detail"],
    order: "manual",
    drafts: true,
    fields: [
      { type: "text", name: "title", label: "Judul", required: true, placeholder: "Company Profile 2026" },
      { type: "textarea", name: "text", label: "Keterangan singkat", rows: 2 },
      { type: "text", name: "detail", label: "Detail", placeholder: "18 halaman", hint: "Tampil di antara format dan ukuran file, mis. \"PDF · 18 halaman · 2,6 MB\"." },
      { type: "file", name: "file", label: "File PDF", required: true, accept: ".pdf", hint: "Maksimal 4 MB. Ukuran file dihitung otomatis." },
      { type: "image", name: "cover", label: "Sampul", required: true, hint: "Halaman depan dokumen, rasio 16:9 paling pas." },
    ],
  },
  jobs: {
    key: "jobs",
    label: "Lowongan",
    singular: "lowongan",
    icon: "ladder",
    description: "Posisi terbuka di halaman Karier. Simpan sebagai draf untuk menutup lowongan.",
    titleField: "title",
    columns: ["type", "location"],
    order: "manual",
    drafts: true,
    fields: [
      { type: "text", name: "title", label: "Posisi", required: true },
      { type: "text", name: "type", label: "Jenis", placeholder: "Penuh waktu / Magang" },
      { type: "text", name: "location", label: "Lokasi" },
      { type: "textarea", name: "text", label: "Deskripsi", rows: 3 },
    ],
  },
  sectors: {
    key: "sectors",
    label: "Sektor",
    singular: "sektor",
    icon: "grid",
    description: "Section Kami paham sektor Anda.",
    titleField: "name",
    columns: ["issue"],
    order: "manual",
    fields: [
      { type: "select", name: "icon", label: "Ikon", options: iconOptions },
      { type: "text", name: "name", label: "Nama sektor", required: true },
      { type: "text", name: "issue", label: "Isu pajak utama" },
      { type: "boolean", name: "featured", label: "Tampilkan sebagai kartu utama" },
    ],
  },
  clientLogos: {
    key: "clientLogos",
    label: "Logo klien",
    singular: "logo klien",
    icon: "medal",
    description: "Logo klien yang sudah disetujui. Tampil bergerak di beranda sebelum panel Klien & ulasan, sesuai urutan di sini.",
    titleField: "name",
    imageField: "logo",
    order: "manual",
    drafts: true,
    fields: [
      { type: "text", name: "name", label: "Nama klien", required: true },
      { type: "image", name: "logo", label: "Logo", required: true, hint: "PNG transparan atau latar putih, ruang kosong di sekeliling logo dipangkas." },
    ],
  },
} as const satisfies Record<string, CollectionDef>;

export type CollectionKey = keyof typeof collections;
export type CollectionData<K extends CollectionKey> = DataOf<(typeof collections)[K]["fields"]>;

export type SettingsDef = { key: string; label: string; icon: IconName; description: string; fields: readonly Field[] };

const socialOptions = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "threads", label: "Threads" },
  { value: "youtube", label: "YouTube" },
] as const satisfies readonly Option[];

export const settings = {
  general: {
    key: "general",
    label: "Umum & kontak",
    icon: "id",
    description: "Kontak, alamat, angka, nomor izin, dan media sosial. Dipakai di seluruh situs.",
    fields: [
      { type: "text", name: "title", label: "Judul situs (tab browser & Google)", required: true },
      { type: "textarea", name: "description", label: "Deskripsi situs (Google)", rows: 2, required: true },
      { type: "text", name: "tagline", label: "Tagline" },
      { type: "text", name: "founded", label: "Tanggal berdiri" },
      { type: "text", name: "whatsappDisplay", label: "WhatsApp (tampilan)", required: true, placeholder: "+62 821-…" },
      { type: "text", name: "whatsappNumber", label: "WhatsApp (nomor untuk tautan)", required: true, hint: "Angka saja dengan kode negara, mis. 6282129350026." },
      { type: "text", name: "email", label: "Email", required: true },
      { type: "text", name: "street", label: "Jalan" },
      { type: "text", name: "addressShort", label: "Alamat singkat" },
      { type: "text", name: "addressFull", label: "Alamat lengkap" },
      { type: "text", name: "hours", label: "Jam kerja" },
      { type: "url", name: "googleReviewUrl", label: "Tautan Google Business Profile" },
      { type: "url", name: "mapsEmbedUrl", label: "URL embed Google Maps" },
      { type: "text", name: "ratingScore", label: "Rating Google", placeholder: "5,0" },
      { type: "number", name: "ratingCount", label: "Jumlah ulasan Google", min: 0 },
      { type: "text", name: "statsYears", label: "Angka: tahun pengalaman", placeholder: "10+" },
      { type: "text", name: "statsClients", label: "Angka: klien", placeholder: "50+" },
      { type: "text", name: "licensePracticeA", label: "Izin praktik tingkat A" },
      { type: "text", name: "licensePracticeB", label: "Izin praktik tingkat B" },
      { type: "text", name: "licenseTaxCourt", label: "Izin kuasa hukum Pengadilan Pajak" },
      { type: "text", name: "ikpiMember", label: "Nomor anggota IKPI" },
      { type: "objects", name: "social", label: "Media sosial", itemLabel: "akun", titleField: "id", hint: "Kosongkan tautan untuk menyembunyikan.", fields: [
        { type: "select", name: "id", label: "Platform", options: socialOptions },
        { type: "text", name: "handle", label: "Nama akun", placeholder: "@taxplus.consulting" },
        { type: "url", name: "url", label: "Tautan" },
      ] },
      { type: "text", name: "defaultWaMessage", label: "Pesan WhatsApp bawaan" },
      { type: "text", name: "freeConsultWaMessage", label: "Pesan WhatsApp konsultasi gratis" },
    ],
  },
  home: {
    key: "home",
    label: "Beranda",
    icon: "grid",
    description: "Cara kerja, janji layanan, kredensial Mengapa TaxPlus, dan FAQ beranda.",
    fields: [
      { type: "objects", name: "workSteps", label: "Cara kerja", itemLabel: "langkah", titleField: "title", fields: step },
      { type: "list", name: "servicePromises", label: "Janji layanan", itemLabel: "janji" },
      { type: "objects", name: "credentials", label: "Mengapa TaxPlus? (kredensial)", itemLabel: "kredensial", titleField: "title", fields: [
        ...iconCard,
        { type: "text", name: "issuer", label: "Penerbit" },
        { type: "text", name: "number", label: "Nomor" },
      ] },
      { type: "objects", name: "homeFaqs", label: "FAQ beranda", itemLabel: "pertanyaan", titleField: "question", fields: qa },
    ],
  },
  about: {
    key: "about",
    label: "Tentang Kami",
    icon: "team",
    description: "Janji kerja dan data legalitas di halaman Tentang Kami.",
    fields: [
      { type: "objects", name: "aboutPromises", label: "Cara kami bekerja", itemLabel: "janji", titleField: "title", fields: iconCard },
      { type: "objects", name: "companyLegal", label: "Legalitas", itemLabel: "dokumen", titleField: "label", fields: [
        { type: "select", name: "icon", label: "Ikon", options: iconOptions },
        { type: "text", name: "label", label: "Nama dokumen", required: true },
        { type: "text", name: "value", label: "Nomor / nilai" },
        { type: "text", name: "note", label: "Catatan" },
      ] },
    ],
  },
  career: {
    key: "career",
    label: "Karier",
    icon: "ladder",
    description: "Keuntungan bergabung, tahap rekrutmen, dan format subjek lamaran.",
    fields: [
      { type: "objects", name: "careerPerks", label: "Kenapa bergabung", itemLabel: "poin", titleField: "title", fields: iconCard },
      { type: "objects", name: "recruitmentSteps", label: "Tahap rekrutmen", itemLabel: "tahap", titleField: "title", fields: [
        { type: "text", name: "title", label: "Judul", required: true },
        { type: "text", name: "text", label: "Keterangan" },
      ] },
      { type: "text", name: "applicationSubject", label: "Format subjek email lamaran" },
    ],
  },
} as const satisfies Record<string, SettingsDef>;

export type SettingsKey = keyof typeof settings;
export type SettingsData<K extends SettingsKey> = DataOf<(typeof settings)[K]["fields"]>;

export function isCollectionKey(key: string): key is CollectionKey {
  return Object.hasOwn(collections, key);
}

export function isSettingsKey(key: string): key is SettingsKey {
  return Object.hasOwn(settings, key);
}

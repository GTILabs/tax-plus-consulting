/**
 * Permanent redirects from the old WordPress site (taxplus-consulting.co.id)
 * so indexed URLs and external links keep working after the switch.
 * Paths that exist unchanged in the new site (/layanan/*, /artikel, /faq,
 * /tentang-kami, /kontak) need no entry.
 */
const pages: [string, string][] = [
  ["/about", "/tentang-kami"],
  ["/karir", "/karier"],
  ["/services", "/layanan"],
  ["/legalitas", "/tentang-kami#legalitas"],
  ["/download-formulir-pajak", "/formulir-pajak"],
  ["/tax-compliance-services", "/layanan/tax-compliance"],
  ["/tax-accounting-services", "/layanan/tax-accounting"],
  ["/tax-management-services", "/layanan/tax-management"],
  ["/tax-audit-services", "/layanan/tax-audit"],
  ["/tax-litigation-services", "/layanan/tax-litigation"],
];

/** Pages and articles of the previous version of this site that the prototype redesign replaced. */
const replaced: [string, string][] = [
  ["/spesialisasi", "/layanan"],
  ["/artikel/sp2dk-apa-yang-harus-dilakukan", "/artikel/sp2dk-14-hari"],
  ["/artikel/pt-cv-tidak-lagi-pph-final-0-5-persen", "/artikel/umkm-pt-cv-pembukuan"],
  ["/artikel/pajak-endorse-dan-royalti", "/artikel"],
];

const posts: [string, string][] = [
  ["/menerima-sp2dk-ini-yang-harus-anda-lakukan-dalam-14-hari", "/artikel/sp2dk-14-hari"],
  ["/pt-dan-cv-tidak-lagi-dapat-pph-final-05-apa-gantinya", "/artikel/umkm-pt-cv-pembukuan"],
  ["/pajak-endorse-dan-royalti-tiga-hal-yang-paling-sering-terlewat", "/artikel"],
  // Local-SEO posts were not migrated; send readers to the matching page.
  ["/konsultan-pajak-bandung", "/"],
  ["/jasa-lapor-spt-bandung", "/layanan/tax-compliance"],
  ["/pemeriksaan-pajak-bandung", "/layanan/tax-audit"],
];

const uploads = "/wp-content/uploads/2024/10";
const forms: [string, string][] = [
  [`${uploads}/1.1-Formulir-Pendaftaran-WP-OP-dan-Warisan-Belum-Terbagi.xls`, "/formulir/pendaftaran-npwp-orang-pribadi.xls"],
  [`${uploads}/1.2-Formulir-Pendaftaran-WP-Badan.xls`, "/formulir/pendaftaran-npwp-badan.xls"],
  [`${uploads}/Formulir-Excel-SPT-Tahunan-PPh-Orang-Pribadi-–-1770-1.xlsx`, "/formulir/spt-tahunan-op-1770.xlsx"],
  [`${uploads}/Formulir-Excel-SPT-Tahunan-PPh-Orang-Pribadi-–-1770-S.xlsx`, "/formulir/spt-tahunan-op-1770s.xlsx"],
  [`${uploads}/Formulir-PDF-SPT-Tahunan-PPh-Badan-–-1771.pdf`, "/formulir/spt-tahunan-badan-1771.pdf"],
  [`${uploads}/Formulir-Excel-Bukti-Potong-PPh-21-Karyawan.xls`, "/formulir/bukti-potong-pph21-1721-a1.xls"],
];

// Next.js matches the encoded request path, so non-ASCII characters (the en dash) must be percent-encoded.
const encodePath = (path: string) => path.split("/").map(encodeURIComponent).join("/");

export const legacyRedirects = [...pages, ...replaced, ...posts, ...forms].map(([source, destination]) => ({
  source: encodePath(source),
  destination,
  permanent: true,
}));

export type TaxForm = {
  title: string;
  description: string;
  /** Path under /public. */
  file: string;
  format: "XLS" | "XLSX" | "PDF";
  sizeKb: number;
  group: "Pendaftaran NPWP" | "SPT Tahunan" | "Bukti potong";
};

/* Forms published on the old site's "Download Formulir Pajak" page (pre-Coretax formats). */
export const taxForms: TaxForm[] = [
  {
    group: "Pendaftaran NPWP",
    title: "Pendaftaran NPWP Orang Pribadi & Warisan Belum Terbagi",
    description:
      "Pendaftaran NPWP secara luring untuk orang pribadi dan warisan belum terbagi, dengan melampirkan identitas diri atau dokumen yang menunjukkan kedudukan sebagai wakil Wajib Pajak.",
    file: "/formulir/pendaftaran-npwp-orang-pribadi.xls",
    format: "XLS",
    sizeKb: 67,
  },
  {
    group: "Pendaftaran NPWP",
    title: "Pendaftaran NPWP Badan",
    description:
      "Pendaftaran NPWP badan atau perusahaan secara luring, dengan melampirkan akta pendirian, identitas salah satu pengurus, dan surat pernyataan bermeterai.",
    file: "/formulir/pendaftaran-npwp-badan.xls",
    format: "XLS",
    sizeKb: 84,
  },
  {
    group: "SPT Tahunan",
    title: "SPT Tahunan PPh Orang Pribadi — 1770",
    description:
      "Untuk orang pribadi dengan penghasilan dari kegiatan usaha, pekerjaan bebas, dan sumber lainnya.",
    file: "/formulir/spt-tahunan-op-1770.xlsx",
    format: "XLSX",
    sizeKb: 128,
  },
  {
    group: "SPT Tahunan",
    title: "SPT Tahunan PPh Orang Pribadi — 1770 S",
    description: "Untuk orang pribadi dengan penghasilan dari pekerjaan sebagai karyawan.",
    file: "/formulir/spt-tahunan-op-1770s.xlsx",
    format: "XLSX",
    sizeKb: 83,
  },
  {
    group: "SPT Tahunan",
    title: "SPT Tahunan PPh Badan — 1771",
    description:
      "Untuk badan atau perusahaan. Saat dilaporkan, perlu dilengkapi lampiran laporan keuangan (neraca dan laba rugi).",
    file: "/formulir/spt-tahunan-badan-1771.pdf",
    format: "PDF",
    sizeKb: 311,
  },
  {
    group: "Bukti potong",
    title: "Bukti Potong PPh 21 (1721 A1) Karyawan non-PNS/ASN",
    description:
      "Bukti pemotongan PPh 21 atas gaji yang diberikan perusahaan kepada karyawannya, umumnya dibagikan setiap Februari.",
    file: "/formulir/bukti-potong-pph21-1721-a1.xls",
    format: "XLS",
    sizeKb: 100,
  },
];

export const serviceLinks = [
  { slug: "tax-compliance", name: "Tax Compliance", description: "Pelaporan pajak rutin" },
  { slug: "tax-accounting", name: "Tax Accounting", description: "Pembukuan & laporan fiskal" },
  { slug: "tax-management", name: "Tax Management", description: "Perencanaan pajak" },
  { slug: "tax-audit", name: "Tax Audit", description: "SP2DK & pemeriksaan" },
  { slug: "tax-litigation", name: "Tax Litigation", description: "Keberatan, banding & PK" },
] as const;

export type ServiceSlug = (typeof serviceLinks)[number]["slug"];

export const routes = {
  home: "/",
  about: "/tentang-kami",
  services: "/layanan",
  service: (slug: string) => `/layanan/${slug}`,
  specialization: "/spesialisasi",
  articles: "/artikel",
  article: (slug: string) => `/artikel/${slug}`,
  career: "/karier",
  contact: "/#kontak",
  download: "/#unduh",
  legal: "/tentang-kami#legalitas",
} as const;

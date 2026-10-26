export const routes = {
  home: "/",
  about: "/tentang-kami",
  services: "/layanan",
  service: (slug: string) => `/layanan/${slug}`,
  articles: "/artikel",
  article: (slug: string) => `/artikel/${slug}`,
  career: "/karier",
  contact: "/kontak",
  privacy: "/kebijakan-privasi",
  faq: "/faq",
  forms: "/formulir-pajak",
} as const;

/** Main menu (brief: Beranda · Layanan · Tentang Kami · Artikel · Karier · Kontak). */
export const mainMenu = [
  { href: routes.home, label: "Beranda" },
  { href: routes.services, label: "Layanan", dropdown: true },
  { href: routes.about, label: "Tentang Kami" },
  { href: routes.articles, label: "Artikel" },
  { href: routes.career, label: "Karier" },
  { href: routes.contact, label: "Kontak" },
] as const;

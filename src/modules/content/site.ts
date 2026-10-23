export const site = {
  name: "TaxPlus Consulting",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Search engines may index the site only when explicitly enabled (staging stays noindex). */
  indexable: process.env.SITE_INDEXABLE === "true",
  title: "Kantor Konsultan Pajak di Bandung — TaxPlus Consulting",
  description:
    "Kantor konsultan pajak dan kuasa hukum Pengadilan Pajak di Bandung: Tax Compliance, Tax Accounting, Tax Management, Tax Audit, dan Tax Litigation.",
  tagline: "Your Trusted Tax Partner",
  founded: "18 Agustus 2022",
  contact: {
    whatsappDisplay: "+62 821-2935-0026",
    whatsappNumber: "6282129350026",
    email: "info.taxplusconsulting@gmail.com",
    street: "Jl. Cherry Field, Cipagalo",
    addressShort: "Jl. Cherry Field, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung 40287",
    addressFull: "Jl. Cherry Field, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287",
    hours: "Senin–Jumat, sampai pukul 17.00 WIB",
  },
  /** TAXPLUS CONSULTING Google Business Profile (opens the listing, where visitors can read and write reviews). */
  googleReviewUrl: "https://www.google.com/maps?cid=4490344035819018732",
  /** Social profiles; entries with an empty url are hidden. */
  social: [
    { id: "instagram", label: "Instagram", handle: "@taxplus.consulting", url: "https://www.instagram.com/taxplus.consulting/" },
    { id: "tiktok", label: "TikTok", handle: "@taxplusconsulting", url: "https://www.tiktok.com/@taxplusconsulting" },
    { id: "facebook", label: "Facebook", handle: "", url: "" },
    { id: "linkedin", label: "LinkedIn", handle: "", url: "" },
    { id: "youtube", label: "YouTube", handle: "", url: "" },
  ],
  /** Keep in line with the Google Business Profile. */
  rating: { score: "5,0", count: 30 },
  stats: { years: "10+", clients: "50+", sectors: 7 },
} as const;

/** Official license numbers (brief: "Data resmi"). */
export const licenses = {
  practiceA: "KIP-6837/IP.A/PJ/2020",
  practiceB: "KP-10818/IP.B/2025",
  taxCourt: "1507/PP/IKH/2023",
  ikpiMember: "006388",
} as const;

export type SocialProfile = {
  id: (typeof site.social)[number]["id"];
  label: string;
  handle: string;
  url: string;
};

export const socialProfiles: SocialProfile[] = site.social.filter((p) => p.url !== "");

export const mapsLink = site.googleReviewUrl;
export const mapsEmbedUrl = "https://maps.google.com/maps?cid=4490344035819018732&z=16&output=embed";

export const DEFAULT_WA_MESSAGE = "Halo TaxPlus, saya ingin konsultasi.";
export const FREE_CONSULT_WA_MESSAGE = "Halo TaxPlus, saya ingin konsultasi awal gratis 15 menit.";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject?: string) {
  const base = `mailto:${site.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

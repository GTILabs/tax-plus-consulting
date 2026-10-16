export const site = {
  name: "TaxPlus Consulting",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Search engines may index the site only when explicitly enabled (staging stays noindex). */
  indexable: process.env.SITE_INDEXABLE === "true",
  title: "Konsultan Pajak Bandung — TaxPlus Consulting",
  description:
    "Konsultan pajak berizin di Bandung: Tax Compliance, Tax Accounting, Tax Management, Tax Audit, dan Tax Litigation sampai Pengadilan Pajak.",
  footerBlurb:
    "Kantor konsultan pajak berizin di Bandung yang menangani isu perpajakan badan usaha maupun orang pribadi di seluruh Indonesia.",
  contact: {
    whatsappDisplay: "+62 821-2935-0026",
    whatsappNumber: "6282129350026",
    email: "info.taxplusconsulting@gmail.com",
    addressLines: ["Jl. Cherry Field, Cipagalo,", "Kec. Bojongsoang,", "Kabupaten Bandung 40287"],
    addressFull:
      "Jl. Cherry Field, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287",
    hours: "Senin–Jumat, 09.00–17.00 WIB",
  },
  /** TAXPLUS CONSULTING Google Business Profile (opens the listing, where visitors can write a review). */
  googleReviewUrl: "https://www.google.com/maps?cid=4490344035819018732",
  /** Social profiles; entries with an empty url are hidden. Instagram and TikTok are listed on the old site. */
  social: [
    { id: "instagram", label: "Instagram", handle: "@taxplus.consulting", url: "https://www.instagram.com/taxplus.consulting/" },
    { id: "tiktok", label: "TikTok", handle: "@taxplusconsulting", url: "https://www.tiktok.com/@taxplusconsulting" },
    { id: "facebook", label: "Facebook", handle: "", url: "" },
    { id: "linkedin", label: "LinkedIn", handle: "", url: "" },
    { id: "youtube", label: "YouTube", handle: "", url: "" },
  ],
  rating: { score: "5,0", count: 30 },
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

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject?: string) {
  const base = `mailto:${site.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

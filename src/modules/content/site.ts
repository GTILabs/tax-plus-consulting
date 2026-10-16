export const site = {
  name: "TaxPlus Consulting",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
  /** Direct "write a review" link from Google Business Profile. Empty until provided. */
  googleReviewUrl: "",
  rating: { score: "5,0", count: 20 },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject?: string) {
  const base = `mailto:${site.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

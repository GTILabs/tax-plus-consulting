/* Fixed site facts and link helpers. Editable details (contact, licenses, ...) come from the CMS: see data.ts. */

export const SITE_NAME = "TaxPlus Consulting";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
/** Search engines may index the site only when explicitly enabled (staging stays noindex). */
export const indexable = process.env.SITE_INDEXABLE === "true";

export type SocialId = "instagram" | "tiktok" | "facebook" | "linkedin" | "threads" | "youtube";

export const SOCIAL_LABELS: Record<SocialId, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  threads: "Threads",
  youtube: "YouTube",
};

export type SocialProfile = { id: SocialId; label: string; handle: string; url: string };

export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(email: string, subject?: string) {
  const base = `mailto:${email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

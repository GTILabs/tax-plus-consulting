import "server-only";

import { getCollection, getSettings } from "@/modules/cms/read";
import { toArticle } from "./articles";
import { indexable, SITE_NAME, SOCIAL_LABELS, siteUrl, whatsappLink, type SocialProfile } from "./site";

/*
 * Site content, read from the CMS. Every getter sits on cached reads tagged per
 * collection, so pages stay prerendered and refresh as soon as an admin saves.
 */

export async function getSite() {
  const [g, sectors] = await Promise.all([getSettings("general"), getCollection("sectors")]);
  const social: SocialProfile[] = g.social.filter((s) => s.url).map((s) => ({ ...s, label: SOCIAL_LABELS[s.id] }));
  return {
    name: SITE_NAME,
    url: siteUrl,
    indexable,
    title: g.title,
    description: g.description,
    tagline: g.tagline,
    founded: g.founded,
    contact: {
      whatsappDisplay: g.whatsappDisplay,
      whatsappNumber: g.whatsappNumber,
      email: g.email,
      street: g.street,
      addressShort: g.addressShort,
      addressFull: g.addressFull,
      hours: g.hours,
    },
    googleReviewUrl: g.googleReviewUrl,
    mapsEmbedUrl: g.mapsEmbedUrl,
    rating: { score: g.ratingScore, count: g.ratingCount },
    stats: { years: g.statsYears, clients: g.statsClients, sectors: sectors.length },
    licenses: {
      practiceA: g.licensePracticeA,
      practiceB: g.licensePracticeB,
      taxCourt: g.licenseTaxCourt,
      ikpiMember: g.ikpiMember,
    },
    social,
    messages: { default: g.defaultWaMessage, freeConsult: g.freeConsultWaMessage },
  };
}

export type Site = Awaited<ReturnType<typeof getSite>>;

/** WhatsApp link to the office; without a message it opens with the default greeting. */
export function waLink(site: Site, message = site.messages.default) {
  return whatsappLink(site.contact.whatsappNumber, message);
}

export const getServices = () => getCollection("services");

export async function getService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug);
}

export type Service = Awaited<ReturnType<typeof getServices>>[number];

export function serviceWhatsappMessage(service: Pick<Service, "name">) {
  return `Halo TaxPlus, saya ingin konsultasi ${service.name}.`;
}

/** Newest first. */
export async function getArticles() {
  return (await getCollection("articles")).map(toArticle);
}

export async function getArticle(slug: string) {
  return (await getArticles()).find((a) => a.slug === slug);
}

export async function getFaqCategories() {
  return (await getCollection("faqCategories")).map(({ slug, ...c }) => ({ id: slug, ...c }));
}

export type Person = Awaited<ReturnType<typeof getCollection<"team">>>[number];

export async function getTeam() {
  const team = await getCollection("team");
  return {
    pioneer: team.find((p) => p.group === "pioneer"),
    partners: team.filter((p) => p.group === "partner"),
    staff: team.filter((p) => p.group === "staff"),
  };
}

export const getReviews = () => getCollection("reviews");
export const getInstagramPosts = () => getCollection("instagram");
export const getTaxForms = () => getCollection("taxForms");
export const getJobs = () => getCollection("jobs");
export const getSectors = () => getCollection("sectors");
export const getClientLogos = () => getCollection("clientLogos");
export const getHome = () => getSettings("home");
export const getAbout = () => getSettings("about");
export const getCareer = () => getSettings("career");

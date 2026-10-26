/**
 * Fills the CMS tables with the launch content in scripts/seed-data (a fresh database
 * starts with the same site that was approved before the CMS existed).
 * Safe to re-run: a collection that already has entries, and settings that already
 * exist, are left untouched (pass --force to replace them).
 *
 *   bun scripts/seed-cms.ts [--force]
 */
import { eq } from "drizzle-orm";
import { collections, settings, type CollectionKey, type SettingsKey } from "../src/modules/cms/collections";
import { schemaFor } from "../src/modules/cms/fields";
import { sanitizeData } from "../src/modules/cms/sanitize";
import { db, pool, schema } from "./db";
import { coverBackgrounds } from "./seed-data/article-covers";
import { articles } from "./seed-data/articles";
import * as company from "./seed-data/company";
import { faqCategories } from "./seed-data/faqs";
import { taxForms } from "./seed-data/forms";
import { instagramPosts } from "./seed-data/instagram";
import { featuredReviews } from "./seed-data/reviews";
import { services } from "./seed-data/services";
import { DEFAULT_WA_MESSAGE, FREE_CONSULT_WA_MESSAGE, licenses, mapsEmbedUrl, site } from "./seed-data/site";

const force = process.argv.includes("--force");

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

type Seed = { slug?: string; data: Record<string, unknown> };

const seeds: { [K in CollectionKey]: Seed[] } = {
  articles: articles.map((a) => ({
    slug: a.slug,
    data: {
      title: a.title,
      slug: a.slug,
      category: a.category,
      publishedAt: a.publishedAt,
      readingMinutes: a.readingMinutes,
      excerpt: a.excerpt,
      legalBasis: a.legalBasis,
      cover: { src: `/images/articles/${a.slug}.webp`, width: 1200, height: 675 },
      coverBackground: coverBackgrounds[a.slug] ?? "",
      body: a.bodyHtml,
    },
  })),
  services: services.map((s) => ({ slug: s.slug, data: { ...s } })),
  faqCategories: faqCategories.map((c) => ({ slug: c.id, data: { title: c.title, slug: c.id, faqs: c.faqs } })),
  team: [
    { data: { group: "pioneer", ...company.pioneer, photo: company.pioneer.photo ?? null } },
    ...company.partners.map((p) => ({ data: { group: "partner", ...p, photo: p.photo ?? null } })),
    ...company.staff.map((m) => ({
      data: { group: "staff", name: m.name, role: m.role, photo: { src: m.photo, width: 640, height: 800 }, initials: initials(m.name), profile: "", points: [] },
    })),
  ],
  reviews: featuredReviews.map((r) => ({ data: { ...r } })),
  instagram: instagramPosts.map((p) => ({
    data: { url: `https://www.instagram.com/p/${p.code}/`, title: p.title, date: p.date, image: { src: `/images/instagram/${p.code}.webp`, width: 480, height: 640 } },
  })),
  taxForms: taxForms.map((f) => ({
    data: {
      group: f.group,
      title: f.title,
      description: f.description,
      file: { url: f.file, name: f.file.split("/").pop() ?? f.file, sizeKb: f.sizeKb },
      format: f.format,
    },
  })),
  jobs: company.jobOpenings.map((j) => ({ data: { ...j } })),
  sectors: company.sectors.map((s) => ({ data: { ...s, featured: !!s.featured } })),
  clientLogos: company.clientLogos.map((l) => ({ data: { name: l.name, logo: { src: l.src, width: 300, height: 150 } } })),
};

const settingSeeds: { [K in SettingsKey]: Record<string, unknown> } = {
  general: {
    title: site.title,
    description: site.description,
    tagline: site.tagline,
    founded: site.founded,
    ...site.contact,
    googleReviewUrl: site.googleReviewUrl,
    mapsEmbedUrl,
    ratingScore: site.rating.score,
    ratingCount: site.rating.count,
    statsYears: site.stats.years,
    statsClients: site.stats.clients,
    licensePracticeA: licenses.practiceA,
    licensePracticeB: licenses.practiceB,
    licenseTaxCourt: licenses.taxCourt,
    ikpiMember: licenses.ikpiMember,
    social: site.social.map(({ id, handle, url }) => ({ id, handle, url })),
    defaultWaMessage: DEFAULT_WA_MESSAGE,
    freeConsultWaMessage: FREE_CONSULT_WA_MESSAGE,
  },
  home: {
    workSteps: company.workSteps,
    servicePromises: company.servicePromises,
    credentials: company.credentials,
    homeFaqs: company.homeFaqs,
  },
  about: { aboutPromises: company.aboutPromises, companyLegal: company.companyLegal },
  career: { careerPerks: company.careerPerks, recruitmentSteps: company.recruitmentSteps, applicationSubject: company.APPLICATION_SUBJECT },
};

function validate(label: string, fields: Parameters<typeof schemaFor>[0], data: Record<string, unknown>) {
  const parsed = schemaFor(fields).safeParse(data);
  if (!parsed.success) {
    throw new Error(`${label}: ${parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
  }
  return sanitizeData(fields, parsed.data as Record<string, unknown>);
}

for (const key of Object.keys(seeds) as CollectionKey[]) {
  const def = collections[key];
  const existing = await db.select({ id: schema.cmsEntries.id }).from(schema.cmsEntries).where(eq(schema.cmsEntries.collection, key));
  if (existing.length && !force) {
    console.log(`skip  ${key} (${existing.length} entries already)`);
    continue;
  }
  const rows = seeds[key].map((seed, sort) => ({
    collection: key,
    slug: seed.slug ?? null,
    sort,
    status: "published" as const,
    data: validate(`${key}[${sort}]`, def.fields, seed.data),
  }));
  await db.transaction(async (tx) => {
    await tx.delete(schema.cmsEntries).where(eq(schema.cmsEntries.collection, key));
    if (rows.length) await tx.insert(schema.cmsEntries).values(rows);
  });
  console.log(`seed  ${key}: ${rows.length}`);
}

for (const key of Object.keys(settingSeeds) as SettingsKey[]) {
  const data = validate(`settings.${key}`, settings[key].fields, settingSeeds[key]);
  const query = db.insert(schema.cmsSettings).values({ key, data });
  const result = force
    ? await query.onConflictDoUpdate({ target: schema.cmsSettings.key, set: { data, updatedAt: new Date() } }).returning()
    : await query.onConflictDoNothing().returning();
  console.log(result.length ? `seed  settings.${key}` : `skip  settings.${key} (exists)`);
}

await pool.end();

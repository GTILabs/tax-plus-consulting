import "server-only";

import { and, count, eq, gt } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { consultationRequests } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email/send";
import { consultationConfirmation, consultationNotification } from "@/lib/email/templates";
import { getServices, getSite, waLink } from "@/modules/content/data";
import { siteUrl } from "@/modules/content/site";
import type { ConsultationInput } from "./schema";
import { consultationTopics, topicLabel } from "./topics";

/** Stores a validated consultation request and returns its id. */
export async function saveConsultationRequest(input: ConsultationInput) {
  const [row] = await getDb()
    .insert(consultationRequests)
    .values(input)
    .returning({ id: consultationRequests.id });
  return row.id;
}

/** Pre-filled WhatsApp message so the visitor can follow up with the office directly. */
export async function createWhatsappHandoff(input: ConsultationInput) {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  const message = [
    "Halo TaxPlus, saya ingin konsultasi gratis.",
    "",
    `Nama: ${input.name}`,
    input.company && `Perusahaan: ${input.company}`,
    input.email && `Email: ${input.email}`,
    `WhatsApp: ${input.whatsapp}`,
    `Kebutuhan: ${topicLabel(consultationTopics(services), input.topic)}`,
    input.message && `Pesan: ${input.message}`,
  ]
    .filter((line) => typeof line === "string")
    .join("\n");

  return waLink(site, message);
}

/** The form takes any address, so confirmations per address are capped to keep it from being used to spam someone. */
const CONFIRMATIONS_PER_DAY = 3;

async function recentRequestsFrom(email: string) {
  const [{ n }] = await getDb()
    .select({ n: count() })
    .from(consultationRequests)
    .where(and(eq(consultationRequests.email, email), gt(consultationRequests.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000))));
  return n;
}

/**
 * Emails the office (the address in CMS settings) and, when the visitor left an email,
 * a confirmation to them. Failures are logged; the request is already stored.
 */
export async function sendConsultationEmails(input: ConsultationInput, id: string | null, whatsappUrl: string) {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  const data = { ...input, topic: topicLabel(consultationTopics(services), input.topic) };
  const jobs: Promise<boolean>[] = [];
  if (site.contact.email) {
    const adminUrl = `${siteUrl}/admin/consultations${id ? `/${id}` : ""}`;
    jobs.push(sendEmail({ to: site.contact.email, replyTo: input.email, ...consultationNotification({ ...data, adminUrl, siteUrl }) }));
  }
  if (input.email && (await recentRequestsFrom(input.email)) <= CONFIRMATIONS_PER_DAY) {
    jobs.push(
      sendEmail({
        to: input.email,
        replyTo: site.contact.email || undefined,
        ...consultationConfirmation({ ...data, siteUrl, officeWhatsapp: site.contact.whatsappDisplay, whatsappUrl }),
      }),
    );
  }
  await Promise.allSettled(jobs);
}

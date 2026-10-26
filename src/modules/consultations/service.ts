import "server-only";

import { getDb } from "@/lib/db";
import { consultationRequests } from "@/lib/db/schema";
import { getServices, getSite, waLink } from "@/modules/content/data";
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

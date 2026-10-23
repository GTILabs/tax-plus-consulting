import "server-only";

import { getDb } from "@/lib/db";
import { consultationRequests } from "@/lib/db/schema";
import { whatsappLink } from "@/modules/content/site";
import type { ConsultationInput } from "./schema";
import { topicLabel } from "./topics";

/** Stores a validated consultation request and returns its id. */
export async function saveConsultationRequest(input: ConsultationInput) {
  const [row] = await getDb()
    .insert(consultationRequests)
    .values(input)
    .returning({ id: consultationRequests.id });
  return row.id;
}

/** Pre-filled WhatsApp message so the visitor can follow up with the office directly. */
export function createWhatsappHandoff(input: ConsultationInput) {
  const message = [
    "Halo TaxPlus, saya ingin konsultasi gratis.",
    "",
    `Nama: ${input.name}`,
    input.company && `Perusahaan: ${input.company}`,
    input.email && `Email: ${input.email}`,
    `WhatsApp: ${input.whatsapp}`,
    `Kebutuhan: ${topicLabel(input.topic)}`,
    input.message && `Pesan: ${input.message}`,
  ]
    .filter((line) => typeof line === "string")
    .join("\n");

  return whatsappLink(message);
}

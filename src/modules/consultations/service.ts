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
    "Halo TaxPlus, saya ingin menjadwalkan konsultasi.",
    "",
    `Kebutuhan: ${topicLabel(input.topic)}`,
    `Nama: ${input.name}`,
    `WhatsApp: ${input.whatsapp}`,
    `Jenis usaha: ${input.sector}`,
    `Masalah: ${input.message}`,
  ].join("\n");

  return whatsappLink(message);
}

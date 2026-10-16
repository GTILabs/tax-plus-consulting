import { whatsappLink } from "@/modules/content/site";
import type { ConsultationInput } from "./schema";

/**
 * Turns a validated consultation request into a pre-filled WhatsApp message
 * for the office. Requests are not stored yet; persistence (and notifying
 * the team) arrives with the database phase of the CMS.
 */
export function createConsultationHandoff(input: ConsultationInput) {
  const message = [
    "Halo TaxPlus, saya ingin menjadwalkan konsultasi.",
    "",
    `Nama: ${input.name}`,
    `WhatsApp: ${input.whatsapp}`,
    `Jenis usaha: ${input.sector}`,
    `Masalah: ${input.message}`,
  ].join("\n");

  return { whatsappUrl: whatsappLink(message) };
}

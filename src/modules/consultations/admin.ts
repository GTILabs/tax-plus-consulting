import type { ConsultationRequest } from "@/lib/db/schema";

export const STATUS_LABELS: Record<ConsultationRequest["status"], string> = {
  new: "Baru",
  contacted: "Sudah dihubungi",
  closed: "Selesai",
};

export const STATUS_PILL: Record<ConsultationRequest["status"], string> = {
  new: "adm-pill new",
  contacted: "adm-pill warn",
  closed: "adm-pill on",
};

/** wa.me link to the visitor's own number (Indonesian 08… numbers become 628…). */
export function visitorWhatsapp(number: string, name: string) {
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `62${digits.slice(1)}`;
  const text = `Halo ${name.split(" ")[0]}, terima kasih sudah menghubungi TaxPlus Consulting.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

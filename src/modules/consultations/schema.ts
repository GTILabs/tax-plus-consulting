import { z } from "zod";
import { GENERAL_TOPIC } from "./topics";

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .transform((v) => v || undefined);

/** Form "Konsultasi gratis": Nama, Perusahaan, Email, WhatsApp, Kebutuhan, Pesan. */
export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Isi nama lengkap Anda.").max(100, "Nama terlalu panjang."),
  company: optionalText(150, "Nama perusahaan terlalu panjang."),
  email: z
    .union([z.literal(""), z.email("Isi alamat email yang valid.").max(200)])
    .optional()
    .transform((v) => v || undefined),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{9,20}$/, "Isi nomor WhatsApp yang valid, contoh 0812-3456-7890."),
  /** A service slug or "umum"; services are managed in the CMS, so any well-formed slug is accepted. */
  topic: z
    .string({ error: "Pilih kebutuhan Anda." })
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Pilih kebutuhan Anda.")
    .max(80)
    .default(GENERAL_TOPIC.slug),
  message: optionalText(2000, "Maksimal 2000 karakter."),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ConsultationField = keyof ConsultationInput;
export type ConsultationFieldErrors = Partial<Record<ConsultationField, string[]>>;

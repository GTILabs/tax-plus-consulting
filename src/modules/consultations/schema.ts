import { z } from "zod";

export const BUSINESS_SECTORS = [
  "Industri hiburan / kreator",
  "Manajemen talent / agensi",
  "F&B / restoran",
  "Fashion / retail",
  "Kesehatan / klinik",
  "Kontraktor / properti",
  "Orang pribadi",
  "Lainnya",
] as const;

export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Isi nama lengkap Anda.").max(100, "Nama terlalu panjang."),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{9,20}$/, "Isi nomor WhatsApp yang valid, contoh 0812-3456-7890."),
  sector: z.enum(BUSINESS_SECTORS, { error: "Pilih sektor usaha." }),
  message: z
    .string()
    .trim()
    .min(10, "Ceritakan singkat masalahnya (minimal 10 karakter).")
    .max(2000, "Maksimal 2000 karakter."),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ConsultationField = keyof ConsultationInput;
export type ConsultationFieldErrors = Partial<Record<ConsultationField, string[]>>;

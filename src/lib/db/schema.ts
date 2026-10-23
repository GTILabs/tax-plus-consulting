import { index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const consultationStatus = pgEnum("consultation_status", ["new", "contacted", "closed"]);

/** Consultation requests submitted through the "Konsultasi gratis" form. */
export const consultationRequests = pgTable(
  "consultation_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    company: text("company"),
    email: text("email"),
    whatsapp: text("whatsapp").notNull(),
    /** Only filled by the previous form version. */
    sector: text("sector"),
    message: text("message"),
    /** Topic slug from src/modules/consultations/topics.ts. */
    topic: text("topic").notNull().default("umum"),
    status: consultationStatus("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("consultation_requests_created_at_idx").on(t.createdAt)],
);

export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type NewConsultationRequest = typeof consultationRequests.$inferInsert;

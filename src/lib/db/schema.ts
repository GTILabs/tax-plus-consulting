import { index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const consultationStatus = pgEnum("consultation_status", ["new", "contacted", "closed"]);

/** Consultation requests submitted through the homepage contact form. */
export const consultationRequests = pgTable(
  "consultation_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    whatsapp: text("whatsapp").notNull(),
    sector: text("sector").notNull(),
    message: text("message").notNull(),
    status: consultationStatus("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("consultation_requests_created_at_idx").on(t.createdAt)],
);

export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type NewConsultationRequest = typeof consultationRequests.$inferInsert;

import { index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

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

export const adminRole = pgEnum("admin_role", ["super_admin", "admin", "user"]);

/**
 * CMS users. Emails are stored lowercase; passwords as scrypt hashes (src/modules/admin/password.ts).
 * An invited user has no password until they open the activation link.
 */
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone"),
  role: adminRole("role").notNull().default("user"),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  activatedAt: timestamp("activated_at", { withTimezone: true }),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

/** Admin sessions. The id is the SHA-256 of the cookie token, so a leaked table can't be replayed. */
export const adminSessions = pgTable(
  "admin_sessions",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("admin_sessions_user_id_idx").on(t.userId)],
);

export const adminTokenKind = pgEnum("admin_token_kind", ["reset", "invite"]);

/** One-time links emailed to admins (password reset, invitation). Only the SHA-256 of the token is stored. */
export const adminPasswordResets = pgTable(
  "admin_password_resets",
  {
    id: text("id").primaryKey(),
    kind: adminTokenKind("kind").notNull().default("reset"),
    userId: uuid("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("admin_password_resets_user_id_idx").on(t.userId)],
);

export const cmsStatus = pgEnum("cms_status", ["draft", "published"]);

/**
 * One row per item of a CMS collection (articles, services, team, ...). `data` holds
 * the fields, validated by the collection's schema in src/modules/cms/collections.
 */
export const cmsEntries = pgTable(
  "cms_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    collection: text("collection").notNull(),
    slug: text("slug"),
    status: cmsStatus("status").notNull().default("published"),
    sort: integer("sort").notNull().default(0),
    data: jsonb("data").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    updatedBy: uuid("updated_by").references(() => adminUsers.id, { onDelete: "set null" }),
  },
  (t) => [
    uniqueIndex("cms_entries_collection_slug_idx").on(t.collection, t.slug),
    index("cms_entries_collection_sort_idx").on(t.collection, t.sort),
  ],
);

/** Single-record CMS settings (contact details, homepage blocks, ...), keyed by name. */
export const cmsSettings = pgTable("cms_settings", {
  key: text("key").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  updatedBy: uuid("updated_by").references(() => adminUsers.id, { onDelete: "set null" }),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type CmsEntry = typeof cmsEntries.$inferSelect;

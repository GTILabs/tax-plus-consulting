CREATE TYPE "public"."admin_role" AS ENUM('super_admin', 'admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."admin_token_kind" AS ENUM('reset', 'invite');--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "password_hash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_password_resets" ADD COLUMN "kind" "admin_token_kind" DEFAULT 'reset' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "role" "admin_role" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "activated_at" timestamp with time zone;--> statement-breakpoint
-- Accounts created before roles existed are the owners: make them active super admins.
UPDATE "admin_users" SET "role" = 'super_admin', "activated_at" = "created_at";

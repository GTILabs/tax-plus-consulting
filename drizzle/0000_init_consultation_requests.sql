CREATE TYPE "public"."consultation_status" AS ENUM('new', 'contacted', 'closed');--> statement-breakpoint
CREATE TABLE "consultation_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"whatsapp" text NOT NULL,
	"sector" text NOT NULL,
	"message" text NOT NULL,
	"status" "consultation_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "consultation_requests_created_at_idx" ON "consultation_requests" USING btree ("created_at");
ALTER TABLE "consultation_requests" ALTER COLUMN "sector" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_requests" ALTER COLUMN "message" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "consultation_requests" ADD COLUMN "company" text;--> statement-breakpoint
ALTER TABLE "consultation_requests" ADD COLUMN "email" text;
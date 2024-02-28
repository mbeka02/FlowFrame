ALTER TABLE "list" RENAME COLUMN "order" TO "position";--> statement-breakpoint
ALTER TABLE "card" ADD COLUMN "position" integer NOT NULL;
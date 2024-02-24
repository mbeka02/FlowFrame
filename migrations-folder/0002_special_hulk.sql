ALTER TABLE "board" ADD COLUMN "orgId" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "image_id" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "image_thumb_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "image_full_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "image_user_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "image_link_html" text NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "updated_at" timestamp;
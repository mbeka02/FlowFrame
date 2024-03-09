DO $$ BEGIN
 CREATE TYPE "ACTION" AS ENUM('CREATE', 'UPDATE', 'DELETE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ENTITY_TYPE" AS ENUM('BOARD', 'LIST', 'CARD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" text NOT NULL,
	"action" "ACTION" NOT NULL,
	"entity_id" text NOT NULL,
	"entity_type" "ENTITY_TYPE" NOT NULL,
	"user_id" uuid NOT NULL,
	"user_image" text,
	"user_name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

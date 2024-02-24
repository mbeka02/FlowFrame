CREATE TABLE IF NOT EXISTS "board" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"orgId" varchar(256) NOT NULL,
	"image_id" varchar(256) NOT NULL,
	"image_thumb_url" text NOT NULL,
	"image_full_url" text NOT NULL,
	"image_user_name" text NOT NULL,
	"image_link_html" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

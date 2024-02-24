import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const board = pgTable("board", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: varchar("title", { length: 256 }).notNull(),
	orgId: varchar("orgId", { length: 256 }).notNull(),
	imageId: varchar("image_id", { length: 256 }).notNull(),
	imageThumbUrl: text("image_thumb_url").notNull(),
	imageFullUrl: text("image_full_url").notNull(),
	imageUserName: text("image_user_name").notNull(),
	imageLinkHtml: text("image_link_html").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});
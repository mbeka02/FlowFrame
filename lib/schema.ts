import { sql } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const board = pgTable("board", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 256 }).notNull(),
  orgId: varchar("orgId", { length: 256 }).notNull(),
  imageId: varchar("image_id", { length: 256 }).notNull(),
  imageThumbUrl: text("image_thumb_url").notNull(),
  imageFullUrl: text("image_full_url").notNull(),
  imageUserName: text("image_user_name").notNull(),
  imageLinkHTML: text("image_link_html").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type NewBoard = typeof board.$inferSelect;

import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

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

export const list = pgTable("list", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 256 }).notNull(),
  order: integer("order").notNull(),
  boardId: uuid("board_id")
    .references(() => board.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const card = pgTable("card", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  listId: uuid("list_id")
    .references(() => list.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type NewBoard = typeof board.$inferSelect;

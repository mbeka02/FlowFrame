import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const actionEnum = pgEnum("ACTION", ["CREATE", "UPDATE", "DELETE"]);

export const entityEnum = pgEnum("ENTITY_TYPE", ["BOARD", "LIST", "CARD"]);

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
  position: integer("position").notNull(),
  boardId: uuid("board_id")
    .references(() => board.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const auditLog = pgTable("audit_log", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organizationId: text("organization_id").notNull(),
  action: actionEnum("action").notNull(),
  entityId: text("entity_id").notNull(),
  entityType: entityEnum("entity_type").notNull(),
  entityTitle: varchar("entity_title", { length: 256 }).notNull(),
  userId: text("user_id").notNull(),
  userImage: text("user_image").notNull(),
  userName: text("user_name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const card = pgTable("card", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 256 }).notNull(),
  position: integer("position").notNull(),
  description: text("description"),
  listId: uuid("list_id")
    .references(() => list.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orgLimit = pgTable("org_limit", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organizationId: text("organization_id").notNull().unique(),
  count: integer("count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const boardToListRelations = relations(board, ({ many }) => ({
  list: many(list),
}));

export const listToBoardRelations = relations(list, ({ one, many }) => ({
  board: one(board, {
    fields: [list.boardId],
    references: [board.id],
  }),
  card: many(card),
}));
export const listToCardRelations = relations(list, ({ many }) => ({
  card: many(card),
}));

export const cardToListRelations = relations(card, ({ one }) => ({
  list: one(list, {
    fields: [card.listId],
    references: [list.id],
  }),
}));
// TO DO : refactor this
export type NewBoard = typeof board.$inferSelect;
export type NewList = typeof list.$inferSelect;
export type NewCard = typeof card.$inferSelect;
export type NewAuditLog = typeof auditLog.$inferSelect;
export type ListWithCards = NewList & { card: NewCard[] };
export type CardWithList = NewCard & { list: NewList };

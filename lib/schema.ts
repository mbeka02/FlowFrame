import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const board = pgTable("board", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
});

export type NewBoard = typeof board.$inferSelect;

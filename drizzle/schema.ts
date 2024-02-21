import { pgTable, serial, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const board = pgTable("board", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 256 }).notNull(),
});
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

// manage your schema
export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

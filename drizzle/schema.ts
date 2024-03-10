import { pgTable, pgEnum, uuid, text, varchar, timestamp, unique, integer, foreignKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const action = pgEnum("ACTION", ['DELETE', 'UPDATE', 'CREATE'])
export const entityType = pgEnum("ENTITY_TYPE", ['CARD', 'LIST', 'BOARD'])


export const auditLog = pgTable("audit_log", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	organizationId: text("organization_id").notNull(),
	action: action("action").notNull(),
	entityId: text("entity_id").notNull(),
	entityType: entityType("entity_type").notNull(),
	entityTitle: varchar("entity_title", { length: 256 }).notNull(),
	userId: text("user_id").notNull(),
	userImage: text("user_image").notNull(),
	userName: text("user_name"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const orgLimit = pgTable("org_limit", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	organizationId: text("organization_id").notNull(),
	count: integer("count").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		orgLimitOrganizationIdUnique: unique("org_limit_organization_id_unique").on(table.organizationId),
	}
});

export const list = pgTable("list", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: varchar("title", { length: 256 }).notNull(),
	position: integer("position").notNull(),
	boardId: uuid("board_id").notNull().references(() => board.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const card = pgTable("card", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: varchar("title", { length: 256 }).notNull(),
	position: integer("position").notNull(),
	description: text("description"),
	listId: uuid("list_id").notNull().references(() => list.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

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
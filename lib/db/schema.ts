import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const siteContent = pgTable("site_content", {
  id: text("id").primaryKey(),
  kind: text("kind").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  body: jsonb("body").$type<Record<string, string>>().notNull().default({}),
  position: integer("position").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  userId: uuid("userId").notNull(),
})

export const pageView = pgTable("page_view", {
  id: text("id").primaryKey(),
  path: text("path").notNull(),
  visitorHash: text("visitorHash").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

import { boolean, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(), expiresAt: timestamp("expiresAt").notNull(), token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(), updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"), userAgent: text("userAgent"), userId: text("userId").notNull(),
})
export const account = pgTable("account", {
  id: text("id").primaryKey(), accountId: text("accountId").notNull(), providerId: text("providerId").notNull(), userId: text("userId").notNull(),
  accessToken: text("accessToken"), refreshToken: text("refreshToken"), idToken: text("idToken"), accessTokenExpiresAt: timestamp("accessTokenExpiresAt"), refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"), scope: text("scope"), password: text("password"), createdAt: timestamp("createdAt").notNull().defaultNow(), updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})
export const verification = pgTable("verification", { id: text("id").primaryKey(), identifier: text("identifier").notNull(), value: text("value").notNull(), expiresAt: timestamp("expiresAt").notNull(), createdAt: timestamp("createdAt").notNull().defaultNow(), updatedAt: timestamp("updatedAt").notNull().defaultNow() })
export const siteContent = pgTable("site_content", { id: text("id").primaryKey(), kind: text("kind").notNull(), slug: text("slug").notNull().unique(), title: text("title").notNull(), body: jsonb("body").$type<Record<string, string>>().notNull().default({}), position: integer("position").notNull().default(0), published: boolean("published").notNull().default(true), createdAt: timestamp("createdAt").notNull().defaultNow(), updatedAt: timestamp("updatedAt").notNull().defaultNow(), userId: text("userId").notNull() })
export const pageView = pgTable("page_view", { id: text("id").primaryKey(), path: text("path").notNull(), visitorHash: text("visitorHash").notNull(), createdAt: timestamp("createdAt").notNull().defaultNow() })

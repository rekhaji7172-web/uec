import { boolean, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull(),
})

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
  userId: text("userId").notNull(),
})

export const uecEditor = pgTable("uec_editor", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  profileImage: text("profile_image"),
  shortBio: text("short_bio"),
  fullBio: text("full_bio"),
  youtubeUrl: text("youtube_url"),
  shortsUrl: text("shorts_url"),
  discordUrl: text("discord_url"),
  featuredAt: timestamp("featured_at"),
  archived: boolean("archived").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const uecTournament = pgTable("uec_tournament", {
  id: text("id").primaryKey(), number: integer("number").notNull().unique(), name: text("name").notNull(), slug: text("slug").notNull().unique(), status: text("status").notNull().default("UPCOMING"), description: text("description"), startAt: timestamp("start_at"), deadlineAt: timestamp("deadline_at"), timezone: text("timezone"), rules: jsonb("rules").$type<string[]>().notNull().default([]), submissionInstructions: text("submission_instructions"), editingRequirements: text("editing_requirements"), importantNotes: text("important_notes"), thumbnailUrl: text("thumbnail_url"), published: boolean("published").notNull().default(false), createdAt: timestamp("created_at").notNull().defaultNow(), updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const uecAnnouncement = pgTable("uec_announcement", {
  id: text("id").primaryKey(), tournamentId: text("tournament_id"), title: text("title").notNull(), shortDescription: text("short_description"), content: text("content").notNull(), publishAt: timestamp("publish_at"), thumbnailUrl: text("thumbnail_url"), externalUrl: text("external_url"), status: text("status").notNull().default("DRAFT"), createdAt: timestamp("created_at").notNull().defaultNow(), updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const uecResult = pgTable("uec_result", {
  id: text("id").primaryKey(), tournamentId: text("tournament_id").notNull(), position: integer("position").notNull(), editorId: text("editor_id"), editorName: text("editor_name").notNull(), editUrl: text("edit_url"), profileImage: text("profile_image"), prize: text("prize"), specialAward: text("special_award"), judgeNote: text("judge_note"), highlightText: text("highlight_text"), createdAt: timestamp("created_at").notNull().defaultNow(), updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const pageView = pgTable("page_view", {
  id: text("id").primaryKey(),
  path: text("path").notNull(),
  visitorHash: text("visitorHash").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

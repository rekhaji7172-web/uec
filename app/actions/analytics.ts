"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { pageView } from "@/lib/db/schema"
import { and, desc, eq, gte, sql } from "drizzle-orm"
import { headers } from "next/headers"

async function requireAdmin() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) throw new Error("Unauthorized") }

export type AnalyticsRange = "24h" | "month" | "year" | "all"

export async function getAnalytics(range: AnalyticsRange = "month") {
  await requireAdmin()
  const now = new Date()
  const since = range === "24h" ? new Date(now.getTime() - 24 * 60 * 60 * 1000) : range === "year" ? new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()) : range === "month" ? new Date(now.getFullYear(), now.getMonth(), 1) : null
  const bucket = range === "24h" ? sql`date_trunc('hour', ${pageView.createdAt})` : range === "year" ? sql`date_trunc('month', ${pageView.createdAt})` : sql`date_trunc('day', ${pageView.createdAt})`
  const format = range === "24h" ? "Mon DD, HH:00" : range === "year" ? "Mon YYYY" : "Mon DD, YYYY"
  const [total, live, series, routes] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(pageView),
    db.select({ count: sql<number>`count(distinct ${pageView.visitorHash})` }).from(pageView).where(gte(pageView.createdAt, new Date(now.getTime() - 24 * 60 * 60 * 1000))),
    db.select({ period: sql<string>`to_char(${bucket}, ${format})`, views: sql<number>`count(*)` }).from(pageView).where(since ? gte(pageView.createdAt, since) : undefined).groupBy(bucket).orderBy(bucket),
    db.select({ path: pageView.path, views: sql<number>`count(*)` }).from(pageView).groupBy(pageView.path).orderBy(desc(sql`count(*)`)).limit(5),
  ])
  return { range, totalViews: Number(total[0]?.count ?? 0), liveVisitors: Number(live[0]?.count ?? 0), daily: series.map((item) => ({ day: item.period, views: Number(item.views) })), routes: routes.map((item) => ({ path: item.path, views: Number(item.views) })) }
}

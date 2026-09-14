"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { pageView } from "@/lib/db/schema"
import { and, desc, eq, gte, sql } from "drizzle-orm"
import { headers } from "next/headers"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
}

export async function getAnalytics() {
  await requireAdmin()
  const now = new Date()
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const [total, live, daily, routes] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(pageView),
    db.select({ count: sql<number>`count(distinct ${pageView.visitorHash})` }).from(pageView).where(gte(pageView.createdAt, last24Hours)),
    db.select({ day: sql<string>`to_char(date_trunc('day', ${pageView.createdAt}), 'Mon DD')`, views: sql<number>`count(*)` }).from(pageView).where(gte(pageView.createdAt, last30Days)).groupBy(sql`date_trunc('day', ${pageView.createdAt})`).orderBy(sql`date_trunc('day', ${pageView.createdAt})`),
    db.select({ path: pageView.path, views: sql<number>`count(*)` }).from(pageView).groupBy(pageView.path).orderBy(desc(sql`count(*)`)).limit(5),
  ])
  return { totalViews: Number(total[0]?.count ?? 0), liveVisitors: Number(live[0]?.count ?? 0), daily: daily.map((item) => ({ day: item.day, views: Number(item.views) })), routes: routes.map((item) => ({ path: item.path, views: Number(item.views) })) }
}

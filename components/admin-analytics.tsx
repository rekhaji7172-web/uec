"use client"

import { useEffect, useState, useTransition } from "react"
import { getAnalytics } from "@/app/actions/analytics"

type Analytics = Awaited<ReturnType<typeof getAnalytics>>

export function AdminAnalytics({ initial }: { initial: Analytics }) {
  const [data, setData] = useState(initial)
  const [, startTransition] = useTransition()
  useEffect(() => {
    const timer = window.setInterval(() => startTransition(async () => setData(await getAnalytics())), 30000)
    return () => window.clearInterval(timer)
  }, [])
  const maxViews = Math.max(...data.daily.map((item) => item.views), 1)
  return <section className="admin-analytics" aria-labelledby="analytics-heading"><div className="analytics-heading"><div><span className="eyebrow">AUDIENCE</span><h2 id="analytics-heading">Audience overview</h2><p>Anonymous website activity, refreshed every 30 seconds.</p></div></div><div className="analytics-stats"><div><span>Visitors · 24h</span><strong>{data.liveVisitors.toLocaleString()}</strong></div><div><span>Total views</span><strong>{data.totalViews.toLocaleString()}</strong></div><div><span>Top page</span><strong>{data.routes[0]?.path === "/" ? "Homepage" : data.routes[0]?.path ?? "—"}</strong></div></div><div className="analytics-detail"><div><h3>Views over 30 days</h3><div className="analytics-chart" aria-label="Views over the last 30 days">{data.daily.map((item) => <div className="analytics-bar-wrap" key={item.day} title={`${item.day}: ${item.views} views`}><div className="analytics-bar" style={{ height: `${Math.max((item.views / maxViews) * 100, 5)}%` }} /><span>{item.day.slice(0, 3)}</span></div>)}</div></div><div><h3>Top pages</h3><ul className="analytics-routes">{data.routes.map((item) => <li key={item.path}><span>{item.path}</span><strong>{item.views.toLocaleString()}</strong></li>)}</ul></div></div></section>
}

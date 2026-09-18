"use client"

import { useEffect, useState, useTransition } from "react"
import { getAnalytics, type AnalyticsRange } from "@/app/actions/analytics"

type Analytics = Awaited<ReturnType<typeof getAnalytics>>
const ranges: { id: AnalyticsRange; label: string }[] = [{ id: "24h", label: "24 hours" }, { id: "month", label: "This month" }, { id: "year", label: "This year" }, { id: "all", label: "All time" }]

export function AdminAnalytics({ initial, compact = false }: { initial: Analytics; compact?: boolean }) {
  const [data, setData] = useState(initial)
  const [, startTransition] = useTransition()
  const refresh = (range: AnalyticsRange) => startTransition(async () => setData(await getAnalytics(range)))
  useEffect(() => { const timer = window.setInterval(() => refresh(data.range), 30000); return () => window.clearInterval(timer) }, [data.range])
  const maxViews = Math.max(...data.daily.map((item) => item.views), 1)
  return <section className={`admin-analytics ${compact ? "analytics-compact" : ""}`} aria-labelledby="analytics-heading"><div className="analytics-heading"><div><span className="eyebrow">AUDIENCE MONITOR</span><h2 id="analytics-heading">Views & traffic</h2><p>Live website activity with exact date and time buckets.</p></div><div className="analytics-range-tabs">{ranges.map((range) => <button key={range.id} className={data.range === range.id ? "is-active" : ""} onClick={() => refresh(range.id)}>{range.label}</button>)}</div></div><div className="analytics-stats"><div><span>Visitors · 24h</span><strong>{data.liveVisitors.toLocaleString()}</strong></div><div><span>Total views</span><strong>{data.totalViews.toLocaleString()}</strong></div><div><span>Showing</span><strong>{ranges.find((range) => range.id === data.range)?.label}</strong></div></div><div className="analytics-detail"><div><h3>{ranges.find((range) => range.id === data.range)?.label} views</h3>{data.daily.length ? <div className="analytics-chart" aria-label="Views by date and time">{data.daily.map((item) => <div className="analytics-bar-wrap" key={item.day} title={`${item.day}: ${item.views} views`}><div className="analytics-bar" style={{ height: `${Math.max((item.views / maxViews) * 100, 5)}%` }} /><span>{item.day}</span></div>)}</div> : <div className="analytics-no-data">No views recorded for this period.</div>}</div><div><h3>Top pages</h3><ul className="analytics-routes">{data.routes.map((item) => <li key={item.path}><span>{item.path === "/" ? "Homepage" : item.path}</span><strong>{item.views.toLocaleString()}</strong></li>)}</ul></div></div></section>
}

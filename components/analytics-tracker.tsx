"use client"

import { useEffect } from "react"

const visitorKey = "uec-visitor-id"

function getVisitorId() {
  try {
    const existing = window.sessionStorage.getItem(visitorKey)
    if (existing) return existing
    const next = crypto.randomUUID()
    window.sessionStorage.setItem(visitorKey, next)
    return next
  } catch {
    return crypto.randomUUID()
  }
}

export function AnalyticsTracker() {
  useEffect(() => {
    const payload = JSON.stringify({ path: window.location.pathname, visitorId: getVisitorId() })
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/view", new Blob([payload], { type: "application/json" }))
    } else {
      void fetch("/api/analytics/view", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true })
    }
  }, [])
  return null
}

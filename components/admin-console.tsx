'use client'

import { useState, useTransition } from "react"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminAnalytics } from "@/components/admin-analytics"

type Item = { id: string; kind: string; slug: string; title: string; body: Record<string, string>; position: number; published: boolean }
type Analytics = Awaited<ReturnType<typeof import("@/app/actions/analytics").getAnalytics>>

const nav = [
  ["overview", "Overview", "Monitor traffic and service status"],
  ["content", "Content editor", "Edit current website content"],
  ["terminal", "Terminal", "Run repository commands"],
]

export function AdminConsole({ initialContent, initialAnalytics, userName }: { initialContent: Item[]; initialAnalytics: Analytics; userName: string }) {
  const [section, setSection] = useState("overview")
  return <main className="console-shell">
    <aside className="console-sidebar"><div className="console-brand"><span className="console-brand-mark">U</span><span><strong>UEC Console</strong><small>Control center</small></span></div><nav aria-label="Console sections">{nav.map(([id, label, description]) => <button key={id} className={section === id ? "is-active" : ""} onClick={() => setSection(id)}><span>{label}</span><small>{description}</small></button>)}</nav><div className="console-sidebar-bottom"><a href="/admin">Legacy admin</a><a href="/">View website ↗</a></div></aside>
    <section className="console-main"><header className="console-topbar"><div><span className="eyebrow">UEC / CONTROL CENTER</span><h1>{section === "overview" ? `Good to see you, ${userName}` : nav.find(([id]) => id === section)?.[1]}</h1></div><div className="console-status"><span className="status-dot" /> System operational</div></header>
      {section === "overview" && <Overview analytics={initialAnalytics} contentCount={initialContent.length} onTerminal={() => setSection("terminal")} />}
      {section === "content" && <div className="console-panel"><div className="console-panel-heading"><div><span className="eyebrow">LIVE CONTENT</span><h2>Edit existing website content</h2><p>Changes save to the database and revalidate the public homepage.</p></div><span className="console-count">{initialContent.length} records</span></div><AdminDashboard initialContent={initialContent} userName={userName} /></div>}
      {section === "terminal" && <Terminal />}
    </section>
  </main>
}

function Overview({ analytics, contentCount, onTerminal }: { analytics: Analytics; contentCount: number; onTerminal: () => void }) {
  const topPage = analytics.routes[0]?.path === "/" ? "Homepage" : analytics.routes[0]?.path ?? "No traffic yet"
  return <div className="console-overview"><div className="console-stat-grid"><div className="console-stat-card"><span>Service health</span><strong className="health-value"><i /> Operational</strong><small>Auth, database and public site responding</small></div><div className="console-stat-card"><span>Published records</span><strong>{contentCount}</strong><small>Existing editable content entries</small></div><div className="console-stat-card"><span>Top page</span><strong>{topPage}</strong><small>{analytics.routes[0]?.views ?? 0} recorded views</small></div></div><div className="console-overview-grid"><AdminAnalytics initial={analytics} /><div className="console-quick-panel"><span className="eyebrow">QUICK ACTIONS</span><h2>Operate the project</h2><p>Use the terminal for repository health, Git checks, builds, and approved maintenance commands.</p><button className="console-primary" onClick={onTerminal}>Open terminal</button><div className="console-check-list"><span><i /> Database connected</span><span><i /> Authentication enabled</span><span><i /> Public site available</span></div></div></div></div>
}

function Terminal() {
  const [command, setCommand] = useState("git status --short")
  const [output, setOutput] = useState("Ready. Commands run from the project root.")
  const [pending, startTransition] = useTransition()
  async function run() { startTransition(async () => { const response = await fetch("/api/admin/terminal", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ command }) }); const data = await response.json(); setOutput(data.output || data.error || "No output") }) }
  return <div className="terminal-panel"><div className="console-panel-heading"><div><span className="eyebrow">REPOSITORY TERMINAL</span><h2>Command center</h2><p>Full terminal access for this authenticated admin. Be careful: commands can change the repository.</p></div><span className="terminal-badge">/vercel/share/v0-project</span></div><div className="terminal-window"><div className="terminal-toolbar"><span><i /> <i /> <i /></span><small>bash · project root</small></div><pre className="terminal-output">{output}</pre><div className="terminal-input-row"><span>$</span><input value={command} onChange={(event) => setCommand(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.nativeEvent.isComposing && event.keyCode !== 229) run() }} aria-label="Terminal command" /><button onClick={run} disabled={pending}>{pending ? "Running…" : "Run"}</button></div></div><p className="terminal-warning">Commands are authenticated and time-limited, but they can modify code, Git state, and files.</p></div>
}

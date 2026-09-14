'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminSignInPage() {
  const router = useRouter(); const [blockedOnRedirect, setBlockedOnRedirect] = useState(false)
  useEffect(() => { setBlockedOnRedirect(new URLSearchParams(window.location.search).get("blocked") === "1") }, [])
  const [error, setError] = useState(""); const [pending, setPending] = useState(false)
  async function submit(form: FormData) { setPending(true); setError(""); const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), password: form.get("password") }) }); if (!response.ok) { const result = await response.json().catch(() => ({})); setError(response.status === 403 ? "Your admin access is blocked." : (result.error || "Unable to sign in with those details.")); setPending(false); return }; router.push("/admin"); router.refresh() }
  return <main className="admin-auth"><form className="admin-auth-card" action={submit}><span className="eyebrow">UEC ADMIN</span><h1>Control the story.</h1><p>Sign in to publish editors, results, articles, events and community updates.</p><label>Admin name<input name="name" required autoComplete="username" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label>{(error || blockedOnRedirect) && <div className="admin-error" role="alert">{error || "Your admin access is blocked."}</div>}<button className="admin-save" disabled={pending}>{pending ? "Signing in..." : "Sign in"}</button></form></main>
}

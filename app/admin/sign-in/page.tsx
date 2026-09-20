'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
export default function AdminSignInPage() {
  const router = useRouter(); const [blockedOnRedirect, setBlockedOnRedirect] = useState(false)
  useEffect(() => { setBlockedOnRedirect(new URLSearchParams(window.location.search).get("blocked") === "1") }, [])
  const [error, setError] = useState(""); const [pending, setPending] = useState(false)
  async function submit(form: FormData) {
    setPending(true); setError("")
    const name = String(form.get("name") ?? "")
    const password = String(form.get("password") ?? "")
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, password }),
      })
      if (!response.ok) {
        const result = await response.json().catch(() => null)
        setError(result?.error || "Unable to sign in with those details. Check the admin name and password.")
        setPending(false)
        return
      }
      router.replace("/admin")
      router.refresh()
    } catch {
      setError("The sign-in service is unavailable. Please try again.")
      setPending(false)
    }
  }
  return <main className="admin-auth"><form className="admin-auth-card" action={submit}><span className="eyebrow">UEC ADMIN</span><h1>Control the story.</h1><p>Sign in to publish editors, results, articles, events and community updates.</p><label>Admin name<input name="name" required autoComplete="username" placeholder="Yuvraj" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" /></label>{(error || blockedOnRedirect) && <div className="admin-error" role="alert">{error || "Your admin access is blocked."}</div>}<button className="admin-save" disabled={pending}>{pending ? "Signing in..." : "Sign in"}</button></form></main>
}

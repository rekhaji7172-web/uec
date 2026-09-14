'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminSignInPage() {
  const router = useRouter(); const [error, setError] = useState(""); const [pending, setPending] = useState(false)
  async function submit(form: FormData) { setPending(true); setError(""); const response = await fetch("/api/auth/sign-in/email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) }); if (!response.ok) { setError("Unable to sign in with those details."); setPending(false); return }; router.push("/admin"); router.refresh() }
  return <main className="admin-auth"><form className="admin-auth-card" action={submit}><span className="eyebrow">UEC ADMIN</span><h1>Control the story.</h1><p>Sign in to publish editors, results, articles, events and community updates.</p><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label>{error && <div className="admin-error" role="alert">{error}</div>}<button className="admin-save" disabled={pending}>{pending ? "Signing in..." : "Sign in"}</button><a className="admin-site-link" href="/admin/sign-up">Create the first admin account</a></form></main>
}

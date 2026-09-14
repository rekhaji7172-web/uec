'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminSignUpPage() {
  const router = useRouter(); const [error, setError] = useState(""); const [pending, setPending] = useState(false)
  async function submit(form: FormData) { setPending(true); setError(""); const response = await fetch("/api/auth/sign-up/email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), email: form.get("email"), password: form.get("password") }) }); if (!response.ok) { setError("Unable to create this admin account."); setPending(false); return }; router.push("/admin"); router.refresh() }
  return <main className="admin-auth"><form className="admin-auth-card" action={submit}><span className="eyebrow">UEC ADMIN</span><h1>Create access.</h1><p>Set up an administrator account for the UEC content control room.</p><label>Name<input name="name" required autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Password<input name="password" type="password" minLength={8} required autoComplete="new-password" /></label>{error && <div className="admin-error" role="alert">{error}</div>}<button className="admin-save" disabled={pending}>{pending ? "Creating..." : "Create admin"}</button><a className="admin-site-link" href="/admin/sign-in">Already have access? Sign in</a></form></main>
}

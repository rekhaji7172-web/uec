import { auth } from "@/lib/auth"
import { adminEmail, cleanAdminName } from "@/lib/admin-identity"
import { NextResponse } from "next/server"

const bootstrapName = "Yuvraj"
const bootstrapPassword = "Yuvrajji7"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const name = cleanAdminName(String(body.name ?? ""))
  const password = String(body.password ?? "")
  if (!name || !password) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })

  const email = adminEmail(name)

  // Try to sign in with the provided credentials
  const signInUrl = new URL("/api/auth/sign-in/email", request.headers.get("origin") || new URL(request.url).origin)
  const authHeaders = new Headers(request.headers)
  authHeaders.set("content-type", "application/json")

  return auth.handler(
    new Request(signInUrl, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ email, password }),
    }),
  )
}

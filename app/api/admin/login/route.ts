import { auth } from "@/lib/auth"
import { adminEmail, cleanAdminName } from "@/lib/admin-identity"
import { NextResponse } from "next/server"

const bootstrapName = "Yuvraj"
const bootstrapPassword = "Yuvrajji7"
const bootstrapEmail = "yuvraj-admin@uec.local"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const name = cleanAdminName(String(body.name ?? ""))
  const password = String(body.password ?? "")
  if (!name || !password) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })

  const origin = request.headers.get("origin") || new URL(request.url).origin
  const authHeaders = new Headers(request.headers)
  authHeaders.set("content-type", "application/json")

  async function forward(path: string, body: Record<string, string>) {
    return auth.handler(
      new Request(new URL(path, origin), {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(body),
      }),
    )
  }

  // Provision the requested bootstrap admin on first use, then use the normal
  // Better Auth session flow so the cookie works across devices and reloads.
  if (name === bootstrapName && password === bootstrapPassword) {
    const bootstrapResponse = await forward("/api/auth/sign-up/email", {
      name: bootstrapName,
      email: bootstrapEmail,
      password: bootstrapPassword,
    })
    if (bootstrapResponse.ok) return bootstrapResponse
    return forward("/api/auth/sign-in/email", { email: bootstrapEmail, password })
  }

  return forward("/api/auth/sign-in/email", {
    email: adminEmail(name),
    password,
  })
}

import { auth } from "@/lib/auth"
import { adminEmail, cleanAdminName } from "@/lib/admin-identity"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

const bootstrapName = "Yuvraj"
const bootstrapPassword = "Yuvrajji7"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const name = cleanAdminName(String(body.name ?? ""))
  const password = String(body.password ?? "")
  if (!name || !password) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })

  const email = adminEmail(name)
  const blockedAccount = await db.select({ id: user.id }).from(user).where(and(eq(user.email, email), eq(user.blocked, true))).limit(1)
  if (blockedAccount.length > 0) return NextResponse.json({ error: "Your admin access is blocked. Contact another administrator." }, { status: 403 })
  const existing = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1)
  if (existing.length === 0 && name.toLowerCase() === bootstrapName.toLowerCase() && password === bootstrapPassword) {
    await auth.api.signUpEmail({ body: { name: bootstrapName, email, password } })
  }

  return auth.handler(new Request(new URL("/api/auth/sign-in/email", request.url), { method: "POST", headers: { ...Object.fromEntries(request.headers.entries()), "content-type": "application/json" }, body: JSON.stringify({ email, password }) }))
}

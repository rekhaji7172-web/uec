import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { pageView } from "@/lib/db/schema"
import { hashVisitor } from "@/lib/analytics"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { path?: string; visitorId?: string }
    const path = typeof body.path === "string" && body.path.startsWith("/") ? body.path.slice(0, 180) : "/"
    const visitorId = typeof body.visitorId === "string" ? body.visitorId.slice(0, 160) : "anonymous"
    await db.insert(pageView).values({ id: crypto.randomUUID(), path, visitorHash: hashVisitor(visitorId) })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

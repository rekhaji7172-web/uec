import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const formData = await request.formData()
  const file = formData.get("file")
  if (!(file instanceof File)) return NextResponse.json({ error: "No image provided" }, { status: 400 })
  if (!ALLOWED_TYPES.has(file.type) || file.size > MAX_SIZE) return NextResponse.json({ error: "Use a JPG, PNG, or WebP image under 5MB" }, { status: 400 })
  const extension = file.type.split("/")[1].replace("jpeg", "jpg")
  const blob = await put(`uec/editors/${crypto.randomUUID()}.${extension}`, file, { access: "public", addRandomSuffix: false })
  return NextResponse.json({ url: blob.url })
}

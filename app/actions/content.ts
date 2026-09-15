'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { siteContent, user as adminUser } from "@/lib/db/schema"
import { and, asc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { adminEmail, cleanAdminName } from "@/lib/admin-identity"

export async function listAdmins() {
  await adminId()
  return db.select({ id: adminUser.id, name: adminUser.name }).from(adminUser).orderBy(asc(adminUser.name)).then((admins) => admins.map((admin) => ({ ...admin, blocked: false })))
}

export async function setAdminBlocked(id: string, blocked: boolean) {
  const currentId = await adminId()
  if (id === currentId) throw new Error("You cannot block your own account")
  throw new Error("Admin blocking is unavailable with the current auth schema")
}

export async function addAdmin(input: { name: string; password: string }) {
  await adminId()
  const name = cleanAdminName(input.name)
  if (name.length < 2 || input.password.length < 8) throw new Error("Admin name and password are invalid")
  await auth.api.signUpEmail({ body: { name, email: adminEmail(name), password: input.password } })
}

async function adminId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

export async function listContent(kind?: string) {
  const userId = await adminId()
  return db.select().from(siteContent).where(kind ? and(eq(siteContent.kind, kind), eq(siteContent.userId, userId)) : eq(siteContent.userId, userId)).orderBy(asc(siteContent.position))
}

export async function saveContent(input: { id?: string; kind: string; slug: string; title: string; body: Record<string, string>; position?: number; published?: boolean }) {
  const userId = await adminId()
  if (input.id) {
    await db.update(siteContent).set({ ...input, updatedAt: new Date() }).where(and(eq(siteContent.id, input.id), eq(siteContent.userId, userId)))
  } else {
    await db.insert(siteContent).values({ id: crypto.randomUUID(), ...input, position: input.position ?? 0, published: input.published ?? true, userId })
  }
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function deleteContent(id: string) {
  const userId = await adminId()
  await db.delete(siteContent).where(and(eq(siteContent.id, id), eq(siteContent.userId, userId)))
  revalidatePath("/")
  revalidatePath("/admin")
}

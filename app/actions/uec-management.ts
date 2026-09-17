'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { uecAnnouncement, uecEditor, uecResult, uecTournament } from "@/lib/db/schema"
import { and, asc, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") }

export async function listTournaments() { await requireAdmin(); return db.select().from(uecTournament).orderBy(desc(uecTournament.number)) }
export async function listEditors() { await requireAdmin(); return db.select().from(uecEditor).where(eq(uecEditor.archived, false)).orderBy(asc(uecEditor.name)) }
export async function listAnnouncements() { await requireAdmin(); return db.select().from(uecAnnouncement).orderBy(desc(uecAnnouncement.updatedAt)) }
export async function listResults(tournamentId?: string) { await requireAdmin(); return db.select().from(uecResult).where(tournamentId ? eq(uecResult.tournamentId, tournamentId) : undefined).orderBy(asc(uecResult.position)) }

export async function saveTournament(input: { id?: string; number: number; name: string; status: string; description?: string; startAt?: string; deadlineAt?: string; timezone?: string; rules?: string[]; submissionInstructions?: string; editingRequirements?: string; importantNotes?: string; thumbnailUrl?: string; published?: boolean }) {
  await requireAdmin()
  const values = { number: input.number, name: input.name, slug: slugify(`${input.number}-${input.name}`), status: input.status, description: input.description || null, startAt: input.startAt ? new Date(input.startAt) : null, deadlineAt: input.deadlineAt ? new Date(input.deadlineAt) : null, timezone: input.timezone || null, rules: input.rules || [], submissionInstructions: input.submissionInstructions || null, editingRequirements: input.editingRequirements || null, importantNotes: input.importantNotes || null, thumbnailUrl: input.thumbnailUrl || null, published: input.published ?? false, updatedAt: new Date() }
  if (input.id) await db.update(uecTournament).set(values).where(eq(uecTournament.id, input.id))
  else await db.insert(uecTournament).values({ id: crypto.randomUUID(), ...values })
  revalidatePath("/"); revalidatePath("/tournaments"); revalidatePath("/admin")
}

export async function saveEditor(input: { id?: string; name: string; username: string; profileImage?: string; shortBio?: string; fullBio?: string; youtubeUrl?: string; shortsUrl?: string; discordUrl?: string }) {
  await requireAdmin()
  const values = { name: input.name, username: slugify(input.username), profileImage: input.profileImage || null, shortBio: input.shortBio || null, fullBio: input.fullBio || null, youtubeUrl: input.youtubeUrl || null, shortsUrl: input.shortsUrl || null, discordUrl: input.discordUrl || null, updatedAt: new Date() }
  if (input.id) await db.update(uecEditor).set(values).where(eq(uecEditor.id, input.id))
  else await db.insert(uecEditor).values({ id: crypto.randomUUID(), ...values })
  revalidatePath("/editors"); revalidatePath("/admin")
}

export async function saveAnnouncement(input: { id?: string; tournamentId?: string; title: string; shortDescription?: string; content: string; publishAt?: string; thumbnailUrl?: string; externalUrl?: string; status: string }) {
  await requireAdmin()
  const values = { tournamentId: input.tournamentId || null, title: input.title, shortDescription: input.shortDescription || null, content: input.content, publishAt: input.publishAt ? new Date(input.publishAt) : null, thumbnailUrl: input.thumbnailUrl || null, externalUrl: input.externalUrl || null, status: input.status, updatedAt: new Date() }
  if (input.id) await db.update(uecAnnouncement).set(values).where(eq(uecAnnouncement.id, input.id))
  else await db.insert(uecAnnouncement).values({ id: crypto.randomUUID(), ...values })
  revalidatePath("/"); revalidatePath("/announcements"); revalidatePath("/admin")
}

export async function saveResults(tournamentId: string, results: Array<{ position: number; editorId?: string; editorName: string; editUrl?: string; profileImage?: string; prize?: string; specialAward?: string; judgeNote?: string; highlightText?: string }>) {
  await requireAdmin()
  await db.delete(uecResult).where(eq(uecResult.tournamentId, tournamentId))
  if (results.length) await db.insert(uecResult).values(results.map((result) => ({ id: crypto.randomUUID(), tournamentId, position: result.position, editorId: result.editorId || null, editorName: result.editorName, editUrl: result.editUrl || null, profileImage: result.profileImage || null, prize: result.prize || null, specialAward: result.specialAward || null, judgeNote: result.judgeNote || null, highlightText: result.highlightText || null })))
  revalidatePath(`/tournaments/${tournamentId}`); revalidatePath("/admin")
}

export async function getPublicTournaments() { return db.select().from(uecTournament).where(eq(uecTournament.published, true)).orderBy(desc(uecTournament.number)) }
export async function getPublicTournament(slug: string) { const rows = await db.select().from(uecTournament).where(and(eq(uecTournament.slug, slug), eq(uecTournament.published, true))); if (!rows[0]) return null; const results = await db.select().from(uecResult).where(eq(uecResult.tournamentId, rows[0].id)).orderBy(asc(uecResult.position)); return { tournament: rows[0], results } }
export async function getPublicEditors() { return db.select().from(uecEditor).where(eq(uecEditor.archived, false)).orderBy(asc(uecEditor.name)) }
export async function getPublicEditor(username: string) { const rows = await db.select().from(uecEditor).where(and(eq(uecEditor.username, username), eq(uecEditor.archived, false))); if (!rows[0]) return null; const results = await db.select().from(uecResult).where(eq(uecResult.editorId, rows[0].id)).orderBy(asc(uecResult.position)); return { editor: rows[0], results } }
export async function getPublicAnnouncements() { return db.select().from(uecAnnouncement).where(eq(uecAnnouncement.status, "PUBLISHED")).orderBy(desc(uecAnnouncement.publishAt)) }

import Link from "next/link"
import type { uecTournament } from "@/lib/db/schema"

type Tournament = typeof uecTournament.$inferSelect

export function CurrentTournamentBanner({ tournament }: { tournament: Tournament | null }) {
  if (!tournament) return null
  const label = tournament.status.replaceAll("_", " ")
  return <section className="current-tournament-banner"><div><p className="eyebrow">CURRENT TOURNAMENT · UEC #{tournament.number}</p><h2>{tournament.name}</h2><p>{tournament.description || `The UEC archive is ready for ${label.toLowerCase()}.`}</p></div><div className="current-tournament-meta"><strong>{label}</strong>{tournament.deadlineAt && <span>Deadline · {tournament.deadlineAt.toLocaleString()}</span>}<Link href={`/tournaments/${tournament.slug}`}>View tournament ↗</Link></div></section>
}

export function getCurrentTournament(tournaments: Tournament[]) { return tournaments.find((item) => item.status !== "COMPLETED") || tournaments[0] || null }

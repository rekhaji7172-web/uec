import Link from "next/link"
import { getPublicTournaments } from "@/app/actions/uec-management"

export const dynamic = "force-dynamic"

export default async function TournamentsPage() {
  const tournaments = await getPublicTournaments()
  return <main className="archive-page"><div className="archive-shell"><p className="eyebrow">UEC ARCHIVE</p><h1>Tournaments</h1><p className="archive-intro">Every competition, announcement, and official result in one evolving archive.</p>{tournaments.length === 0 ? <div className="archive-empty"><h2>The archive is ready for its next chapter.</h2><p>No published tournaments yet.</p></div> : <div className="archive-grid">{tournaments.map((tournament) => <Link className="archive-card" href={`/tournaments/${tournament.slug}`} key={tournament.id}><span>UEC #{tournament.number}</span><h2>{tournament.name}</h2><strong>{tournament.status.replaceAll("_", " ")}</strong><p>{tournament.description || "Official tournament archive entry."}</p></Link>)}</div>}</div></main>
} 

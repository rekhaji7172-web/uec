import { notFound } from "next/navigation"
import { getPublicTournament } from "@/app/actions/uec-management"

export const dynamic = "force-dynamic"

export default async function TournamentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getPublicTournament(slug)
  if (!data) notFound()
  const { tournament, results } = data
  return <main className="archive-page"><article className="tournament-detail"><p className="eyebrow">UEC #{tournament.number} · {tournament.status.replaceAll("_", " ")}</p><h1>{tournament.name}</h1><p className="archive-intro">{tournament.description || "Official UEC tournament archive."}</p><div className="tournament-meta">{tournament.startAt && <div><span>START</span><strong>{tournament.startAt.toLocaleString()}</strong></div>}{tournament.deadlineAt && <div><span>DEADLINE</span><strong>{tournament.deadlineAt.toLocaleString()}</strong></div>}</div><section className="rules-panel"><p className="eyebrow">RULES</p>{tournament.rules.length ? <ol>{tournament.rules.map((rule, index) => <li key={`${rule}-${index}`}>{rule}</li>)}</ol> : <p>Rules will be published by the UEC team.</p>}</section>{results.length > 0 && <section className="results-panel"><p className="eyebrow">FINAL RESULTS</p><div className="results-grid">{results.map((result) => <div className={`result-card result-${result.position}`} key={result.id}><span>#{result.position}</span><h2>{result.editorName}</h2>{result.prize && <p>{result.prize}</p>}{result.editUrl && <a href={result.editUrl} target="_blank" rel="noreferrer">Watch edit ↗</a>}</div>)}</div></section>}</article></main>
}

import { notFound } from "next/navigation"
import { getPublicTournament } from "@/app/actions/uec-management"
import { BackButton } from "@/components/uec/back-button"

export const dynamic = "force-dynamic"

export default async function TournamentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getPublicTournament(slug)
  if (!data && slug !== "parrotx2-tournament") notFound()
  const tournament = data?.tournament ?? {
    id: "uec-4-preview",
    number: 4,
    name: "ParrotX2 Tournament",
    slug: "parrotx2-tournament",
    status: "OPEN",
    description: "The fourth UEC editing tournament is now live.",
    startAt: new Date("2026-09-19T11:59:00"),
    deadlineAt: new Date("2026-09-29T23:59:00"),
    rules: [
      "There is a strict limit of two submissions per person.",
      "All entries must feature ParrotX2 exclusively.",
      "Keep in mind that skull edits and templates are strictly prohibited.",
      "Plagiarism or using stolen work will result in immediate disqualification.",
    ],
  }
  const results = data?.results ?? []
  const announcements = data?.announcements ?? [{ title: "The Launch of the fourth tournament of UEC", content: "UEC Editing Tournament 4 Find the Best Unstable Editor The 4th Unstable Editing Community Editing Competition is here! This time, we're challenging editors to showcase their skills by creating the best ParrotX2 edit. Whether you're a seasoned editor or just looking to test your skills, everyone is welcome to participate. Competition Rules - Maximum of 2 submissions per person. - All entries must feature ParrotX2 exclusively. - Skull edits and templates are strictly prohibited. - Plagiarism or stolen work will result in immediate disqualification. - Every submission must be entirely your own work. - Entries must be submitted before the deadline. Deadline September 30th, 2026 How to Enter You can submit your entry through: Discord Join the Unstable Editing Community and submit your edit in the designated tournament channel. YouTube Post your edit using the hashtag #UECEditS4. Email Send a Google Drive link to your edit to unstableeditingcommunity@gmail.com. Good Luck! Bring your best editing skills and show everyone what you can create. May the best editor win!" }]
  const formatDate = (value: Date) => value.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
  return <main className="archive-page tournament-page"><article className="tournament-detail"><BackButton /><div className="tournament-heading"><p className="eyebrow">UEC #{tournament.number} · {tournament.status.replaceAll("_", " ")}</p><h1>{tournament.name}</h1></div><div className="tournament-meta">{tournament.startAt && <div><span>START</span><strong>{formatDate(tournament.startAt)}, 11:59:00 AM</strong></div>}{tournament.deadlineAt && <div><span>DEADLINE</span><strong>{formatDate(tournament.deadlineAt)}, 11:59:00 PM</strong></div>}<div><span>STATUS</span><strong>{tournament.status === "OPEN" ? "SUBMISSIONS OPEN" : tournament.status.replaceAll("_", " ")}</strong></div></div>{announcements[0] && <section className="announcement-card"><span>OFFICIAL ANNOUNCEMENT</span><h2>{announcements[0].title}</h2><p>{announcements[0].content}</p></section>}<section className="rules-panel"><p className="eyebrow">RULES</p>{tournament.rules.length ? <ol>{tournament.rules.map((rule, index) => <li key={`${rule}-${index}`}>{rule}</li>)}</ol> : <p>Rules will be published by the UEC team.</p>}</section>{results.length > 0 && <section className="results-panel"><p className="eyebrow">FINAL RESULTS</p><div className="results-grid">{results.map((result) => <div className={`result-card result-${result.position}`} key={result.id}><span>#{result.position}</span><h2>{result.editorName}</h2>{result.prize && <p>{result.prize}</p>}{result.judgeNote && <p>{result.judgeNote}</p>}{result.editUrl && <a href={result.editUrl} target="_blank" rel="noreferrer">Watch edit ↗</a>}</div>)}</div></section>}</article></main>
}

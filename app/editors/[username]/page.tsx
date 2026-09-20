import { notFound } from "next/navigation"
import { getPublicEditor } from "@/app/actions/uec-management"
import { BackButton } from "@/components/uec/back-button"

export const dynamic = "force-dynamic"

export default async function EditorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const data = await getPublicEditor(username)
  if (!data) notFound()
  const { editor, results } = data
  const wins = results.filter((result) => result.position === 1).length
  const topThree = results.filter((result) => result.position <= 3).length
  return <main className="archive-page"><article className="profile-detail"><BackButton />{editor.profileImage ? <img className="profile-image" src={editor.profileImage} alt={editor.name} /> : <div className="profile-image profile-placeholder">{editor.name.slice(0, 1)}</div>}<p className="eyebrow">EDITOR · @{editor.username}</p><h1>{editor.name}</h1><p className="archive-intro">{editor.fullBio || editor.shortBio || "UEC editor profile."}</p><div className="career-stats"><div><strong>{results.length}</strong><span>Tournaments</span></div><div><strong>{wins}</strong><span>Wins</span></div><div><strong>{topThree}</strong><span>Top 3</span></div></div><section className="history-panel"><p className="eyebrow">TOURNAMENT HISTORY</p>{results.length ? results.map((result) => <div className="history-row" key={result.id}><strong>#{result.position}</strong><span>{result.tournamentId}</span>{result.editUrl && <a href={result.editUrl} target="_blank" rel="noreferrer">View edit ↗</a>}</div>) : <p>No published tournament appearances yet.</p>}</section></article></main>
}

import Link from "next/link"
import { getPublicEditors } from "@/app/actions/uec-management"
import { BackButton } from "@/components/uec/back-button"

export const dynamic = "force-dynamic"

export default async function EditorsPage() {
  const editors = await getPublicEditors()
  return <main className="archive-page"><div className="archive-shell"><BackButton /><p className="eyebrow">UEC COMMUNITY</p><h1>Editors</h1><p className="archive-intro">Meet the creators shaping every UEC season.</p>{editors.length === 0 ? <div className="archive-empty"><h2>No editor profiles published yet.</h2><p>Profiles will appear here once the UEC team adds them.</p></div> : <div className="editor-grid">{editors.map((editor) => <Link className="editor-card" href={`/editors/${editor.username}`} key={editor.id}>{editor.profileImage ? <img src={editor.profileImage} alt="" /> : <div className="editor-avatar">{editor.name.slice(0, 1)}</div>}<div><span>@{editor.username}</span><h2>{editor.name}</h2><p>{editor.shortBio || "UEC editor"}</p></div></Link>)}</div>}</div></main>
}

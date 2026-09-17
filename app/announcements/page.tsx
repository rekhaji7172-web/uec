import { getPublicAnnouncements } from "@/app/actions/uec-management"

export const dynamic = "force-dynamic"

export default async function AnnouncementsPage() {
  const announcements = await getPublicAnnouncements()
  return <main className="archive-page"><div className="archive-shell"><p className="eyebrow">UEC NEWSROOM</p><h1>Announcements</h1><p className="archive-intro">Official tournament updates, results, and community notes.</p>{announcements.length === 0 ? <div className="archive-empty"><h2>No announcements published yet.</h2><p>New official updates will appear here.</p></div> : <div className="announcement-list">{announcements.map((post) => <article className="announcement-card" key={post.id}><span>{post.publishAt?.toLocaleDateString() || "UEC UPDATE"}</span><h2>{post.title}</h2><p>{post.shortDescription || post.content}</p>{post.externalUrl && <a href={post.externalUrl} target="_blank" rel="noreferrer">Read more ↗</a>}</article>)}</div>}</div></main>
}

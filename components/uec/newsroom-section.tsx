"use client"

import Link from "next/link"
import type { uecAnnouncement, uecTournament } from "@/lib/db/schema"
import { Reveal } from "./reveal"

type Tournament = typeof uecTournament.$inferSelect
type Announcement = typeof uecAnnouncement.$inferSelect

function formatDate(date: Date | null) {
  if (!date) return null
  return new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
}

function excerpt(text: string, max = 150) {
  const clean = text.trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max).trimEnd()}…`
}

export function NewsroomSection({
  tournaments,
  announcements,
}: {
  tournaments: Tournament[]
  announcements: Announcement[]
}) {
  const fallbackTournament = {
    id: "uec-4-preview",
    number: 4,
    name: "ParrotX2 Tournament",
    slug: "parrotx2-tournament",
    status: "OPEN",
    description: "The fourth UEC editing tournament is now live.",
    deadlineAt: new Date("2026-09-30T23:59:00"),
  } as unknown as Tournament
  const fallbackAnnouncement = {
    id: "uec-4-launch-preview",
    tournamentId: fallbackTournament.id,
    title: "The Launch of the fourth tournament of UEC",
    shortDescription: "UEC Editing Tournament 4. Find the best Unstable Editor.",
    content: "UEC Editing Tournament 4 is here! This time, we're challenging the community.",
    publishAt: new Date("2026-09-20T12:00:00"),
    externalUrl: null,
  } as unknown as Announcement
  const current = tournaments.find((item) => item.status !== "COMPLETED") ?? tournaments[0] ?? fallbackTournament
  const posts = announcements.length > 0 ? announcements.slice(0, 6) : [fallbackAnnouncement]
  const tournamentById = new Map([...tournaments, fallbackTournament].map((item) => [item.id, item]))

  return (
    <section className="section-pad section-line newsroom-section" id="newsroom">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Newsroom</span>
            <h2 className="section-heading">Announcements &amp; live tournament</h2>
            <p className="section-sub">
              Fresh from the UEC team — the tournament currently on the board plus every announcement
              we publish for the community.
            </p>
          </div>
        </Reveal>

        {current && (
          <Reveal delay={60}>
            <article className="newsroom-feature">
              <div className="newsroom-feature-copy">
                <span className="eyebrow">Current tournament · UEC #{current.number}</span>
                <h3>{current.name}</h3>
                <p>
                  {current.description ||
                    `The UEC archive is ready for ${current.status.replaceAll("_", " ").toLowerCase()}.`}
                </p>
                <span className="newsroom-status">{current.status.replaceAll("_", " ")}</span>
              </div>
              <div className="newsroom-feature-side">
                {current.deadlineAt && (
                  <span className="newsroom-deadline">
                    Submission deadline
                    <strong>{formatDate(current.deadlineAt)}</strong>
                  </span>
                )}
                <Link className="newsroom-cta" href={`/tournaments/${current.slug}`}>
                  View tournament <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          </Reveal>
        )}

        {posts.length > 0 && (
          <div className="newsroom-grid">
            {posts.map((post, index) => {
              const linked = post.tournamentId ? tournamentById.get(post.tournamentId) : null
              const date = formatDate(post.publishAt ?? post.createdAt)
              const href = post.externalUrl || (linked ? `/tournaments/${linked.slug}` : null)
              const external = Boolean(post.externalUrl)
              return (
                <Reveal key={post.id} delay={90 + index * 60}>
                  <article className="newsroom-card">
                    <div className="newsroom-meta">
                      {date && <span>{date}</span>}
                      {linked && <span>· UEC #{linked.number}</span>}
                    </div>
                    <h4>{post.title}</h4>
                    <p>{post.shortDescription || excerpt(post.content)}</p>
                    {href &&
                      (external ? (
                        <a className="newsroom-link" href={href} target="_blank" rel="noreferrer">
                          Read more <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <Link className="newsroom-link" href={href}>
                          Read more <span aria-hidden="true">↗</span>
                        </Link>
                      ))}
                  </article>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

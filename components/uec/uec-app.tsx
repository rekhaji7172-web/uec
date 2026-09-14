"use client"

import { useCallback, useState } from "react"
import {
  LATEST_SEASON,
  seasonById,
  type Editor,
  type Season,
} from "@/lib/uec-data"
import { Nav } from "./nav"
import { Hero } from "./hero"
import { SeasonStrip } from "./season-strip"
import { Leaderboard } from "./leaderboard"
import { EditorsGrid } from "./editors-grid"
import { EditorReelSection } from "./editor-reel"
import { DiscordCommunity } from "./discord-community"
import { Awards } from "./awards"
import { Upcoming } from "./upcoming"
import { Footer } from "./footer"
import { EditorModal } from "./editor-modal"
import { Reveal } from "./reveal"

export function UecApp() {
  const [activeSeasonId, setActiveSeasonId] = useState<string>(LATEST_SEASON.id)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const activeSeason: Season = seasonById(activeSeasonId) ?? LATEST_SEASON

  const openEditor = useCallback((e: Editor) => {
    setEditor(e)
    setModalOpen(true)
  }, [])

  const closeEditor = useCallback(() => setModalOpen(false), [])

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const selectSeason = useCallback((id: string) => {
    const season = seasonById(id)
    if (!season) return
    if (season.status === "upcoming") {
      const el = document.getElementById("upcoming")
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    setActiveSeasonId(id)
    const el = document.getElementById("leaderboard")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <Nav />

      <main>
        <Hero onOpenEditor={openEditor} onJump={jump} />

        {/* Seasons */}
        <section className="section-pad section-line" id="seasons">
          <div className="wrap">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow">Season Archive</span>
                <h2 className="section-heading">Every season, one bracket at a time</h2>
                <p className="section-sub">
                  One featured creator. A room full of ambitious editors. Choose a season and trace the edits,
                  rankings and rivalries that made it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <SeasonStrip activeSeasonId={activeSeasonId} onSelect={selectSeason} />
            </Reveal>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="section-pad section-line" id="leaderboard">
          <div className="wrap">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow">{activeSeason.label} · Featured {activeSeason.subject}</span>
                <h2 className="section-heading">{activeSeason.label} Leaderboard</h2>
                <p className="section-sub">
                  Final standings for the best {activeSeason.subject} editors. Select any editor to
                  open their full competition profile.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <Leaderboard season={activeSeason} onOpenEditor={openEditor} />
            </Reveal>
          </div>
        </section>

        {/* Editors */}
        <section className="section-pad section-line" id="editors">
          <div className="wrap">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow">The Roster</span>
                <h2 className="section-heading">Editor profiles</h2>
                <p className="section-sub">
                  Everyone who has placed in a UEC final, ranked by titles then best finish. Open a
                  card for full history and awards.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <EditorsGrid onOpenEditor={openEditor} />
            </Reveal>
          </div>
        </section>

        <EditorReelSection />
        <DiscordCommunity />

        {/* Awards */}
        <section className="section-pad section-line" id="awards">
          <div className="wrap">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow">Hall of Honors</span>
                <h2 className="section-heading">Season awards</h2>
                <p className="section-sub">
                  The official title handed to each season&apos;s champion, plus any bonus prizes
                  on the line.
                </p>
              </div>
            </Reveal>
            <Awards onOpenEditor={openEditor} />
          </div>
        </section>

        {/* Upcoming */}
        <section className="section-pad section-line" id="upcoming">
          <div className="wrap">
            <Reveal className="section-head">
              <div>
                <span className="eyebrow">What&apos;s Next</span>
                <h2 className="section-heading">The next season</h2>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <Upcoming />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />

      <EditorModal editor={editor} open={modalOpen} onClose={closeEditor} />
    </>
  )
}

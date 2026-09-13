"use client"

import { useEffect, useMemo, useState } from "react"
import { Play, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { SEASONS, type Finalist } from "@/lib/uec-data"
import { Avatar } from "./avatar"
import { Reveal } from "./reveal"

type ReelItem = Finalist & { season: string; subject: string; editorName: string }

function youtubeId(url: string) {
  return url.match(/(?:shorts\/|youtu\.be\/|watch\?v=)([^?&/]+)/)?.[1] ?? null
}

function youtubeEmbed(url: string) {
  const id = youtubeId(url)
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1&controls=1&loop=1&playlist=${id}` : null
}

export function EditorReel() {
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState<ReelItem | null>(null)

  useEffect(() => {
    if (!active) return
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setActive(null)
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [active])
  const items = useMemo(() => {
    const season = SEASONS.find((entry) => entry.id === "s3")
    return (season?.finalists ?? []).filter((entry) => entry.edit).map((entry) => ({
      ...entry,
      season: season?.label ?? "Season 03",
      subject: season?.subject ?? "Edit",
      editorName: entry.name,
    }))
  }, [])

  return (
    <>
      <div className="reel-shell">
        <button className="reel-arrow reel-arrow-left" onClick={() => setIndex((index - 1 + items.length) % items.length)} aria-label="Previous edit"><ChevronLeft /></button>
        <div className="reel-track" style={{ transform: `translateX(-${index * 284}px)` }}>
          {items.map((item, itemIndex) => {
            const id = item.edit ? youtubeId(item.edit) : null
            return (
              <Reveal key={`${item.editorName}-${item.season}`} delay={itemIndex * 55} className="reel-card-wrap">
                <button className={`reel-card${index === itemIndex ? " is-featured" : ""}`} onClick={() => { setIndex(itemIndex); setActive(item) }} aria-label={`Play ${item.editorName}'s ${item.season} edit`}>
                  <div className="reel-card-art">
                    {id ? <img className="reel-thumb" src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" /> : <Avatar name={item.editorName} size="lg" />}
                    <span className="reel-vignette" aria-hidden="true" />
                    <span className="reel-noise" aria-hidden="true" />
                    <span className="reel-play"><Play size={17} fill="currentColor" /></span>
                    <span className="reel-rank">#{String(item.rank).padStart(2, "0")}</span>
                  </div>
                  <div className="reel-card-meta">
                    <div><strong>{item.editorName}</strong><span>{item.season} · {item.subject}</span></div>
                    <ExternalLink size={14} aria-hidden="true" />
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
        <button className="reel-arrow reel-arrow-right" onClick={() => setIndex((index + 1) % items.length)} aria-label="Next edit"><ChevronRight /></button>
      </div>

      {active && youtubeEmbed(active.edit) && (
        <div className="video-lightbox" role="dialog" aria-modal="true" aria-label={`${active.editorName} edit player`} onMouseDown={(event) => { if (event.currentTarget === event.target) setActive(null) }}>
          <div className="video-dialog">
            <button className="video-close" onClick={() => setActive(null)} aria-label="Close video player"><X /></button>
            <div className="video-frame">
              <iframe src={youtubeEmbed(active.edit) ?? undefined} title={`${active.editorName} ${active.season} edit`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function EditorReelSection() {
  return (
    <section className="section-pad section-line" id="reel">
      <div className="wrap">
        <Reveal className="section-head"><div><span className="eyebrow">The Edit Reel</span><h2 className="section-heading">Press play. Feel the bracket.</h2><p className="section-sub">A moving archive of the edits that made each season memorable. Tap any card to open the original edit on YouTube.</p></div><span className="reel-live"><i /> Video archive</span></Reveal>
        <EditorReel />
      </div>
    </section>
  )
}


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

export function EditorReel() {
  const [active, setActive] = useState<ReelItem | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setActive(null)
    document.addEventListener("keydown", closeOnEscape)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
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
      {active && active.edit && (
        <div className="video-lightbox" role="dialog" aria-modal="true" aria-label={`${active.editorName} edit`} onClick={() => setActive(null)}>
          <div className="video-dialog" onClick={(event) => event.stopPropagation()}>
            <button className="video-close" onClick={() => setActive(null)} aria-label="Close video"><X size={20} /></button>
            <div className="video-frame video-poster">
              {youtubeId(active.edit) && <img src={`https://i.ytimg.com/vi/${youtubeId(active.edit)}/maxresdefault.jpg`} alt="" />}
              <div className="video-poster-shade" />
              <a className="video-launch" href={active.edit} target="_blank" rel="noreferrer"><Play size={18} fill="currentColor" /> Open edit on YouTube</a>
            </div>
            <div className="video-caption"><Avatar name={active.editorName} size="sm" /><div><strong>{active.editorName}</strong><span>{active.season} · {active.subject} · Opens in YouTube for reliable playback</span></div><a href={active.edit} target="_blank" rel="noreferrer">Watch on YouTube <ExternalLink size={13} /></a></div>
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
        <Reveal className="section-head"><div><span className="eyebrow">The Edit Reel</span><h2 className="section-heading">Press play. Feel the bracket.</h2><p className="section-sub">A moving archive of the edits that made each season memorable. Tap any card to watch the original on YouTube.</p></div><span className="reel-live"><i /> Video archive</span></Reveal>
        <EditorReel />
      </div>
    </section>
  )
}


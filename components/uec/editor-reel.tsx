"use client"

import { useMemo, useState } from "react"
import { Play, X, ExternalLink } from "lucide-react"
import { SEASONS, type Finalist } from "@/lib/uec-data"
import { Avatar } from "./avatar"
import { Reveal } from "./reveal"

type ReelItem = Finalist & { season: string; subject: string; editorName: string }

function youtubeEmbed(url: string) {
  const id = url.match(/(?:shorts\/|youtu\.be\/|watch\?v=)([^?&/]+)/)?.[1]
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : url
}

export function EditorReel() {
  const [active, setActive] = useState<ReelItem | null>(null)
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
        <div className="reel-track">
          {items.map((item, index) => (
            <Reveal key={`${item.editorName}-${item.season}`} delay={index * 55} className="reel-card-wrap">
              <button className="reel-card" onClick={() => setActive(item)} aria-label={`Play ${item.editorName}'s ${item.season} edit`}>
                <div className="reel-card-art">
                  <Avatar name={item.editorName} size="lg" />
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
          ))}
        </div>
      </div>
      {active && active.edit && (
        <div className="video-lightbox" role="dialog" aria-modal="true" aria-label={`${active.editorName} edit`} onClick={() => setActive(null)}>
          <div className="video-dialog" onClick={(event) => event.stopPropagation()}>
            <button className="video-close" onClick={() => setActive(null)} aria-label="Close video"><X size={20} /></button>
            <div className="video-frame"><iframe src={youtubeEmbed(active.edit)} title={`${active.editorName} ${active.season} edit`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
            <div className="video-caption"><Avatar name={active.editorName} size="sm" /><div><strong>{active.editorName}</strong><span>{active.season} · {active.subject}</span></div><a href={active.edit} target="_blank" rel="noreferrer">Watch on YouTube <ExternalLink size={13} /></a></div>
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


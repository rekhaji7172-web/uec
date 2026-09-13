"use client"

import { useEffect } from "react"
import type { Editor } from "@/lib/uec-data"
import { Avatar } from "./avatar"
import {
  CloseIcon,
  CrownIcon,
  TrophyIcon,
  AwardRibbonIcon,
  HistoryIcon,
  PlayIcon,
  GiftIcon,
} from "./icons"

interface EditorModalProps {
  editor: Editor | null
  open: boolean
  onClose: () => void
}

export function EditorModal({ editor, open, onClose }: EditorModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label={editor ? `${editor.name} profile` : "Editor profile"}
    >
      {editor && (
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-topline" />
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close profile">
            <CloseIcon size={18} />
          </button>

          <div className="modal-header">
            <Avatar name={editor.name} size={72} />
            <div className="modal-header-body">
              <div className="modal-eyebrow">Editor Profile</div>
              <h2 className="modal-name">{editor.name}</h2>
              <div className="modal-badges">
                {editor.wins > 0 && (
                  <span className="modal-badge gold">
                    <CrownIcon size={14} />
                    {editor.wins}× Champion
                  </span>
                )}
                <span className="modal-badge">
                  <AwardRibbonIcon size={14} />
                  Best #{editor.bestRank}
                </span>
                <span className="modal-badge">
                  <HistoryIcon size={14} />
                  {editor.history.length} Season{editor.history.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-body">
            <div className="modal-block-title">
              <HistoryIcon size={15} />
              Competition History
            </div>
            {editor.history.map((h) => (
              <div className="history-row" key={h.seasonId}>
                <span className={`history-rank${h.rank === 1 ? " gold" : ""}`}>
                  {h.rank === 1 ? <TrophyIcon size={16} /> : null}#{h.rank}
                </span>
                <div className="history-body">
                  <div className="history-season">{h.seasonLabel}</div>
                  <div className="history-subject">
                    {h.subject ? `Featured creator: ${h.subject}` : "Featured creator TBA"}
                  </div>
                  {h.edit && (
                    <a
                      href={h.edit}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="history-watch"
                    >
                      <PlayIcon size={13} />
                      Watch submission
                    </a>
                  )}
                </div>
              </div>
            ))}

            <div className="modal-block-title">
              <AwardRibbonIcon size={15} />
              Awards
            </div>
            {editor.awards.length > 0 ? (
              editor.awards.map((a, i) => (
                <div className="award-line" key={i}>
                  <TrophyIcon size={20} className="champ-crown" />
                  <div className="award-line-body">
                    <div className="award-line-title">{a.title}</div>
                    <div className="award-line-sub">
                      {a.seasonLabel}
                      {a.extraPrize ? ` · ${a.extraPrize}` : ""}
                    </div>
                  </div>
                  {a.extraPrize && <GiftIcon size={18} className="champ-crown" />}
                </div>
              ))
            ) : (
              <p className="modal-placeholder">No season awards yet — a finalist on the rise.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

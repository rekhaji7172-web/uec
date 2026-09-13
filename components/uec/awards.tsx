import { COMPLETE_SEASONS, editorByName, type Editor } from "@/lib/uec-data"
import { Avatar } from "./avatar"
import { AwardRibbonIcon, GiftIcon, ChevronRightIcon } from "./icons"
import { Reveal } from "./reveal"

interface AwardsProps {
  onOpenEditor: (editor: Editor) => void
}

export function Awards({ onOpenEditor }: AwardsProps) {
  const awarded = COMPLETE_SEASONS.filter((s) => s.award)

  return (
    <div className="awards-grid">
      {awarded.map((season, i) => {
        const winner = season.finalists.find((f) => f.rank === 1)!
        const editor = editorByName(winner.name)
        return (
          <Reveal key={season.id} delay={i * 90}>
            <article className="award-card">
              <AwardRibbonIcon size={34} className="award-medallion champ-crown" />
              <div className="award-season">{season.label}</div>
              <h3 className="award-title">{season.award!.title}</h3>

              <button
                type="button"
                className="award-winner"
                onClick={() => editor && onOpenEditor(editor)}
                style={{ background: "none", border: "none", padding: 0, width: "100%", cursor: "pointer" }}
                aria-label={`View profile for ${winner.name}`}
              >
                <Avatar name={winner.name} size={44} />
                <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                  <div className="award-winner-name">{winner.name}</div>
                  <div className="award-winner-role">Recipient · Featured {season.subject}</div>
                </div>
                <ChevronRightIcon size={18} className="podium-watch" />
              </button>

              {season.award!.extraPrize && (
                <span className="award-extra">
                  <GiftIcon size={15} />
                  {season.award!.extraPrize}
                </span>
              )}
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}

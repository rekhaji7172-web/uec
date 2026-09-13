import {
  COMPLETE_SEASONS,
  EDITOR_LIST,
  LATEST_SEASON,
  editorByName,
  type Editor,
} from "@/lib/uec-data"
import { Avatar } from "./avatar"
import { ArrowRightIcon, CrownIcon, TrophyIcon, AwardRibbonIcon, HistoryIcon } from "./icons"

interface HeroProps {
  onOpenEditor: (editor: Editor) => void
  onJump: (id: string) => void
}

export function Hero({ onOpenEditor, onJump }: HeroProps) {
  const champFinalist = LATEST_SEASON.finalists.find((f) => f.rank === 1)!
  const champion = editorByName(champFinalist.name)!
  const totalSlots = COMPLETE_SEASONS.reduce((n, s) => n + s.finalists.length, 0)

  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="line-dim">Unstable SMP</span>
            Editing Community
          </h1>

          <p className="hero-meta">
            The official archive of the <strong>UEC</strong> — where the community&apos;s best
            editors go head-to-head each season on a featured creator. Browse every leaderboard,
            award and editor across the competition&apos;s history.
          </p>

          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => onJump("leaderboard")}>
              View Leaderboard
              <ArrowRightIcon size={17} />
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => onJump("seasons")}>
              Browse Seasons
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">
                {COMPLETE_SEASONS.length}
                <span className="accent">.</span>
              </span>
              <span className="hero-stat-label">Seasons Complete</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">{EDITOR_LIST.length}</span>
              <span className="hero-stat-label">Editors Ranked</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">{totalSlots}</span>
              <span className="hero-stat-label">Finalist Slots</span>
            </div>
          </div>
        </div>

        <div className="hero-showcase">
          <div
            className="champ-card"
            role="button"
            tabIndex={0}
            onClick={() => onOpenEditor(champion)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onOpenEditor(champion)
              }
            }}
            aria-label={`View profile for reigning champion ${champion.name}`}
          >
            <div className="champ-badge-row">
              <CrownIcon size={30} className="champ-crown" />
              <span className="champ-season-pill">{LATEST_SEASON.label} · Winner</span>
            </div>

            <div className="champ-avatar-wrap">
              <Avatar name={champion.name} size={76} />
              <div>
                <div className="champ-tag">Reigning Champion</div>
                <h2 className="champ-name">{champion.name}</h2>
              </div>
            </div>

            <div className="champ-meta">
              <span className="champ-chip">
                <TrophyIcon size={15} />
                {champion.wins}× Champion
              </span>
              <span className="champ-chip">
                <AwardRibbonIcon size={15} />
                Best Rank #{champion.bestRank}
              </span>
              <span className="champ-chip">
                <HistoryIcon size={15} />
                {champion.history.length} Seasons
              </span>
            </div>

            <span className="btn btn-ghost btn-block champ-view">
              View Champion Profile
              <ArrowRightIcon size={16} />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

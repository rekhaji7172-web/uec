import { editorByName, type Season } from "@/lib/uec-data"
import { Avatar } from "./avatar"
import {
  TrophyIcon,
  MedalIcon,
  PlayIcon,
  ChevronRightIcon,
  AwardRibbonIcon,
} from "./icons"
import type { Editor } from "@/lib/uec-data"

interface LeaderboardProps {
  season: Season
  onOpenEditor: (editor: Editor) => void
}

export function Leaderboard({ season, onOpenEditor }: LeaderboardProps) {
  const winner = season.finalists.find((f) => f.rank === 1)
  const podium = season.finalists.filter((f) => f.rank === 2 || f.rank === 3)
  const rest = season.finalists.filter((f) => f.rank >= 4)

  const open = (name: string) => {
    const editor = editorByName(name)
    if (editor) onOpenEditor(editor)
  }

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  if (!winner) return null

  return (
    <div className="lb-transition" key={season.id}>
      {/* Winner */}
      <div
        className="winner-card"
        role="button"
        tabIndex={0}
        onClick={() => open(winner.name)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            open(winner.name)
          }
        }}
        aria-label={`View profile for ${winner.name}, winner of ${season.label}`}
      >
        <div className="winner-rankmark">
          <span className="winner-rank">1</span>
        </div>

        <div className="winner-body">
          <span className="winner-tag">
            <TrophyIcon size={15} />
            {season.label} Champion
          </span>
          <div className="winner-name-row">
            <Avatar name={winner.name} size={52} />
            <h3 className="winner-name">{winner.name}</h3>
          </div>
          {season.award && (
            <span className="winner-award">
              <AwardRibbonIcon size={16} />
              {season.award.title}
              {season.award.extraPrize ? ` · ${season.award.extraPrize}` : ""}
            </span>
          )}
        </div>

        <div className="winner-actions">
          {winner.edit && (
            <a
              href={winner.edit}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              onClick={stop}
            >
              <PlayIcon size={15} />
              Watch Edit
            </a>
          )}
          <span className="btn btn-ghost btn-sm">
            View Profile
            <ChevronRightIcon size={15} />
          </span>
        </div>
      </div>

      {/* Podium 2 & 3 */}
      <div className="podium-row">
        {podium.map((f, i) => (
          <div
            key={f.rank}
            className="podium-card"
            style={{ animationDelay: `${0.08 + i * 0.07}s` }}
            role="button"
            tabIndex={0}
            onClick={() => open(f.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                open(f.name)
              }
            }}
            aria-label={`View profile for ${f.name}, ranked ${f.rank} in ${season.label}`}
          >
            <MedalIcon size={30} className="podium-medal" />
            <Avatar name={f.name} size={44} />
            <div className="podium-body">
              <div className="podium-rank">#{f.rank}</div>
              <div className="podium-name">{f.name}</div>
            </div>
            {f.edit ? (
              <a
                href={f.edit}
                target="_blank"
                rel="noopener noreferrer"
                className="chip-link"
                onClick={stop}
              >
                <PlayIcon size={14} />
                Edit
              </a>
            ) : (
              <ChevronRightIcon size={18} className="podium-watch" />
            )}
          </div>
        ))}
      </div>

      {/* 4 – 10 */}
      <div className="rank-list">
        {rest.map((f, i) => (
          <div
            key={f.rank}
            className="rank-row"
            style={{ animationDelay: `${0.12 + i * 0.045}s` }}
            role="button"
            tabIndex={0}
            onClick={() => open(f.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                open(f.name)
              }
            }}
            aria-label={`View profile for ${f.name}, ranked ${f.rank} in ${season.label}`}
          >
            <span className="rank-num">{f.rank}</span>
            <Avatar name={f.name} size={34} ring={false} />
            <span className="rank-name">{f.name}</span>
            {f.edit ? (
              <a
                href={f.edit}
                target="_blank"
                rel="noopener noreferrer"
                className="chip-link"
                onClick={stop}
              >
                <PlayIcon size={13} />
                Watch Edit
              </a>
            ) : (
              <ChevronRightIcon size={16} className="rank-hint" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

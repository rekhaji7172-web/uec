import { SEASONS } from "@/lib/uec-data"

interface SeasonStripProps {
  activeSeasonId: string
  onSelect: (id: string) => void
}

export function SeasonStrip({ activeSeasonId, onSelect }: SeasonStripProps) {
  return (
    <div className="season-strip-outer" role="tablist" aria-label="Select a season">
      <div className="season-strip-row">
        {SEASONS.map((season) => {
          const isActive = season.id === activeSeasonId
          const isUpcoming = season.status === "upcoming"
          return (
            <button
              key={season.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`season-tab${isActive ? " active" : ""}`}
              onClick={() => onSelect(season.id)}
            >
              <div className="season-tab-top">
                <span className="season-tab-num">
                  {isUpcoming ? "0" + season.number : "0" + season.number}
                </span>
                <span className="season-status-dot" />
              </div>
              <span className="season-tab-subject">
                {isUpcoming ? "To be revealed" : season.subject}
              </span>
              <span className="season-tab-label">
                {isUpcoming ? "Coming soon" : season.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

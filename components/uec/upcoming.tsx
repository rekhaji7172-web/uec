import { UPCOMING_SEASON } from "@/lib/uec-data"
import { CalendarIcon } from "./icons"

export function Upcoming() {
  const season = UPCOMING_SEASON
  const number = season ? "0" + season.number : "04"

  return (
    <div className="upcoming-panel">
      <span className="upcoming-mark">
        <CalendarIcon size={32} />
      </span>
      <h3 className="upcoming-title">Season {number} is coming</h3>
      <p className="upcoming-sub">
        A new featured creator, a fresh bracket of the community&apos;s sharpest editors, and
        another shot at the crown. The next subject drops soon — keep your timeline clear.
      </p>
      <span className="upcoming-tag">Featured creator to be revealed</span>
    </div>
  )
}

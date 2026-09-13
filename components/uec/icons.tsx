/* Custom UEC iconography — one unified line/solid style, no emojis.
   All icons inherit `currentColor` and take an optional size. */

interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    focusable: false as const,
  }
}

export function CrownIcon({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M3 7.5l3.6 2.7L12 4l5.4 6.2L21 7.5l-1.7 10.2a1 1 0 0 1-1 .8H5.7a1 1 0 0 1-1-.8L3 7.5Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path d="M8.5 18.5h7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function TrophyIcon({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M7 4h10v5a5 5 0 0 1-10 0V4Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M7 5H4.5v1.5A3 3 0 0 0 7 9.4M17 5h2.5v1.5A3 3 0 0 1 17 9.4M12 14v3.5M8.5 20.5h7M9 20.5c0-1.7 1.3-3 3-3s3 1.3 3 3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* A ranked medal — number-agnostic; used for podium 2 / 3 */
export function MedalIcon({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M8.5 3h7l-2.2 6.2M8.5 3 6 3.2 9.3 10M15.5 3l2.5.2-3.3 6.8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="15.5"
        r="5"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M12 13.2l.9 1.8 2 .3-1.45 1.4.35 2L12 17.8l-1.8.9.35-2L9.1 15.3l2-.3.9-1.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function AwardRibbonIcon({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle
        cx="12"
        cy="9"
        r="6"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path d="M12 6.2l1.15 2.35 2.6.38-1.88 1.83.44 2.58L12 12.1l-2.31 1.22.44-2.58L8.25 8.9l2.6-.38L12 6.2Z" fill="currentColor" />
      <path
        d="M9 14.5 7.5 21l4.5-2.2L16.5 21 15 14.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PlayIcon({ size = 18, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M8 5.5v13l11-6.5-11-6.5Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRightIcon({ size = 18, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronRightIcon({ size = 18, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon({ size = 20, className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 6.5h18M3 12h18M3 17.5h18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ size = 18, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function HistoryIcon({ size = 16, className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 12a8 8 0 1 1 2.5 5.8M4 12H2.6M4 12l.1-3.2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8v4l2.6 1.6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SparkIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 2.5c.4 4.3 2.7 6.6 7 7-4.3.4-6.6 2.7-7 7-.4-4.3-2.7-6.6-7-7 4.3-.4 6.6-2.7 7-7Z" fill="currentColor" />
    </svg>
  )
}

export function GiftIcon({ size = 16, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 10.5h16V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5ZM3.5 7.5h17v3h-17zM12 7.5V20"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M12 7.5S11 4 8.8 4a2 2 0 0 0 0 4H12Zm0 0S13 4 15.2 4a2 2 0 0 1 0 4H12Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CalendarIcon({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M12 13.5l1 1-2 2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FilmIcon({ size = 16, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M8 5v14M16 5v14M3.5 9.5h4.5M3.5 14.5h4.5M16 9.5h4.5M16 14.5h4.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

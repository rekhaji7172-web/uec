/* ==========================================================================
   UEC — Unstable SMP Community
   Single source of truth. Everything on the site (leaderboards, awards,
   editor profiles, competition history, the champions grid) is derived
   from SEASONS. To add Season 04, append one object to SEASONS — nothing
   else needs to change.
   ========================================================================== */

export type SeasonStatus = "complete" | "upcoming"

export interface Finalist {
  rank: number
  name: string
  edit?: string
}

export interface Award {
  title: string
  extraPrize: string | null
}

export interface Season {
  id: string
  number: number
  label: string
  subject: string | null
  status: SeasonStatus
  award: Award | null
  finalists: Finalist[]
}

export const SEASONS: Season[] = [
  {
    id: "s1",
    number: 1,
    label: "Season 01",
    subject: "FlameFrags",
    status: "complete",
    award: { title: "Best FlameFrags Editor", extraPrize: null },
    finalists: [
      { rank: 1, name: "Flayxor" },
      { rank: 2, name: "Channeling" },
      { rank: 3, name: "TW Cuberz" },
      { rank: 4, name: "Slipped" },
      { rank: 5, name: "Wyatt" },
      { rank: 6, name: "Inferno" },
      { rank: 7, name: "Max YT" },
      { rank: 8, name: "Pumpkin" },
      { rank: 9, name: "Kunzoe" },
      { rank: 10, name: "Lime editz" },
    ],
  },
  {
    id: "s2",
    number: 2,
    label: "Season 02",
    subject: "Wemmbu",
    status: "complete",
    award: { title: "Best Wemmbu Editor", extraPrize: "1 Month Discord Nitro" },
    finalists: [
      { rank: 1, name: "Flayxor", edit: "https://youtube.com/shorts/epJLkOuNQWA" },
      { rank: 2, name: "Channeling X 1to7", edit: "https://youtube.com/shorts/4y2AXrltvNs" },
      { rank: 3, name: "Crisspy", edit: "https://youtube.com/shorts/Zc83AO15yJo" },
      { rank: 4, name: "Jettstream", edit: "https://www.youtube.com/shorts/-lOnejJCg80" },
      { rank: 5, name: "SyncCraft", edit: "https://youtube.com/shorts/1HNq046ZbNI" },
      { rank: 6, name: "Levander Edits", edit: "https://www.youtube.com/shorts/ERcUtJrhREM" },
      { rank: 7, name: "Paceglint", edit: "https://www.youtube.com/shorts/Oosy0-119EE" },
      { rank: 8, name: "Pugly", edit: "https://youtube.com/shorts/VJ9Anu1iZUA" },
      { rank: 9, name: "Wyattmc", edit: "https://youtube.com/shorts/16Dh1qOM5W8" },
      { rank: 10, name: "Inferno", edit: "https://www.youtube.com/shorts/2lBQ2ppLmR8" },
    ],
  },
  {
    id: "s3",
    number: 3,
    label: "Season 03",
    subject: "Spoke",
    status: "complete",
    award: { title: "Best Spoke Editor", extraPrize: null },
    finalists: [
      { rank: 1, name: "Flayxor", edit: "https://youtube.com/shorts/4cJdgLlk2es" },
      { rank: 2, name: "Jettstream4ever", edit: "https://youtube.com/shorts/UPDuw5-WJvI" },
      { rank: 3, name: "Channeling / 1to7ae", edit: "https://youtube.com/shorts/j9_noB5EOrA" },
      { rank: 4, name: "Voidishere", edit: "https://youtube.com/shorts/boeIiP-2l7o" },
      { rank: 5, name: "Paceglint", edit: "https://youtube.com/shorts/eTT9IPw3meU" },
      { rank: 6, name: "Inferno", edit: "https://youtube.com/shorts/zn6HvcdBKBI" },
      { rank: 7, name: "Denial", edit: "https://youtube.com/shorts/ukq7zeh3tKQ" },
      { rank: 8, name: "WyattMC", edit: "https://youtube.com/shorts/H3tomND6jiE" },
      { rank: 9, name: "Vantrex", edit: "https://youtube.com/shorts/NmKy308KQTc" },
      { rank: 10, name: "Creo_EDITS", edit: "https://youtube.com/shorts/5PCZHwtmr_Y" },
    ],
  },
  {
    id: "upcoming",
    number: 4,
    label: "Upcoming",
    subject: null,
    status: "upcoming",
    award: null,
    finalists: [],
  },
]

export interface HistoryEntry {
  seasonId: string
  seasonLabel: string
  subject: string | null
  rank: number
  edit: string | null
}

export interface EditorAward {
  seasonLabel: string
  title: string
  extraPrize: string | null
}

export interface Editor {
  name: string
  slug: string
  history: HistoryEntry[]
  wins: number
  bestRank: number
  bestSeasonLabel: string
  awards: EditorAward[]
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* Build the editor index from season data. An editor is identified by the
   exact name string used in a season's finalist list — names are never
   merged across seasons unless they match exactly, so we never guess at
   collab/alias identities that weren't given to us. */
/* Known alias/collab families. The same competitor entered different seasons
   under slightly different handles (e.g. "Channeling", "Channeling X 1to7",
   "Channeling / 1to7ae"), so these are folded into one canonical profile
   instead of showing up as duplicate cards. */
const EDITOR_ALIASES: { match: RegExp; canonical: string }[] = [
  { match: /channeling/i, canonical: "Channeling" },
  { match: /jettstream/i, canonical: "Jettstream4ever" },
  { match: /wyatt/i, canonical: "WyattMC" },
]

function canonicalEditorName(name: string): string {
  const trimmed = name.trim()
  for (const alias of EDITOR_ALIASES) {
    if (alias.match.test(trimmed)) return alias.canonical
  }
  return trimmed
}

function buildEditorIndex(seasons: Season[]): Map<string, Editor> {
  const index = new Map<string, Editor>()

  seasons
    .filter((s) => s.status === "complete")
    .forEach((season) => {
      season.finalists.forEach((f) => {
        const canonicalName = canonicalEditorName(f.name)
        if (!index.has(canonicalName)) {
          index.set(canonicalName, {
            name: canonicalName,
            slug: slugify(canonicalName),
            history: [],
            wins: 0,
            bestRank: f.rank,
            bestSeasonLabel: season.label,
            awards: [],
          })
        }
        const editor = index.get(canonicalName)!
        if (!editor.history.some((entry) => entry.seasonId === season.id)) editor.history.push({
          seasonId: season.id,
          seasonLabel: season.label,
          subject: season.subject,
          rank: f.rank,
          edit: f.edit ?? null,
        })
        editor.bestRank = Math.min(editor.bestRank, f.rank)
        if (f.rank === 1) {
          editor.wins += 1
          if (season.award) {
            editor.awards.push({
              seasonLabel: season.label,
              title: season.award.title,
              extraPrize: season.award.extraPrize,
            })
          }
        }
      })
    })

  index.forEach((editor) => {
    editor.history.sort((a, b) => {
      const sa = seasons.find((s) => s.id === a.seasonId)!.number
      const sb = seasons.find((s) => s.id === b.seasonId)!.number
      return sa - sb
    })
    // Best finish + the season it was earned in (ties resolve to the earliest season).
    const best = editor.history.reduce((a, b) => (b.rank < a.rank ? b : a))
    editor.bestRank = best.rank
    editor.bestSeasonLabel = best.seasonLabel
  })

  return index
}

export const EDITORS: Map<string, Editor> = buildEditorIndex(SEASONS)

export const EDITOR_LIST: Editor[] = [...EDITORS.values()].sort((a, b) => {
  if (b.wins !== a.wins) return b.wins - a.wins
  if (a.bestRank !== b.bestRank) return a.bestRank - b.bestRank
  return b.history.length - a.history.length
})

export const COMPLETE_SEASONS: Season[] = SEASONS.filter((s) => s.status === "complete")
export const LATEST_SEASON: Season = COMPLETE_SEASONS[COMPLETE_SEASONS.length - 1]
export const UPCOMING_SEASON: Season | undefined = SEASONS.find((s) => s.status === "upcoming")

export function seasonById(id: string): Season | undefined {
  return SEASONS.find((s) => s.id === id)
}

export function editorBySlug(slug: string): Editor | undefined {
  return EDITOR_LIST.find((e) => e.slug === slug)
}

export function editorByName(name: string): Editor | undefined {
  return EDITORS.get(name)
}

/* Deterministic on-brand avatar gradient. Hues stay in the magenta/violet
   family so placeholder avatars read as one cohesive UEC system. */
export function avatarGradient(name: string): { from: string; to: string; ring: string } {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  const hue = 285 + (hash % 45) // 285–330: violet → magenta
  const from = `hsl(${hue} 85% 58%)`
  const to = `hsl(${(hue + 22) % 360} 90% 42%)`
  const ring = `hsl(${hue} 90% 62%)`
  return { from, to, ring }
}

/* Real editor profile pictures. Keyed by a keyword found in the finalist
   name so alias/collab variants across seasons ("Channeling",
   "Channeling X 1to7", "Channeling / 1to7ae") all resolve to one image. */
const EDITOR_IMAGE_RULES: { match: string; src: string }[] = [
  { match: "pubkin", src: "/editors/pubkin.webp" },
  { match: "pumpkin", src: "/editors/pubkin.webp" },
  { match: "slipped", src: "/editors/slipped.webp" },
  { match: "flayxor", src: "/editors/flyxorr.webp" },
  { match: "flyxorr", src: "/editors/flyxorr.webp" },
  { match: "channeling", src: "/editors/channeling.webp" },
  { match: "jettstream", src: "/editors/jeetism4ever.webp" },
  { match: "vantrex", src: "/editors/vantrex.webp" },
  { match: "kunzoe", src: "/editors/kuzoemc.jpg" },
  { match: "denial", src: "/editors/denial.jpg" },
  { match: "lime", src: "/editors/limeedits.jpg" },
  { match: "levander", src: "/editors/lavendar-edits.jpg" },
  { match: "lavendar", src: "/editors/lavendar-edits.jpg" },
  { match: "wyatt", src: "/editors/wyattmc.webp" },
  { match: "synccraft", src: "/editors/synccraft.webp" },
  { match: "inferno", src: "/editors/inferno.webp" },
  { match: "voidishere", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/voidishere-wuIyk3AaJ2mc1Sxq6Fp7hPns6TMTnE.png" },
  { match: "tw cuberz", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/twcuberz.webp-KxyljrxMz4QGqlePeqtsaY29HqFPT0.png" },
  { match: "max yt", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maxyt-naA8ewuJidI3x6fJun1ZexDwi9Xwlr.jpg" },
  { match: "creo", src: "/editors/creo.webp" },
  { match: "paceglint", src: "/editors/paceglint.webp" },
  { match: "pugly", src: "https://i.ytimg.com/vi/VJ9Anu1iZUA/hqdefault.jpg" },
  { match: "crisspy", src: "https://i.ytimg.com/vi/Zc83AO15yJo/hqdefault.jpg" },
]

export function editorImage(name: string): string | null {
  const key = name.toLowerCase()
  for (const rule of EDITOR_IMAGE_RULES) {
    if (key.includes(rule.match)) return rule.src
  }
  return null
}

export function initials(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9 /]/g, " ").trim()
  const parts = cleaned.split(/[ /]+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

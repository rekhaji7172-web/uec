import { avatarGradient, initials } from "@/lib/uec-data"

interface AvatarProps {
  name: string
  size?: number
  ring?: boolean
  className?: string
}

/* Premium on-brand letter avatar — a stand-in until real editor images are
   provided. Deterministic magenta/violet gradient keeps every placeholder
   part of one cohesive system. */
export function Avatar({ name, size = 48, ring = true, className }: AvatarProps) {
  const { from, to } = avatarGradient(name)
  const fontSize = Math.round(size * 0.38)
  return (
    <div
      className={`avatar${ring ? " avatar-ring" : ""}${className ? " " + className : ""}`}
      style={{
        width: size,
        height: size,
        fontSize,
        borderRadius: Math.round(size * 0.28),
        backgroundImage: `linear-gradient(140deg, ${from}, ${to})`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}

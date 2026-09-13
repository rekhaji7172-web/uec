import { avatarGradient, editorImage, initials } from "@/lib/uec-data"

interface AvatarProps {
  name: string
  size?: number
  ring?: boolean
  className?: string
}

/* Editor avatar. Renders the real profile picture when one is mapped for the
   name (variants/aliases across seasons resolve to the same image); otherwise
   falls back to a deterministic on-brand magenta/violet letter tile so the
   set still reads as one cohesive system. */
export function Avatar({ name, size = 48, ring = true, className }: AvatarProps) {
  const src = editorImage(name)
  const radius = Math.round(size * 0.28)

  if (src) {
    return (
      <div
        className={`avatar avatar-img${ring ? " avatar-ring" : ""}${className ? " " + className : ""}`}
        style={{ width: size, height: size, borderRadius: radius }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src || "/placeholder.svg"}
          alt={`${name} profile picture`}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: radius }}
        />
      </div>
    )
  }

  const { from, to } = avatarGradient(name)
  const fontSize = Math.round(size * 0.38)
  return (
    <div
      className={`avatar${ring ? " avatar-ring" : ""}${className ? " " + className : ""}`}
      style={{
        width: size,
        height: size,
        fontSize,
        borderRadius: radius,
        backgroundImage: `linear-gradient(140deg, ${from}, ${to})`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}

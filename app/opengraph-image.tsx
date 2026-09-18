import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "UEC — Unstable SMP Community"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const siteUrl =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

async function loadFont(family: string, weight: number) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })
  ).text()
  const url = css.match(/src: url\((.+?)\) format/)?.[1]
  if (!url) throw new Error(`font url not found for ${family}`)
  return await (await fetch(url)).arrayBuffer()
}

async function loadLogo() {
  try {
    const res = await fetch(`${siteUrl}/uec-mark.jpg`)
    if (!res.ok) return null
    const buf = await res.arrayBuffer()
    const base64 = Buffer.from(buf).toString("base64")
    return `data:image/jpeg;base64,${base64}`
  } catch {
    return null
  }
}

export default async function Image() {
  const [bungee, spaceGrotesk, spaceGroteskBold, logo] = await Promise.all([
    loadFont("Bungee", 400),
    loadFont("Space+Grotesk", 400),
    loadFont("Space+Grotesk", 600),
    loadLogo(),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 80px",
          background:
            "radial-gradient(1200px 680px at 8% -20%, #55123f 0%, transparent 60%), radial-gradient(1000px 720px at 112% 120%, #300a49 0%, transparent 58%), linear-gradient(140deg, #07030c 0%, #130418 55%, #1c0621 100%)",
          fontFamily: "Space Grotesk",
          position: "relative",
        }}
      >
        {/* subtle diagonal sheen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(115deg, transparent 40%, rgba(255,64,160,0.10) 62%, transparent 78%)",
          }}
        />

        {/* left: real UEC lantern logo in a glowing frame */}
        <div
          style={{
            display: "flex",
            width: 300,
            height: 300,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            background: "rgba(255,63,164,0.06)",
            border: "2px solid rgba(255,143,208,0.35)",
            boxShadow: "0 0 90px rgba(176,38,255,0.45), inset 0 0 40px rgba(255,63,164,0.15)",
          }}
        >
          {logo ? (
            <img
              src={logo || "/placeholder.svg"}
              width={252}
              height={252}
              style={{ borderRadius: 28 }}
            />
          ) : null}
        </div>

        {/* right: text column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* eyebrow pill */}
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(255,63,164,0.12)",
              border: "1px solid rgba(255,143,208,0.4)",
              fontSize: 22,
              letterSpacing: 8,
              color: "#ffb3e0",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Unstable SMP Community
          </div>

          {/* headline — sized to fit the canvas cleanly */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 22 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Bungee",
                fontSize: 92,
                lineHeight: 1.02,
                background: "linear-gradient(92deg, #ffffff 0%, #ff8fd0 46%, #b026ff 100%)",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 40px rgba(176,38,255,0.35)",
              }}
            >
              UNSTABLE SMP
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Bungee",
                fontSize: 92,
                lineHeight: 1.02,
                background: "linear-gradient(92deg, #ff3fa4 0%, #ff8fd0 55%, #ffffff 100%)",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 40px rgba(255,63,164,0.4)",
              }}
            >
              COMMUNITY
            </div>
          </div>

          {/* description */}
          <div
            style={{
              display: "flex",
              maxWidth: 720,
              marginTop: 24,
              fontSize: 25,
              lineHeight: 1.5,
              color: "#ecdcf2",
            }}
          >
            Meet your favorite editors, share your edits, and grab high-quality 4K scene packs — with
            tournaments, giveaways, and the whole Unstable SMP crew.
          </div>

          {/* feature row */}
          <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
            {["4K Scene Packs", "Tournaments", "Giveaways"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "9px 18px",
                  borderRadius: 12,
                  background: "rgba(176,38,255,0.14)",
                  border: "1px solid rgba(255,143,208,0.3)",
                  fontSize: 20,
                  color: "#f3d9ff",
                  fontWeight: 600,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bungee", data: bungee, weight: 400, style: "normal" },
        { name: "Space Grotesk", data: spaceGrotesk, weight: 400, style: "normal" },
        { name: "Space Grotesk", data: spaceGroteskBold, weight: 600, style: "normal" },
      ],
    },
  )
}

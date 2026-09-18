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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(1100px 620px at 12% -15%, #4a0f38 0%, transparent 58%), radial-gradient(900px 640px at 108% 118%, #2a0740 0%, transparent 55%), linear-gradient(140deg, #08040d 0%, #140419 55%, #1d0722 100%)",
          fontFamily: "Space Grotesk",
          position: "relative",
        }}
      >
        {/* soft grid glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,64,160,0.08) 50%, transparent 100%)",
          }}
        />

        {/* top row: real logo + community tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {logo ? (
            <img
              src={logo || "/placeholder.svg"}
              width={112}
              height={112}
              style={{
                borderRadius: 26,
                boxShadow: "0 0 64px rgba(255,63,164,0.55)",
                border: "2px solid rgba(255,143,208,0.45)",
              }}
            />
          ) : null}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 10,
                color: "#ff8fd0",
                textTransform: "uppercase",
                fontFamily: "Space Grotesk",
                fontWeight: 600,
              }}
            >
              Unstable SMP Community
            </span>
            <span
              style={{
                display: "flex",
                marginTop: 6,
                fontSize: 20,
                letterSpacing: 3,
                color: "#c9a6d8",
              }}
            >
              4K SCENE PACKS  •  TOURNAMENTS  •  GIVEAWAYS
            </span>
          </div>
        </div>

        {/* headline in Bungee display font */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Bungee",
              fontSize: 118,
              lineHeight: 0.98,
              letterSpacing: 2,
              background: "linear-gradient(92deg, #ffffff 0%, #ff8fd0 42%, #b026ff 100%)",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 44px rgba(176,38,255,0.35)",
            }}
          >
            UNSTABLE
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Bungee",
              fontSize: 118,
              lineHeight: 0.98,
              letterSpacing: 2,
              background: "linear-gradient(92deg, #ff3fa4 0%, #ff8fd0 55%, #ffffff 100%)",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 44px rgba(255,63,164,0.4)",
            }}
          >
            SMP COMMUNITY
          </div>
        </div>

        {/* description */}
        <div
          style={{
            display: "flex",
            maxWidth: 1000,
            fontSize: 27,
            lineHeight: 1.5,
            color: "#ecdcf2",
            fontFamily: "Space Grotesk",
          }}
        >
          Meet your favorite editors, share your edits, collaborate with others, and get access to
          high-quality 4K scene packs — plus tournaments, giveaways, and the whole Unstable SMP crew.
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

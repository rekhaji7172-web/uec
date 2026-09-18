import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "UEC — Unstable SMP Community"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadFont(font: string, weight: number) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })
  ).text()
  const url = css.match(/src: url\((.+?)\) format/)?.[1]
  if (!url) throw new Error("font url not found")
  return await (await fetch(url)).arrayBuffer()
}

export default async function Image() {
  const [orbitron, chakra] = await Promise.all([
    loadFont("Orbitron", 800),
    loadFont("Chakra+Petch", 600),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background:
            "radial-gradient(1200px 600px at 15% -10%, #3a0b2e 0%, transparent 60%), radial-gradient(900px 600px at 100% 120%, #2a0838 0%, transparent 55%), linear-gradient(135deg, #0a0510 0%, #150318 55%, #1c0620 100%)",
          fontFamily: "Chakra Petch",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,64,160,0.10) 50%, transparent 100%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 96,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 24,
              background: "linear-gradient(135deg, #ff3fa4, #b026ff)",
              boxShadow: "0 0 60px rgba(255,63,164,0.65)",
              fontFamily: "Orbitron",
              fontSize: 46,
              color: "#0a0510",
              fontWeight: 800,
            }}
          >
            UEC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 8,
                color: "#ff8fd0",
                textTransform: "uppercase",
                fontFamily: "Chakra Petch",
              }}
            >
              Fan Server
            </span>
            <span
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 4,
                color: "#c9a6d8",
              }}
            >
              4K Scene Packs • Tournaments • Giveaways
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontFamily: "Orbitron",
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.02,
            background: "linear-gradient(92deg, #ffffff 0%, #ff8fd0 45%, #b026ff 100%)",
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
            fontFamily: "Orbitron",
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.02,
            background: "linear-gradient(92deg, #ff3fa4 0%, #ff8fd0 60%, #ffffff 100%)",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 40px rgba(255,63,164,0.4)",
          }}
        >
          COMMUNITY
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            maxWidth: 940,
            fontSize: 28,
            lineHeight: 1.5,
            color: "#e7d6ee",
          }}
        >
          Meet your favorite editors, share your edits, collaborate, and join editing tournaments
          with fellow Unstable SMP fans.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Orbitron", data: orbitron, weight: 800, style: "normal" },
        { name: "Chakra Petch", data: chakra, weight: 600, style: "normal" },
      ],
    },
  )
}

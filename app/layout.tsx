import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Big_Shoulders, Caveat, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
})

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
})

export const metadata: Metadata = {
  title: "UEC — Unstable SMP Editing Competition",
  description:
    "The official archive of the Unstable SMP Editing Competition — seasons, leaderboards, winners and editor profiles.",
  generator: "v0.app",
  icons: {
    icon: "/uec-logo.png",
    apple: "/uec-logo.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#060608",
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${plexSans.variable} ${caveat.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

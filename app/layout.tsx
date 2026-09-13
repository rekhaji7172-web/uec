import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

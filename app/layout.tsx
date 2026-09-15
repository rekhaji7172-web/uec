import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const siteUrl =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UEC — Unstable SMP Editing Competition",
    template: "%s | UEC",
  },
  description:
    "The official archive of the Unstable SMP Editing Competition — seasons, leaderboards, winners and editor profiles.",
  generator: "v0.app",
  applicationName: "UEC",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "UEC — Unstable SMP Editing Competition",
    title: "UEC — Unstable SMP Editing Competition",
    description:
      "Explore UEC seasons, leaderboards, winners, editor profiles and the latest competition updates.",
    images: [{ url: "/uec-logo.png", width: 512, height: 512, alt: "UEC logo" }],
  },
  twitter: {
    card: "summary",
    title: "UEC — Unstable SMP Editing Competition",
    description:
      "Explore UEC seasons, leaderboards, winners, editor profiles and the latest competition updates.",
    images: ["/uec-logo.png"],
  },
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

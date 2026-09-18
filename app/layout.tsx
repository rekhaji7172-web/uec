import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "./console.css"

const siteUrl =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UEC — Unstable SMP Community",
    template: "%s | UEC",
  },
  description:
    "UEC is an Unstable SMP fan server made for editors and fans of the community. Meet your favorite editors, share your edits, collaborate with others, and get access to high-quality 4K scene packs. Join editing tournaments, participate in giveaways, and connect with other Unstable SMP fans!",
  generator: "v0.app",
  applicationName: "UEC",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "UEC — Unstable SMP Community",
    title: "UEC — Unstable SMP Community",
    description:
      "UEC is an Unstable SMP fan server made for editors and fans of the community. Meet your favorite editors, share your edits, collaborate with others, and get access to high-quality 4K scene packs. Join editing tournaments, participate in giveaways, and connect with other Unstable SMP fans!",
    images: [
      {
        url: "https://image2url.com/r2/default/gifs/1789755137579-1acd3357-43b9-4b05-8467-f066e83e41ca.gif",
        alt: "UEC — Unstable SMP Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UEC — Unstable SMP Community",
    description:
      "UEC is an Unstable SMP fan server made for editors and fans of the community. Meet your favorite editors, share your edits, collaborate with others, and get access to high-quality 4K scene packs. Join editing tournaments, participate in giveaways, and connect with other Unstable SMP fans!",
    images: ["https://image2url.com/r2/default/gifs/1789755137579-1acd3357-43b9-4b05-8467-f066e83e41ca.gif"],
  },
  icons: {
    icon: "/uec-logo-animated.gif",
    apple: "/uec-logo-animated.gif",
    shortcut: "/uec-logo-animated.gif",
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#E500E5",
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

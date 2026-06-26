import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Mono, Bebas_Neue, Montserrat } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "centraverse — Shreyas Shetty",
  description:
    "Video editor, visual storyteller, and founder of Centraverse. Creating cinematic content, reels and brand visuals.",
  keywords: "video editor, reels, cinematic, brand, Shreyas Shetty, centraverse",
  openGraph: {
    title: "centraverse — Shreyas Shetty",
    description: "Video editor & visual storyteller. Crafting cinematic content and brand visuals.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} ${bebasNeue.variable} ${montserrat.variable}`}
      style={{
        "--font-display": "var(--font-bebas)",
        "--font-body": "var(--font-inter)",
        "--font-mono": "var(--font-dm-mono)",
      } as React.CSSProperties}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

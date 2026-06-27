import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Mono, Bebas_Neue, Montserrat, Instrument_Serif } from "next/font/google"
import "./globals.css"
// Trigger hot reload

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

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
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${dmMono.variable} ${bebasNeue.variable} ${montserrat.variable} ${instrumentSerif.variable}`}
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

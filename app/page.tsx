"use client"

import { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import MainLayout from "@/components/main-layout"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setShowSplash(false), 2600)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <>
      {showSplash && <SplashScreen />}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: showSplash ? "none" : "auto",
        }}
      >
        <MainLayout />
      </div>
    </>
  )
}

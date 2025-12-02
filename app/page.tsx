"use client"

import { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import MainLayout from "@/components/main-layout"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Show splash for 4 seconds then transition to main content
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return <MainLayout />
}

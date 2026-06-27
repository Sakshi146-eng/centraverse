"use client"

import { useState, useEffect, useCallback } from "react"
import SplashScreen from "@/components/splash-screen"
import MainLayout from "@/components/main-layout"

export default function Home() {
  const [splashDone, setSplashDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { 
    setMounted(true) 
  }, [])

  const handleDone = useCallback(() => {
    setSplashDone(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {!splashDone && <SplashScreen onDone={handleDone} />}
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transition: "opacity 0.5s ease 0.1s",
          pointerEvents: splashDone ? "auto" : "none",
        }}
      >
        <MainLayout splashDone={splashDone} />
      </div>
    </>
  )
}

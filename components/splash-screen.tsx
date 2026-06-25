"use client"

import { useEffect, useState } from "react"

export default function SplashScreen() {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 200)
    const t2 = setTimeout(() => setPhase("exit"), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Name */}
      <div
        style={{
          fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
          fontSize: "clamp(4rem, 18vw, 16rem)",
          lineHeight: 0.88,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: "#ffffff",
          textAlign: "center",
          transform: phase === "enter" ? "translateY(20px)" : "translateY(0)",
          opacity: phase === "enter" ? 0 : 1,
          transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease",
        }}
      >
        centra
        <span style={{ color: "var(--accent, #c8ff00)" }}>verse</span>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-dm-mono, monospace)",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          opacity: phase === "enter" ? 0 : 1,
          transition: "opacity 0.8s ease 0.4s",
          whiteSpace: "nowrap",
        }}
      >
        Shreyas Shetty — Video Editor
      </div>
    </div>
  )
}

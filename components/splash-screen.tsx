"use client"

import { useEffect, useRef } from "react"

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current

    if (!container || !logo) return

    // Create arrow animation
    const createArrow = () => {
      const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      arrow.setAttribute("viewBox", "0 0 100 100")
      arrow.setAttribute("width", "120")
      arrow.setAttribute("height", "120")
      arrow.style.position = "absolute"
      arrow.style.opacity = "0"
      arrow.style.left = "50%"
      arrow.style.top = "50%"
      arrow.style.transform = "translate(-50%, -50%)"

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("d", "M30 70 L50 30 L50 50 L70 50 L70 60 L50 60 L50 70 Z")
      path.setAttribute("fill", "white")
      arrow.appendChild(path)

      return arrow
    }

    const arrow = createArrow()
    container.appendChild(arrow)

    // Animate arrow coming from bottom to center
    arrow.animate(
      [
        { opacity: "1", transform: "translate(-50%, 200%) rotate(0deg)" },
        { opacity: "1", transform: "translate(-50%, -50%) rotate(0deg)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      },
    )

    // After arrow reaches center, split animation
    setTimeout(() => {
      arrow.animate(
        [
          { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          { opacity: "0", transform: "translate(-150%, -150%) scale(0.5)" },
        ],
        {
          duration: 800,
          easing: "ease-in",
          fill: "forwards",
        },
      )

      // Create second split arrow
      const arrow2 = createArrow()
      arrow2.style.opacity = "0"
      container.appendChild(arrow2)
      arrow2.animate(
        [
          { opacity: "1", transform: "translate(50%, 50%) scale(1)" },
          { opacity: "0", transform: "translate(150%, 150%) scale(0.5)" },
        ],
        {
          duration: 800,
          easing: "ease-in",
          fill: "forwards",
        },
      )
    }, 1500)

    // Show logo after arrow splits
    setTimeout(() => {
      logo.style.animation = "fadeInScale 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
    }, 2200)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div ref={logoRef} className="text-center opacity-0" style={{ color: "#F8EEDF" }}>
        <div className="text-6xl font-bold tracking-tight mb-2">
          centaverse
          <span style={{ color: "#8E1616" }}>se</span>
        </div>
        <div className="text-2xl font-light">media</div>
      </div>
    </div>
  )
}

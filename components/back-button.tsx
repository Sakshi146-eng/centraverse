"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"

export default function BackButton() {
  const router = useRouter()
  const svgRef = useRef<SVGSVGElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const svgWidth = 1131
  const svgHeight = 861
  const svgCenterX = svgWidth / 2

  const OPEN_HIDDEN = `M${svgWidth},0 Q${svgCenterX},0 0,0 L0,0 L${svgWidth},0 Z`
  const OPEN_BULGE = `M${svgWidth},345 Q${svgCenterX},620 0,345 L0,0 L${svgWidth},0 Z`
  const OPEN_FULL = `M${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,0 L${svgWidth},0 Z`

  const CLOSE_START = `M${svgWidth},0 Q${svgCenterX},0 0,0 L0,${svgHeight} L${svgWidth},${svgHeight} Z`
  const CLOSE_BULGE = `M${svgWidth},350 Q${svgCenterX},130 0,350 L0,${svgHeight} L${svgWidth},${svgHeight} Z`
  const CLOSE_HIDDEN = `M${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,${svgHeight} L${svgWidth},${svgHeight} Z`

  // Reveal animation on mount
  useEffect(() => {
    const svgPath = svgRef.current?.querySelector("path")
    if (!svgPath) return

    // Start fully covered
    gsap.set(svgPath, { attr: { d: CLOSE_START } })

    const tl = gsap.timeline()
    tl.to(svgPath, { duration: 0.5, attr: { d: CLOSE_BULGE }, ease: "power3.in" })
      .to(svgPath, { duration: 0.5, attr: { d: CLOSE_HIDDEN }, ease: "power3.out" })
  }, [])

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isTransitioning) return
    setIsTransitioning(true)

    const svgPath = svgRef.current?.querySelector("path")
    if (!svgPath) return

    const tl = gsap.timeline({
      onComplete: () => {
        router.push("/#sticky-cards")
      }
    })

    // Transition back to full screen
    gsap.set(svgPath, { attr: { d: OPEN_HIDDEN } })
    tl.to(svgPath, { duration: 0.5, attr: { d: OPEN_BULGE }, ease: "power4.in" })
      .to(svgPath, { duration: 0.5, attr: { d: OPEN_FULL }, ease: "power4.out" })
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 99999,
          pointerEvents: isTransitioning ? "auto" : "none",
        }}
      >
        <svg 
          ref={svgRef}
          className="menu-bg-svg" 
          viewBox="0 0 1131 861" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        >
          <path fill="var(--bg)" d={CLOSE_START} />
        </svg>
      </div>

      <button
        onClick={handleClose}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--muted)",
          fontSize: "1rem",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "3rem",
          padding: 0,
          transition: "color 0.3s ease",
          position: "relative",
          zIndex: 10,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>&times;</span> Close
      </button>
    </>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cardList } from "../lib/data"

gsap.registerPlugin(ScrollTrigger)

export default function StickyCardsSection() {
  const triggerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const activeCard = cardList.find((c) => c.id === activeProjectId)

  const svgWidth = 1131
  const svgHeight = 861
  const svgCenterX = svgWidth / 2

  const OPEN_HIDDEN = `M${svgWidth},0 Q${svgCenterX},0 0,0 L0,0 L${svgWidth},0 Z`
  const OPEN_BULGE = `M${svgWidth},345 Q${svgCenterX},620 0,345 L0,0 L${svgWidth},0 Z`
  const OPEN_FULL = `M${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,0 L${svgWidth},0 Z`

  const CLOSE_START = `M${svgWidth},0 Q${svgCenterX},0 0,0 L0,${svgHeight} L${svgWidth},${svgHeight} Z`
  const CLOSE_BULGE = `M${svgWidth},350 Q${svgCenterX},130 0,350 L0,${svgHeight} L${svgWidth},${svgHeight} Z`
  const CLOSE_HIDDEN = `M${svgWidth},${svgHeight} Q${svgCenterX},${svgHeight} 0,${svgHeight} L0,${svgHeight} L${svgWidth},${svgHeight} Z`

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (isTransitioning || activeProjectId) return
    setIsTransitioning(true)
    setActiveProjectId(id)

    const svgPath = overlayRef.current?.querySelector("path")
    if (!svgPath || !contentRef.current) return

    const clickedCard = cardList.find((c) => c.id === id)
    const blobColor = clickedCard ? clickedCard.bgColor : "var(--bg)"

    gsap.set(svgPath, { attr: { d: OPEN_HIDDEN }, fill: blobColor })
    gsap.set(contentRef.current, { opacity: 0, y: 50 })

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false)
      }
    })

    // SVG blob cover
    tl.to(svgPath, { duration: 0.5, attr: { d: OPEN_BULGE }, ease: "power4.in" })
      .to(svgPath, { duration: 0.5, attr: { d: OPEN_FULL }, ease: "power4.out" })

    // Fade in project content exactly when Poppr does
    tl.to(contentRef.current, { duration: 0.75, opacity: 1, y: 0, ease: "power3.out" }, 0.45)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isTransitioning || !activeProjectId) return
    setIsTransitioning(true)

    const svgPath = overlayRef.current?.querySelector("path")
    if (!svgPath || !contentRef.current) return

    // CRITICAL: We must reset the path structure to CLOSE_START before running the close tweens!
    gsap.set(svgPath, { attr: { d: CLOSE_START } })

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProjectId(null)
        gsap.set(svgPath, { attr: { d: OPEN_HIDDEN } })
        setIsTransitioning(false)
      }
    })

    // Fade out project content
    tl.to(contentRef.current, { duration: 0.3, opacity: 0, y: 50, ease: "power2.in" })

    // SVG blob hide (runs concurrently with fade out exactly like Poppr)
    tl.to(svgPath, { duration: 0.5, attr: { d: CLOSE_BULGE }, ease: "power3.in" }, "<")
      .to(svgPath, { duration: 0.5, attr: { d: CLOSE_HIDDEN }, ease: "power3.out" })
  }

  useEffect(() => {
    const trigger = triggerRef.current
    const pin = pinRef.current
    if (!trigger || !pin) return

    const ctx = gsap.context(() => {
      const cards = pin.querySelectorAll(".sticky-card-item")
      const totalCards = cards.length
      const segmentSize = 1 / (totalCards - 1)
      const cardYOffset = 12
      const cardScaleStep = 0.075

      // Initial setup
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + i * cardYOffset,
          scale: 1 - i * cardScaleStep,
          transformOrigin: "center bottom",
        })
      })

      ScrollTrigger.create({
        trigger: trigger,
        pin: pin,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalCards - 1)}px`,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const activeIndex = Math.min(
            Math.floor(progress / segmentSize),
            totalCards - 2
          )
          const segProgress = (progress - activeIndex * segmentSize) / segmentSize

          cards.forEach((card, i) => {
            if (i < activeIndex) {
              gsap.set(card, {
                xPercent: -50,
                yPercent: -250,
                rotationX: 35,
              })
            } else if (i === activeIndex) {
              gsap.set(card, {
                xPercent: -50,
                yPercent: gsap.utils.interpolate(-50, -250, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              })
            } else {
              const behindIndex = i - activeIndex
              const currentYOffset = (behindIndex - segProgress) * cardYOffset
              const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep

              gsap.set(card, {
                xPercent: -50,
                yPercent: -50 + currentYOffset,
                rotationX: 0,
                scale: currentScale,
              })
            }
          })
        },
      })
    }, trigger)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div id="edits" ref={triggerRef} className="sticky-cards-trigger" style={{ width: "100%", position: "relative", paddingTop: "5rem" }}>
      <div style={{ position: "absolute", top: "0rem", left: "5%", zIndex: 10 }}>
        <p className="section-label reveal">Selected works</p>
        <h2 className="section-title reveal reveal-delay-1" style={{ marginTop: "1rem" }}>
          Edits
        </h2>
      </div>
      <div ref={pinRef} className="sticky-cards-section">
        {cardList.map((card, index) => (
          <div
            onClick={(e) => handleCardClick(card.id, e)}
            key={card.id}
            className="sticky-card-item"
            id={card.id}
            style={{
              backgroundColor: card.bgColor,
              zIndex: cardList.length - index + 1,
              cursor: "pointer",
            }}
          >
            <div className="sticky-card-col">
              <p
                style={{
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "0.5rem",
                }}
              >
                {card.sub}
              </p>
              <h2
                style={{
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(1rem, 2.5vw, 2.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "0.02em",
                  color: card.textColor,
                }}
              >
                {card.title}
              </h2>
            </div>
            <div className="sticky-card-col">
              <img
                src={card.img}
                alt={card.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN OVERLAY MODAL */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 99999,
          pointerEvents: (activeProjectId || isTransitioning) ? "auto" : "none",
        }}
      >
        <svg
          className="menu-bg-svg"
          viewBox="0 0 1131 861"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        >
          <path fill="var(--bg)" />
        </svg>

        {/* Modal Content container */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflowY: "auto",
            padding: "4rem 2rem",
            opacity: 0,
            pointerEvents: activeProjectId && !isTransitioning ? "auto" : "none",
            color: "var(--white)",
          }}
        >
          {activeCard && (
            <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2rem" }}>
              <button
                onClick={handleClose}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#f5f5f5",
                  fontSize: "1rem",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: 0,
                  transition: "color 0.3s ease",
                  position: "absolute",
                  top: "2rem",
                  right: "2rem",
                  zIndex: 20,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#f5f5f5")}
              >
                Close
              </button>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  marginBottom: "4rem",
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Satoshi', system-ui, sans-serif",
                    fontSize: "clamp(3rem, 8vw, 8rem)",
                    fontWeight: 500,
                    lineHeight: 1,
                    textTransform: "lowercase",
                    letterSpacing: "-0.03em",
                    margin: 0,
                    color: "#f5f5f5",
                  }}
                >
                  {activeCard.title}
                </h1>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  {[
                    { color: "#1a1500", time: "2:34", title: "golden hour", sub: "CINEMATIC" },
                    { color: "#00051a", time: "0:45", title: "", sub: "" },
                    { color: "#1a0000", time: "1:10", title: "", sub: "" },
                  ].map((vid, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        backgroundColor: vid.color,
                        aspectRatio: "3/4",
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.05)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.4)",
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)",
                      }}
                    >
                      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", backgroundColor: "rgba(0,0,0,0.5)", padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}>{vid.time}</div>
                      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", backgroundColor: "rgba(0,0,0,0.5)", padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}>PLACEHOLDER</div>

                      {/* Concentric Circles */}
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "120%", aspectRatio: "1/1", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }}></div>
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", aspectRatio: "1/1", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }}></div>
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "40%", aspectRatio: "1/1", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }}></div>

                      {/* Play Button */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "4rem",
                          height: "4rem",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
                      >
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "8px solid transparent",
                            borderBottom: "8px solid transparent",
                            borderLeft: "12px solid rgba(255,255,255,0.5)",
                            marginLeft: "4px",
                          }}
                        ></div>
                      </div>

                      {/* Bottom Text */}
                      <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {vid.title && (
                          <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1rem", fontFamily: "var(--font-body)" }}>
                            {vid.title}
                          </span>
                        )}
                        {vid.sub && <span>{vid.sub}</span>}
                      </div>
                      <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", display: "flex", gap: "1rem" }}>
                        <span>PLACEHOLDER</span>
                        <span>ADD VIDEO</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

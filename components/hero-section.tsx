"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"

const marqueeItems = [
  "Video Editing", "Motion Design", "Colour Grading",
  "Reels", "Brand Visuals", "iPhone Cinematography",
  "CapCut", "Adobe Premiere", "After Effects",
]

export default function HeroSection({ onNavigate }: { onNavigate?: (s: string) => void }) {
  const nameRef = useRef<HTMLDivElement>(null)

  // Character reveal on mount
  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    const spans = el.querySelectorAll<HTMLSpanElement>("span[data-char]")
    spans.forEach((span, i) => {
      setTimeout(() => span.classList.add("visible"), 100 + i * 60)
    })
  }, [])

  const name = "SHREYAS"
  const surname = "SHETTY"

  return (
    <section className="hero" id="home" style={{ paddingTop: "5rem" }}>
      {/* Big name — ameer.com style */}
      <div ref={nameRef} style={{ overflow: "hidden" }}>
        <div className="hero-name" aria-label="Shreyas Shetty">
          {name.split("").map((ch, i) => (
            <span key={i} data-char style={{ transitionDelay: `${i * 0.06}s` }}>
              {ch}
            </span>
          ))}
          <br />
          {surname.split("").map((ch, i) => (
             <span key={i} data-char style={{ transitionDelay: `${(name.length + i) * 0.06}s`, color: "rgba(0,0,0,0.18)" }}>
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Sub row */}
      <div className="hero-sub-row reveal reveal-delay-4">
        <p className="hero-role">
          Video Editor &amp; Visual Storyteller
        </p>
        <button
          className="hero-scroll"
          style={{ background: "none", border: "none" }}
          onClick={() => onNavigate?.("edits")}
        >
          <span>View Work</span>
          <span className="scroll-arrow">
            <ArrowDown size={10} />
          </span>
        </button>
      </div>

      {/* Marquee strip */}
      <div className="marquee-wrapper reveal reveal-delay-5" style={{ margin: "0 -2.5rem", marginTop: "3rem" }}>
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="sep">×</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
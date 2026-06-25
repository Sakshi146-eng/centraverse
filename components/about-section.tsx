"use client"

import { useEffect, useRef } from "react"

const tools = ["CapCut", "Adobe Premiere Pro", "After Effects", "Photoshop", "Illustrator"]

const meta = [
  { label: "Based In", value: "India 🇮🇳" },
  { label: "Available", value: "Worldwide" },
  { label: "Experience", value: "7+ Years" },
  { label: "Specialty", value: "Video Editing, Brand Visuals" },
  { label: "Tools", value: tools.join(", ") },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((child, i) => {
              setTimeout(() => child.classList.add("in-view"), i * 80)
            })
            obs.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section">
      <p className="section-label reveal">About</p>

      <h2 className="section-title reveal reveal-delay-1">
        Who is<br />Shreyas?
      </h2>

      <div className="about-grid">
        {/* Story */}
        <div>
          <p className="about-body reveal reveal-delay-2">
            I'm Shreyas Shetty — founder of{" "}
            <strong>Centraverse</strong>, short for{" "}
            <em>"Centorian Cinematic Universe"</em>. The word Centaurian
            comes from my sun sign Sagittarius, symbolised by the centaur:
            a blend of instinct, creativity, and constant pursuit of growth.
          </p>
          <p className="about-body reveal reveal-delay-3" style={{ marginTop: "1.5rem" }}>
            I've been capturing visuals with my iPhone and bringing them
            to life in CapCut. Now stepping into the Adobe ecosystem —
            building toward freelance projects and bigger creative goals.
            Every edit is a chance to grow. Every frame, a new story.
          </p>

          {/* Tool list */}
          <div className="reveal reveal-delay-4" style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {tools.map((tool) => (
              <span
                key={tool}
                style={{
                  display: "inline-block",
                  padding: "0.3rem 0.75rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "var(--font-dm-mono, monospace)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div className="about-meta reveal reveal-delay-3">
          {meta.map((item) => (
            <div key={item.label} className="meta-item">
              <span className="meta-label">{item.label}</span>
              <span className="meta-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
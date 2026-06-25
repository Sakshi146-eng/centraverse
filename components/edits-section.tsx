"use client"

import { useEffect, useRef, useState } from "react"
import { Plus } from "lucide-react"

type Category = "all" | "cinematic" | "reels" | "brand" | "motion"

interface Edit {
  id: string
  title: string
  category: Exclude<Category, "all">
  duration: string
  bgColor: string
  patternColor: string
  description: string
}

const edits: Edit[] = [
  {
    id: "e1",
    title: "golden hour",
    category: "cinematic",
    duration: "2:34",
    bgColor: "#1a1208",
    patternColor: "rgba(255,200,80,0.12)",
    description: "A cinematic short capturing golden hour in urban landscapes.",
  },
  {
    id: "e2",
    title: "brand reel",
    category: "brand",
    duration: "0:45",
    bgColor: "#0e0e14",
    patternColor: "rgba(120,100,255,0.1)",
    description: "Crisp, stylish brand reel with fast cuts and smooth transitions.",
  },
  {
    id: "e3",
    title: "motion type",
    category: "motion",
    duration: "1:10",
    bgColor: "#100a0a",
    patternColor: "rgba(255,80,80,0.08)",
    description: "Kinetic typography animation for a music release.",
  },
  {
    id: "e4",
    title: "monsoon vibes",
    category: "reels",
    duration: "0:30",
    bgColor: "#080f12",
    patternColor: "rgba(60,180,255,0.08)",
    description: "Ambient monsoon reel with slow-motion sequences.",
  },
  {
    id: "e5",
    title: "documentary",
    category: "cinematic",
    duration: "5:20",
    bgColor: "#0a0a0a",
    patternColor: "rgba(200,200,200,0.05)",
    description: "A short documentary-style piece exploring everyday life.",
  },
  {
    id: "e6",
    title: "logo reveal",
    category: "motion",
    duration: "0:08",
    bgColor: "#08100a",
    patternColor: "rgba(200,255,0,0.08)",
    description: "Animated logo reveal for Centraverse with sound.",
  },
]

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "all" },
  { id: "cinematic", label: "cinematic" },
  { id: "reels", label: "reels" },
  { id: "brand", label: "brand" },
  { id: "motion", label: "motion" },
]

// SVG placeholder thumbnails (prxnv-style: image fills card)
function EditThumbnail({ edit }: { edit: Edit }) {
  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* bg */}
      <rect width="400" height="500" fill={edit.bgColor} />
      {/* noise lines */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1="0" y1={i * 38} x2="400" y2={i * 38 + 10}
          stroke={edit.patternColor} strokeWidth="0.6"
        />
      ))}
      {/* circle grid */}
      {[1, 2, 3].map((r) => (
        <circle
          key={r}
          cx="200" cy="250" r={r * 55}
          fill="none"
          stroke={edit.patternColor}
          strokeWidth="0.5"
        />
      ))}
      {/* play icon */}
      <circle cx="200" cy="250" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <polygon points="192,238 192,262 216,250" fill="rgba(255,255,255,0.25)" />
      {/* "add video" label */}
      <text
        x="200" y="445"
        fill="rgba(255,255,255,0.12)"
        fontSize="9"
        textAnchor="middle"
        fontFamily="monospace"
        letterSpacing="3"
        textTransform="uppercase"
      >
        PLACEHOLDER · ADD VIDEO
      </text>
      {/* duration */}
      <rect x="12" y="12" width="44" height="18" rx="2" fill="rgba(0,0,0,0.5)" />
      <text x="34" y="24" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="monospace">
        {edit.duration}
      </text>
    </svg>
  )
}

export default function EditsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = activeCategory === "all"
    ? edits
    : edits.filter((e) => e.category === activeCategory)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((child, i) => {
              setTimeout(() => child.classList.add("in-view"), i * 60)
            })
            obs.disconnect()
          }
        })
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="edits" className="section" style={{ paddingTop: "0" }}>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "4rem" }}>
        <p className="section-label reveal">Selected Work</p>

        {/* Header row with filter */}
        <div
          className="reveal reveal-delay-1"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Edits
          </h2>

          {/* Category pills — prxnv nav-link style */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0",
                  fontFamily: "var(--font-dm-mono, monospace)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  cursor: "none",
                  color: activeCategory === cat.id
                    ? "var(--accent, #c8ff00)"
                    : "rgba(255,255,255,0.35)",
                  transition: "color 0.2s ease",
                  textTransform: "lowercase",
                  textDecoration: activeCategory === cat.id ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — prxnv.com 3-col layout */}
        <div className="edits-grid">
          {filtered.map((edit, i) => (
            <div
              key={edit.id}
              className={`edit-card reveal reveal-delay-${Math.min(i + 1, 6)}`}
              onMouseEnter={() => setHoveredId(edit.id)}
              onMouseLeave={() => setHoveredId(null)}
              role="button"
              tabIndex={0}
              aria-label={`Edit: ${edit.title}`}
            >
              {/* Thumbnail */}
              <div className="edit-card-bg" style={{ width: "100%", height: "100%" }}>
                <EditThumbnail edit={edit} />
              </div>

              {/* Overlay */}
              <div className="edit-card-overlay" />

              {/* Info — bottom left, prxnv style */}
              <div className="edit-card-info">
                <div className="edit-card-title">{edit.title}</div>
                <div className="edit-card-cat">{edit.category}</div>
              </div>

              {/* Category pill top-right */}
              <div
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  fontFamily: "var(--font-dm-mono, monospace)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  background: "rgba(0,0,0,0.5)",
                  padding: "0.2rem 0.5rem",
                  backdropFilter: "blur(4px)",
                }}
              >
                placeholder
              </div>
            </div>
          ))}

          {/* Add new edit card */}
          <div className="edit-card-placeholder reveal" style={{ minHeight: "300px" }}>
            <div className="placeholder-icon">
              <Plus size={18} />
            </div>
            <div className="placeholder-text">
              add your<br />next edit
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
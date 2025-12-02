"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const edits = [
  {
    id: 1,
    title: "Cinematic Travel Vlog",
    description: "Color grading, transitions & sound design",
    color: "#8E1616",
  },
  {
    id: 2,
    title: "Product Showcase",
    description: "Smooth zooms, dynamic cuts & effects",
    color: "#E8C999",
  },
  {
    id: 3,
    title: "Brand Montage",
    description: "Fast-paced editing with motion graphics",
    color: "#0000008E",
  },
]

export default function EditsSection() {
  const [current, setCurrent] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  useEffect(() => {
    if (!autoRotate) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % edits.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoRotate])

  const next = () => {
    setCurrent((prev) => (prev + 1) % edits.length)
    setAutoRotate(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + edits.length) % edits.length)
    setAutoRotate(false)
  }

  return (
    <div className="w-full px-4 md:px-8 py-20">
      <h2 className="text-5xl md:text-6xl font-bold text-center mb-16" style={{ color: "#F8EEDF" }}>
        My
        <span style={{ color: "#8E1616" }}> Edits</span>
      </h2>

      <div className="max-w-5xl mx-auto">
        {/* Carousel Container */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
          <div className="flex h-full">
            {edits.map((edit, index) => (
              <div
                key={edit.id}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  transform:
                    index === current
                      ? "rotateY(0deg) scale(1) opacity(1)"
                      : index < current
                        ? "rotateY(60deg) translateX(-100px) scale(0.8) opacity(0)"
                        : "rotateY(-60deg) translateX(100px) scale(0.8) opacity(0)",
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-8 rounded-2xl text-center"
                  style={{
                    backgroundColor: edit.color,
                    color: edit.color === "#F8EEDF" || edit.color === "#E8C999" ? "#000000" : "#F8EEDF",
                  }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-4">{edit.title}</div>
                  <p className="text-lg md:text-xl font-light opacity-90">{edit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <button
            onClick={prev}
            className="p-3 rounded-full transition-all hover:scale-110"
            style={{
              backgroundColor: "rgba(142, 22, 22, 0.3)",
              color: "#8E1616",
              border: "2px solid #8E1616",
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-3">
            {edits.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index)
                  setAutoRotate(false)
                }}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: index === current ? "32px" : "8px",
                  backgroundColor: index === current ? "#8E1616" : "#E8C999",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full transition-all hover:scale-110"
            style={{
              backgroundColor: "rgba(142, 22, 22, 0.3)",
              color: "#8E1616",
              border: "2px solid #8E1616",
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* View More Link */}
        <div className="text-center">
          <a
            href="#"
            className="inline-block px-6 py-3 font-medium transition-all hover:opacity-70 border-b-2"
            style={{
              color: "#E8C999",
              borderColor: "#E8C999",
            }}
          >
            View More Edits →
          </a>
        </div>
      </div>
    </div>
  )
}

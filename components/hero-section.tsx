"use client"

import { useState } from "react"

export default function HeroSection() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  return (
    <div className="w-full flex items-center justify-center px-4 md:px-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8">Hello! Namaskara! Namaste!</h1>

        <p className="text-lg md:text-2xl leading-relaxed font-light" style={{ color: "#E8C999" }}>
          I'm Shreyas, founder of{" "}
          <span
            className="font-bold cursor-pointer transition-all duration-300 relative group"
            style={{ color: "#8E1616" }}
            onMouseEnter={() => setHoveredWord("centraverse")}
            onMouseLeave={() => setHoveredWord(null)}
          >
            Centraverse
            {hoveredWord === "centraverse" && (
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-sm whitespace-nowrap animate-pulse"
                style={{
                  backgroundColor: "#8E1616",
                  color: "#F8EEDF",
                }}
              >
                → About Us
              </div>
            )}
          </span>{" "}
          video editor and logo designer. Nice to have you here.
        </p>

        <div className="mt-16">
          <button
            onClick={() => {
              const element = document.getElementById("edits")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: "#8E1616",
              color: "#F8EEDF",
            }}
          >
            View My Work
          </button>
        </div>
      </div>
    </div>
  )
}

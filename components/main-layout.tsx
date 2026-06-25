"use client"

import { useState, useEffect, useCallback } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import EditsSection from "@/components/edits-section"
import ContactSection from "@/components/contact-section"

export default function MainLayout() {
  const [activeSection, setActiveSection] = useState("home")
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [isHover, setIsHover] = useState(false)

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Custom cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setIsHover(
        !!(t.tagName === "A" || t.tagName === "BUTTON" || t.closest("a") || t.closest("button"))
      )
    }
    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
    }
  }, [])

  // Section observer
  useEffect(() => {
    const ids = ["home", "about", "edits", "contact"]
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return (
    <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      {/* Custom cursor */}
      <div
        className={`cursor ${isHover ? "hover" : ""}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <section id="home">
          <HeroSection onNavigate={scrollToSection} />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="edits">
          <EditsSection />
        </section>
        <section id="contact">
          <ContactSection onNavigate={scrollToSection} />
        </section>
      </main>
    </div>
  )
}

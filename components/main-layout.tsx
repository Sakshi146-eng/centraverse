"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import EditsSection from "@/components/edits-section"
import StickyCardsSection from "@/components/sticky-cards-section"
import CircularGallerySection from "@/components/circular-gallery-section"
import SmoothSliderSection from "@/components/smooth-slider-section"
import ContactSection from "@/components/contact-section"

export default function MainLayout({ splashDone }: { splashDone: boolean }) {
  const [activeSection, setActiveSection] = useState("home")
  const [isHover, setIsHover] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setIsHover(
        !!(
          t.tagName === "A" ||
          t.tagName === "BUTTON" ||
          t.closest("a") ||
          t.closest("button") ||
          t.closest(".gallery-card") ||
          t.closest(".smooth-slide-container") ||
          t.closest(".smooth-slider-items p")
        )
      )
    }

    // Initialize cursor off-screen
    cursor.style.transform = "translate3d(-100px, -100px, 0) translate(-50%, -50%)"

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
    }
  }, [])

  // Global scroll reveal IntersectionObserver + MutationObserver for dynamic elements
  useEffect(() => {
    if (!splashDone) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            obs.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    const observeReveals = () => {
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
        obs.observe(el)
      })
    }

    observeReveals()

    const mut = new MutationObserver(() => {
      observeReveals()
    })
    mut.observe(document.body, { childList: true, subtree: true })

    return () => {
      obs.disconnect()
      mut.disconnect()
    }
  }, [splashDone])

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
    <div className="main-bg-container" style={{ color: "var(--white)", minHeight: "100vh" }}>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`cursor ${isHover ? "hover" : ""}`}
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
        <section id="sticky-cards">
          <StickyCardsSection />
        </section>
        <section id="circular-gallery">
          <CircularGallerySection />
        </section>
        <section id="smooth-slider">
          <SmoothSliderSection />
        </section>
        <section id="contact">
          <ContactSection onNavigate={scrollToSection} />
        </section>
      </main>
    </div>
  )
}

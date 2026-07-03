"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ToolsSection from "@/components/tools-section"
import StickyCardsSection from "@/components/sticky-cards-section"
import CircularGallerySection from "@/components/circular-gallery-section"
import SmoothSliderSection from "@/components/smooth-slider-section"
import ContactSection from "@/components/contact-section"

export default function MainLayout({ splashDone }: { splashDone: boolean }) {
  const [activeSection, setActiveSection] = useState("home")
  const [isHover, setIsHover] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    setMounted(true)
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
  }, [mounted]) // Re-run effect when mounted changes because cursorRef gets attached

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
    const ids = ["home", "about", "tools", "edits", "circular-gallery", "smooth-slider", "contact"]
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: "-30% 0px -30% 0px" }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return (
    <>
      {mounted && createPortal(
        <div
          ref={cursorRef}
          className={`cursor ${isHover ? "hover" : ""}`}
        />,
        document.body
      )}
      <div className="main-bg-container overflow-x-hidden w-full max-w-[100%]" style={{ color: "var(--white)", minHeight: "100vh" }}>
        <Header activeSection={activeSection} onNavigate={scrollToSection} />

        <main>
          <HeroSection onNavigate={scrollToSection} />
          <AboutSection />
          <ToolsSection />
          <StickyCardsSection />
          <CircularGallerySection />
          <SmoothSliderSection />
          <ContactSection onNavigate={scrollToSection} />
        </main>
      </div>
    </>
  )
}

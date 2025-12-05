"use client"

import { useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import EditsSection from "@/components/edits-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div style={{ backgroundColor: "#000000", color: "#F8EEDF" }}>
      <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <Navigation isOpen={mobileMenuOpen} onNavigate={scrollToSection} />

      <main>
        <section id="home" className="min-h-screen pt-20">
          <HeroSection />
        </section>
        <section id="about" className="min-h-screen">
          <AboutSection />
        </section>
        <section id="edits" className="min-h-screen">
          <EditsSection />
        </section>
        
        <section id="contact" className="min-h-screen">
          <ContactSection onNavigate={scrollToSection} />
        </section>
      </main>
    </div>
  )
}

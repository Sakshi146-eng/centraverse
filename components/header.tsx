"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "edits", label: "Edits" },
  { id: "contact", label: "Contact" },
]

interface HeaderProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNav = (id: string) => {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="nav-logo"
          style={{ background: "none", border: "none", cursor: "none" }}
        >
          centraverse<span className="dot" />
        </button>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: "flex" }}>
          {navItems.map((item) => (
            <li key={item.id} style={{ listStyle: "none" }}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                onClick={(e) => { e.preventDefault(); handleNav(item.id) }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "none",
            padding: "0.25rem",
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => { e.preventDefault(); handleNav(item.id) }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  )
}

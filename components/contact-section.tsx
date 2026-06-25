"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

interface ContactSectionProps {
  onNavigate?: (section: string) => void
}

const socials = [
  { num: "01", label: "Email", handle: "shreyas@centraverse.com", href: "mailto:shreyas@centraverse.com" },
  { num: "02", label: "Instagram", handle: "@centraverse", href: "#" },
  { num: "03", label: "YouTube", handle: "Centraverse", href: "#" },
  { num: "04", label: "LinkedIn", handle: "Shreyas Shetty", href: "#" },
]

export default function ContactSection({ onNavigate }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

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
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section ref={sectionRef} id="contact" className="section" style={{ paddingTop: "0" }}>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "4rem" }}>
        <p className="section-label reveal">Get in Touch</p>

        {/* Large background text — ameer.com style */}
        <div style={{ overflow: "hidden", marginBottom: "3rem" }}>
          <h2
            className="contact-big reveal reveal-delay-1"
            style={{ marginBottom: 0 }}
          >
            Contact
          </h2>
        </div>

        <div className="contact-grid">
          {/* Socials — ameer.com footer layout */}
          <div>
            <p
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "var(--font-dm-mono, monospace)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "0.5rem",
              }}
            >
              Connect directly
            </p>

            <ul className="social-list reveal reveal-delay-2">
              {socials.map((s) => (
                <li key={s.num}>
                  <a className="social-item" href={s.href}>
                    <div className="social-item-left">
                      <span className="social-num">{s.num}</span>
                      <span className="social-name">{s.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span className="social-handle">{s.handle}</span>
                      <ArrowUpRight size={12} className="social-arrow" style={{ color: "rgba(255,255,255,0.4)" }} />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact form */}
          <div className="reveal reveal-delay-3">
            <p
              style={{
                fontFamily: "var(--font-dm-mono, monospace)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "1.5rem",
              }}
            >
              Send a message
            </p>

            {sent ? (
              <div
                style={{
                  padding: "2.5rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-mono, monospace)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Message sent — I'll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    required
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-submit">
                  Send
                  <ArrowUpRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="site-footer" style={{ marginTop: "5rem", padding: "2rem 0", marginLeft: 0, marginRight: 0 }}>
          <span className="footer-copy">
            © 2025 centraverse — All rights reserved
          </span>
          <a
            href="#home"
            className="back-top"
            onClick={(e) => { e.preventDefault(); onNavigate?.("home") }}
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  )
}

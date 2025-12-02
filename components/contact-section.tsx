"use client"

import { Mail, Instagram, Linkedin } from "lucide-react"

interface ContactSectionProps {
  onNavigate?: (section: string) => void
}

export default function ContactSection({ onNavigate }: ContactSectionProps) {
  return (
    <div className="w-full px-4 md:px-8 py-20">
      <h2 className="text-5xl md:text-6xl font-bold text-center mb-12" style={{ color: "#F8EEDF" }}>
        Get in
        <span style={{ color: "#8E1616" }}> Touch</span>
      </h2>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-lg mb-8 font-light" style={{ color: "#E8C999" }}>
            Have a project in mind? Let's create something amazing together.
          </p>

          <a
            href="mailto:shreyas@centraverse.com"
            className="inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 mb-8"
            style={{
              backgroundColor: "#8E1616",
              color: "#F8EEDF",
            }}
          >
            Send Me an Email
          </a>
        </div>

        <div className="flex justify-center gap-8">
          {[
            { icon: Mail, label: "Email", href: "mailto:shreyas@centraverse.com" },
            { icon: Instagram, label: "Instagram", href: "#" },
            { icon: Linkedin, label: "LinkedIn", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="p-4 rounded-full transition-all hover:scale-110"
              style={{
                backgroundColor: "rgba(142, 22, 22, 0.2)",
                color: "#8E1616",
                border: "2px solid rgba(142, 22, 22, 0.4)",
              }}
              title={label}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        <div
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "rgba(142, 22, 22, 0.1)",
            borderLeft: "4px solid #8E1616",
          }}
        >
          <p className="font-light text-sm" style={{ color: "#E8C999" }}>
            © 2025 Centraverse Media. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

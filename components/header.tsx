"use client"

import { Menu } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center backdrop-blur-md"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderBottom: "1px solid rgba(232, 201, 153, 0.1)",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold tracking-tight">
          <span style={{ color: "#F8EEDF" }}>centaverse</span>
          <span style={{ color: "#8E1616" }}>se</span>
        </div>
      </div>

      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:opacity-70 transition-opacity"
        style={{ color: "#8E1616" }}
      >
        <Menu size={28} />
      </button>

      <nav className="hidden md:flex gap-8">
        {["Edits", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#E8C999" }}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  )
}

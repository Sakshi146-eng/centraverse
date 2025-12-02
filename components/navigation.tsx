"use client"

interface NavigationProps {
  isOpen: boolean
  onNavigate: (section: string) => void
}

export default function Navigation({ isOpen, onNavigate }: NavigationProps) {
  if (!isOpen) return null

  return (
    <nav
      className="fixed top-16 right-0 bottom-0 w-48 md:hidden z-30 backdrop-blur-lg border-l"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        borderColor: "rgba(232, 201, 153, 0.1)",
      }}
    >
      <div className="p-6 flex flex-col gap-6">
        {[
          { id: "home", label: "Home" },
          { id: "edits", label: "Edits" },
          { id: "about", label: "About Us" },
          { id: "contact", label: "Contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="text-lg font-medium text-left transition-colors hover:opacity-70"
            style={{ color: item.id === "home" ? "#8E1616" : "#E8C999" }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

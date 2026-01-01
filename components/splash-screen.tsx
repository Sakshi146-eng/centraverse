"use client"

import { useEffect, useRef } from "react"

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current

    if (!container || !logo) return

    // Create arrow animation
//     const createArrow = () => {
//   const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg")
//   arrow.setAttribute("viewBox", "0 0 100 100")
//   arrow.setAttribute("width", "120")
//   arrow.setAttribute("height", "120")
//   arrow.style.position = "absolute"
//   arrow.style.opacity = "0"
//   arrow.style.left = "50%"
//   arrow.style.top = "50%"
//   arrow.style.transform = "translate(-50%, -50%)"

//   // Bottom diagonal arrow (45 degrees up-right)
//   const arrow1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
//   arrow1.setAttribute("d", "M25 75 L45 55 L45 60 L55 50 L60 55 L50 65 L55 65 L35 85 Z")
//   arrow1.setAttribute("fill", "white")
  
//   // Top diagonal arrow (45 degrees up-right, centered on first arrow's head)
//   const arrow2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
//   arrow2.setAttribute("d", "M40 60 L60 40 L60 45 L70 35 L75 40 L65 50 L70 50 L50 70 Z")
//   arrow2.setAttribute("fill", "white")
  
//   // Four-pointed star/sparkle at top-right
//   const sparkle = document.createElementNS("http://www.w3.org/2000/svg", "path")
//   sparkle.setAttribute("d", "M78 28 L80 22 L82 28 L88 30 L82 32 L80 38 L78 32 L72 30 Z")
//   sparkle.setAttribute("fill", "white")

//   arrow.appendChild(arrow1)
//   arrow.appendChild(arrow2)
//   arrow.appendChild(sparkle)

//   return arrow
// }

// const createArrow = () => {
//   const svgNS = "http://www.w3.org/2000/svg"
//   const arrow = document.createElementNS(svgNS, "svg")
//   // Tight viewBox so shapes map predictably to size
//   arrow.setAttribute("viewBox", "0 0 100 100")
//   arrow.setAttribute("width", "140")
//   arrow.setAttribute("height", "140")
//   arrow.style.position = "absolute"
//   arrow.style.opacity = "0"
//   arrow.style.left = "50%"
//   arrow.style.top = "50%"
//   arrow.style.transform = "translate(-50%, -50%)"

//   // Common stroke style for the two shafts
//   const makeShaft = (x1: number, y1: number, x2: number, y2: number) => {
//     const path = document.createElementNS(svgNS, "path")
//     path.setAttribute("d", `M ${x1} ${y1} L ${x2} ${y2}`)
//     path.setAttribute("stroke", "white")
//     path.setAttribute("stroke-width", "7")
//     path.setAttribute("fill", "none")
//     path.setAttribute("stroke-linecap", "round")
//     path.setAttribute("stroke-linejoin", "round")
//     return path
//   }

//   // Create two parallel diagonal shafts (bottom-left -> top-right)
//   // Coordinates chosen to match the visual composition in the provided image
//   const shaft1 = makeShaft(18, 82, 70, 30)
//   const shaft2 = makeShaft(28, 72, 80, 20)

//   // Arrowheads: filled triangular shapes anchored at the shaft tips
//   const makeHead = (tipX: number, tipY: number, backX: number, backY: number, spread = 8) => {
//     // Compute two base points perpendicular to the shaft direction to form a triangle
//     const dx = tipX - backX
//     const dy = tipY - backY
//     // Normalize
//     const len = Math.sqrt(dx * dx + dy * dy) || 1
//     const ux = dx / len
//     const uy = dy / len
//     // Perpendicular vector
//     const px = -uy
//     const py = ux
//     // base points
//     const bx1 = backX + px * spread
//     const by1 = backY + py * spread
//     const bx2 = backX - px * spread
//     const by2 = backY - py * spread

//     const poly = document.createElementNS(svgNS, "polygon")
//     poly.setAttribute("points", `${tipX},${tipY} ${bx1},${by1} ${bx2},${by2}`)
//     poly.setAttribute("fill", "white")
//     return poly
//   }

//   const head1 = makeHead(70, 30, 60, 40, 7)
//   const head2 = makeHead(80, 20, 70, 30, 7)

//   // Four-point sparkle: drawn as a small rotated diamond with short arms
//   const sparkle = document.createElementNS(svgNS, "path")
//   // Use an explicit path that produces the four-point star from the image
//   sparkle.setAttribute(
//     "d",
//     "M86 16 L88 12 L90 16 L94 18 L90 20 L88 24 L86 20 L82 18 Z",
//   )
//   sparkle.setAttribute("fill", "white")

//   // Append shapes in order so shafts appear behind heads
//   arrow.appendChild(shaft1)
//   arrow.appendChild(shaft2)
//   arrow.appendChild(head1)
//   arrow.appendChild(head2)
//   arrow.appendChild(sparkle)

//   return arrow
// }

const createArrow = () => {
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  // Set viewBox to contain the icon properly
  arrow.setAttribute("viewBox", "0 0 100 100") 
  arrow.setAttribute("width", "120")
  arrow.setAttribute("height", "120")
  arrow.style.position = "absolute"
  arrow.style.opacity = "0"
  arrow.style.left = "50%"
  arrow.style.top = "50%"
  arrow.style.transform = "translate(-50%, -50%)"

  // --- 1. The Exact Arrow Path (Three-pronged Fork) ---
  const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
  
  // Path Data Breakdown:
  // M 25 75: Start the main diagonal shaft (bottom-left)
  // L 65 35: Draw to the main tip point
  // M 65 35: Move back to the tip (without drawing)
  // L 45 40: Draw the top-left barb/fork segment
  // M 65 35: Move back to the tip
  // L 60 55: Draw the bottom-right barb/fork segment
  
  arrowPath.setAttribute("d", "M 25 75 L 65 35 M 65 35 L 45 40 M 65 35 L 60 55")
  
  arrowPath.setAttribute("stroke", "white")
  arrowPath.setAttribute("stroke-width", "5") // Defines the thickness of the line
  arrowPath.setAttribute("fill", "none") // Crucial: ensures it's line art, not a filled polygon
  arrowPath.setAttribute("stroke-linecap", "round") // Gives clean, rounded ends to the lines
  arrowPath.setAttribute("stroke-linejoin", "round")

  // --- 2. The Star/Sparkle Element ---
  // A clean diamond shape positioned next to the tip
  const svgNS = "http://www.w3.org/2000/svg"
  const sparkle = document.createElementNS(svgNS, "path")
  // Use an explicit path that produces the four-point star from the image
  sparkle.setAttribute(
    "d",
    "M86 16 L88 12 L90 16 L94 18 L90 20 L88 24 L86 20 L82 18 Z",
  )
  sparkle.setAttribute("fill", "white")
  arrow.appendChild(arrowPath)
  arrow.appendChild(sparkle)

  return arrow
}

    const arrow = createArrow()
    container.appendChild(arrow)

    // Animate arrow coming from bottom to center
    arrow.animate(
      [
        { opacity: "1", transform: "translate(-50%, 200%) rotate(0deg)" },
        { opacity: "1", transform: "translate(-50%, -50%) rotate(0deg)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      },
    )

    // After arrow reaches center, split animation
    setTimeout(() => {
      arrow.animate(
        [
          { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          { opacity: "0", transform: "translate(-150%, -150%) scale(0.5)" },
        ],
        {
          duration: 800,
          easing: "ease-in",
          fill: "forwards",
        },
      )

      // Create second split arrow
      const arrow2 = createArrow()
      arrow2.style.opacity = "0"
      container.appendChild(arrow2)
      arrow2.animate(
        [
          { opacity: "1", transform: "translate(50%, 50%) scale(1)" },
          { opacity: "0", transform: "translate(150%, 150%) scale(0.5)" },
        ],
        {
          duration: 800,
          easing: "ease-in",
          fill: "forwards",
        },
      )
    }, 1500)

    // Show logo after arrow splits
    setTimeout(() => {
      logo.style.animation = "fadeInScale 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
    }, 2200)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div ref={logoRef} className="text-center opacity-0" style={{ color: "#F8EEDF" }}>
        <div className="text-6xl font-bold tracking-tight mb-2">
          centaver
          <span style={{ color: "#8E1616" }}>se</span>
        </div>
        <div className="text-2xl font-light">media</div>
      </div>
    </div>
  )
}

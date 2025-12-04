// "use client"

// import { useState } from "react"

// export default function HeroSection() {
//   const [hoveredWord, setHoveredWord] = useState<string | null>(null)

//   return (
//     <div className="w-full flex items-center justify-center px-4 md:px-8">
//       <div className="max-w-4xl text-center">
//         <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8">Hello! Namaskara! Namaste!</h1>

//         <p className="text-lg md:text-2xl leading-relaxed font-light" style={{ color: "#E8C999" }}>
//           I'm Shreyas, founder of{" "}
//           <span
//             className="font-bold cursor-pointer transition-all duration-300 relative group"
//             style={{ color: "#8E1616" }}
//             onMouseEnter={() => setHoveredWord("centraverse")}
//             onMouseLeave={() => setHoveredWord(null)}
//           >
//             Centraverse
//             {hoveredWord === "centraverse" && (
//               <div
//                 className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-sm whitespace-nowrap animate-pulse"
//                 style={{
//                   backgroundColor: "#8E1616",
//                   color: "#F8EEDF",
//                 }}
//               >
//                 → About Us
//               </div>
//             )}
//           </span>{" "}
//           video editor and logo designer. Nice to have you here.
//         </p>

//         <div className="mt-16">
//           <button
//             onClick={() => {
//               const element = document.getElementById("edits")
//               element?.scrollIntoView({ behavior: "smooth" })
//             }}
//             className="px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
//             style={{
//               backgroundColor: "#8E1616",
//               color: "#F8EEDF",
//             }}
//           >
//             View My Work
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"

export default function HeroSection() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-8">
      <div className="max-w-5xl text-center">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl leading-tight mb-6" style={{ fontFamily: "'Catchy Mager'", fontWeight: "bold" }}>
          <span
            className="inline-block cursor-pointer transition-colors duration-300"
            style={{ color: hoveredWord === "hello" ? "#8E1616" : "#F8EEDF" }}
            onMouseEnter={() => setHoveredWord("hello")}
            onMouseLeave={() => setHoveredWord(null)}
          >
            Hello
          </span>
          <span style={{ color: "#E8C999" }}> | </span>
          <span
            className="inline-block cursor-pointer transition-colors duration-300"
            style={{ color: hoveredWord === "namaskara" ? "#8E1616" : "#F8EEDF" }}
            onMouseEnter={() => setHoveredWord("namaskara")}
            onMouseLeave={() => setHoveredWord(null)}
          >
            ನಮಸ್ಕಾರ
          </span>
          <span style={{ color: "#E8C999" }}> | </span>
          <span
            className="inline-block cursor-pointer transition-colors duration-300"
            style={{ color: hoveredWord === "namaste" ? "#8E1616" : "#F8EEDF" }}
            onMouseEnter={() => setHoveredWord("namaste")}
            onMouseLeave={() => setHoveredWord(null)}
          >
            नमस्ते
          </span>
        </h1>

        {/* Name */}
        <h2 className="text-3xl md:text-5xl mb-8" style={{ fontFamily: "'Avant Garde Gothic Bold'", fontWeight: "bold", color: "#E8C999" }}>
          I'm Shreyas Shetty
        </h2>

        {/* Description */}
        <p className="text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-12" style={{ fontFamily: "'Avant Garde Gothic Bold'", color: "#F8EEDF", letterSpacing: "0.3px" }}>
          A professional photographer and video editor with over 7 years of experience in crafting impactful visuals. I bring stories to life through dynamic edits, creative compositions and clean aesthetics. I'm also a growing graphic designer and logo creator, constantly exploring new ways to add personality and identity to brands.
        </p>

      </div>
    </div>
  )
}

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
// "use client"

// import { useState } from "react"
// import { Instrument_Sans, Krub, Space_Mono } from 'next/font/google'

// const instrumentSans = Instrument_Sans({ subsets: ['latin'] })
// const krub = Krub({ weight: ['400', '700'], subsets: ['latin'] })
// const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })

// export default function HeroSection() {
//   const [hoveredWord, setHoveredWord] = useState<string | null>(null)

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-8">
//       <div className="max-w-5xl text-center">
//         {/* Main Heading */}
//         <h1 className={`text-6xl md:text-7xl leading-tight mb-6 ${instrumentSans.className}`} style={{ fontWeight: "bold" }}>
//           <span
//             className="inline-block cursor-pointer transition-colors duration-300"
//             style={{ color: hoveredWord === "hello" ? "#8E1616" : "#F8EEDF" }}
//             onMouseEnter={() => setHoveredWord("hello")}
//             onMouseLeave={() => setHoveredWord(null)}
//           >
//             Hello
//           </span>
//           <span style={{ color: "#8E1616" }}> | </span>
//           <span
//             className="inline-block cursor-pointer transition-colors duration-300"
//             style={{ color: hoveredWord === "namaskara" ? "#8E1616" : "#F8EEDF" }}
//             onMouseEnter={() => setHoveredWord("namaskara")}
//             onMouseLeave={() => setHoveredWord(null)}
//           >
//             ನಮಸ್ಕಾರ
//           </span>
//           <span style={{ color: "#8E1616" }}> | </span>
//           <span
//             className="inline-block cursor-pointer transition-colors duration-300"
//             style={{ color: hoveredWord === "namaste" ? "#8E1616" : "#F8EEDF" }}
//             onMouseEnter={() => setHoveredWord("namaste")}
//             onMouseLeave={() => setHoveredWord(null)}
//           >
//             नमस्ते
//           </span>
//         </h1>

//         {/* Name */}
//         <h2 className={`text-3xl md:text-5xl mb-8 ${krub.className}`} style={{ fontWeight: "bold", color: "#F8EEDF" }}>
//           I'm Shreyas Shetty
//         </h2>

//         {/* Description */}
//         <p className={`text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-12 ${spaceMono.className}`} style={{ color: "#F8EEDF", letterSpacing: "0.3px" }}>
//           A professional photographer and video editor with over 7 years of experience in crafting impactful visuals. I bring stories to life through dynamic edits, creative compositions and clean aesthetics. I'm also a growing graphic designer and logo creator, constantly exploring new ways to add personality and identity to brands.
//         </p>

//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Instrument_Sans, Krub, Space_Mono } from 'next/font/google'

// const instrumentSans = Instrument_Sans({ subsets: ['latin'] })
// const krub = Krub({ weight: ['400', '700'], subsets: ['latin'] })
// const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })

// export default function HeroSection() {
//   const [hoveredWord, setHoveredWord] = useState<string | null>(null)

//   return (
//     <div className="w-full">
//       <style jsx>{`
//         .hero-section {
//           min-height: 100vh;
//           display: flex;
//           place-items: center;
//           width: 100%;
//           padding: 0 2rem;
//         }

//         @media (min-width: 768px) {
//           .hero-section {
//             padding: 0 5rem;
//           }
//         }

//         .hero-content {
//           max-w-5xl;
//           text-align: center;
//           margin: 0 auto;
//           width: 100%;
//         }

//         .hero-title {
//           font-size: clamp(3rem, 8vw, 7rem);
//           line-height: 1.1;
//           margin-bottom: 1.5rem;
//           font-weight: bold;
//           background: linear-gradient(#F8EEDF 60%, rgba(248, 238, 223, 0.5));
//           background-clip: text;
//           -webkit-background-clip: text;
//           color: transparent;
//         }

//         .greeting-word {
//           display: inline-block;
//           cursor: pointer;
//           transition: opacity 0.3s ease;
//         }

//         .greeting-word:hover {
//           opacity: 0.7;
//         }

//         .separator {
//           color: #8E1616;
//         }

//         .hero-name {
//           font-size: clamp(2rem, 5vw, 3.5rem);
//           margin-bottom: 2rem;
//           font-weight: bold;
//           color: #F8EEDF;
//         }

//         .hero-description {
//           font-size: clamp(1rem, 2vw, 1.25rem);
//           line-height: 1.6;
//           max-w: 48rem;
//           margin: 0 auto 3rem;
//           color: #F8EEDF;
//           letter-spacing: 0.3px;
//         }
//       `}</style>

//       <main className="hero-section">
//         <div className="hero-content">
//           {/* Main Heading */}
//           <h1 className={`hero-title ${instrumentSans.className}`}>
//             <span
//               className="greeting-word"
//               onMouseEnter={() => setHoveredWord("hello")}
//               onMouseLeave={() => setHoveredWord(null)}
//               style={{ color: hoveredWord === "hello" ? "#8E1616" : "#F8EEDF" }}
//             >
//               Hello
//             </span>
//             <span className="separator"> | </span>
//             <span
//               className="greeting-word"
//               onMouseEnter={() => setHoveredWord("namaskara")}
//               onMouseLeave={() => setHoveredWord(null)}
//               style={{ color: hoveredWord === "namaskara" ? "#8E1616" : "#F8EEDF" }}
//             >
//               ನಮಸ್ಕಾರ
//             </span>
//             <span className="separator"> | </span>
//             <span
//               className="greeting-word"
//               onMouseEnter={() => setHoveredWord("namaste")}
//               onMouseLeave={() => setHoveredWord(null)}
//               style={{ opacity: hoveredWord === "namaste" ? 0.7 : 1 }}
//             >
//               नमस्ते
//             </span>
//           </h1>

//           {/* Name */}
//           <h2 className={`hero-name ${krub.className}`}>
//             I'm Shreyas Shetty
//           </h2>

//           {/* Description */}
//           <p className={`hero-description ${spaceMono.className}`}>
//             A professional photographer and video editor with over 7 years of experience in crafting impactful visuals. I bring stories to life through dynamic edits, creative compositions and clean aesthetics. I'm also a growing graphic designer and logo creator, constantly exploring new ways to add personality and identity to brands.
//           </p>
//         </div>
//       </main>
//     </div>
//   )
// }
"use client"

import { Instrument_Sans, Krub, Space_Mono } from 'next/font/google'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })
const krub = Krub({ weight: ['400', '700'], subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })

export default function HeroSection() {
  return (
    <div className="w-full">
      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          place-items: center;
          width: 100%;
          padding: 0 2rem;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .hero-section {
            padding: 0 5rem;
          }
        }

        .hero-content {
          max-w-5xl;
          text-align: center;
          margin: 0 auto;
          width: 100%;
        }

        .hero-title {
          --font-level: 6;
          --fluid-min: calc(24 * pow(1.1, 6));
          --fluid-max: calc(20 * pow(1.33, 6));
          --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (1500 - 375));
          font-size: clamp(
            calc(var(--fluid-min) / 16 * 1rem),
            calc((var(--fluid-min) / 16 * 1rem) - ((var(--fluid-preferred) * 375) / 16 * 1rem) + (var(--fluid-preferred) * 100vi)),
            calc(var(--fluid-max) / 16 * 1rem)
          );
          text-wrap: pretty;
          line-height: 1.2;
          margin: 0 0 1.5rem 0;
          background: linear-gradient(#F8EEDF 60%, rgba(248, 238, 223, 0.5));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-align: center;
        }

        .separator {
          color: #8E1616;
        }

        .hero-name {
          font-size: clamp(2rem, 5vw, 3.5rem);
          text-wrap: pretty;
          line-height: 1.2;
          margin: 0 0 1.5rem 0;
          background: linear-gradient(#F8EEDF 60%, rgba(248, 238, 223, 0.5));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-align: center;
        }

        .hero-description {
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.6;
          max-w: 48rem;
          margin: 0 auto 3rem;
          color: #F8EEDF;
          letter-spacing: 0.3px;
        }
      `}</style>

      <main className="hero-section">
        <div className="hero-content">
          {/* Main Heading */}
          <h1 className={`hero-title ${instrumentSans.className}`}>
            <span>Hello</span>
            <span className="separator"> | </span>
            <span>ನಮಸ್ಕಾರ</span>
            <span className="separator"> | </span>
            <span>नमस्ते</span>
          </h1>

          {/* Name */}
          <h2 className={`hero-name ${krub.className}`}>
            I'm Shreyas Shetty
          </h2>

          {/* Description */}
          <p className={`hero-description ${spaceMono.className}`}>
            A professional photographer and video editor with over 7 years of experience in crafting impactful visuals. I bring stories to life through dynamic edits, creative compositions and clean aesthetics. I'm also a growing graphic designer and logo creator, constantly exploring new ways to add personality and identity to brands.
          </p>
        </div>
      </main>
    </div>
  )
}
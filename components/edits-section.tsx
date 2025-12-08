// "use client"

// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// const edits = [
//   {
//     id: 1,
//     title: "Cinematic Travel Vlog",
//     description: "Color grading, transitions & sound design",
//     color: "#8E1616",
//   },
//   {
//     id: 2,
//     title: "Product Showcase",
//     description: "Smooth zooms, dynamic cuts & effects",
//     color: "#E8C999",
//   },
//   {
//     id: 3,
//     title: "Brand Montage",
//     description: "Fast-paced editing with motion graphics",
//     color: "#0000008E",
//   },
// ]

// export default function EditsSection() {
//   const [current, setCurrent] = useState(0)
//   const [autoRotate, setAutoRotate] = useState(true)

//   useEffect(() => {
//     if (!autoRotate) return

//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % edits.length)
//     }, 5000)

//     return () => clearInterval(timer)
//   }, [autoRotate])

//   const next = () => {
//     setCurrent((prev) => (prev + 1) % edits.length)
//     setAutoRotate(false)
//   }

//   const prev = () => {
//     setCurrent((prev) => (prev - 1 + edits.length) % edits.length)
//     setAutoRotate(false)
//   }

//   return (
//     <div className="w-full px-4 md:px-8 py-20">
//       <h2 className="text-5xl md:text-6xl font-bold text-center mb-16" style={{ color: "#F8EEDF" }}>
//         My
//         <span style={{ color: "#8E1616" }}> Edits</span>
//       </h2>

//       <div className="max-w-5xl mx-auto">
//         {/* Carousel Container */}
//         <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
//           <div className="flex h-full">
//             {edits.map((edit, index) => (
//               <div
//                 key={edit.id}
//                 className="absolute inset-0 transition-all duration-700 ease-out"
//                 style={{
//                   transform:
//                     index === current
//                       ? "rotateY(0deg) scale(1) opacity(1)"
//                       : index < current
//                         ? "rotateY(60deg) translateX(-100px) scale(0.8) opacity(0)"
//                         : "rotateY(-60deg) translateX(100px) scale(0.8) opacity(0)",
//                   perspective: "1000px",
//                   transformStyle: "preserve-3d",
//                 }}
//               >
//                 <div
//                   className="w-full h-full flex flex-col items-center justify-center p-8 rounded-2xl text-center"
//                   style={{
//                     backgroundColor: edit.color,
//                     color: edit.color === "#F8EEDF" || edit.color === "#E8C999" ? "#000000" : "#F8EEDF",
//                   }}
//                 >
//                   <div className="text-4xl md:text-5xl font-bold mb-4">{edit.title}</div>
//                   <p className="text-lg md:text-xl font-light opacity-90">{edit.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex items-center justify-center gap-6 mb-12">
//           <button
//             onClick={prev}
//             className="p-3 rounded-full transition-all hover:scale-110"
//             style={{
//               backgroundColor: "rgba(142, 22, 22, 0.3)",
//               color: "#8E1616",
//               border: "2px solid #8E1616",
//             }}
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <div className="flex gap-3">
//             {edits.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setCurrent(index)
//                   setAutoRotate(false)
//                 }}
//                 className="h-2 rounded-full transition-all duration-300"
//                 style={{
//                   width: index === current ? "32px" : "8px",
//                   backgroundColor: index === current ? "#8E1616" : "#E8C999",
//                 }}
//               />
//             ))}
//           </div>

//           <button
//             onClick={next}
//             className="p-3 rounded-full transition-all hover:scale-110"
//             style={{
//               backgroundColor: "rgba(142, 22, 22, 0.3)",
//               color: "#8E1616",
//               border: "2px solid #8E1616",
//             }}
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* View More Link */}
//         <div className="text-center">
//           <a
//             href="#"
//             className="inline-block px-6 py-3 font-medium transition-all hover:opacity-70 border-b-2"
//             style={{
//               color: "#E8C999",
//               borderColor: "#E8C999",
//             }}
//           >
//             View More Edits →
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"

const skills = [
  { text: "I can ", highlight: "click pictures", id: "pictures" },
  { text: "I can ", highlight: "capture videos", id: "videos" },
  { text: "I can ", highlight: "design graphics", id: "graphics" },
  { text: "I can ", highlight: "make logos", id: "logos" },
]

export default function PortfolioSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

 return (
    <div className="w-full" style={{ 
      fontFamily: "'Geist', 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui"
    }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

        @property --hue {
          initial-value: 0;
          syntax: '<number>';
          inherits: false;
        }
        @property --chroma {
          initial-value: 0;
          syntax: '<number>';
          inherits: true;
        }

        :root {
          --start: 0;
          --end: 360;
          --lightness: 65%;
          --base-chroma: 0.3;
          --font-size-min: 14;
          --font-size-max: 20;
          --font-ratio-min: 1.1;
          --font-ratio-max: 1.33;
          --font-width-min: 375;
          --font-width-max: 1500;
        }

        .portfolio-section {
          width: 100%;
          scroll-snap-type: y proximity;
        }

        .portfolio-header {
          min-height: 40vh;
          display: flex;
          place-items: center;
          width: 100%;
          padding: 0 5rem;
        }

        .portfolio-title {
          --font-level: 8;
          --fluid-min: calc(24 * pow(1.1, 8));
          --fluid-max: calc(20 * pow(1.33, 8));
          --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (1500 - 375));
          font-size: clamp(
            calc(var(--fluid-min) / 16 * 1rem),
            calc((var(--fluid-min) / 16 * 1rem) - ((var(--fluid-preferred) * 375) / 16 * 1rem) + (var(--fluid-preferred) * 100vi)),
            calc(var(--fluid-max) / 16 * 1rem)
          );
          text-wrap: pretty;
          line-height: 0.8;
          margin: 0;
          background: linear-gradient(#F8EEDF 60%, rgba(248, 238, 223, 0.5));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .content-section {
          --font-level: 4;
          --fluid-min: calc(14 * pow(1.1, 4));
          --fluid-max: calc(20 * pow(1.33, 4));
          --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (1500 - 375));
          font-size: clamp(
            calc(var(--fluid-min) / 16 * 1rem),
            calc((var(--fluid-min) / 16 * 1rem) - ((var(--fluid-preferred) * 375) / 16 * 1rem) + (var(--fluid-preferred) * 100vi)),
            calc(var(--fluid-max) / 16 * 1rem)
          );
          display: flex;
          line-height: 1.25;
          width: 100%;
          padding-left: 5rem;
        }

        .sticky-text {
          position: sticky;
          top: calc(50% - 0.5lh);
          font-size: inherit;
          margin: 0;
          display: inline-block;
          height: fit-content;
          font-weight: 600;
          background: linear-gradient(#F8EEDF 50%, rgba(248, 238, 223, 0.25));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .skills-list {
          font-weight: 600;
          padding: 0;
          margin: 0;
          list-style-type: none;
        }

        .skills-list li {
          opacity: 0.2;
          scroll-snap-align: center;
          --step: calc((360 - 0) / (4 - 1));
          color: #8E1616;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .skills-list li:first-of-type {
          opacity: 1;
        }

        .skills-list li:hover {
          opacity: 1 !important;
        }

        .skills-list li:not(:last-of-type) {
          color: #8E1616;
        }

        @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
          .skills-list li {
            animation-name: brighten;
            animation-fill-mode: both;
            animation-timing-function: linear;
            animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
            animation-timeline: view();
          }

          .skills-list li:first-of-type {
            --start-opacity: 1;
          }

          .skills-list li:last-of-type {
            --brightness: 1;
            --end-opacity: 1;
          }

          @keyframes brighten {
            0% {
              opacity: var(--start-opacity, 0.2);
            }
            50% {
              opacity: 1;
              filter: brightness(var(--brightness, 1.2));
            }
            100% {
              opacity: var(--end-opacity, 0.2);
            }
          }
        }

        .end-section {
          min-height: 100vh;
          display: flex;
          place-items: center;
          width: 100%;
          justify-content: center;
        }

        .end-title {
          --font-level: 6;
          --fluid-min: calc(14 * pow(1.1, 6));
          --fluid-max: calc(20 * pow(1.33, 6));
          --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (1500 - 375));
          font-size: clamp(
            calc(var(--fluid-min) / 16 * 1rem),
            calc((var(--fluid-min) / 16 * 1rem) - ((var(--fluid-preferred) * 375) / 16 * 1rem) + (var(--fluid-preferred) * 100vi)),
            calc(var(--fluid-max) / 16 * 1rem)
          );
          background: linear-gradient(#F8EEDF 50%, rgba(248, 238, 223, 0.25));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>

      <main className="portfolio-section">
        <header className="portfolio-header">
          <h1 className="portfolio-title">PORTFOLIO</h1>
        </header>
        
        <section className="content-section">
          <h2 className="sticky-text">
            <span aria-hidden="true">I can&nbsp;</span>
            <span className="sr-only">I can click pictures, capture videos, design graphics, make logos.</span>
          </h2>
          <ul className="skills-list" aria-hidden="true">
            {skills.map((skill, index) => (
              <li 
                key={skill.id} 
                style={{ '--i': index }}
                onClick={() => scrollToSection(skill.id)}
              >
                {skill.highlight}.
              </li>
            ))}
          </ul>
        </section>

        <section className="end-section">
          
        </section>
      </main>

      {/* Portfolio Sections */}
      <div className="max-w-6xl mx-auto space-y-20 px-4 md:px-8 py-20">
        {/* Pictures Section */}
        <div id="pictures" className="scroll-mt-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#8E1616" }}>
            Pictures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-lg"
                style={{ backgroundColor: "rgba(232, 201, 153, 0.2)" }}
              >
                <div className="w-full h-full flex items-center justify-center text-2xl" style={{ color: "#F8EEDF" }}>
                  Photo {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div id="videos" className="scroll-mt-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#8E1616" }}>
            Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="aspect-video rounded-lg"
                style={{ backgroundColor: "rgba(232, 201, 153, 0.2)" }}
              >
                <div className="w-full h-full flex items-center justify-center text-2xl" style={{ color: "#F8EEDF" }}>
                  Video {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graphics Section */}
        <div id="graphics" className="scroll-mt-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#8E1616" }}>
            Graphics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-lg"
                style={{ backgroundColor: "rgba(232, 201, 153, 0.2)" }}
              >
                <div className="w-full h-full flex items-center justify-center text-2xl" style={{ color: "#F8EEDF" }}>
                  Graphic {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logos Section */}
        <div id="logos" className="scroll-mt-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#8E1616" }}>
            Logos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-lg"
                style={{ backgroundColor: "rgba(232, 201, 153, 0.2)" }}
              >
                <div className="w-full h-full flex items-center justify-center text-xl" style={{ color: "#F8EEDF" }}>
                  Logo {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
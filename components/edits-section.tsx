// // "use client"

// // import { useState, useEffect } from "react"
// // import { ChevronLeft, ChevronRight } from "lucide-react"

// // const edits = [
// //   {
// //     id: 1,
// //     title: "Cinematic Travel Vlog",
// //     description: "Color grading, transitions & sound design",
// //     color: "#8E1616",
// //   },
// //   {
// //     id: 2,
// //     title: "Product Showcase",
// //     description: "Smooth zooms, dynamic cuts & effects",
// //     color: "#E8C999",
// //   },
// //   {
// //     id: 3,
// //     title: "Brand Montage",
// //     description: "Fast-paced editing with motion graphics",
// //     color: "#0000008E",
// //   },
// // ]

// // export default function EditsSection() {
// //   const [current, setCurrent] = useState(0)
// //   const [autoRotate, setAutoRotate] = useState(true)

// //   useEffect(() => {
// //     if (!autoRotate) return

// //     const timer = setInterval(() => {
// //       setCurrent((prev) => (prev + 1) % edits.length)
// //     }, 5000)

// //     return () => clearInterval(timer)
// //   }, [autoRotate])

// //   const next = () => {
// //     setCurrent((prev) => (prev + 1) % edits.length)
// //     setAutoRotate(false)
// //   }

// //   const prev = () => {
// //     setCurrent((prev) => (prev - 1 + edits.length) % edits.length)
// //     setAutoRotate(false)
// //   }

// //   return (
// //     <div className="w-full px-4 md:px-8 py-20">
// //       <h2 className="text-5xl md:text-6xl font-bold text-center mb-16" style={{ color: "#F8EEDF" }}>
// //         My
// //         <span style={{ color: "#8E1616" }}> Edits</span>
// //       </h2>

// //       <div className="max-w-5xl mx-auto">
// //         {/* Carousel Container */}
// //         <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
// //           <div className="flex h-full">
// //             {edits.map((edit, index) => (
// //               <div
// //                 key={edit.id}
// //                 className="absolute inset-0 transition-all duration-700 ease-out"
// //                 style={{
// //                   transform:
// //                     index === current
// //                       ? "rotateY(0deg) scale(1) opacity(1)"
// //                       : index < current
// //                         ? "rotateY(60deg) translateX(-100px) scale(0.8) opacity(0)"
// //                         : "rotateY(-60deg) translateX(100px) scale(0.8) opacity(0)",
// //                   perspective: "1000px",
// //                   transformStyle: "preserve-3d",
// //                 }}
// //               >
// //                 <div
// //                   className="w-full h-full flex flex-col items-center justify-center p-8 rounded-2xl text-center"
// //                   style={{
// //                     backgroundColor: edit.color,
// //                     color: edit.color === "#F8EEDF" || edit.color === "#E8C999" ? "#000000" : "#F8EEDF",
// //                   }}
// //                 >
// //                   <div className="text-4xl md:text-5xl font-bold mb-4">{edit.title}</div>
// //                   <p className="text-lg md:text-xl font-light opacity-90">{edit.description}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Controls */}
// //         <div className="flex items-center justify-center gap-6 mb-12">
// //           <button
// //             onClick={prev}
// //             className="p-3 rounded-full transition-all hover:scale-110"
// //             style={{
// //               backgroundColor: "rgba(142, 22, 22, 0.3)",
// //               color: "#8E1616",
// //               border: "2px solid #8E1616",
// //             }}
// //           >
// //             <ChevronLeft size={24} />
// //           </button>

// //           <div className="flex gap-3">
// //             {edits.map((_, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => {
// //                   setCurrent(index)
// //                   setAutoRotate(false)
// //                 }}
// //                 className="h-2 rounded-full transition-all duration-300"
// //                 style={{
// //                   width: index === current ? "32px" : "8px",
// //                   backgroundColor: index === current ? "#8E1616" : "#E8C999",
// //                 }}
// //               />
// //             ))}
// //           </div>

// //           <button
// //             onClick={next}
// //             className="p-3 rounded-full transition-all hover:scale-110"
// //             style={{
// //               backgroundColor: "rgba(142, 22, 22, 0.3)",
// //               color: "#8E1616",
// //               border: "2px solid #8E1616",
// //             }}
// //           >
// //             <ChevronRight size={24} />
// //           </button>
// //         </div>

// //         {/* View More Link */}
// //         <div className="text-center">
// //           <a
// //             href="#"
// //             className="inline-block px-6 py-3 font-medium transition-all hover:opacity-70 border-b-2"
// //             style={{
// //               color: "#E8C999",
// //               borderColor: "#E8C999",
// //             }}
// //           >
// //             View More Edits →
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// "use client"

// import { useState, useEffect } from "react"

// const skills = [
//   { text: "I can ", highlight: "click pictures", id: "pictures" },
//   { text: "I can ", highlight: "capture videos", id: "videos" },
//   { text: "I can ", highlight: "design graphics", id: "graphics" },
//   { text: "I can ", highlight: "make logos", id: "logos" },
// ]

// export default function PortfolioSection() {
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id)
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' })
//     }
//   }

//  return (
//     <div className="w-full" style={{ 
//       fontFamily: "'Geist', 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui"
//     }}>
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

//         @property --hue {
//           initial-value: 0;
//           syntax: '<number>';
//           inherits: false;
//         }
//         @property --chroma {
//           initial-value: 0;
//           syntax: '<number>';
//           inherits: true;
//         }

//         :root {
//           --start: 0;
//           --end: 360;
//           --lightness: 65%;
//           --base-chroma: 0.3;
//           --font-size-min: 14;
//           --font-size-max: 20;
//           --font-ratio-min: 1.1;
//           --font-ratio-max: 1.33;
//           --font-width-min: 375;
//           --font-width-max: 1500;
//         }

//         .portfolio-section {
//           width: 100%;
//           scroll-snap-type: y proximity;
//         }

//         .portfolio-header {
//           min-height: 40vh;
//           display: flex;
//           place-items: center;
//           width: 100%;
//           padding: 0 5rem;
//         }

//         .portfolio-title {
//           --font-level: 8;
//           --fluid-min: calc(24 * pow(1.1, 8));
//           --fluid-max: calc(20 * pow(1.33, 8));
//           --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (1500 - 375));
//           font-size: clamp(
//             calc(var(--fluid-min) / 16 * 1rem),
//             calc((var(--fluid-min) / 16 * 1rem) - ((var(--fluid-preferred) * 375) / 16 * 1rem) + (var(--fluid-preferred) * 100vi)),
//             calc(var(--fluid-max) / 16 * 1rem)
//           );
//           text-wrap: pretty;
//           line-height: 0.8;
//           margin: 0;
//           background: linear-gradient(#F8EEDF 60%, rgba(248, 238, 223, 0.5));
//           background-clip: text;
//           -webkit-background-clip: text;
//           color: transparent;
//         }

//         .content-section {
//           --font-level: 4;
//           --fluid-min: calc(14 * pow(1.1, 4));
//           --fluid-max: calc(20 * pow(1.33, 4));
//           --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (1500 - 375));
//           font-size: clamp(
//             calc(var(--fluid-min) / 16 * 1rem),
//             calc((var(--fluid-min) / 16 * 1rem) - ((var(--fluid-preferred) * 375) / 16 * 1rem) + (var(--fluid-preferred) * 100vi)),
//             calc(var(--fluid-max) / 16 * 1rem)
//           );
//           display: flex;
//           line-height: 1.25;
//           width: 100%;
//           padding-left: 5rem;
//         }

//         .sticky-text {
//           position: sticky;
//           top: calc(50% - 0.5lh);
//           font-size: inherit;
//           margin: 0;
//           display: inline-block;
//           height: fit-content;
//           font-weight: 600;
//           background: linear-gradient(#F8EEDF 50%, rgba(248, 238, 223, 0.25));
//           background-clip: text;
//           -webkit-background-clip: text;
//           color: transparent;
//         }

//         .skills-list {
//           font-weight: 600;
//           padding: 0;
//           margin: 0;
//           list-style-type: none;
//         }

//         .skills-list li {
//           opacity: 0.2;
//           scroll-snap-align: center;
//           --step: calc((360 - 0) / (4 - 1));
//           color: #8E1616;
//           cursor: pointer;
//           transition: opacity 0.3s ease;
//         }

//         .skills-list li:first-of-type {
//           opacity: 1;
//         }

//         .skills-list li:hover {
//           opacity: 1 !important;
//         }

//         .skills-list li:not(:last-of-type) {
//           color: #8E1616;
//         }

//         @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
//           .skills-list li {
//             animation-name: brighten;
//             animation-fill-mode: both;
//             animation-timing-function: linear;
//             animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
//             animation-timeline: view();
//           }

//           .skills-list li:first-of-type {
//             --start-opacity: 1;
//           }

//           .skills-list li:last-of-type {
//             --brightness: 1;
//             --end-opacity: 1;
//           }

//           @keyframes brighten {
//             0% {
//               opacity: var(--start-opacity, 0.2);
//             }
//             50% {
//               opacity: 1;
//               filter: brightness(var(--brightness, 1.2));
//             }
//             100% {
//               opacity: var(--end-opacity, 0.2);
//             }
//           }
//         }

//         .end-section {
//           min-height: 100vh;
//           display: flex;
//           place-items: center;
//           width: 100%;
//           justify-content: center;
//         }

//         .end-title {
//           --font-level: 6;
//           --fluid-min: calc(14 * pow(1.1, 6));
//           --fluid-max: calc(20 * pow(1.33, 6));
//           --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (1500 - 375));
//           font-size: clamp(
//             calc(var(--fluid-min) / 16 * 1rem),
//             calc((var(--fluid-min) / 16 * 1rem) - ((var(--fluid-preferred) * 375) / 16 * 1rem) + (var(--fluid-preferred) * 100vi)),
//             calc(var(--fluid-max) / 16 * 1rem)
//           );
//           background: linear-gradient(#F8EEDF 50%, rgba(248, 238, 223, 0.25));
//           background-clip: text;
//           -webkit-background-clip: text;
//           color: transparent;
//         }

//         .sr-only {
//           position: absolute;
//           width: 1px;
//           height: 1px;
//           padding: 0;
//           margin: -1px;
//           overflow: hidden;
//           clip: rect(0, 0, 0, 0);
//           white-space: nowrap;
//           border-width: 0;
//         }
//       `}</style>

//       <main className="portfolio-section">
//         <header className="portfolio-header">
//           <h1 className="portfolio-title">PORTFOLIO</h1>
//         </header>
        
//         <section className="content-section">
//           <h2 className="sticky-text">
//             <span aria-hidden="true">I can&nbsp;</span>
//             <span className="sr-only">I can click pictures, capture videos, design graphics, make logos.</span>
//           </h2>
//           <ul className="skills-list" aria-hidden="true">
//             {skills.map((skill, index) => (
//               <li 
//                 key={skill.id} 
//                 style={{ '--i': index }}
//                 onClick={() => scrollToSection(skill.id)}
//               >
//                 {skill.highlight}.
//               </li>
//             ))}
//           </ul>
//         </section>

//         <section className="end-section">
          
//         </section>
//       </main>

//       {/* Portfolio Sections */}
//       <div className="max-w-6xl mx-auto space-y-20 px-4 md:px-8 py-20">
//         {/* Pictures Section */}
//         <div id="pictures" className="scroll-mt-20">
//           <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#8E1616" }}>
//             Pictures
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="aspect-square rounded-lg"
//                 style={{ backgroundColor: "rgba(232, 201, 153, 0.2)" }}
//               >
//                 <div className="w-full h-full flex items-center justify-center text-2xl" style={{ color: "#F8EEDF" }}>
//                   Photo {item}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Videos Section */}
//         <div id="videos" className="scroll-mt-20">
//           <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#8E1616" }}>
//             Videos
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[1, 2].map((item) => (
//               <div
//                 key={item}
//                 className="aspect-video rounded-lg"
//                 style={{ backgroundColor: "rgba(232, 201, 153, 0.2)" }}
//               >
//                 <div className="w-full h-full flex items-center justify-center text-2xl" style={{ color: "#F8EEDF" }}>
//                   Video {item}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Graphics Section */}
//         <div id="graphics" className="scroll-mt-20">
//           <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#8E1616" }}>
//             Graphics
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="aspect-square rounded-lg"
//                 style={{ backgroundColor: "rgba(232, 201, 153, 0.2)" }}
//               >
//                 <div className="w-full h-full flex items-center justify-center text-2xl" style={{ color: "#F8EEDF" }}>
//                   Graphic {item}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Logos Section */}
//         <div id="logos" className="scroll-mt-20">
//           <h3 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#8E1616" }}>
//             Logos
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="aspect-square rounded-lg"
//                 style={{ backgroundColor: "rgba(232, 201, 153, 0.2)" }}
//               >
//                 <div className="w-full h-full flex items-center justify-center text-xl" style={{ color: "#F8EEDF" }}>
//                   Logo {item}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"

const skills = [
  { text: "I can ", highlight: "click pictures", id: "pictures" },
  { text: "I can ", highlight: "capture videos", id: "videos" },
  { text: "I can ", highlight: "design graphics", id: "graphics" },
  { text: "I can ", highlight: "make logos", id: "logos" },
]

export default function PortfolioSection() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const initRef = useRef(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initAll = async () => {
      if (initRef.current) return;
      
      try {
        if (!window.gsap) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js');
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
        initRef.current = true;
        setScriptsLoaded(true);
        
        setTimeout(() => {
          initPhotosAnimation();
          initVideosAnimation();
          initGraphicsAnimation();
          initLogosAnimation();
        }, 300);
      } catch (error) {
        console.error('Error loading GSAP scripts:', error);
      }
    };

    initAll();
  }, []);

  const initPhotosAnimation = () => {
    const gsap = window.gsap;
    const Draggable = window.Draggable;
    
    if (!gsap || !Draggable) return;

    gsap.registerPlugin(Draggable);

    const carousel = document.querySelector('.photos-carousel');
    if (!carousel) return;

    const cards = gsap.utils.toArray('.photo-card');
    const seamlessLoop = buildSeamlessLoop(cards, 0.5);
    
    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    
    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: "power3",
      paused: true
    });
    
    let trigger;
    let lastSnap = 0;
    
    function buildSeamlessLoop(items, spacing) {
      const overlap = Math.ceil(1 / spacing);
      const startTime = items.length * spacing + 0.5;
      const loopTime = (items.length + overlap) * spacing + 1;
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        }
      });
      const l = items.length + overlap * 2;
      let time = 0;
      let i, index, item;

      gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

      for (i = 0; i < l; i++) {
        index = i % items.length;
        item = items[index];
        time = i * spacing;
        rawSequence
          .fromTo(item, { scale: 0, opacity: 0 }, {
            scale: 1,
            opacity: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false
          }, time)
          .fromTo(item, { xPercent: 400 }, {
            xPercent: -400,
            duration: 1,
            ease: "none",
            immediateRender: false
          }, time);
        i <= items.length && seamlessLoop.add("label" + i, time);
      }

      rawSequence.time(startTime);
      seamlessLoop.to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: "none"
      }).fromTo(rawSequence, { time: overlap * spacing + 1 }, {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none"
      });
      return seamlessLoop;
    }
    
    const snapTime = gsap.utils.snap(0.5);
    
    trigger = Draggable.create(carousel, {
      type: "x",
      trigger: carousel,
      inertia: true,
      onPress() {
        this.startOffset = scrub.vars.offset;
      },
      onDrag() {
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
        scrub.invalidate().restart();
      },
      onThrowUpdate() {
        scrub.vars.offset += this.xChange * 0.001;
        scrub.invalidate().restart();
      }
    })[0];
  };

  const initVideosAnimation = () => {
    const gsap = window.gsap;
    const Flip = window.Flip;
    
    if (!gsap || !Flip) return;
    
    gsap.registerPlugin(Flip);

    const modal = document.querySelector('.video-modal');
    const modalContent = modal?.querySelector('.modal-content');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const boxes = Array.from(document.querySelectorAll('.video-box-container'));
    const boxesContent = Array.from(document.querySelectorAll('.video-box'));
    
    if (!modal || !modalContent || boxesContent.length === 0) return;
    
    let boxIndex = undefined;

    boxesContent.forEach((box, i) => {
      box.addEventListener("click", () => {
        if (boxIndex !== undefined) {
          const state = Flip.getState(box);
          boxes[boxIndex].appendChild(box);
          boxIndex = undefined;
          gsap.to([modal, modalOverlay], {
            autoAlpha: 0,
            ease: "power1.inOut",
            duration: 0.35
          });
          Flip.from(state, {
            duration: 0.7,
            ease: "power1.inOut",
            absolute: true,
            onComplete: () => gsap.set(box, { zIndex: "auto" })
          });
          gsap.set(box, { zIndex: 1002 });
        } else {
          const state = Flip.getState(box);
          modalContent.appendChild(box);
          boxIndex = i;
          gsap.set(modal, { autoAlpha: 1, pointerEvents: "auto" });
          Flip.from(state, {
            duration: 0.7,
            ease: "power1.inOut"
          });
          gsap.to(modalOverlay, { autoAlpha: 0.65, duration: 0.35 });
        }
      });
    });
  };

  const initGraphicsAnimation = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const BOXES = gsap.utils.toArray('.coverflow-item');
    if (!BOXES.length) return;

    gsap.set('.coverflow-item', { yPercent: -50 });

    const STAGGER = 0.1;
    const LOOP = gsap.timeline({ paused: true, repeat: -1, ease: 'none' });
    const SHIFTS = [...BOXES, ...BOXES, ...BOXES];

    SHIFTS.forEach((BOX, index) => {
      const BOX_TL = gsap.timeline()
        .set(BOX, { xPercent: 250, rotateY: -50, opacity: 0, scale: 0.5 }, 0)
        .to(BOX, { opacity: 1, scale: 1, duration: 0.1 }, 0)
        .to(BOX, { opacity: 0, scale: 0.5, duration: 0.1 }, 0.9)
        .fromTo(BOX, { xPercent: 250 }, { xPercent: -350, duration: 1, immediateRender: false, ease: 'power1.inOut' }, 0)
        .fromTo(BOX, { rotateY: -50 }, { rotateY: 50, immediateRender: false, duration: 1, ease: 'power4.inOut' }, 0)
        .to(BOX, { z: 100, scale: 1.25, duration: 0.1, repeat: 1, yoyo: true }, 0.4)
        .fromTo(BOX, { zIndex: 1 }, { zIndex: BOXES.length, repeat: 1, yoyo: true, ease: 'none', duration: 0.5, immediateRender: false }, 0);
      
      LOOP.add(BOX_TL, index * STAGGER);
    });

    const CYCLE_DURATION = STAGGER * BOXES.length;
    const START_TIME = CYCLE_DURATION + 0.5;

    const LOOP_HEAD = gsap.fromTo(LOOP, { totalTime: START_TIME }, {
      totalTime: `+=${CYCLE_DURATION}`,
      duration: 1,
      ease: 'none',
      repeat: -1,
      paused: true,
    });

    const PLAYHEAD = { position: 0 };
    const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration());

    const SCRUB = gsap.to(PLAYHEAD, {
      position: 0,
      onUpdate: () => { LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position)); },
      paused: true,
      duration: 0.25,
      ease: 'power3',
    });

    let iteration = 0;
    const graphicsContainer = document.querySelector('.graphics-coverflow');
    
    const TRIGGER = ScrollTrigger.create({
      trigger: graphicsContainer,
      start: 'top center',
      end: '+=2000',
      horizontal: false,
      pin: false,
      onUpdate: self => {
        const SCROLL = self.scroll();
        if (SCROLL > self.end - 1) {
          iteration += 1;
          TRIGGER.scroll(1);
          TRIGGER.update();
        } else if (SCROLL < 1 && self.direction < 0) {
          iteration -= 1;
          TRIGGER.scroll(self.end - 1);
          TRIGGER.update();
        } else {
          const NEW_POS = (iteration + self.progress) * LOOP_HEAD.duration();
          SCRUB.vars.position = NEW_POS;
          SCRUB.invalidate().restart();
        }
      },
    });

    gsap.set('.coverflow-item', { display: 'block' });
  };

  const initLogosAnimation = () => {
    const gsap = window.gsap;
    if (!gsap) return;

    const container = document.querySelector('.logos-carousel');
    if (!container) return;

    const items = Array.from(document.querySelectorAll('.logo-item'));
    const total = items.length;
    const innerAngle = 360 / total;
    const itemWidth = 150;
    const gap = itemWidth * 0.1;
    const radius = ((itemWidth + gap) / Math.sin((innerAngle * Math.PI) / 180)) * -1;

    items.forEach((item, index) => {
      const angle = index * innerAngle;
      gsap.set(item, {
        rotateY: angle,
        transformOrigin: 'center center',
        z: radius,
      });
    });

    gsap.to(container, {
      rotateY: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  };

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

        /* Photos Horizontal Carousel */
        .photos-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #111;
          overflow: hidden;
        }

        .photos-carousel {
          position: relative;
          width: 100%;
          height: 400px;
          cursor: grab;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .photos-carousel:active {
          cursor: grabbing;
        }

        .photo-card {
          position: absolute;
          width: 300px;
          height: 400px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          background: #222;
        }

        .photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Videos Grid Flip Animation */
        .videos-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .videos-grid {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .video-box-container {
          width: 25vw;
          height: 25vw;
          min-width: 200px;
          padding: 10px;
          border: 2px dashed rgba(232, 201, 153, 0.3);
          margin: 0.2rem;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .video-box {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          background-position: center;
          background-size: cover;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          position: relative;
          background: rgba(232, 201, 153, 0.2);
          transition: transform 0.3s ease;
        }

        .video-box:hover {
          transform: scale(0.95);
        }

        .video-modal {
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: transparent;
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .modal-content {
          height: 90vh;
          aspect-ratio: 4/5;
          position: relative;
          z-index: 1001;
          pointer-events: auto;
        }

        .modal-content .video-box {
          width: 100%;
          height: 100%;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          opacity: 0;
          z-index: 999;
        }

        /* Graphics Coverflow */
        .graphics-coverflow {
          position: relative;
          height: 500px;
          width: 100%;
          overflow: hidden;
          perspective: 800px;
          background: #0a0a0a;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coverflow-item {
          position: absolute;
          width: 200px;
          height: 300px;
          min-height: 200px;
          min-width: 200px;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(232, 201, 153, 0.1);
          display: none;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .coverflow-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Logos 3D Carousel */
        .logos-carousel-wrapper {
          position: relative;
          height: 500px;
          overflow: hidden;
          perspective: 1200px;
          display: grid;
          place-items: center;
          background: #111;
        }

        .logos-carousel {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
        }

        .logo-item {
          position: absolute;
          width: 150px;
          height: 150px;
          top: 50%;
          left: 50%;
          border-radius: 12px;
          background: rgba(232, 201, 153, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          transform: translate(-50%, -50%);
          overflow: hidden;
          border: 2px solid rgba(232, 201, 153, 0.3);
        }

        .logo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .section-title {
          color: #8E1616;
          font-weight: bold;
          margin-bottom: 2rem;
          font-size: clamp(2rem, 5vw, 3rem);
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

        <section className="end-section"></section>
      </main>

      {/* Portfolio Sections */}
      <div className="max-w-6xl mx-auto space-y-20 px-4 md:px-8 py-20">
        {/* Pictures Section - Horizontal Carousel */}
        <div id="pictures" className="scroll-mt-20">
          <h3 className="section-title text-center">Pictures</h3>
          <div className="photos-section">
            <div className="photos-carousel">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <div key={item} className="photo-card">
                  <img 
                    src={`https://assets.codepen.io/7558/bw-portrait-${String(item).padStart(3, '0')}.jpg`} 
                    alt={`Photo ${item}`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Section - Grid Flip */}
        <div id="videos" className="scroll-mt-20">
          <h3 className="section-title text-center">Videos</h3>
          <div className="videos-wrapper">
            <div className="videos-grid">
              {[14, 1, 12, 2, 4, 8].map((item, idx) => (
                <div key={idx} className="video-box-container">
                  <div
                    className="video-box"
                    style={{
                      backgroundImage: `url(https://assets.codepen.io/16327/portrait-image-${item}.jpg)`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="video-modal">
            <div className="modal-overlay"></div>
            <div className="modal-content"></div>
          </div>
        </div>

        {/* Graphics Section - Coverflow */}
        <div id="graphics" className="scroll-mt-20">
          <h3 className="section-title text-center">Graphics</h3>
          <div className="graphics-coverflow">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} className="coverflow-item">
                <img 
                  src={`https://picsum.photos/300/400?random=${item}`} 
                  alt={`Graphic ${item}`} 
                />
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-4 text-sm">Scroll to see more graphics</p>
        </div>

        {/* Logos Section - 3D Carousel */}
        <div id="logos" className="scroll-mt-20">
          <h3 className="section-title text-center">Logos</h3>
          <div className="logos-carousel-wrapper">
            <div className="logos-carousel">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => (
                <div key={item} className="logo-item">
                  <img 
                    src={`https://picsum.photos/200/200?random=${item + 20}`} 
                    alt={`Logo ${item}`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
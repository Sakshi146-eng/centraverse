'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
  { id: 0, prefix: 'Adobe', name: 'Premiere Pro' },
  { id: 1, prefix: 'Adobe', name: 'Photoshop' },
  { id: 2, prefix: 'Adobe', name: 'After Effects' },
  { id: 3, prefix: 'Adobe', name: 'Illustrator' },
  { id: 4, prefix: '', name: 'CapCut' },
];

const CARD_POSITIONS = [
  { top: "30%", left: "55%" },
  { top: "20%", left: "25%" },
  { top: "50%", left: "10%" },
  { top: "60%", left: "40%" },
  { top: "30%", left: "30%" },
  { top: "60%", left: "60%" },
  { top: "20%", left: "50%" },
  { top: "60%", left: "10%" },
  { top: "20%", left: "40%" },
  { top: "45%", left: "55%" },
];

const CARD_IMAGES = [
  "/Adobe_Premiere_Pro.svg.png",
  "/Adobe_Photoshop.png",
  "/after-effects.svg",
  "/adobe_illustrator-removebg-preview.png",
  "/capcut-logo-removebg-preview.png",
  "/Adobe_Premiere_Pro.svg.png",
  "/Adobe_Photoshop.png",
  "/after-effects.svg",
  "/adobe_illustrator-removebg-preview.png",
  "/capcut-logo-removebg-preview.png",
];

export default function ToolsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titlesRef.current) return;

    const moveDistance = window.innerWidth * (TOOLS.length - 1);

    const ctx = gsap.context(() => {
      const cards = containerRef.current!.querySelectorAll('.card');
      gsap.set(cards, {
        z: -50000,
        scale: 0,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: `+=${window.innerHeight * 5}px`,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          // Horizontal scroll the titles
          const xPosition = -moveDistance * self.progress;
          gsap.set(titlesRef.current, { x: xPosition });

          // Velocity stretch effect
          const velocity = self.getVelocity();
          const normalizedVelocity = velocity / Math.abs(velocity) || 0;
          const maxOffset = 30; // Max horizontal pixel offset for the stretch
          const currentSpeed = Math.min(Math.abs(velocity / 500), maxOffset);

          const isAtEdge = self.progress <= 0 || self.progress >= 1;

          const titleContainers = containerRef.current!.querySelectorAll('.title-container');

          titleContainers.forEach((container) => {
            const title1 = container.querySelector('.title-1');
            const title2 = container.querySelector('.title-2');
            const title3 = container.querySelector('.title-3');

            if (isAtEdge) {
              gsap.to([title1, title2], {
                xPercent: -50,
                yPercent: -50,
                x: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true,
              });
            } else {
              const baseOffset = normalizedVelocity * currentSpeed;

              gsap.to(title1, {
                xPercent: -50,
                yPercent: -50,
                x: baseOffset * 4,
                duration: 0.2,
                ease: "power1.out",
                overwrite: "auto",
              });

              gsap.to(title2, {
                xPercent: -50,
                yPercent: -50,
                x: baseOffset * 2,
                duration: 0.2,
                ease: "power1.out",
                overwrite: "auto",
              });
            }

            gsap.set(title3, {
              xPercent: -50,
              yPercent: -50,
              x: 0,
            });
          });

          // 3D Cards flying effect
          cards.forEach((card, index) => {
            const staggerOffset = index * 0.075;
            const scaledProgress = (self.progress - staggerOffset) * 3;
            const individualProgress = Math.max(0, Math.min(1, scaledProgress));
            const targetZ = index === cards.length - 1 ? 1500 : 2000;
            const newZ = -50000 + (targetZ + 50000) * individualProgress;
            const scaleProgress = Math.min(1, individualProgress * 10);
            const scale = Math.max(0, Math.min(1, scaleProgress));

            gsap.set(card, {
              z: newZ,
              scale: scale,
            });
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);



  return (
    <section ref={containerRef} className="relative w-full z-10" id="tools">
      <div className="top-0 left-0 w-full h-screen overflow-hidden flex items-center pin-tools-container relative">

        {/* 3D Flying Images Background */}
        <div
          className="images"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200vw',
            height: '200vh',
            transformStyle: 'preserve-3d',
            perspective: '2000px',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          {CARD_IMAGES.map((imgSrc, i) => (
            <div
              key={i}
              className={`card card-${i + 1}`}
              style={{
                position: 'absolute',
                width: '200px',
                height: '250px',
                borderRadius: '1.5em',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                overflow: 'hidden',
                top: CARD_POSITIONS[i % CARD_POSITIONS.length].top,
                left: CARD_POSITIONS[i % CARD_POSITIONS.length].left,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ))}
        </div>

        {/* Pinned Titles */}
        <div className="absolute top-20 left-10 md:left-20" style={{ zIndex: 50, pointerEvents: 'none' }}>
          <p className="section-label" style={{ color: '#888888' }}>video and photography</p>
          <h2 className="section-title" style={{ marginTop: '1rem', color: '#111111' }}>
            Tools
          </h2>
        </div>

        {/* Animated Words Track */}
        <div
          ref={titlesRef}
          className="absolute top-0 left-0 h-screen flex will-change-transform"
          style={{ width: `${TOOLS.length * 100}vw` }}
        >
          {TOOLS.map((tool, index) => (
            <div key={tool.id} className="relative flex-1 h-full flex justify-center items-center title-container">

              {/* Vertical separator line removed */}

              <div className="title-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap will-change-transform flex flex-col items-start justify-center mt-10 md:mt-20" style={{ zIndex: 1 }}>
                <h1 style={{ color: '#cccccc', fontFamily: "'Satoshi', system-ui, sans-serif", lineHeight: '0.9' }} className="w-full text-left">
                  <span className="block" style={{ fontWeight: 400, fontSize: 'clamp(1rem, 2.5vw, 2rem)', letterSpacing: 'normal', marginLeft: '0.12em', textTransform: 'capitalize' }}>{tool.prefix}</span>
                  <span className="block" style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 7vw, 6.5rem)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>{tool.name}</span>
                </h1>
              </div>

              <div className="title-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap will-change-transform flex flex-col items-start justify-center mt-10 md:mt-20" style={{ zIndex: 2 }}>
                <h1 style={{ color: '#ffffff', fontFamily: "'Satoshi', system-ui, sans-serif", lineHeight: '0.9' }} className="w-full text-left">
                  <span className="block" style={{ fontWeight: 400, fontSize: 'clamp(0.75rem, 2.5vw, 2rem)', letterSpacing: 'normal', marginLeft: '0.12em', textTransform: 'capitalize' }}>{tool.prefix}</span>
                  <span className="block" style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 7vw, 6.5rem)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>{tool.name}</span>
                </h1>
              </div>

              <div className="title-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap will-change-transform flex flex-col items-start justify-center mt-10 md:mt-20" style={{ zIndex: 3 }}>
                <h1 style={{ color: '#111111', fontFamily: "'Satoshi', system-ui, sans-serif", lineHeight: '0.9' }} className="w-full text-left">
                  <span className="block" style={{ color: '#888888', fontWeight: 400, fontSize: 'clamp(0.75rem, 2.5vw, 2rem)', letterSpacing: 'normal', marginLeft: '0.12em', textTransform: 'capitalize' }}>{tool.prefix}</span>
                  <span className="block" style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 7vw, 6.5rem)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>{tool.name}</span>
                </h1>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

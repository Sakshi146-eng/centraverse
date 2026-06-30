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

export default function ToolsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titlesRef.current) return;
    
    const moveDistance = window.innerWidth * (TOOLS.length - 1);

    const ctx = gsap.context(() => {
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
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Intersection Observer for Video Play/Pause
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.defaultMuted = true;
          videoRef.current.muted = true;
          videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full z-10">
      <div className="top-0 left-0 w-full h-screen overflow-hidden flex items-center pin-tools-container relative">
        
        {/* Background Video aligned slightly right */}
        <video 
          ref={videoRef}
          autoPlay
          muted 
          loop 
          playsInline 
          className="absolute top-[60%] left-[80%] w-auto min-w-[20vw] h-[40vh] -translate-x-1/2 -translate-y-1/2 object-contain grayscale z-0 pointer-events-none"
          src="/ani-Picsart-BackgroundRemover.mov"
        />

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
              
              {/* Vertical separator line */}
              {index !== TOOLS.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[40vh] mt-20 bg-black/10 z-10" />
              )}

              <div className="title-1 absolute top-1/2 left-[40%] -translate-y-1/2 whitespace-nowrap will-change-transform flex flex-col items-start justify-center leading-tight gap-4 mt-20" style={{ zIndex: 1 }}>
                <h1 style={{ color: '#cccccc', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontFamily: "'Satoshi', system-ui, sans-serif", letterSpacing: '4px' }} className="flex flex-col">
                  <span style={{ fontWeight: 300 }}>{tool.prefix}</span> 
                  <span style={{ fontWeight: 500 }}>{tool.name}</span>
                </h1>
              </div>
              
              <div className="title-2 absolute top-1/2 left-[40%] -translate-y-1/2 whitespace-nowrap will-change-transform flex flex-col items-start justify-center leading-tight gap-4 mt-20" style={{ zIndex: 2 }}>
                <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontFamily: "'Satoshi', system-ui, sans-serif", letterSpacing: '4px' }} className="flex flex-col">
                  <span style={{ fontWeight: 300 }}>{tool.prefix}</span> 
                  <span style={{ fontWeight: 500 }}>{tool.name}</span>
                </h1>
              </div>
              
              <div className="title-3 absolute top-1/2 left-[40%] -translate-y-1/2 whitespace-nowrap will-change-transform flex flex-col items-start justify-center leading-tight gap-4 mt-20" style={{ zIndex: 3 }}>
                <h1 style={{ color: '#111111', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontFamily: "'Satoshi', system-ui, sans-serif", letterSpacing: '4px' }} className="flex flex-col">
                  <span style={{ color: '#888888', fontWeight: 300 }}>{tool.prefix}</span> 
                  <span style={{ fontWeight: 500 }}>{tool.name}</span>
                </h1>
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

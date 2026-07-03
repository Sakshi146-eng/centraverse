'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoverImageDisplacement from './hover-image-displacement';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create triggers in exact DOM order to ensure pin spacing calculates correctly
      const text1 = containerRef.current!.querySelectorAll('.animate-text')[0];
      const servicesElement = containerRef.current!.querySelector('.services');
      const text2 = containerRef.current!.querySelectorAll('.animate-text')[1];

      const createTextTrigger = (textElement: Element) => {
        const textContent = textElement.textContent?.trim() || '';
        textElement.setAttribute('data-text', textContent);

        ScrollTrigger.create({
          trigger: textElement,
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: 1,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            (textElement as HTMLElement).style.setProperty('--clip-value', `${clipValue}%`);
          },
        });
      };

      if (text1) createTextTrigger(text1);

      if (servicesElement) {
        ScrollTrigger.create({
          trigger: servicesElement,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
          onUpdate: (self) => {
            const headers = servicesElement.querySelectorAll('.services-header');
            if (headers.length === 3) {
              gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
              gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
              gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
            }
          },
        });

        ScrollTrigger.create({
          trigger: servicesElement,
          start: 'top top',
          end: `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 1,
          pinSpacing: true,
          onUpdate: (self) => {
            const headers = servicesElement.querySelectorAll('.services-header');
            if (headers.length === 3) {
              if (self.progress <= 0.5) {
                const yProgress = self.progress / 0.5;
                gsap.set(headers[0], { y: `${yProgress * 100}%` });
                gsap.set(headers[2], { y: `${yProgress * -100}%` });
              } else {
                gsap.set(headers[0], { y: '100%' });
                gsap.set(headers[2], { y: '-100%' });

                const scaleProgress = (self.progress - 0.5) / 0.5;
                const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
                const scale = 1 - scaleProgress * (1 - minScale);

                headers.forEach(header => gsap.set(header, { scale }));
              }
            }
          },
        });
      }

      if (text2) createTextTrigger(text2);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full flex flex-col justify-center items-center overflow-hidden"
      style={{ backgroundColor: '#1a1a1a' }}
    >

      {/* First Paragraph */}
      <div className="w-full flex flex-col pt-[clamp(5rem,10vw,11rem)] pb-24 relative z-10">

        {/* Title & Label (Left Aligned matching Contact) */}
        <div className="w-full max-w-[1600px] mx-auto px-[clamp(1.25rem,5vw,5rem)] mb-20">
          <div className="flex items-center gap-4 mb-[clamp(3rem,6vw,8rem)]">
            <span
              className="text-[0.6rem] tracking-[0.22em] uppercase text-white/40 font-medium shrink-0"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              About
            </span>
            <div className="flex-1 h-px bg-white/20" />
          </div>
          <h2
            className="tracking-[-0.01em] leading-[0.9] uppercase"
            style={{
              color: '#f5f5f5',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 8rem)'
            }}
          >
            WHO IS SHREYAS?
          </h2>
        </div>

        {/* Image & First Paragraph Layout */}
        <div className="w-full max-w-[85vw] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16 relative z-20">

          {/* Left: WebGL Hover Photo Displacement */}
          <div className="w-full md:w-[35%] flex-shrink-0">
            <div className="w-full max-w-[350px] mx-auto md:mx-0 relative">
              <HoverImageDisplacement
                image1="/placeholder-1.jpg"
                image2="/logo3.png"
                displacementImage="/placeholder-1.jpg"
                intensity={0.6}
                image2Mode="contain"
                image2Background={[0.07, 0.07, 0.07]} // Dark background for the logo
                className="w-full aspect-[4/5] rounded-sm shadow-2xl"
              />
              <div className="mt-4 flex justify-start items-center text-white/50 text-xs uppercase tracking-widest px-2">
                <span>Hover to reveal</span>
              </div>
            </div>
          </div>

          {/* Right: First Paragraph */}
          <div className="w-full md:w-[65%] flex flex-col justify-center pt-8 md:pt-12">
            <h1
              className="animate-text font-medium leading-[1.3] tracking-[-0.02em] text-left"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.8rem)', fontFamily: 'var(--font-body, sans-serif)' }}
            >
              I'm Shreyas Shetty — founder of Centraverse, short for "Centorian Cinematic Universe". The word Centaurian comes from my sun sign Sagittarius, symbolised by the centaur: a blend of instinct, creativity, and constant pursuit of growth.
            </h1>
          </div>

        </div>
      </div>

      {/* What I Do Animation Section */}
      <div className="services relative w-full py-24 flex flex-col justify-center items-center overflow-hidden">
        <div className="services-header relative w-full px-8 bg-[#1a1a1a] will-change-transform" style={{ transform: 'translateX(100%)' }}>
          <img src="/whatido.svg" alt="What I do" className="w-full h-full object-contain" />
        </div>
        <div className="services-header relative w-full px-8 bg-[#1a1a1a] will-change-transform z-10" style={{ transform: 'translateX(-100%)' }}>
          <img src="/whatido.svg" alt="What I do" className="w-full h-full object-contain" />
        </div>
        <div className="services-header relative w-full px-8 bg-[#1a1a1a] will-change-transform" style={{ transform: 'translateX(100%)' }}>
          <img src="/whatido.svg" alt="What I do" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Second Paragraph & Meta */}
      <div className="w-full flex flex-col justify-center items-center pb-48 px-4 md:px-10" style={{ marginTop: '-40vh' }}>
        <div className="w-full max-w-[70vw] mx-auto flex flex-col gap-24">
          <h1
            className="animate-text font-medium leading-[1.3] tracking-[-0.02em] text-center"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)', fontFamily: 'var(--font-body, sans-serif)' }}
          >
            I've been capturing visuals with my iPhone and bringing them to life in CapCut. Now stepping into the Adobe ecosystem — building toward freelance projects and bigger creative goals. Every edit is a chance to grow. Every frame, a new story.
          </h1>
        </div>
      </div>

    </section>
  );
}
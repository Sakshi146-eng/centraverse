"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function SplashScreen({ onDone }: { onDone?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Loader bars fill animations (sequential loading over 6 seconds)
      gsap.from('.loader-1', {
        width: 0,
        duration: 3,
        ease: 'power2.inOut',
      })

      gsap.from('.loader-2', {
        width: 0,
        delay: 1.9,
        duration: 2,
        ease: 'power2.inOut',
      })

      gsap.from('.loader-3', {
        width: 0,
        delay: 3.9,
        duration: 2.1,
        ease: 'power2.inOut',
      })

      // 2. Loader background disappear at t=6
      gsap.to('.loader', {
        background: 'none',
        delay: 6,
        duration: 0.1,
      })

      // 3. Loader bars split and translate at t=6 to form a "C" shape
      // - loader-1 (top horizontal): shift right (+100px) and up (-75px)
      gsap.to('.loader-1', {
        x: 100,
        y: -75,
        duration: 0.5,
        delay: 6,
      })

      // - loader-2 (left vertical): rotate 90deg and shift left (-75px)
      gsap.to('.loader-2', {
        rotate: 90,
        x: -75,
        y: 0,
        duration: 0.5,
        delay: 6,
      })

      // - loader-3 (bottom horizontal): shift left (-100px) and down (+75px)
      gsap.to('.loader-3', {
        x: -100,
        y: 75,
        duration: 0.5,
        delay: 6,
      })

      // 4. Loader scale and translate exit at t=7
      gsap.to('.loader', {
        scale: 40,
        duration: 1,
        delay: 7,
        ease: 'power2.inOut',
      })

      gsap.to('.loader', {
        rotate: 45,
        y: 500,
        x: 2000,
        duration: 1,
        delay: 7,
        ease: 'power2.inOut',
      })

      // 5. Loading screen fade out at t=7.5
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        delay: 7.5,
        ease: 'power1.inOut',
        onComplete: () => {
          onDone?.()
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div ref={containerRef}>
      <style>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #f5f5f3;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
          color: #000;
          z-index: 99999;
          overflow: hidden;
          pointer-events: auto;
        }

        .loader {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 50px;
          transform: translate(-50%, -50%);
          display: flex;
          background: #e2e2e0;
        }

        .loader-1 {
          position: relative;
          background: #000000;
          width: 100px;
        }

        .loader-2 {
          position: relative;
          width: 100px;
          background: #000000;
        }

        .loader-3 {
          position: relative;
          width: 100px;
          background: #000000;
        }

        .bar {
          height: 50px;
        }
      `}</style>

      <div className="loading-screen">
        <div className="loader">
          <div className="loader-1 bar"></div>
          <div className="loader-2 bar"></div>
          <div className="loader-3 bar"></div>
        </div>
      </div>
    </div>
  )
}

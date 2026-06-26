"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface CardData {
  id: string
  title: string
  sub: string
  img: string
  bgColor: string
}

const cardList: CardData[] = [
  {
    id: "card-1",
    title: "Signal Drift",
    sub: "Quiet Control",
    img: "/card-img-1.jpg",
    bgColor: "#3d2fa9",
  },
  {
    id: "card-2",
    title: "Skyline Drift",
    sub: "Fluid Structures",
    img: "/card-img-2.jpg",
    bgColor: "#ff7722",
  },
  {
    id: "card-3",
    title: "Neural Assembly",
    sub: "Wired Thought",
    img: "/card-img-3.jpg",
    bgColor: "#ff3d33",
  },
  {
    id: "card-4",
    title: "Learning Loop",
    sub: "Silent Repetition",
    img: "/card-img-4.jpg",
    bgColor: "#785f47",
  },
]

export default function StickyCardsSection() {
  const triggerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = triggerRef.current
    const pin = pinRef.current
    if (!trigger || !pin) return

    const ctx = gsap.context(() => {
      const cards = pin.querySelectorAll(".sticky-card-item")
      const totalCards = cards.length
      const segmentSize = 1 / totalCards
      const cardYOffset = 12
      const cardScaleStep = 0.075

      // Initial setup
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + i * cardYOffset,
          scale: 1 - i * cardScaleStep,
          transformOrigin: "center bottom",
        })
      })

      ScrollTrigger.create({
        trigger: trigger,
        pin: pin,
        start: "top top",
        end: () => `+=${window.innerHeight * 8}px`,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const activeIndex = Math.min(
            Math.floor(progress / segmentSize),
            totalCards - 1
          )
          const segProgress = (progress - activeIndex * segmentSize) / segmentSize

          cards.forEach((card, i) => {
            if (i < activeIndex) {
              gsap.set(card, {
                xPercent: -50,
                yPercent: -250,
                rotationX: 35,
              })
            } else if (i === activeIndex) {
              gsap.set(card, {
                xPercent: -50,
                yPercent: gsap.utils.interpolate(-50, -250, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              })
            } else {
              const behindIndex = i - activeIndex
              const currentYOffset = (behindIndex - segProgress) * cardYOffset
              const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep

              gsap.set(card, {
                xPercent: -50,
                yPercent: -50 + currentYOffset,
                rotationX: 0,
                scale: currentScale,
              })
            }
          })
        },
      })
    }, trigger)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div ref={triggerRef} className="sticky-cards-trigger" style={{ width: "100%" }}>
      <div ref={pinRef} className="sticky-cards-section">
        {cardList.map((card, index) => (
          <div
            key={card.id}
            className="sticky-card-item"
            id={card.id}
            style={{
              backgroundColor: card.bgColor,
              zIndex: cardList.length - index + 1,
            }}
          >
            <div className="sticky-card-col">
              <p
                style={{
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {card.sub}
              </p>
              <h2
                style={{
                  textTransform: "uppercase",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 5vw, 5.5rem)",
                  fontStyle: "italic",
                  fontWeight: 900,
                  lineHeight: 0.95,
                  color: "#ffffff",
                }}
              >
                {card.title}
              </h2>
            </div>
            <div className="sticky-card-col">
              <img
                src={card.img}
                alt={card.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

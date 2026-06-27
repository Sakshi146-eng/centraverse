"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface CollectionItem {
  title: string
  img: string
}

const collection: CollectionItem[] = [
  { title: "Shadow Profile", img: "/gallery/img1.jpeg" },
  { title: "Crimson Silhouette", img: "/gallery/img2.jpeg" },
  { title: "Wavelength", img: "/gallery/img3.jpeg" },
  { title: "Noir Figure", img: "/gallery/img4.jpeg" },
  { title: "Midnight Gaze", img: "/gallery/img5.jpeg" },
  { title: "Cobalt Contrast", img: "/gallery/img6.jpeg" },
  { title: "Half-Light", img: "/gallery/img7.jpeg" },
  { title: "Scarlet Frame", img: "/gallery/img8.jpeg" },
  { title: "Pale Vision", img: "/gallery/img9.jpeg" },
  { title: "Spectral Form", img: "/gallery/img10.jpeg" },
  { title: "Monochrome Motion", img: "/gallery/img11.jpeg" },
  { title: "Platinum Edge", img: "/gallery/img12.jpeg" },
  { title: "Electric Shade", img: "/gallery/img13.jpeg" },
  { title: "Veiled Light", img: "/gallery/img14.jpeg" },
  { title: "Luminous Dark", img: "/gallery/img15.jpeg" },
  { title: "Haze Portrait", img: "/gallery/img16.jpeg" },
  { title: "Glowing Contour", img: "/gallery/img17.jpeg" },
  { title: "Dark Elegance", img: "/gallery/img18.jpeg" },
  { title: "Ruby Accent", img: "/gallery/img19.jpeg" },
  { title: "Clear Gaze", img: "/gallery/img20.jpeg" },
]

export default function CircularGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const animFrameId = useRef<number | null>(null)

  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const isPreviewActive = useRef(false)
  const isTransitioning = useRef(false)

  // Config parameters
  const config = {
    imageCount: 25,
    radius: 275,
    sensitivity: 500,
    effectFalloff: 250,
    cardMoveAmount: 50,
    lerpFactor: 0.15,
  }

  // Animation states using Refs to avoid re-renders at 60fps
  const transformState = useRef<
    {
      currentRotation: number
      targetRotation: number
      currentX: number
      targetX: number
      currentY: number
      targetY: number
      currentScale: number
      targetScale: number
      angle: number
    }[]
  >([])

  const parallaxState = useRef({
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    currentX: 0,
    currentY: 0,
    currentZ: 0,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const gallery = container.querySelector(".gallery-circle") as HTMLElement
    const galleryContainer = container.querySelector(".gallery-container") as HTMLElement
    if (!gallery || !galleryContainer) return

    const cards = container.querySelectorAll(".gallery-card")

    // Setup initial transformState once
    if (transformState.current.length === 0) {
      for (let i = 0; i < config.imageCount; i++) {
        const angle = (i / config.imageCount) * Math.PI * 2
        transformState.current.push({
          currentRotation: 0,
          targetRotation: 0,
          currentX: 0,
          targetX: 0,
          currentY: 0,
          targetY: 0,
          currentScale: 1,
          targetScale: 1,
          angle,
        })
      }
    }

    // Set initial cards state
    cards.forEach((card, i) => {
      const angle = transformState.current[i].angle
      const x = config.radius * Math.cos(angle)
      const y = config.radius * Math.sin(angle)

      gsap.set(card, {
        x,
        y,
        rotation: (angle * 180) / Math.PI + 90,
        transformPerspective: 800,
        transformOrigin: "center center",
      })
    })

    // Animation frame loop
    const animate = () => {
      if (!isPreviewActive.current && !isTransitioning.current) {
        // Lerp parallax
        parallaxState.current.currentX +=
          (parallaxState.current.targetX - parallaxState.current.currentX) * config.lerpFactor
        parallaxState.current.currentY +=
          (parallaxState.current.targetY - parallaxState.current.currentY) * config.lerpFactor
        parallaxState.current.currentZ +=
          (parallaxState.current.targetZ - parallaxState.current.currentZ) * config.lerpFactor

        gsap.set(galleryContainer, {
          rotateX: parallaxState.current.currentX,
          rotateY: parallaxState.current.currentY,
          rotation: parallaxState.current.currentZ,
          transformOrigin: "center center",
        })

        // Lerp cards
        cards.forEach((card, index) => {
          const state = transformState.current[index]

          state.currentRotation += (state.targetRotation - state.currentRotation) * config.lerpFactor
          state.currentScale += (state.targetScale - state.currentScale) * config.lerpFactor
          state.currentX += (state.targetX - state.currentX) * config.lerpFactor
          state.currentY += (state.targetY - state.currentY) * config.lerpFactor

          const x = config.radius * Math.cos(state.angle)
          const y = config.radius * Math.sin(state.angle)

          gsap.set(card, {
            x: x + state.currentX,
            y: y + state.currentY,
            rotationY: state.currentRotation,
            scale: state.currentScale,
            rotation: (state.angle * 180) / Math.PI + 90,
            transformOrigin: "center center",
            transformPerspective: 1000,
          })
        })
      }
      animFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle mouse movement for parallax & flip effects
    const handleMouseMove = (e: MouseEvent) => {
      if (isPreviewActive.current || isTransitioning.current) return
      if (window.innerWidth < 1000) return

      const rectContainer = container.getBoundingClientRect()
      const centerX = rectContainer.left + rectContainer.width / 2
      const centerY = rectContainer.top + rectContainer.height / 2
      const percentX = (e.clientX - centerX) / (window.innerWidth / 2)
      const percentY = (e.clientY - centerY) / (window.innerHeight / 2)

      parallaxState.current.targetY = percentX * 15
      parallaxState.current.targetX = -percentY * 15
      parallaxState.current.targetZ = (percentX + percentY) * 5

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < config.sensitivity) {
          const flipFactor = Math.max(0, 1 - distance / config.effectFalloff)
          const angle = transformState.current[index].angle
          const moveAmount = config.cardMoveAmount * flipFactor

          transformState.current[index].targetRotation = 180 * flipFactor
          transformState.current[index].targetScale = 1 + 0.3 * flipFactor
          transformState.current[index].targetX = moveAmount * Math.cos(angle)
          transformState.current[index].targetY = moveAmount * Math.sin(angle)
        } else {
          transformState.current[index].targetRotation = 0
          transformState.current[index].targetScale = 1
          transformState.current[index].targetX = 0
          transformState.current[index].targetY = 0
        }
      })
    }

    // Reset mouse interactive states when mouse leaves section
    const handleMouseLeave = () => {
      if (isPreviewActive.current || isTransitioning.current) return

      transformState.current.forEach((state) => {
        state.targetRotation = 0
        state.targetScale = 1
        state.targetX = 0
        state.targetY = 0
      })
      parallaxState.current.targetX = 0
      parallaxState.current.targetY = 0
      parallaxState.current.targetZ = 0
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Handle viewport resize scale
    const handleResize = () => {
      const viewportWidth = window.innerWidth
      let galleryScale = 1

      if (viewportWidth < 768) {
        galleryScale = 0.6
      } else if (viewportWidth < 1200) {
        galleryScale = 0.8
      }

      if (!isPreviewActive.current && !isTransitioning.current) {
        gsap.set(gallery, { scale: galleryScale })
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Card click toggle preview
  const handleCardClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isPreviewActive.current || isTransitioning.current) return

    isPreviewActive.current = true
    isTransitioning.current = true

    const container = containerRef.current
    const gallery = container?.querySelector(".gallery-circle") as HTMLElement
    const galleryContainer = container?.querySelector(".gallery-container") as HTMLElement
    const cards = container?.querySelectorAll(".gallery-card")
    if (!gallery || !galleryContainer || !cards) return

    const angle = transformState.current[index].angle
    const targetPosition = (Math.PI * 3) / 2
    let rotationRadians = targetPosition - angle

    if (rotationRadians > Math.PI) rotationRadians -= Math.PI * 2
    else if (rotationRadians < -Math.PI) rotationRadians += Math.PI * 2

    // Reset all card states to clean values
    transformState.current.forEach((state) => {
      state.currentRotation = state.targetRotation = 0
      state.currentScale = state.targetScale = 1
      state.currentX = state.targetX = state.currentY = state.targetY = 0
    })

    // Animate entire circle to zoom in on the chosen card
    gsap.to(gallery, {
      onStart: () => {
        cards.forEach((card, i) => {
          gsap.to(card, {
            x: config.radius * Math.cos(transformState.current[i].angle),
            y: config.radius * Math.sin(transformState.current[i].angle),
            rotationY: 0,
            scale: 1,
            duration: 1.25,
            ease: "power4.out",
          })
        })
      },
      scale: 5,
      y: 1300,
      rotation: (rotationRadians * 180) / Math.PI + 360,
      duration: 2,
      ease: "power4.inOut",
      onComplete: () => {
        isTransitioning.current = false
      },
    })

    // Reset parallax rotation
    gsap.to(parallaxState.current, {
      currentX: 0,
      currentY: 0,
      currentZ: 0,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        gsap.set(galleryContainer, {
          rotateX: parallaxState.current.currentX,
          rotateY: parallaxState.current.currentY,
          rotation: parallaxState.current.currentZ,
          transformOrigin: "center center",
        })
      },
    })

    // Trigger title reveal
    setActiveTitle(collection[index % 20].title)
  }

  // Reset zoom preview and hide title
  const handleResetGallery = () => {
    if (isTransitioning.current || !isPreviewActive.current) return

    isTransitioning.current = true

    const container = containerRef.current
    const gallery = container?.querySelector(".gallery-circle") as HTMLElement
    if (!gallery) return

    // Word reveal out
    const titleP = titleContainerRef.current?.querySelector("p")
    const words = titleP?.querySelectorAll(".gallery-word")
    if (words && words.length > 0) {
      gsap.to(words, {
        y: "-125%",
        duration: 0.75,
        stagger: 0.1,
        ease: "power4.out",
        onComplete: () => {
          setActiveTitle(null)
        },
      })
    } else {
      setActiveTitle(null)
    }

    const viewportWidth = window.innerWidth
    let galleryScale = 1
    if (viewportWidth < 768) {
      galleryScale = 0.6
    } else if (viewportWidth < 1200) {
      galleryScale = 0.8
    }

    gsap.to(gallery, {
      scale: galleryScale,
      y: 0,
      x: 0,
      rotation: 0,
      duration: 2.5,
      ease: "power4.inOut",
      onComplete: () => {
        isPreviewActive.current = false
        isTransitioning.current = false
        parallaxState.current = {
          targetX: 0,
          targetY: 0,
          targetZ: 0,
          currentX: 0,
          currentY: 0,
          currentZ: 0,
        }
      },
    })
  }

  // Effect to handle word entrance animation when activeTitle mounts
  useEffect(() => {
    if (!activeTitle) return
    const p = titleContainerRef.current?.querySelector("p")
    const words = p?.querySelectorAll(".gallery-word")
    if (!words || words.length === 0) return

    gsap.set(words, { y: "125%" })
    gsap.to(words, {
      y: "0%",
      duration: 0.75,
      delay: 1.25,
      stagger: 0.1,
      ease: "power4.out",
    })
  }, [activeTitle])

  // Reset on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPreviewActive.current && !isTransitioning.current) {
        handleResetGallery()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div
      ref={containerRef}
      className="circular-gallery-section"
      onClick={handleResetGallery}
      style={{
        cursor: isPreviewActive.current ? "zoom-out" : "default",
      }}
    >
      <div style={{ position: "absolute", top: "0rem", left: "5%", zIndex: 0, pointerEvents: "none" }}>
        <p className="section-label reveal">Gallery</p>
        <h2 className="section-title reveal reveal-delay-1" style={{ marginTop: "1rem" }}>
          Photos
        </h2>
      </div>
      <div className="gallery-container" style={{ marginBottom: "0rem" }}>
        <div className="gallery-circle" style={{ marginTop: "12rem" }}>
          {Array.from({ length: config.imageCount }).map((_, i) => {
            const item = collection[i % 20]
            return (
              <div
                key={i}
                className="gallery-card"
                data-index={i}
                onClick={(e) => handleCardClick(i, e)}
              >
                <img src={item.img} alt={item.title} />
              </div>
            )
          })}
        </div>
      </div>
      <div ref={titleContainerRef} className="gallery-title-container">
        {activeTitle && (
          <p>
            {activeTitle.split(" ").map((word, i) => (
              <span
                key={i}
                className="gallery-word-wrapper"
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                }}
              >
                <span className="gallery-word" style={{ display: "inline-block" }}>
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  )
}

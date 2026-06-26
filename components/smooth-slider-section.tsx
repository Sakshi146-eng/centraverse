"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"

interface SlideItem {
  name: string
  img: string
}

const sliderContent: SlideItem[] = [
  { name: "Serene Space", img: "/slider/img1.jpg" },
  { name: "Gentle Horizon", img: "/slider/img2.jpg" },
  { name: "Quiet Flow", img: "/slider/img3.jpg" },
  { name: "Ethereal Light", img: "/slider/img4.jpg" },
  { name: "Calm Drift", img: "/slider/img5.jpg" },
  { name: "Subtle Balance", img: "/slider/img6.jpg" },
  { name: "Soft Whisper", img: "/slider/img7.jpg" },
]

export default function SmoothSliderSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const itemsContainerRef = useRef<HTMLDivElement>(null)

  const activeSlideIndex = useRef(1)
  const isAnimating = useRef(false)
  const totalSlides = 7

  const clipPath = {
    closed: "polygon(25% 30%, 75% 30%, 75% 70%, 25% 70%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  }

  const slidePositions = {
    prev: { left: "15%", rotation: -90 },
    active: { left: "50%", rotation: 0 },
    next: { left: "85%", rotation: 90 },
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(CustomEase)
    CustomEase.create(
      "hop",
      "M0,0 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1"
    )

    const slider = sliderRef.current
    const sliderTitle = titleContainerRef.current
    const sliderCounter = counterRef.current
    const sliderItems = itemsContainerRef.current

    if (!slider || !sliderTitle || !sliderCounter || !sliderItems) return

    // Helper to split text into spans for staggered reveal
    const splitTextIntoSpans = (element: HTMLElement) => {
      element.innerHTML = element.innerText
        .split("")
        .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
        .join("")
    }

    // Helper to create and animate slide titles
    const createAndAnimateTitle = (content: SlideItem, direction: "next" | "prev") => {
      const newTitle = document.createElement("h1")
      newTitle.innerText = content.name
      sliderTitle.appendChild(newTitle)
      splitTextIntoSpans(newTitle)

      const yOffset = direction === "next" ? 80 : -80
      const spans = newTitle.querySelectorAll("span")
      gsap.set(spans, { y: yOffset })
      gsap.to(spans, {
        y: 0,
        duration: 1.25,
        stagger: 0.02,
        ease: "hop",
        delay: 0.25,
      })

      const currentTitle = sliderTitle.querySelector("h1:not(:last-child)") as HTMLElement
      if (currentTitle) {
        gsap.to(currentTitle.querySelectorAll("span"), {
          y: -yOffset,
          duration: 1.25,
          stagger: 0.02,
          ease: "hop",
          delay: 0.25,
          onComplete: () => currentTitle.remove(),
        })
      }
    }

    // Helper to create a slide container
    const createSlide = (content: SlideItem, className: string) => {
      const slide = document.createElement("div")
      slide.className = `smooth-slide-container ${className}`
      slide.innerHTML = `<div class="smooth-slide-img"><img src="${content.img}" alt="${content.name}"></div>`
      return slide
    }

    const getSlideIndex = (increment: number) => {
      return ((activeSlideIndex.current + increment - 1 + totalSlides) % totalSlides) + 1
    }

    const updateCounterAndHighlight = (index: number) => {
      sliderCounter.textContent = String(index)
      sliderItems.querySelectorAll("p").forEach((item, i) => {
        item.classList.toggle("activeItem", i === index - 1)
      })
    }



    const animateSlide = (slide: HTMLElement, props: { left: string; rotation: number; clipPath?: string }) => {
      gsap.to(slide, { ...props, duration: 2, ease: "hop" })
      const slideImg = slide.querySelector(".smooth-slide-img")
      if (slideImg) {
        gsap.to(slideImg, {
          rotation: -props.rotation,
          duration: 2,
          ease: "hop",
        })
      }
    }

    const transitionSlides = (direction: "next" | "prev") => {
      if (isAnimating.current) return
      isAnimating.current = true

      const [outgoingPos, incomingPos] =
        direction === "next" ? (["prev", "next"] as const) : (["next", "prev"] as const)

      const outgoingSlide = slider.querySelector(`.${outgoingPos}`) as HTMLElement
      const activeSlide = slider.querySelector(".active") as HTMLElement
      const incomingSlide = slider.querySelector(`.${incomingPos}`) as HTMLElement

      if (!outgoingSlide || !activeSlide || !incomingSlide) {
        isAnimating.current = false
        return
      }

      animateSlide(incomingSlide, {
        ...slidePositions.active,
        clipPath: clipPath.open,
      })
      animateSlide(activeSlide, {
        ...slidePositions[outgoingPos],
        clipPath: clipPath.closed,
      })

      gsap.to(outgoingSlide, { scale: 0, opacity: 0, duration: 2, ease: "hop" })

      const newSlideIndex = getSlideIndex(direction === "next" ? 2 : -2)
      const newSlide = createSlide(sliderContent[newSlideIndex - 1], incomingPos)
      slider.appendChild(newSlide)

      gsap.set(newSlide, {
        ...slidePositions[incomingPos],
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        clipPath: clipPath.closed,
      })

      const slideImg = newSlide.querySelector(".smooth-slide-img")
      if (slideImg) {
        gsap.set(slideImg, {
          rotation: -slidePositions[incomingPos].rotation,
        })
      }

      gsap.to(newSlide, { scale: 1, opacity: 1, duration: 2, ease: "hop" })

      const nextActiveIndex = getSlideIndex(direction === "next" ? 1 : -1)
      createAndAnimateTitle(sliderContent[nextActiveIndex - 1], direction)

      const counterTimeout = setTimeout(() => updateCounterAndHighlight(nextActiveIndex), 1000)

      const finishTimeout = setTimeout(() => {
        outgoingSlide.remove()
        activeSlide.className = `smooth-slide-container ${outgoingPos}`
        incomingSlide.className = "smooth-slide-container active"
        newSlide.className = `smooth-slide-container ${incomingPos}`
        activeSlideIndex.current = nextActiveIndex
        isAnimating.current = false
      }, 2000)

      return () => {
        clearTimeout(counterTimeout)
        clearTimeout(finishTimeout)
      }
    }

    // Click handler for slider navigation
    const handleSliderClick = (e: MouseEvent) => {
      const clickedSlide = (e.target as HTMLElement).closest(".smooth-slide-container") as HTMLElement
      if (clickedSlide && !isAnimating.current) {
        if (clickedSlide.classList.contains("next")) {
          transitionSlides("next")
        } else if (clickedSlide.classList.contains("prev")) {
          transitionSlides("prev")
        }
      }
    }

    slider.addEventListener("click", handleSliderClick)

    // Initial setup for slides
    Object.entries(slidePositions).forEach(([key, value]) => {
      const targetSel = `.smooth-slide-container.${key}`
      gsap.set(targetSel, {
        ...value,
        xPercent: -50,
        yPercent: -50,
        clipPath: key === "active" ? clipPath.open : clipPath.closed,
      })
      if (key !== "active") {
        gsap.set(`${targetSel} .smooth-slide-img`, {
          rotation: -value.rotation,
        })
      }
    })

    const initialTitle = sliderTitle.querySelector("h1") as HTMLElement
    if (initialTitle) {
      splitTextIntoSpans(initialTitle)
      gsap.fromTo(
        initialTitle.querySelectorAll("span"),
        { y: 80 },
        { y: 0, duration: 1, stagger: 0.02, ease: "hop" }
      )
    }

    updateCounterAndHighlight(activeSlideIndex.current)

    // Highlight text links click handler
    const items = sliderItems.querySelectorAll("p")
    const itemClickHandlers = Array.from(items).map((item, index) => {
      const handler = () => {
        if (index + 1 !== activeSlideIndex.current && !isAnimating.current) {
          transitionSlides(index + 1 > activeSlideIndex.current ? "next" : "prev")
        }
      }
      item.addEventListener("click", handler)
      return { item, handler }
    })

    return () => {
      slider.removeEventListener("click", handleSliderClick)
      itemClickHandlers.forEach(({ item, handler }) => {
        item.removeEventListener("click", handler)
      })
    }
  }, [clipPath, slidePositions])

  return (
    <div ref={sectionRef} className="smooth-slider-section">
      <div ref={sliderRef} className="smooth-slider">
        {/* Slide 7 (Prev) */}
        <div className="smooth-slide-container prev">
          <div className="smooth-slide-img">
            <img src={sliderContent[6].img} alt={sliderContent[6].name} />
          </div>
        </div>

        {/* Slide 1 (Active) */}
        <div className="smooth-slide-container active">
          <div className="smooth-slide-img">
            <img src={sliderContent[0].img} alt={sliderContent[0].name} />
          </div>
        </div>

        {/* Slide 2 (Next) */}
        <div className="smooth-slide-container next">
          <div className="smooth-slide-img">
            <img src={sliderContent[1].img} alt={sliderContent[1].name} />
          </div>
        </div>

        {/* Slider Title Overlay */}
        <div ref={titleContainerRef} className="smooth-slider-title">
          <h1>{sliderContent[0].name}</h1>
        </div>

        {/* Slide Counter */}
        <div className="smooth-slider-counter">
          <p>
            <span ref={counterRef}>1</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </p>
        </div>

        {/* Slide List Names */}
        <div ref={itemsContainerRef} className="smooth-slider-items">
          {sliderContent.map((item, idx) => (
            <p key={idx}>{item.name}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

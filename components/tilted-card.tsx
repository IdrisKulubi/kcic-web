"use client"

import Image, { type StaticImageData } from "next/image"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { gsap } from "gsap"

import "./tilted-card.css"

export interface TiltedCardProps {
  image: StaticImageData
  altText: string
  captionText?: string
  aspectClassName?: string
  imageClassName?: string
  sizes?: string
  rotateAmplitude?: number
  scaleOnHover?: number
  showTooltip?: boolean
  displayOverlayContent?: boolean
  overlayContent?: ReactNode
  interactive?: boolean
}

function useTiltInteraction(enabled: boolean) {
  const [canTilt, setCanTilt] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setCanTilt(false)
      return
    }

    const mq = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 1024px)"
    )
    const update = () => setCanTilt(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [enabled])

  return canTilt
}

export function TiltedCard({
  image,
  altText,
  captionText = "",
  aspectClassName = "aspect-[4/3]",
  imageClassName = "object-center",
  sizes = "(max-width: 1024px) 100vw, 28vw",
  rotateAmplitude = 7,
  scaleOnHover = 1.025,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent = null,
  interactive = true,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLSpanElement>(null)
  const canTilt = useTiltInteraction(interactive)
  const lastYRef = useRef(0)

  useEffect(() => {
    if (!canTilt || !innerRef.current) return
    gsap.set(innerRef.current, { transformPerspective: 800, transformOrigin: "center center" })
  }, [canTilt])

  function handleMouse(e: React.MouseEvent) {
    if (!canTilt || !ref.current || !innerRef.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

    gsap.to(innerRef.current, {
      rotateX: rotationX,
      rotateY: rotationY,
      scale: scaleOnHover,
      duration: 0.12,
      ease: "power2.out",
      overwrite: "auto",
    })

    if (showTooltip && captionText && captionRef.current) {
      const velocityY = offsetY - lastYRef.current
      gsap.to(captionRef.current, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        rotate: -velocityY * 0.6,
        autoAlpha: 1,
        duration: 0.1,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    lastYRef.current = offsetY
  }

  function handleMouseEnter() {
    if (!canTilt || !innerRef.current) return
    gsap.to(innerRef.current, {
      scale: scaleOnHover,
      duration: 0.25,
      ease: "power2.out",
    })
  }

  function handleMouseLeave() {
    lastYRef.current = 0
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
      })
    }
    if (captionRef.current) {
      gsap.to(captionRef.current, {
        autoAlpha: 0,
        rotate: 0,
        duration: 0.2,
        ease: "power2.out",
      })
    }
  }

  return (
    <div
      ref={ref}
      className={`tilted-card-figure ${canTilt ? "" : "tilted-card-figure--static"}`}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="tilted-card-inner">
        <div className={`tilted-card-img-wrap ${aspectClassName}`}>
          <Image
            src={image}
            alt={altText}
            fill
            sizes={sizes}
            className={imageClassName}
          />
        </div>

        {displayOverlayContent && overlayContent ? (
          <div className="tilted-card-overlay">{overlayContent}</div>
        ) : null}
      </div>

      {showTooltip && captionText && canTilt ? (
        <span
          ref={captionRef}
          className="tilted-card-caption"
          style={{ opacity: 0, visibility: "hidden" }}
          aria-hidden="true"
        >
          {captionText}
        </span>
      ) : null}
    </div>
  )
}

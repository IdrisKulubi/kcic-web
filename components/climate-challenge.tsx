"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import climateImage from "@/public/climate/image.png"

export function ClimateChallenge() {
  const section = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add(
      {
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
        reducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reducedMotion } = context.conditions ?? {}
        if (reducedMotion) return

        const timeline = gsap.timeline({
          defaults: { duration: 0.8, ease: "power3.out" },
          scrollTrigger: {
            trigger: section.current,
            start: "top 80%",
            once: true,
          },
        })

        timeline
          .from(photo.current, {
            x: desktop ? -50 : 0,
            y: desktop ? 0 : 24,
            opacity: 0,
          })
          .from(
            copy.current,
            { x: desktop ? 50 : 0, y: desktop ? 0 : 24, opacity: 0 },
            0.15
          )
      },
      section
    )

    return () => media.revert()
  }, [])

  return (
    <section
      ref={section}
      className="scroll-mt-28 overflow-clip px-5 py-20 font-sans text-[#203329] sm:px-8 sm:py-28 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-36"
      aria-labelledby="climate-challenge-title"
      id="climate-challenge"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-[clamp(2.5rem,6vw,6rem)]">
        <div
          ref={photo}
          className="overflow-hidden rounded-2xl border border-white/60 bg-white/20 shadow-[0_30px_80px_rgba(34,65,43,0.16)]"
        >
          <Image
            src={climateImage}
            alt="Floodwater surrounds homes, trees, and farmland beneath a cloudy sky"
            sizes="(min-width: 1280px) 600px, (min-width: 768px) 48vw, 100vw"
            className="aspect-[16/10] h-auto w-full object-cover object-center md:aspect-[4/3]"
          />
        </div>
        <div ref={copy}>
          <p className="mb-5 text-xs font-semibold tracking-[0.15em] text-[#467d2a] uppercase">
            The Climate Challenge
          </p>
          <h2
            id="climate-challenge-title"
            className="m-0 text-[clamp(2.25rem,4vw,4rem)] leading-[1.06] font-semibold tracking-[-0.05em] text-balance"
          >
            A changing climate.
            <br />A call for <span className="text-[#467d2a]">innovation.</span>
          </h2>
          <p className="mt-7 max-w-[48ch] text-[clamp(1rem,1.35vw,1.125rem)] leading-8 text-[#50625a]">
            Climate change puts communities, livelihoods, and climate-sensitive
            sectors under growing pressure. KCIC supports entrepreneurs
            developing practical solutions that strengthen resilience and create
            sustainable economic opportunities.
          </p>
        </div>
      </div>
    </section>
  )
}

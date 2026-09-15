"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import climateImage from "@/public/climate/image.png"

// TODO: replace with confirmed KCIC figures. Each needs a defined value, period
// and source before launch, and the placeholder note below should be deleted.
const figures = [
  {
    value: "0.0M",
    label: "People affected by climate shocks in Kenya",
    period: "Period to be confirmed",
  },
  {
    value: "00%",
    label: "Of national GDP in climate-sensitive sectors",
    period: "Period to be confirmed",
  },
  {
    value: "000+",
    label: "Enterprises supported by KCIC",
    period: "Since date to be confirmed",
  },
]

export function ClimateChallenge() {
  const section = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        if (!context.conditions?.motion) return

        gsap.fromTo(
          photo.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )

        gsap
          .timeline({
            defaults: { duration: 1, ease: "power3.out" },
            scrollTrigger: {
              trigger: section.current,
              start: "top 72%",
              once: true,
            },
          })
          .from(".js-line", { yPercent: 115, stagger: 0.09 })
          .from(".js-fade", { opacity: 0, y: 18, stagger: 0.1 }, 0.35)
      },
      section
    )

    return () => media.revert()
  }, [])

  return (
    <section
      ref={section}
      id="climate-challenge"
      aria-labelledby="climate-challenge-title"
      className="canvas-panel isolate flex min-h-[82svh] scroll-mt-24 flex-col justify-end md:min-h-[86svh]"
    >
      <div ref={photo} className="absolute inset-0 -z-20 scale-[1.14]">
        <Image
          src={climateImage}
          alt="Floodwater surrounds homes, trees, and farmland beneath a cloudy sky"
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(14,30,20,0.95)_0%,rgba(14,30,20,0.82)_28%,rgba(14,30,20,0.42)_58%,rgba(14,30,20,0.10)_82%,transparent_100%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pt-32 pb-14 sm:px-8 sm:pb-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:pb-20">
        <p className="js-fade mb-6 flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] text-[#c9dcc4] uppercase">
          
          The climate challenge
        </p>

        <h2
          id="climate-challenge-title"
          className="m-0 max-w-[18ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2.3rem,4.6vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.04em] text-[#f7fbf5]"
        >
          <span className="block overflow-hidden pb-[0.14em] mb-[-0.14em]">
            <span className="js-line block">A changing climate.</span>
          </span>
          <span className="block overflow-hidden pb-[0.14em] mb-[-0.14em]">
            <span className="js-line block">A call for innovation.</span>
          </span>
        </h2>

        <p className="js-fade mt-6 max-w-[54ch] text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.7] text-[#cfdfcb]">
          Climate change puts communities, livelihoods, and climate-sensitive
          sectors under growing pressure. KCIC supports entrepreneurs developing
          practical solutions that strengthen resilience and create sustainable
          economic opportunities.
        </p>

        <ul className="mt-12 grid list-none gap-8 border-t border-white/15 p-0 pt-8 sm:grid-cols-3 sm:gap-10">
          {figures.map((figure) => (
            <li key={figure.label} className="js-fade">
              <span className="block font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2rem,3vw,2.75rem)] leading-none font-medium tracking-[-0.03em] text-[#f7fbf5]">
                {figure.value}
              </span>
              <span className="mt-3 block max-w-[26ch] text-sm leading-6 text-[#bdd0b9]">
                {figure.label}
              </span>
              <span className="mt-1.5 block text-xs tracking-wide text-[#8fa88c]">
                {figure.period}
              </span>
            </li>
          ))}
        </ul>

        <p className="js-fade mt-6 text-xs tracking-wide text-[#8fa88c]">
          Placeholder figures, to be replaced with confirmed KCIC data and
          sources.
        </p>
      </div>
    </section>
  )
}

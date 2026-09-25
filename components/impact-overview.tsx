"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import impactMap from "@/public/impact/KCIC Map (1).png"

const TITLE_ID = "impact-overview-title"

const supportAreas = [
  "Business and technical expertise",
  "Access to finance",
  "Facilities",
  "Market intelligence",
  "Partnerships",
]

/** Decorative pulse positions (percent of atlas stage), not geographic labels */
const mapPulses = [
  { left: "18%", top: "28%" },
  { left: "52%", top: "38%" },
  { left: "68%", top: "52%" },
  { left: "42%", top: "62%" },
  { left: "78%", top: "34%" },
]

export function ImpactOverview() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        section.current?.querySelectorAll(
          ".js-atlas-window, .js-impact-map, .js-orbit, .js-pulse, .js-impact-fade"
        ) ?? [],
        { clearProps: "all" }
      )
    })

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        if (!context.conditions?.motion || !section.current) return

        gsap.set(".js-orbit", {
          strokeDasharray: 520,
          strokeDashoffset: 520,
        })

        gsap
          .timeline({
            defaults: { duration: 0.9, ease: "power3.out" },
            scrollTrigger: {
              trigger: section.current,
              start: "top 72%",
              once: true,
            },
          })
          .from(".js-atlas-window", { scale: 0.94, autoAlpha: 0, duration: 1.05 })
          .from(".js-impact-map", { y: 28, autoAlpha: 0, duration: 0.85 }, "-=0.55")
          .to(
            ".js-orbit",
            { strokeDashoffset: 0, duration: 1.15, stagger: 0.12, ease: "power2.out" },
            "-=0.45"
          )
          .from(
            ".js-pulse",
            { scale: 0, autoAlpha: 0, duration: 0.45, stagger: 0.07 },
            "-=0.65"
          )
          .from(
            ".js-impact-fade",
            { y: 22, autoAlpha: 0, duration: 0.75, stagger: 0.08 },
            0.12
          )
      },
      section
    )

    return () => media.revert()
  }, [])

  return (
    <section
      ref={section}
      id="impact-overview"
      aria-labelledby={TITLE_ID}
      className="canvas-panel relative scroll-mt-24 overflow-hidden bg-[#f4f7f2] text-[#1b241d]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full border border-[#d9e1d8] opacity-70 lg:size-[36rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 -left-16 size-56 rounded-full border border-[#7fcc2f]/25 lg:bottom-16"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20">
        <div className="max-w-[36rem]">
          <p className="js-impact-fade mb-5 flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] text-[#005a7c] uppercase">
            Our impact
          </p>
          <h2
            id={TITLE_ID}
            className="js-impact-fade m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2rem,4vw,3.35rem)] leading-[1.06] font-medium tracking-[-0.04em] text-[#315e13]"
          >
            Thirteen years of climate enterprise impact.
          </h2>
          <p className="js-impact-fade mt-6 text-[clamp(1rem,1.15vw,1.1rem)] leading-[1.7] text-[#566159]">
            Since 2012, KCIC has supported climate enterprises with business and
            technical expertise, access to finance, facilities, market
            intelligence, and partnerships. Its next strategy expands that work
            from individual ventures to stronger climate entrepreneurship
            ecosystems across Africa.
          </p>
          <p className="js-impact-fade mt-5 text-sm leading-6 text-[#566159]">
            {supportAreas.join(" · ")}
          </p>
          <Link
            href="/impact"
            prefetch={false}
            className="js-impact-fade mt-8 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#7fcc2f] bg-[#7fcc2f] px-[1.15rem] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-semibold tracking-[0.12em] text-[#1b241d] uppercase transition-colors duration-200 ease-out hover:border-[#90d44b] hover:bg-[#90d44b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]"
          >
            Explore our impact
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="js-atlas-window relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[clamp(1.25rem,3vw,2rem)] bg-[linear-gradient(145deg,#315e13_0%,#27332a_42%,#1b241d_100%)] shadow-[0_24px_56px_-20px_rgb(27_36_29/0.45)] ring-1 ring-[#7fcc2f]/20">
            <svg
              className="pointer-events-none absolute inset-0 size-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <ellipse
                className="js-orbit"
                cx="50"
                cy="48"
                rx="38"
                ry="32"
                fill="none"
                stroke="rgba(0, 173, 239, 0.35)"
                strokeWidth="0.35"
              />
              <ellipse
                className="js-orbit"
                cx="52"
                cy="50"
                rx="28"
                ry="24"
                fill="none"
                stroke="rgba(127, 204, 47, 0.45)"
                strokeWidth="0.3"
              />
              <path
                className="js-orbit"
                d="M 8 55 Q 35 20 72 42"
                fill="none"
                stroke="rgba(0, 173, 239, 0.22)"
                strokeWidth="0.35"
              />
            </svg>

            {mapPulses.map((pulse, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="js-pulse pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7fcc2f] shadow-[0_0_12px_rgba(127,204,47,0.85)]"
                style={{ left: pulse.left, top: pulse.top }}
              />
            ))}

            <div className="js-impact-map absolute inset-[8%] sm:inset-[10%]">
              <Image
                src={impactMap}
                alt="Map of Africa highlighting areas where KCIC climate enterprise work is represented"
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-contain object-center"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { impactTheory } from "@/lib/data/impact"

export function ImpactTheory() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        section.current?.querySelectorAll(".js-ribbon-station, .js-theory-fade") ??
          [],
        { clearProps: "all" }
      )
    })

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        if (!context.conditions?.motion || !section.current) return

        gsap
          .timeline({
            defaults: { duration: 0.7, ease: "power3.out" },
            scrollTrigger: {
              trigger: section.current,
              start: "top 78%",
              once: true,
            },
          })
          .from(".js-theory-fade", { y: 18, autoAlpha: 0, stagger: 0.06 })
          .from(
            ".js-ribbon-station",
            { y: 20, autoAlpha: 0, stagger: 0.1 },
            "-=0.3"
          )
      },
      section
    )

    return () => media.revert()
  }, [])

  return (
    <section
      ref={section}
      id={impactTheory.id}
      aria-labelledby="impact-theory-title"
      className="canvas-panel scroll-mt-32 overflow-hidden bg-[#eef3eb] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <p className="js-theory-fade m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
          {impactTheory.eyebrow}
        </p>
        <h2
          id="impact-theory-title"
          className="js-theory-fade mt-3 m-0 max-w-[18ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {impactTheory.heading}
        </h2>
        <p className="js-theory-fade mt-5 m-0 max-w-[58ch] text-[1.02rem] leading-[1.7] text-[#566159]">
          {impactTheory.intro}
        </p>
        <p className="js-theory-fade mt-4 m-0 max-w-[58ch] text-sm leading-6 text-[#005a7c]">
          {impactTheory.diagramNote}
        </p>

        <ol
          className="js-theory-fade mt-12 m-0 flex list-none flex-col gap-0 p-0 lg:mt-16 lg:flex-row lg:items-stretch lg:gap-0"
          aria-label="Theory of change pathway"
        >
          {impactTheory.stations.map((station, index) => (
            <li
              key={station.id}
              className="js-ribbon-station relative flex min-w-0 flex-1 flex-col border-t border-[#1b241d]/10 py-8 lg:border-t-0 lg:border-l lg:py-0 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              {index < impactTheory.stations.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-1/2 hidden size-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#7fcc2f] lg:block"
                />
              ) : null}
              <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-semibold tracking-[0.14em] text-[#7fcc2f] uppercase">
                Step {index + 1}
              </span>
              <h3 className="mt-2 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.15rem] font-medium tracking-[-0.02em] text-[#1b241d]">
                {station.title}
              </h3>
              <p className="mt-3 m-0 text-sm leading-6 text-[#566159]">
                {station.summary}
              </p>
              <ul className="mt-4 m-0 flex list-none flex-col gap-2 p-0">
                {station.bullets.map((item) => (
                  <li
                    key={item}
                    className="text-[0.88rem] leading-5 text-[#566159] before:mr-2 before:text-[#7fcc2f] before:content-['·']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

       
      </div>
    </section>
  )
}

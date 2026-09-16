"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import sideImage from "@/public/work/impact3.jpg"
import { impactOverview } from "@/lib/data/impact"

export function ImpactOverviewChapter() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        section.current?.querySelectorAll(".js-ledger-tile, .js-ledger-fade") ??
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
          .from(".js-ledger-fade", { y: 16, autoAlpha: 0, stagger: 0.05 })
          .from(
            ".js-ledger-tile",
            { y: 12, autoAlpha: 0, stagger: 0.04, duration: 0.5 },
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
      id={impactOverview.id}
      aria-labelledby="impact-overview-title"
      className="canvas-panel scroll-mt-32 overflow-hidden bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="js-ledger-fade flex max-w-3xl flex-col gap-3">
          <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
            {impactOverview.eyebrow}
          </p>
          <h2
            id="impact-overview-title"
            className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.7rem,3vw,2.45rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            {impactOverview.heading}
          </h2>
          <p className="m-0 text-sm leading-[1.65] text-[#566159]">
            {impactOverview.snapshotNote}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-[minmax(16rem,0.78fr)_minmax(0,1.22fr)] lg:items-stretch lg:gap-5">
          <figure className="js-ledger-fade relative min-h-[16rem] overflow-hidden rounded-[1.5rem] sm:min-h-[18rem] lg:min-h-0">
            <Image
              src={sideImage}
              alt="KCIC partners and climate entrepreneurs"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 32vw, 90vw"
              className="object-cover"
            />
          </figure>

          <div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-[#1b241d]/10 sm:grid-cols-3"
            role="list"
            aria-label="Impact snapshot metrics"
          >
            {impactOverview.metrics.map((metric) => (
              <div
                key={metric.id}
                role="listitem"
                className="js-ledger-tile flex flex-col justify-between gap-3 bg-[#f4f7f2] px-4 py-5 sm:px-5 sm:py-6"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium tracking-[-0.04em] text-[#315e13] tabular-nums">
                    {metric.value}
                  </span>
                  {metric.unit ? (
                    <span className="text-[0.7rem] font-medium text-[#566159]">
                      {metric.unit}
                    </span>
                  ) : null}
                </div>
                <div>
                  <p className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.9rem] leading-snug font-medium tracking-[-0.02em] text-[#1b241d]">
                    {metric.label}
                  </p>
                  <p className="mt-1.5 m-0 text-[0.72rem] leading-5 text-[#566159]">
                    {metric.definition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

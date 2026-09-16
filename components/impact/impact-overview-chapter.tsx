"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import sideImage from "@/public/work/team1.jpg"
import { impactOverview } from "@/lib/data/impact"

export function ImpactOverviewChapter() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        section.current?.querySelectorAll(".js-ledger-row, .js-ledger-fade") ?? [],
        { clearProps: "all" }
      )
    })

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        if (!context.conditions?.motion || !section.current) return

        gsap
          .timeline({
            defaults: { duration: 0.75, ease: "power3.out" },
            scrollTrigger: {
              trigger: section.current,
              start: "top 78%",
              once: true,
            },
          })
          .from(".js-ledger-fade", { y: 18, autoAlpha: 0, stagger: 0.06 })
          .from(
            ".js-ledger-row",
            { y: 14, autoAlpha: 0, stagger: 0.05, duration: 0.55 },
            "-=0.35"
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
      className="canvas-panel scroll-mt-32 overflow-hidden bg-[#f4f7f2] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.55fr)] lg:gap-16 lg:items-start">
          <div>
            <p className="js-ledger-fade m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
              {impactOverview.eyebrow}
            </p>
            <h2
              id="impact-overview-title"
              className="js-ledger-fade mt-3 m-0 max-w-[20ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
            >
              {impactOverview.heading}
            </h2>
            <p className="js-ledger-fade mt-5 m-0 max-w-[52ch] text-sm leading-[1.65] text-[#566159]">
              {impactOverview.snapshotNote}
            </p>
          </div>
          <figure className="js-ledger-fade relative aspect-[4/5] overflow-hidden rounded-[1.5rem] lg:sticky lg:top-28">
            <Image
              src={sideImage}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 28vw, 90vw"
              className="object-cover"
            />
          </figure>
        </div>

        <div
          className="mt-12 border-t border-[#1b241d]/10 lg:mt-16"
          role="list"
          aria-label="Impact snapshot metrics"
        >
          {impactOverview.metrics.map((metric) => (
            <div
              key={metric.id}
              role="listitem"
              className="js-ledger-row grid gap-3 border-b border-[#1b241d]/10 py-7 sm:grid-cols-[minmax(7rem,10rem)_minmax(0,1fr)] sm:gap-8 sm:py-8"
            >
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.35rem)] font-medium tracking-[-0.04em] text-[#315e13] tabular-nums"
                  aria-hidden="true"
                >
                  {metric.value}
                </span>
                {metric.unit ? (
                  <span className="text-sm font-medium text-[#566159]">
                    {metric.unit}
                  </span>
                ) : null}
              </div>
              <div>
                <p className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.05rem] font-medium tracking-[-0.02em] text-[#1b241d]">
                  <span className="sr-only">
                    {metric.value}
                    {metric.unit ? ` ${metric.unit}` : ""}:{" "}
                  </span>
                  {metric.label}
                </p>
                <p className="mt-1.5 m-0 text-sm leading-6 text-[#566159]">
                  {metric.definition}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

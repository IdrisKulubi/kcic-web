"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Briefcase,
  Eye,
  Handshake,
  Heart,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

import {
  aboutStrategy,
  aboutValues,
  aboutVisionMission,
} from "@/lib/data/about"

const valueIcons: Record<(typeof aboutValues)[number]["icon"], Icon> = {
  heart: Heart,
  lightbulb: Lightbulb,
  briefcase: Briefcase,
  users: Users,
  shield: ShieldCheck,
  handshake: Handshake,
}

export function AboutIdentity() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        if (!context.conditions?.motion) return

        gsap.from(".js-identity-reveal", {
          opacity: 0,
          y: 20,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section.current,
            start: "top 80%",
            once: true,
          },
        })
      },
      section
    )

    return () => media.revert()
  }, [])

  return (
    <section
      ref={section}
      id="identity"
      aria-labelledby="about-identity-title"
      className="canvas-panel relative scroll-mt-24 overflow-hidden bg-[#eef3eb] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] -top-[20%] size-[min(28rem,55vw)] rounded-full border border-[#7fcc2f]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[8%] bottom-[-18%] size-[min(22rem,45vw)] rounded-full border border-[#00adef]/12"
      />

      <div className="relative mx-auto max-w-7xl">
        <p className="js-identity-reveal m-0 text-center text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
          About us
        </p>
        <h2
          id="about-identity-title"
          className="js-identity-reveal mt-3 m-0 text-center font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          Our identity, vision and values
        </h2>

        <ul
          className="js-identity-reveal mt-10 flex list-none flex-wrap justify-center gap-x-4 gap-y-4 rounded-[1.5rem] bg-[#315e13] px-4 py-5 sm:gap-x-6 sm:px-8 sm:py-6"
        >
          {aboutValues.map((value) => {
            const IconComponent = valueIcons[value.icon]
            return (
              <li
                key={value.label}
                className="flex min-w-[7.5rem] flex-1 flex-col items-center gap-2 text-center sm:min-w-[6.5rem] sm:flex-none"
              >
                <IconComponent
                  className="size-6 text-[#b8e86a]"
                  weight="regular"
                  aria-hidden
                />
                <span className="text-[0.68rem] font-medium tracking-[0.08em] text-[#f7fbf5] uppercase sm:text-[0.7rem]">
                  {value.label}
                </span>
              </li>
            )
          })}
        </ul>

        <div
          className="js-identity-reveal mt-8 grid overflow-hidden rounded-[1.5rem] bg-[#f7fbf5] shadow-[inset_0_0_0_1px_rgb(217_225_216)] md:grid-cols-2"
        >
          <article className="flex flex-col gap-4 border-b border-[#d9e1d8] p-8 md:border-b-0 md:border-r">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex size-11 items-center justify-center rounded-full bg-[#e8f4dc] text-[#315e13]"
                aria-hidden
              >
                <Eye className="size-5" weight="regular" />
              </span>
              <h3 className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]">
                {aboutVisionMission.vision.title}
              </h3>
            </div>
            <p className="m-0 text-[1.05rem] leading-[1.65] text-[#566159]">
              {aboutVisionMission.vision.text}
            </p>
          </article>
          <article className="flex flex-col gap-4 p-8">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex size-11 items-center justify-center rounded-full bg-[#dff3fb] text-[#005a7c]"
                aria-hidden
              >
                <Target className="size-5" weight="regular" />
              </span>
              <h3 className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]">
                {aboutVisionMission.mission.title}
              </h3>
            </div>
            <p className="m-0 text-[1.05rem] leading-[1.65] text-[#566159]">
              {aboutVisionMission.mission.text}
            </p>
          </article>
        </div>

        <div className="js-identity-reveal mt-8 rounded-[1.25rem] border border-[#d9e1d8] bg-[#f7fbf5]/80 px-6 py-7 sm:px-8">
          <h3 className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.15rem] font-medium tracking-[-0.02em] text-[#1b241d]">
            {aboutStrategy.heading}
          </h3>
          <p className="mt-3 m-0 max-w-[70ch] text-sm leading-[1.7] text-[#566159]">
            {aboutStrategy.intro}
          </p>
          <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
            {aboutStrategy.barriers.map((barrier) => (
              <li
                key={barrier}
                className="rounded-full border border-[#c5d4c3] bg-[#f4f7f2] px-3.5 py-1.5 text-xs leading-snug text-[#315e13]"
              >
                {barrier}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

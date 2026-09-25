"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import climateImage from "@/public/climate/image.png"
import heroImage from "@/public/hero-desktop.webp"
import { aboutStory } from "@/lib/data/about"

export function AboutStory() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        if (!context.conditions?.motion) return

        gsap
          .timeline({
            defaults: { duration: 0.9, ease: "power3.out" },
            scrollTrigger: {
              trigger: section.current,
              start: "top 78%",
              once: true,
            },
          })
          .from(".js-about-line", { yPercent: 110, stagger: 0.08 })
          .from(
            ".js-about-fade",
            { opacity: 0, y: 16, stagger: 0.08 },
            0.25
          )
          .from(
            ".js-about-photo",
            { opacity: 0, y: 28, scale: 0.96, stagger: 0.12 },
            0.2
          )
      },
      section
    )

    return () => media.revert()
  }, [])

  return (
    <section
      ref={section}
      id="our-story"
      aria-labelledby="about-story-title"
      className="canvas-panel scroll-mt-24 bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="js-about-fade m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
            {aboutStory.title}
          </p>
          <h2
            id="about-story-title"
            className="mt-3 m-0 overflow-hidden font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            <span className="js-about-line block">Built for entrepreneurs.</span>
            <span className="js-about-line block">Rooted in community.</span>
          </h2>
          <p className="js-about-fade mt-6 m-0 max-w-[52ch] text-[1.05rem] leading-[1.75] text-[#566159]">
            {aboutStory.body}
          </p>
          <Link
            href={aboutStory.cta.href}
            prefetch={false}
            className="js-about-fade mt-8 inline-flex min-h-11 items-center gap-2 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.12em] text-[#315e13] uppercase underline-offset-4 transition-colors hover:text-[#7fcc2f] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
          >
            {aboutStory.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div
          className="relative mx-auto grid h-[min(28rem,70vw)] w-full max-w-md grid-cols-12 grid-rows-6"
        >
          <div
            className="js-about-photo relative col-span-5 col-start-1 row-span-4 row-start-2 overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-24px_rgb(27_36_29_/_0.45)]"
          >
            <Image
              src={climateImage}
              alt="Climate enterprise work in the field supported by KCIC"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 40vw, 220px"
              className="object-cover object-center"
            />
          </div>
          <div
            className="js-about-photo relative z-10 col-span-6 col-start-4 row-span-5 row-start-1 overflow-hidden rounded-[2.25rem] shadow-[0_24px_56px_-20px_rgb(27_36_29_/_0.5)]"
          >
            <Image
              src={heroImage}
              alt="Climate entrepreneurs working across agriculture, energy, and mobility"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 50vw, 260px"
              className="object-cover object-[30%_center]"
            />
          </div>
          <div
            className="js-about-photo relative col-span-5 col-start-7 row-span-3 row-start-4 overflow-hidden rounded-[1.75rem] shadow-[0_16px_40px_-20px_rgb(27_36_29_/_0.4)]"
          >
            <Image
              src={heroImage}
              alt="Community and enterprise partners collaborating with KCIC"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 38vw, 200px"
              className="object-cover object-[85%_30%]"
            />
          </div>
        </div>
      </div>
      <p className="sr-only">
        Photographs of climate enterprises, communities, and field work supported
        by KCIC.
      </p>
    </section>
  )
}

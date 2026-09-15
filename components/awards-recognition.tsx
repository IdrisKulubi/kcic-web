"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { TiltedCard } from "@/components/tilted-card"
import kepsaPhoto from "@/public/awards/kepsa.jpg"
import financierPhoto from "@/public/awards/financier.jpg"
import assekkPhoto from "@/public/awards/assekk.jpg"

const TITLE_ID = "awards-recognition-title"

const awards = [
  {
    image: kepsaPhoto,
    alt: "KCIC team receiving an award at a KEPSA SME financing event",
    title: "SME Enabler of the Year 2024/2025",
    issuer: "KEPSA",
    caption: "SME Enabler of the Year",
    aspectClassName: "aspect-[16/10]",
    imageClassName: "object-cover object-center",
    layoutClassName: "lg:translate-y-10",
  },
  {
    image: assekkPhoto,
    alt: "ASSEK Green Economy Champion of the Year trophy presented to Kenya Climate Innovation Center",
    title: "Green Economy Champion of the Year 2025",
    issuer: "ASSEK",
    caption: "Green Economy Champion",
    aspectClassName: "aspect-[3/4] lg:aspect-[4/5]",
    imageClassName: "object-cover object-center",
    layoutClassName: "lg:-mt-6",
  },
  {
    image: financierPhoto,
    alt: "KCIC representatives at the Circular Economy Awards presentation",
    title: "Circular Economy Financier of the Year",
    issuer: "CE Conference",
    caption: "Circular Economy Financier",
    aspectClassName: "aspect-[16/10]",
    imageClassName: "object-cover object-[center_35%]",
    layoutClassName: "lg:-translate-y-6",
  },
] as const

export function AwardsRecognition() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        section.current?.querySelectorAll(".js-awards-fade, .js-award-card") ??
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
            defaults: { duration: 0.85, ease: "power3.out" },
            scrollTrigger: {
              trigger: section.current,
              start: "top 75%",
              once: true,
            },
          })
          .from(".js-awards-fade", { y: 24, autoAlpha: 0, stagger: 0.08 })
          .from(
            ".js-award-card",
            {
              y: 36,
              autoAlpha: 0,
              rotation: (i) => (i === 0 ? -2 : i === 2 ? 2 : 0),
              stagger: 0.12,
              duration: 0.95,
            },
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
      id="awards-recognition"
      aria-labelledby={TITLE_ID}
      className="canvas-panel relative scroll-mt-24 overflow-hidden bg-[#7fcc2f] text-[#1b241d]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full border border-[#1b241d]/10 lg:size-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full border border-[#1b241d]/8"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-11 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-12">
        <div className="flex flex-col gap-7 lg:gap-8">
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-10 xl:gap-14">
            <header className="max-w-[22rem] shrink-0 sm:max-w-[26rem]">
              <p className="js-awards-fade mb-3 flex items-center gap-2.5 text-[0.68rem] font-medium tracking-[0.16em] text-[#1b241d]/80 uppercase">
              
                Awards & recognition
              </p>
              <h2
                id={TITLE_ID}
                className="js-awards-fade m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.65rem,2.8vw,2.35rem)] leading-[1.08] font-medium tracking-[-0.035em]"
              >
                Recognition for enabling a greener economy.
              </h2>
            </header>
            <p className="js-awards-fade m-0 max-w-[34ch] text-[0.95rem] leading-[1.55] text-[#1b241d]/85 lg:max-w-[36ch] lg:pb-0.5 lg:text-right">
              KCIC&apos;s work with climate enterprises has been acknowledged by
              partners and industry bodies for strengthening SMEs, circular
              finance, and green economy leadership.
            </p>
          </div>

          <ol className="grid list-none gap-10 p-0 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {awards.map((award) => (
            <li
              key={award.title}
              className={`js-award-card ${award.layoutClassName}`}
            >
              <figure className="m-0">
                <TiltedCard
                  image={award.image}
                  altText={award.alt}
                  captionText={award.caption}
                  aspectClassName={award.aspectClassName}
                  imageClassName={award.imageClassName}
                  sizes="(max-width: 1024px) 92vw, 28vw"
                  rotateAmplitude={7}
                  scaleOnHover={1.025}
                />
                <figcaption className="mt-4 px-0.5">
                  <p className="m-0 text-[0.72rem] font-semibold tracking-[0.14em] text-[#1b241d]/75 uppercase">
                    {award.issuer}
                  </p>
                  <p className="mt-1.5 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1rem,1.15vw,1.2rem)] leading-snug font-medium tracking-[-0.02em]">
                    {award.title}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}

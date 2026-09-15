"use client"

import { useRef } from "react"
import { MagicBento, type MagicBentoCard } from "@/components/magic-bento"

const THESIS_ID = "what-we-believe-title"

const cards: MagicBentoCard[] = [
  {
    label: "01 · Innovation",
    title: "Challenges can inspire solutions.",
    description:
      "No climate challenge is too large for determined, locally grounded innovation.",
  },
  {
    label: "02 · Enterprise",
    title: "Climate action and enterprise belong together.",
    description:
      "Climate innovation and entrepreneurship can advance resilience and economic prosperity at the same time.",
  },
  {
    label: "What we believe",
    title: "Innovation turns climate challenges into opportunity.",
    description: "",
    featured: true,
    titleId: THESIS_ID,
  },
  {
    label: "03 · SMEs",
    title: "SMEs are essential to a greener future.",
    description:
      "Climate-focused enterprises pioneer sustainable practices and bring practical solutions into communities and markets.",
  },
]

export function WhatWeBelieve() {
  const section = useRef<HTMLElement>(null)

  return (
    <section
      ref={section}
      id="what-we-believe"
      aria-labelledby={THESIS_ID}
      className="what-we-believe canvas-panel scroll-mt-24 bg-[#27332A] px-4 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <MagicBento
        sectionRef={section}
        cards={cards}
        textAutoHide={false}
        enableStars
        enableSpotlight
        enableBorderGlow
        enableTilt
        enableMagnetism
        clickEffect
        spotlightRadius={300}
        particleCount={12}
        glowColor="0, 173, 239"
      />
    </section>
  )
}

"use client"

import Link from "next/link"

import type { PartnerLogoItem } from "@/lib/types/partner-logo"

import { LogoLoop } from "@/components/logo-loop"

const TITLE_ID = "partners-logos-title"
const PANEL_COLOR = "#27332A"

interface PartnersLogosPanelProps {
  rowOne: PartnerLogoItem[]
  rowTwo: PartnerLogoItem[]
  failed: boolean
}

export function PartnersLogosPanel({
  rowOne,
  rowTwo,
  failed,
}: PartnersLogosPanelProps) {
  const hasLogos = rowOne.length > 0 || rowTwo.length > 0

  return (
    <section
      aria-labelledby={TITLE_ID}
      className="canvas-panel scroll-mt-24 overflow-hidden bg-[#27332A] py-12 sm:py-14 lg:py-16"
    >
      <header className="mx-auto max-w-2xl px-4 text-center sm:px-8 lg:px-[clamp(2rem,5vw,4.25rem)]">
        <h2
          id={TITLE_ID}
          className="text-[clamp(1.5rem,2.8vw,2rem)] font-semibold tracking-tight text-[#eef3ee]"
        >
          Our partners
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#b8c4b8] sm:text-base">
          Organizations that collaborate with KCIC to grow climate enterprise
          across Africa.
        </p>
      </header>

      {failed ? (
        <p className="mt-10 px-4 text-center text-sm leading-relaxed text-[#b8c4b8] sm:px-8">
          Partner logos could not be loaded right now.{" "}
          <Link
            href="/our-work#partners"
            className="font-medium text-[#7fcc2f] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
          >
            View partners
          </Link>
        </p>
      ) : null}

      {!failed && !hasLogos ? (
        <p className="mt-10 px-4 text-center text-sm leading-relaxed text-[#b8c4b8] sm:px-8">
          Partner logos will appear here.{" "}
          <Link
            href="/our-work#partners"
            className="font-medium text-[#7fcc2f] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
          >
            Our partners
          </Link>
        </p>
      ) : null}

      {!failed && hasLogos ? (
        <div
          className="relative mt-10 overflow-hidden sm:mt-12"
          style={{ height: 200 }}
        >
          <div className="flex h-full flex-col justify-center gap-8">
            {rowOne.length > 0 ? (
              <LogoLoop
                logos={rowOne}
                speed={80}
                direction="left"
                logoHeight={48}
                gap={40}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor={PANEL_COLOR}
                ariaLabel="Partner logos, row 1"
              />
            ) : null}
            {rowTwo.length > 0 ? (
              <LogoLoop
                logos={rowTwo}
                speed={80}
                direction="right"
                logoHeight={48}
                gap={40}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor={PANEL_COLOR}
                ariaLabel="Partner logos, row 2"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}

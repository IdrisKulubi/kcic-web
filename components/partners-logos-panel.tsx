"use client"

import Link from "next/link"

import type { PartnerLogoItem } from "@/lib/types/partner-logo"

import { LogoLoop } from "@/components/logo-loop"

const TITLE_ID = "partners-logos-title"
const EDGE_VIGNETTE = "#152019"

const LOOP_SPEED = 45
const LOGO_HEIGHT = 36
const LOGO_GAP = 48

interface PartnersLogosPanelProps {
  rowOne: PartnerLogoItem[]
  rowTwo: PartnerLogoItem[]
  failed: boolean
}

function PartnerLogoRow({
  logos,
  direction,
  ariaLabel,
}: {
  logos: PartnerLogoItem[]
  direction: "left" | "right"
  ariaLabel: string
}) {
  return (
    <div className="relative h-full w-full">
      <LogoLoop
        logos={logos}
        speed={LOOP_SPEED}
        direction={direction}
        logoHeight={LOGO_HEIGHT}
        gap={LOGO_GAP}
        hoverSpeed={0}
        fadeOut={false}
        scaleOnHover
        ariaLabel={ariaLabel}
        width="100%"
        className="h-full w-full text-[#eef3ee]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(2rem,14%,10rem)]"
        style={{
          background: `linear-gradient(to right, ${EDGE_VIGNETTE} 0%, ${EDGE_VIGNETTE}cc 35%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(2rem,14%,10rem)]"
        style={{
          background: `linear-gradient(to left, ${EDGE_VIGNETTE} 0%, ${EDGE_VIGNETTE}cc 35%, transparent 100%)`,
        }}
      />
    </div>
  )
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
            href="/our-work/partners"
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
            href="/our-work/partners"
            className="font-medium text-[#7fcc2f] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
          >
            Our partners
          </Link>
        </p>
      ) : null}

      {!failed && hasLogos ? (
        <div className="mt-10 flex w-full flex-col gap-5 sm:mt-12 sm:gap-6">
          <div className="relative h-13 sm:h-14">
            <PartnerLogoRow
              logos={rowOne}
              direction="left"
              ariaLabel="Partner logos, row 1"
            />
          </div>
          <div className="relative h-13 sm:h-14">
            <PartnerLogoRow
              logos={rowTwo}
              direction="right"
              ariaLabel="Partner logos, row 2"
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}

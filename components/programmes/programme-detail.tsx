import Link from "next/link"
import { ArrowLeft, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr"

import { RemoteThumbnail } from "@/components/remote-thumbnail"
import type { ProgrammeWithSponsors } from "@/lib/actions/programmes"
import {
  categoryLabel,
  programmeDetailCopy,
  programmesGalleryCopy,
} from "@/lib/data/programmes"
import { cn } from "@/lib/utils"

function HtmlBlock({ html, heading }: { html: string; heading: string }) {
  const trimmed = html.trim()
  if (!trimmed) return null
  return (
    <div>
      <h2
        className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]"
      >
        {heading}
      </h2>
      <div
        className="prose prose-sm mt-4 max-w-none text-[#566159] prose-headings:font-['Gotham','Century_Gothic',Arial,sans-serif] prose-headings:text-[#1b241d] prose-a:text-[#005a7c]"
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    </div>
  )
}

interface ProgrammeDetailProps {
  programme: ProgrammeWithSponsors
}

export function ProgrammeDetail({ programme }: ProgrammeDetailProps) {
  const isActive = programme.isActive
  const applyUrl = programme.applicationLink?.trim()
  const heroSrc = programme.headerImage?.trim() || programme.image

  return (
    <article className="canvas-panel scroll-mt-24 overflow-hidden bg-[#f4f7f2] p-0">
      <div className="relative aspect-[21/9] min-h-[12rem] w-full bg-[#1b241d] sm:min-h-[16rem]">
        <RemoteThumbnail
          src={heroSrc}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,30,20,0.75)_0%,rgba(14,30,20,0.2)_55%,transparent_100%)]"
        />
      </div>

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20">
        <Link
          href="/programmes"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#005a7c] underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {programmeDetailCopy.backLink}
        </Link>

        {!isActive ? (
          <p
            role="status"
            className="mt-8 rounded-[1rem] border border-[#d9e1d8] bg-[#eef3eb] px-5 py-4 text-sm leading-6 text-[#566159]"
          >
            {programmeDetailCopy.completedBanner}
          </p>
        ) : null}

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-[#e8f4dc] px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-[#315e13] uppercase">
              {categoryLabel(programme.category)}
            </span>
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
                isActive
                  ? "bg-[#e8f4dc] text-[#315e13]"
                  : "bg-[#e8ecef] text-[#566159]"
              )}
            >
              {isActive
                ? programmesGalleryCopy.openStatus
                : programmesGalleryCopy.completedStatus}
            </span>
          </div>
          <h1
            className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            {programme.title}
          </h1>
          <p className="mt-4 m-0 text-[1.05rem] leading-[1.7] text-[#566159]">
            {programme.description}
          </p>
        </header>

        {programme.introduction ? (
          <div className="mt-12">
            <HtmlBlock
              html={programme.introduction}
              heading={programmeDetailCopy.introductionHeading}
            />
          </div>
        ) : null}

        {programme.sponsors.length > 0 ? (
          <div className="mt-12">
            <h2
              className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]"
            >
              {programmeDetailCopy.sponsorsHeading}
            </h2>
            <ul className="mt-6 m-0 flex list-none flex-wrap gap-4 p-0">
              {programme.sponsors.map((sponsor) => (
                <li
                  key={sponsor.id}
                  className="flex min-h-[4.5rem] min-w-[8rem] items-center justify-center rounded-[1rem] border border-[#d9e1d8] bg-[#f7fbf5] px-4 py-3"
                >
                  <RemoteThumbnail
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-10 w-auto max-w-[7rem] object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {isActive && applyUrl ? (
          <div className="mt-12 rounded-[1.25rem] border border-[#d9e1d8] bg-[#eef3eb] px-6 py-8">
            <h2
              className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]"
            >
              {programmeDetailCopy.applyHeading}
            </h2>
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#7fcc2f] px-5 text-sm font-semibold text-[#1b241d] transition-colors hover:bg-[#90d44b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]"
            >
              {programmeDetailCopy.applyExternal}
              <ArrowSquareOut className="size-4" aria-hidden />
            </a>
          </div>
        ) : null}
      </div>
    </article>
  )
}

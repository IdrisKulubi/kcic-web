import Link from "next/link"
import { ArrowLeft, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr"

import { ProgrammeShare } from "@/components/programmes/programme-share"
import { RemoteThumbnail } from "@/components/remote-thumbnail"
import type { ProgrammeWithSponsors } from "@/lib/actions/programmes"
import {
  categoryLabel,
  getProgrammeContentSections,
  programmeDetailCopy,
  programmesGalleryCopy,
  type ProgrammeRenderedSection,
} from "@/lib/data/programmes"
import { cn } from "@/lib/utils"

function ProgrammeContents({ sections }: { sections: ProgrammeRenderedSection[] }) {
  if (sections.length === 0) return null

  return (
    <nav aria-labelledby="programme-contents-title">
      <p
        id="programme-contents-title"
        className="m-0 text-[0.68rem] font-medium tracking-[0.14em] text-[#315e13] uppercase"
      >
        {programmeDetailCopy.contentsHeading}
      </p>
      <ul className="mt-4 m-0 flex list-none flex-col gap-0 border-t border-[#d9e1d8] p-0 lg:mt-3">
        {sections.map((section) => (
          <li key={section.id} className="border-b border-[#d9e1d8]">
            <a
              href={`#${section.id}`}
              className="block py-2.5 text-sm font-medium text-[#566159] transition-colors hover:text-[#315e13] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ProgrammeContentsMobile({ sections }: { sections: ProgrammeRenderedSection[] }) {
  if (sections.length === 0) return null

  return (
    <nav
      aria-label={programmeDetailCopy.contentsHeading}
      className="flex flex-wrap gap-2 lg:hidden"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="inline-flex min-h-9 items-center rounded-full border border-[#d9e1d8] bg-[#f7fbf5] px-3.5 text-[0.72rem] font-medium tracking-[0.04em] text-[#315e13] hover:border-[#7fcc2f]/50"
        >
          {section.title}
        </a>
      ))}
    </nav>
  )
}

function HtmlSection({ section }: { section: ProgrammeRenderedSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-32 border-t border-[#d9e1d8] pt-10 first:border-t-0 first:pt-0"
      aria-labelledby={`${section.id}-title`}
    >
      <h2
        id={`${section.id}-title`}
        className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.25rem,2vw,1.5rem)] font-medium tracking-[-0.02em] text-[#1b241d]"
      >
        {section.title}
      </h2>
      <div
        className="prose prose-sm mt-5 max-w-none text-[#566159] prose-headings:font-['Gotham','Century_Gothic',Arial,sans-serif] prose-headings:text-[#1b241d] prose-a:text-[#005a7c] prose-li:marker:text-[#315e13]"
        dangerouslySetInnerHTML={{ __html: section.html }}
      />
    </section>
  )
}

function ApplyPanel({ href }: { href: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#d9e1d8] bg-[#eef3eb] px-6 py-8">
      <h2
        className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]"
      >
        {programmeDetailCopy.applyHeading}
      </h2>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#7fcc2f] px-5 text-sm font-semibold text-[#1b241d] transition-colors hover:bg-[#90d44b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]"
      >
        {programmeDetailCopy.applyExternal}
        <ArrowSquareOut className="size-4" aria-hidden />
      </a>
    </div>
  )
}

interface ProgrammeDetailProps {
  programme: ProgrammeWithSponsors
}

export function ProgrammeDetail({ programme }: ProgrammeDetailProps) {
  const isActive = programme.isActive
  const applyUrl = programme.applicationLink?.trim()
  const showApply = isActive && Boolean(applyUrl)
  const heroSrc = programme.headerImage?.trim() || programme.image
  const sections = getProgrammeContentSections(programme)

  return (
    <article className="canvas-panel scroll-mt-24 bg-[#f4f7f2] px-5 py-10 sm:px-8 sm:py-12 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/programmes"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#005a7c] underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {programmeDetailCopy.backLink}
        </Link>

        <figure className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[#1b241d] sm:aspect-[21/9]">
          <RemoteThumbnail
            src={heroSrc}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        </figure>

        {!isActive ? (
          <p
            role="status"
            className="mt-8 rounded-[1rem] border border-[#d9e1d8] bg-[#eef3eb] px-5 py-4 text-sm leading-6 text-[#566159]"
          >
            {programmeDetailCopy.completedBanner}
          </p>
        ) : null}

        <header className="mt-8 max-w-3xl">
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
            className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            {programme.title}
          </h1>
          <p className="mt-4 m-0 text-[1.05rem] leading-[1.7] text-[#566159]">
            {programme.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ProgrammeShare title={programme.title} />
            {showApply ? (
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#7fcc2f] px-5 text-[0.72rem] font-semibold tracking-[0.06em] text-[#1b241d] uppercase transition-colors hover:bg-[#90d44b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]"
              >
                {programmeDetailCopy.applyExternal}
                <ArrowSquareOut className="size-4" aria-hidden />
              </a>
            ) : null}
          </div>
        </header>

        <div className="mt-10">
          <ProgrammeContentsMobile sections={sections} />
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <aside className="hidden lg:block lg:sticky lg:top-28">
            <ProgrammeContents sections={sections} />
          </aside>

          <div className="min-w-0">
            {sections.map((section) => (
              <HtmlSection key={section.id} section={section} />
            ))}

            {programme.sponsors.length > 0 ? (
              <section
                className="mt-12 border-t border-[#d9e1d8] pt-10"
                aria-labelledby="programme-sponsors-title"
              >
                <h2
                  id="programme-sponsors-title"
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
              </section>
            ) : null}

            {showApply ? (
              <div className="mt-12">
                <ApplyPanel href={applyUrl!} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

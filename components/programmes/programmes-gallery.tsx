"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { gsap } from "gsap"

import { RemoteThumbnail } from "@/components/remote-thumbnail"
import {
  categoryLabel,
  filterProgrammesByTab,
  programmesGalleryCopy,
  programmesPageCopy,
  programmeTabFromHash,
  type ProgrammeGalleryTab,
  type ProgrammeListItem,
} from "@/lib/data/programmes"
import { cn } from "@/lib/utils"

const tabs: { id: ProgrammeGalleryTab; label: string }[] = [
  { id: "all", label: programmesGalleryCopy.tabAll },
  { id: "flagship", label: programmesGalleryCopy.tabFlagship },
  { id: "special", label: programmesGalleryCopy.tabSpecial },
  { id: "past", label: programmesGalleryCopy.tabPast },
]

function ProgrammeCard({ item }: { item: ProgrammeListItem }) {
  const showApply = item.isActive && Boolean(item.applicationLink?.trim())

  return (
    <li className="js-programme-card flex flex-col gap-2">
      <Link
        href={`/programmes/${item.slug}`}
        className="group flex flex-col gap-2 text-inherit no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#1b241d]">
          <RemoteThumbnail
            src={item.image}
            alt=""
            className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,0.03,0.26,1)] motion-safe:group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(14,30,20,0.55)_100%)]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
            <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.65rem] font-medium tracking-[0.14em] text-[#e2ede0] uppercase">
              {categoryLabel(item.category)}
            </span>
            <span
              className={cn(
                "text-[0.65rem] font-medium tracking-[0.12em] uppercase",
                item.isActive ? "text-[#7fcc2f]" : "text-[#c9dcc4]/80"
              )}
            >
              {item.isActive
                ? programmesGalleryCopy.openStatus
                : programmesGalleryCopy.completedStatus}
            </span>
          </div>
        </div>
        <div>
          <p
            className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.9rem] font-medium leading-snug tracking-[-0.01em] text-[#1b241d]"
          >
            {item.title}
          </p>
          <p className="mt-1.5 m-0 line-clamp-2 text-[0.8rem] leading-5 text-[#566159]">
            {item.excerpt}
          </p>
          {showApply ? (
            <span className="mt-2 inline-flex text-[0.72rem] font-medium tracking-[0.08em] text-[#315e13] uppercase">
              {programmesGalleryCopy.applyLabel} →
            </span>
          ) : (
            <span className="mt-2 inline-flex text-[0.72rem] font-medium tracking-[0.08em] text-[#315e13] uppercase">
              {programmesGalleryCopy.viewLabel} →
            </span>
          )}
        </div>
      </Link>
    </li>
  )
}

interface ProgrammesGalleryProps {
  items: ProgrammeListItem[]
  failed?: boolean
}

export function ProgrammesGallery({ items, failed = false }: ProgrammesGalleryProps) {
  const [activeTab, setActiveTab] = useState<ProgrammeGalleryTab>("all")

  useEffect(() => {
    const syncFromHash = () => {
      const tab = programmeTabFromHash(window.location.hash)
      if (tab) setActiveTab(tab)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [])

  const handleTabChange = (tab: ProgrammeGalleryTab) => {
    setActiveTab(tab)
    const hash = tab === "all" ? "" : `#${tab}`
    const url = `${window.location.pathname}${hash}`
    window.history.replaceState(null, "", url)
    const section = document.getElementById("programmes-gallery")
    if (section) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    }
  }

  const filtered = useMemo(
    () => filterProgrammesByTab(items, activeTab),
    [items, activeTab]
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)")
    const cards = document.querySelectorAll(".js-programme-card")
    if (!cards.length) return

    if (!media.matches) {
      gsap.set(cards, { opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      }
    )

    return () => {
      tween.kill()
    }
  }, [filtered, activeTab])

  const emptyMessage =
    activeTab === "all"
      ? programmesGalleryCopy.emptyAll
      : programmesGalleryCopy.emptyTab

  return (
    <section
      id="programmes-gallery"
      aria-labelledby="programmes-gallery-title"
      className="canvas-panel scroll-mt-32 bg-[#eef3eb] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="programmes-gallery-title"
          className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.5rem,2.8vw,2rem)] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {programmesPageCopy.galleryHeading}
        </h2>

        {failed ? (
          <p className="mt-10 text-sm leading-6 text-[#566159]">
            {programmesGalleryCopy.failed}
          </p>
        ) : (
          <>
            <div
              className="relative mt-10 flex flex-wrap gap-6 border-b border-[#d9e1d8]"
              role="tablist"
              aria-label="Programme categories"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`programmes-tab-${tab.id}`}
                    aria-controls="programmes-gallery-panel"
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "relative -mb-px border-0 bg-transparent py-2.5 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.8rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]",
                      isActive ? "text-[#1b241d]" : "text-[#8a958c] hover:text-[#315e13]"
                    )}
                  >
                    {tab.label}
                    {isActive ? (
                      <span
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-[#1b241d]"
                        aria-hidden
                      />
                    ) : null}
                  </button>
                )
              })}
            </div>

            <div
              id="programmes-gallery-panel"
              role="tabpanel"
              aria-labelledby={`programmes-tab-${activeTab}`}
              className="mt-10"
            >
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-[#566159]">{emptyMessage}</p>
              ) : (
                <ul className="m-0 grid list-none grid-cols-1 gap-x-4 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((item) => (
                    <ProgrammeCard key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

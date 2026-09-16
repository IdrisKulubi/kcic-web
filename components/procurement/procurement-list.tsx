"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { gsap } from "gsap"

import {
  procurementListCopy,
  typeLabel,
  type ProcurementListItem,
  type ProcurementTypeFilter,
} from "@/lib/data/procurement"
import type { OpportunityType } from "@/lib/actions/opportunities"
import { formatProcurementDate, formatProcurementDateTime } from "@/lib/procurement/format"
import { cn } from "@/lib/utils"

type AvailabilityTab = "open" | "archive"

const typeFilters: { id: ProcurementTypeFilter; label: string }[] = [
  { id: "all", label: procurementListCopy.typeAll },
  { id: "rfp", label: procurementListCopy.typeRfp },
  { id: "tender", label: procurementListCopy.typeTender },
  { id: "consulting", label: procurementListCopy.typeConsulting },
]

function OpportunityCard({ item, index }: { item: ProcurementListItem; index: number }) {
  const isOpen = item.status === "open"

  return (
    <li
      className="js-gallery-card flex flex-col gap-1.5"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link
        href={`/about/procurement/${item.slug}`}
        className="group flex flex-col gap-1.5 text-inherit no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1b241d]">
          <div
            className="absolute inset-0 origin-center bg-[linear-gradient(160deg,#1b241d_0%,#315e13_55%,#27332a_100%)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,0.03,0.26,1)] group-hover:scale-[1.04]"
            aria-hidden
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(127,204,47,0.22),transparent_42%)]"
          />
          <div className="relative flex h-full flex-col justify-between p-5 text-[#f7fbf5]">
            <div className="flex items-start justify-between gap-3">
              <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.68rem] font-medium tracking-[0.16em] uppercase">
                {typeLabel(item.type as OpportunityType)}
              </span>
              <span
                className={cn(
                  "text-[0.65rem] font-medium tracking-[0.12em] uppercase",
                  isOpen ? "text-[#7fcc2f]" : "text-[#c9dcc4]/70"
                )}
              >
                {isOpen
                  ? procurementListCopy.openStatus
                  : procurementListCopy.closedStatus}
              </span>
            </div>
            <div>
              {item.referenceNumber ? (
                <p className="m-0 text-[0.7rem] tracking-[0.06em] text-[#c9dcc4]">
                  {item.referenceNumber}
                </p>
              ) : null}
              <p className="mt-1 m-0 text-sm text-[#e2ede0]">
                {procurementListCopy.closesLabel}{" "}
                {item.deadline
                  ? formatProcurementDateTime(item.deadline)
                  : "—"}
              </p>
            </div>
          </div>
        </div>
        <p
          className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.82rem] font-medium leading-snug tracking-[-0.01em] text-[#1b241d]"
        >
          {item.title}
        </p>
        <p className="m-0 text-[0.75rem] leading-5 text-[#566159]">
          {procurementListCopy.issuedLabel} {formatProcurementDate(item.issuedDate)}
        </p>
      </Link>
    </li>
  )
}

interface ProcurementListProps {
  items: ProcurementListItem[]
}

export function ProcurementList({ items }: ProcurementListProps) {
  const [availability, setAvailability] = useState<AvailabilityTab>("open")
  const [typeFilter, setTypeFilter] = useState<ProcurementTypeFilter>("all")

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesAvailability =
        availability === "open" ? item.status === "open" : item.status === "closed"
      const matchesType = typeFilter === "all" ? true : item.type === typeFilter
      return matchesAvailability && matchesType
    })
  }, [items, availability, typeFilter])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)")
    const cards = document.querySelectorAll(".js-gallery-card")
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
        stagger: 0.12,
        ease: "power3.out",
      }
    )

    return () => {
      tween.kill()
    }
  }, [filtered])

  const emptyMessage =
    availability === "open"
      ? procurementListCopy.openEmpty
      : procurementListCopy.archiveEmpty

  return (
    <section
      id="procurement-opportunities"
      aria-labelledby="procurement-list-title"
      className="canvas-panel scroll-mt-24 bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="procurement-list-title"
          className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {procurementListCopy.heading}
        </h2>

        <div
          className="relative mt-10 flex flex-wrap gap-6 border-b border-[#d9e1d8]"
          role="tablist"
          aria-label="Opportunity availability"
        >
          {(
            [
              { id: "open" as const, label: procurementListCopy.openTab },
              { id: "archive" as const, label: procurementListCopy.archiveTab },
            ] as const
          ).map((tab) => {
            const isActive = availability === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setAvailability(tab.id)}
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
          className="relative mt-6 flex flex-wrap gap-5 border-b border-[#d9e1d8]"
          role="group"
          aria-label="Opportunity type"
        >
          {typeFilters.map((filter) => {
            const isActive = typeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setTypeFilter(filter.id)}
                className={cn(
                  "relative -mb-px border-0 bg-transparent py-2 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]",
                  isActive ? "text-[#1b241d]" : "text-[#8a958c] hover:text-[#315e13]"
                )}
              >
                {filter.label}
                {isActive ? (
                  <span
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-[#7fcc2f]"
                    aria-hidden
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-[#566159]">{emptyMessage}</p>
        ) : (
          <ul className="mt-10 grid list-none grid-cols-1 gap-x-4 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <OpportunityCard key={item.id} item={item} index={index} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

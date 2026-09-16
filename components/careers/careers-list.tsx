"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowSquareOut, ArrowUpRight, MapPin } from "@phosphor-icons/react"

import {
  careersListCopy,
  formatEngagement,
  type CareerListItem,
} from "@/lib/data/careers"
import { formatProcurementDateTime } from "@/lib/procurement/format"
import { cn } from "@/lib/utils"

type AvailabilityTab = "open" | "closed"

function RoleCard({ item }: { item: CareerListItem }) {
  const engagement = formatEngagement(item.employmentType, item.workMode)

  return (
    <li>
      <Link
        href={`/about/careers/${item.slug}`}
        className="group flex h-full flex-col rounded-[1.25rem] border border-[#d9e1d8] bg-[#f7fbf5] p-6 transition-colors duration-200 ease-out hover:border-[#7fcc2f]/60 hover:bg-[#fafcf8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-[#1b241d]"
            >
              {item.title}
            </h3>
            <p className="mt-1.5 m-0 text-sm text-[#566159]">{engagement}</p>
          </div>
          <span
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#d9e1d8] bg-[#f4f7f2] text-[#1b241d] transition-colors group-hover:border-[#7fcc2f] group-hover:bg-[#7fcc2f]"
            aria-hidden
          >
            <ArrowUpRight
              className="size-4 transition-transform group-hover:rotate-45"
              weight="bold"
            />
          </span>
        </div>

        <p className="mt-4 m-0 line-clamp-3 flex-1 text-sm leading-6 text-[#566159]">
          {item.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#566159]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-[#315e13]" aria-hidden />
            {item.location ?? careersListCopy.locationFallback}
          </span>
          {item.deadline ? (
            <span>
              {careersListCopy.closesLabel}{" "}
              {formatProcurementDateTime(item.deadline)}
            </span>
          ) : null}
          {item.hasExternalApply ? (
            <span className="inline-flex items-center gap-1 text-[#005a7c]">
              <ArrowSquareOut className="size-3.5" aria-hidden />
              {careersListCopy.externalApply}
            </span>
          ) : null}
        </div>
      </Link>
    </li>
  )
}

interface CareersListProps {
  items: CareerListItem[]
}

export function CareersList({ items }: CareersListProps) {
  const [availability, setAvailability] = useState<AvailabilityTab>("open")

  const filtered = useMemo(() => {
    return items.filter((item) =>
      availability === "open" ? item.status === "open" : item.status === "closed"
    )
  }, [items, availability])

  const emptyMessage =
    availability === "open"
      ? careersListCopy.openEmpty
      : careersListCopy.closedEmpty

  return (
    <section
      id="open-positions"
      aria-labelledby="careers-list-title"
      className="canvas-panel scroll-mt-24 bg-[#eef3eb] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="careers-list-title"
          className="m-0 text-center font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d] sm:text-left"
        >
          {careersListCopy.heading}
        </h2>

        <div
          className="relative mt-10 flex flex-wrap justify-center gap-6 border-b border-[#d9e1d8] sm:justify-start"
          role="tablist"
          aria-label="Role availability"
        >
          {(
            [
              { id: "open" as const, label: careersListCopy.openTab },
              { id: "closed" as const, label: careersListCopy.closedTab },
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
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-[#7fcc2f]"
                    aria-hidden
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="m-0 text-[#566159]">{emptyMessage}</p>
            {availability === "open" ? (
              <a
                href="mailto:info@kenyacic.org"
                className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-[#005a7c] underline-offset-4 hover:underline"
              >
                info@kenyacic.org
              </a>
            ) : null}
          </div>
        ) : (
          <ul className="mt-10 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
            {filtered.map((item) => (
              <RoleCard key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

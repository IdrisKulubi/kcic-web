"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { handleSamePageHashClick } from "@/components/work/work-hash-scroll"
import { impactIndex } from "@/lib/data/impact"

export function ImpactChapterNav({
  variant = "light",
}: {
  variant?: "light" | "dark" | "brand"
}) {
  const pathname = usePathname()
  const isDark = variant === "dark"
  const isBrand = variant === "brand"

  const borderClass =
    isDark ? "border-white/15" : "border-[#1b241d]/15"
  const linkClass = isDark
    ? "text-[#f4f7f2] hover:text-[#e8f4dc]"
    : "text-[#1b241d] hover:text-[#315e13]"
  const numberClass = isDark
    ? "text-[#7fcc2f]/90"
    : "text-[#315e13]"
  const arrowClass = isDark || isBrand
    ? "text-[#315e13] group-hover:text-[#1b241d]"
    : "text-[#7fcc2f]"

  return (
    <nav aria-label="Impact chapters" className="lg:pb-2">
      <ol
        className={`m-0 flex list-none flex-col gap-0 border-t p-0 ${borderClass}`}
      >
        {impactIndex.chapters.map((chapter) => (
          <li key={chapter.number} className={`border-b ${borderClass}`}>
            <Link
              href={chapter.href}
              className={`group flex min-h-14 items-baseline justify-between gap-4 py-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13] ${linkClass}`}
              onClick={(event) =>
                handleSamePageHashClick(event, chapter.href, pathname)
              }
            >
              <span
                className={`text-[0.68rem] font-medium tracking-[0.16em] uppercase ${numberClass}`}
              >
                {chapter.number}
              </span>
              <span className="flex-1 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.05rem] font-medium tracking-[-0.02em]">
                {chapter.title}
              </span>
              <span
                aria-hidden
                className={`transition-transform duration-200 group-hover:translate-x-0.5 ${arrowClass}`}
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { handleSamePageHashClick } from "@/components/work/work-hash-scroll"
import { ourWorkIndex } from "@/lib/data/our-work"

export function WorkChapterNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Our work chapters" className="lg:pb-2">
      <ol className="m-0 flex list-none flex-col gap-0 border-t border-[#1b241d]/10 p-0">
        {ourWorkIndex.chapters.map((chapter) => (
          <li key={chapter.number} className="border-b border-[#1b241d]/10">
            <Link
              href={chapter.href}
              className="group flex min-h-14 items-baseline justify-between gap-4 py-3.5 text-[#1b241d] transition-colors hover:text-[#315e13] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
              onClick={(event) =>
                handleSamePageHashClick(event, chapter.href, pathname)
              }
            >
              <span className="text-[0.68rem] font-medium tracking-[0.16em] text-[#315e13] uppercase">
                {chapter.number}
              </span>
              <span className="flex-1 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.05rem] font-medium tracking-[-0.02em]">
                {chapter.title}
              </span>
              <span
                aria-hidden
                className="text-[#315e13] transition-transform duration-200 group-hover:translate-x-0.5"
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

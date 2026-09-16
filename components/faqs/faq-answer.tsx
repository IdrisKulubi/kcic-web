import Link from "next/link"

import type { FaqAnswerSegment } from "@/lib/data/faqs"

export function FaqAnswer({ segments }: { segments: FaqAnswerSegment[] }) {
  return (
    <p className="m-0 text-[0.95rem] leading-[1.7] text-[#566159]">
      {segments.map((segment, index) => {
        if (typeof segment === "string") {
          return <span key={index}>{segment}</span>
        }
        const isExternal = segment.external ?? segment.href.startsWith("http")
        if (isExternal) {
          return (
            <a
              key={index}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#005a7c] underline decoration-[#c5d4c3] underline-offset-4 hover:decoration-[#7fcc2f]"
            >
              {segment.text}
            </a>
          )
        }
        return (
          <Link
            key={index}
            href={segment.href}
            className="font-medium text-[#315e13] underline decoration-[#c5d4c3] underline-offset-4 hover:decoration-[#7fcc2f]"
          >
            {segment.text}
          </Link>
        )
      })}
    </p>
  )
}

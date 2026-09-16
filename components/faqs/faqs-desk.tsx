"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useCallback, useEffect, useMemo, useState } from "react"

import { FaqAnswer } from "@/components/faqs/faq-answer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { handleSamePageHashClick } from "@/components/work/work-hash-scroll"
import {
  faqItemById,
  faqItems,
  faqItemsByTopic,
  faqTopics,
} from "@/lib/data/faqs"

function formatFaqNumber(index: number) {
  return String(index + 1).padStart(2, "0")
}

export function FaqsDesk() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string[]>([])

  const numberById = useMemo(() => {
    const map = new Map<string, string>()
    faqItems.forEach((item, index) => {
      map.set(item.id, formatFaqNumber(index))
    })
    return map
  }, [])

  const syncOpenFromHash = useCallback(() => {
    const id = window.location.hash.replace("#", "")
    if (!id || !faqItemById(id)) return
    setOpen((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  useEffect(() => {
    syncOpenFromHash()
    window.addEventListener("hashchange", syncOpenFromHash)
    return () => window.removeEventListener("hashchange", syncOpenFromHash)
  }, [syncOpenFromHash])

  const handleValueChange = (next: string[]) => {
    const added = next.filter((id) => !open.includes(id))
    setOpen(next)
    if (added.length === 1) {
      window.history.replaceState(null, "", `#${added[0]}`)
    }
  }

  return (
    <section
      aria-labelledby="faqs-desk-title"
      className="canvas-panel bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-16"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="faqs-desk-title" className="sr-only">
          Questions by topic
        </h2>

        <nav aria-label="FAQ topics" className="mb-10">
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {faqTopics.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/faqs#${topic.id}`}
                  className="inline-flex min-h-9 items-center rounded-full border border-[#1b241d]/12 bg-[#f4f7f2] px-3.5 py-1.5 text-[0.78rem] font-medium tracking-[0.02em] text-[#1b241d] transition-colors hover:border-[#315e13]/25 hover:bg-[#e8f4dc] hover:text-[#315e13] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315e13]"
                  onClick={(event) =>
                    handleSamePageHashClick(event, `/faqs#${topic.id}`, pathname)
                  }
                >
                  {topic.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Accordion
          multiple
          value={open}
          onValueChange={handleValueChange}
          className="border-t border-[#1b241d]/10 motion-reduce:[&_[data-slot=accordion-content]]:animate-none"
        >
          {faqTopics.map((topic) => {
            const items = faqItemsByTopic(topic.id)
            if (items.length === 0) return null

            return (
              <Fragment key={topic.id}>
                <div
                  id={topic.id}
                  className="scroll-mt-28 border-b border-[#1b241d]/10 pt-10 first:pt-0"
                  aria-labelledby={`faq-topic-${topic.id}`}
                >
                  <h3
                    id={`faq-topic-${topic.id}`}
                    className="m-0 pb-3 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.16em] text-[#315e13] uppercase"
                  >
                    {topic.label}
                  </h3>
                </div>
                {items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    id={item.id}
                    value={item.id}
                    className="scroll-mt-28 border-[#1b241d]/10"
                  >
                    <AccordionTrigger
                      className="group gap-4 py-5 text-left hover:no-underline focus-visible:ring-[#315e13]/30"
                    >
                      <span
                        aria-hidden
                        className="shrink-0 pt-0.5 text-[0.72rem] font-medium tracking-[0.14em] text-[#7fcc2f]"
                      >
                        {numberById.get(item.id)}
                      </span>
                      <span
                        className="flex-1 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.02rem] leading-snug font-medium tracking-[-0.02em] text-[#1b241d] transition-colors group-hover:text-[#315e13] group-aria-expanded:text-[#315e13]"
                      >
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-[calc(0.72rem+1.25rem+1rem)] sm:pl-[calc(2.5rem+1rem)]">
                      <FaqAnswer segments={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Fragment>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}

import Link from "next/link"

import { contactDetails } from "@/lib/data/contact"
import { faqsStillCopy } from "@/lib/data/faqs"

export function FaqsStill() {
  return (
    <section
      aria-labelledby="faqs-still-title"
      className="canvas-panel border border-[#1b241d]/10 bg-[#7fcc2f] px-5 py-12 text-[#1b241d] sm:px-8 sm:py-14 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-16"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="faqs-still-title"
            className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em]"
          >
            {faqsStillCopy.heading}
          </h2>
          <p className="mt-3 m-0 max-w-[42ch] text-[0.98rem] leading-relaxed text-[#1b241d]/85">
            {faqsStillCopy.body}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${contactDetails.email}`}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1b241d] px-5 text-[0.85rem] font-medium text-[#f4f7f2] transition-colors hover:bg-[#27332a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b241d]"
          >
            {faqsStillCopy.emailLabel}
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#1b241d]/35 bg-[#f4f7f2]/15 px-5 text-[0.85rem] font-medium text-[#1b241d] transition-colors hover:border-[#1b241d]/55 hover:bg-[#f4f7f2]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b241d]"
          >
            {faqsStillCopy.contactLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}

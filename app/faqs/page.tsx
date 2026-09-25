import type { Metadata } from "next"

import { FaqsDesk } from "@/components/faqs/faqs-desk"
import { FaqsIntro } from "@/components/faqs/faqs-intro"
import { FaqsStill } from "@/components/faqs/faqs-still"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { WorkHashScroll } from "@/components/work/work-hash-scroll"
import { buildFaqPageJsonLd, faqsMeta } from "@/lib/data/faqs"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: faqsMeta.title,
  description: faqsMeta.description,
  path: "/faqs",
})

export default function FaqsPage() {
  const jsonLd = buildFaqPageJsonLd()

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <JsonLd data={jsonLd} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(127,204,47,0.11),transparent_26%),radial-gradient(circle_at_88%_72%,rgba(0,173,239,0.08),transparent_28%)]"
      />
      <WorkHashScroll />
      <div className="relative z-10 flex flex-col gap-(--canvas-gutter) p-(--canvas-gutter)">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-col gap-(--canvas-gutter) outline-none"
        >
          <FaqsIntro />
          <FaqsDesk />
          <FaqsStill />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

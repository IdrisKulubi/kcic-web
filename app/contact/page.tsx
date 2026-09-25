import type { Metadata } from "next"

import { ContactHero } from "@/components/contact/contact-hero"
import { ContactMap } from "@/components/contact/contact-map"
import { ContactSplit } from "@/components/contact/contact-split"
import { SiteFooter } from "@/components/site-footer"
import { contactMeta } from "@/lib/data/contact"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: contactMeta.title,
  description: contactMeta.description,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(0,173,239,0.10),transparent_25%),radial-gradient(circle_at_88%_60%,rgba(127,204,47,0.12),transparent_28%)]"
      />
      <div className="relative z-10 flex flex-col gap-(--canvas-gutter) p-(--canvas-gutter)">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-col gap-(--canvas-gutter) outline-none"
        >
          <ContactHero />
          <ContactSplit />
          <ContactMap />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

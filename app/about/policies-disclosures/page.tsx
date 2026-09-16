import type { Metadata } from "next"

import { PoliciesContact } from "@/components/policy/policies-contact"
import { PoliciesHero } from "@/components/policy/policies-hero"
import { PoliciesIntro } from "@/components/policy/policies-intro"
import { PoliciesLibrary } from "@/components/policy/policies-library"
import { SiteFooter } from "@/components/site-footer"
import { policiesMeta } from "@/lib/data/policies"

export const metadata: Metadata = {
  title: `${policiesMeta.title} | KCIC`,
  description: policiesMeta.description,
}

export default function PoliciesDisclosuresPage() {
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
          <PoliciesHero />
          <PoliciesIntro />
          <PoliciesLibrary />
          <PoliciesContact />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

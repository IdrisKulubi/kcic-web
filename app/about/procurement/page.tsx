import type { Metadata } from "next"

import { ProcurementContact } from "@/components/procurement/procurement-contact"
import { ProcurementHero } from "@/components/procurement/procurement-hero"
import { ProcurementIntro } from "@/components/procurement/procurement-intro"
import { ProcurementList } from "@/components/procurement/procurement-list"
import { SiteFooter } from "@/components/site-footer"
import { listProcurementOpportunities } from "@/lib/actions/opportunities"
import { procurementMeta } from "@/lib/data/procurement"
import { toProcurementListItem } from "@/lib/procurement/serialize"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: procurementMeta.title,
  description: procurementMeta.description,
  path: "/about/procurement",
})

export default async function ProcurementPage() {
  const result = await listProcurementOpportunities()
  const items =
    result.success && result.data
      ? result.data.map(toProcurementListItem)
      : []

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
          <ProcurementHero />
          <ProcurementIntro />
          <ProcurementList items={items} />
          <ProcurementContact />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

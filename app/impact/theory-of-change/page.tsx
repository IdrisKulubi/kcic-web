import type { Metadata } from "next"

import { WorkHashRedirect } from "@/components/work/work-hash-redirect"
import { impactPageMeta } from "@/lib/data/impact"

export const metadata: Metadata = {
  title: `${impactPageMeta.theoryOfChange.title} | KCIC`,
  description: impactPageMeta.theoryOfChange.description,
}

export default function ImpactTheoryOfChangePage() {
  return (
    <WorkHashRedirect
      href="/impact#theory-of-change"
      message="Taking you to Theory of change…"
    />
  )
}

import type { Metadata } from "next"

import { WorkHashRedirect } from "@/components/work/work-hash-redirect"
import { impactPageMeta } from "@/lib/data/impact"

export const metadata: Metadata = {
  title: `${impactPageMeta.reports.title} | KCIC`,
  description: impactPageMeta.reports.description,
}

export default function ImpactReportsPage() {
  return (
    <WorkHashRedirect
      href="/impact#reports"
      message="Taking you to Impact reports…"
    />
  )
}

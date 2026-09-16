import type { Metadata } from "next"

import { WorkHashRedirect } from "@/components/work/work-hash-redirect"
import { impactPageMeta } from "@/lib/data/impact"

export const metadata: Metadata = {
  title: `${impactPageMeta.targets.title} | KCIC`,
  description: impactPageMeta.targets.description,
}

export default function ImpactTargetsPage() {
  return (
    <WorkHashRedirect
      href="/impact#targets"
      message="Taking you to Targets…"
    />
  )
}

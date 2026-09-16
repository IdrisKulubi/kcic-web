import type { Metadata } from "next"

import { ImpactIndex } from "@/components/impact/impact-index"
import { ImpactOverviewChapter } from "@/components/impact/impact-overview-chapter"
import { ImpactReports } from "@/components/impact/impact-reports"
import { ImpactShell } from "@/components/impact/impact-shell"
import { ImpactTargets } from "@/components/impact/impact-targets"
import { ImpactTheory } from "@/components/impact/impact-theory"
import { impactMeta } from "@/lib/data/impact"

export const metadata: Metadata = {
  title: `${impactMeta.title} | KCIC`,
  description: impactMeta.description,
}

export default function ImpactPage() {
  return (
    <ImpactShell>
      <ImpactIndex />
      <ImpactOverviewChapter />
      <ImpactTheory />
      <ImpactTargets />
      <ImpactReports />
    </ImpactShell>
  )
}

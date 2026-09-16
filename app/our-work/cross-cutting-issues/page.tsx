import type { Metadata } from "next"

import { WorkCrossCutting } from "@/components/work/work-cross-cutting"
import { WorkIndex } from "@/components/work/work-index"
import { WorkShell } from "@/components/work/work-shell"
import { workPageMeta } from "@/lib/data/our-work"

export const metadata: Metadata = {
  title: `${workPageMeta.crossCutting.title} | KCIC`,
  description: workPageMeta.crossCutting.description,
}

export default function CrossCuttingIssuesPage() {
  return (
    <WorkShell>
      <WorkIndex />
      <WorkCrossCutting />
    </WorkShell>
  )
}

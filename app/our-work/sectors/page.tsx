import type { Metadata } from "next"

import { WorkIndex } from "@/components/work/work-index"
import { WorkSectors } from "@/components/work/work-sectors"
import { WorkShell } from "@/components/work/work-shell"
import { workPageMeta } from "@/lib/data/our-work"

export const metadata: Metadata = {
  title: `${workPageMeta.sectors.title} | KCIC`,
  description: workPageMeta.sectors.description,
}

export default function KeySectorsPage() {
  return (
    <WorkShell>
      <WorkIndex />
      <WorkSectors />
    </WorkShell>
  )
}

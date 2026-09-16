import type { Metadata } from "next"

import { WorkIndex } from "@/components/work/work-index"
import { WorkPartners } from "@/components/work/work-partners"
import { WorkShell } from "@/components/work/work-shell"
import { fetchAllPartners } from "@/lib/data/partners"
import { workPageMeta } from "@/lib/data/our-work"

export const metadata: Metadata = {
  title: `${workPageMeta.partners.title} | KCIC`,
  description: workPageMeta.partners.description,
}

export default async function OurPartnersPage() {
  let partners = [] as Awaited<ReturnType<typeof fetchAllPartners>>
  let failed = false

  try {
    partners = await fetchAllPartners()
  } catch (error) {
    console.error("Error fetching partners:", error)
    failed = true
  }

  return (
    <WorkShell>
      <WorkIndex />
      <WorkPartners partners={partners} failed={failed} />
    </WorkShell>
  )
}

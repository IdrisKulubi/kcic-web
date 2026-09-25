import type { Metadata } from "next"

import { JsonLd } from "@/components/seo/json-ld"
import { WorkApproach } from "@/components/work/work-approach"
import { WorkCrossCutting } from "@/components/work/work-cross-cutting"
import { WorkIndex } from "@/components/work/work-index"
import { WorkPartners } from "@/components/work/work-partners"
import { WorkSectors } from "@/components/work/work-sectors"
import { WorkShell } from "@/components/work/work-shell"
import { fetchAllPartners } from "@/lib/data/partners"
import { ourWorkMeta } from "@/lib/data/our-work"
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: ourWorkMeta.title,
  description: ourWorkMeta.description,
  path: "/our-work",
})

async function loadPartners() {
  try {
    const partners = await fetchAllPartners()
    return { partners, failed: false }
  } catch (error) {
    console.error("Error fetching partners for our work:", error)
    return { partners: [], failed: true }
  }
}

export default async function OurWorkPage() {
  const { partners, failed } = await loadPartners()

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: ourWorkMeta.title, path: "/our-work" },
        ])}
      />
      <WorkShell>
      <WorkIndex />
      <WorkApproach />
      <WorkSectors />
      <WorkCrossCutting />
      <WorkPartners partners={partners} failed={failed} />
    </WorkShell>
    </>
  )
}

import type { Metadata } from "next"

import { JsonLd } from "@/components/seo/json-ld"
import { ImpactIndex } from "@/components/impact/impact-index"
import { ImpactOverviewChapter } from "@/components/impact/impact-overview-chapter"
import { ImpactReports } from "@/components/impact/impact-reports"
import { ImpactShell } from "@/components/impact/impact-shell"
import { ImpactTargets } from "@/components/impact/impact-targets"
import { ImpactTheory } from "@/components/impact/impact-theory"
import { impactMeta } from "@/lib/data/impact"
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: impactMeta.title,
  description: impactMeta.description,
  path: "/impact",
})

export default function ImpactPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: impactMeta.title, path: "/impact" },
        ])}
      />
      <ImpactShell>
      <ImpactIndex />
      <ImpactOverviewChapter />
      <ImpactTheory />
      <ImpactTargets />
      <ImpactReports />
    </ImpactShell>
    </>
  )
}

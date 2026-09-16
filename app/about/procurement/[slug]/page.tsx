import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProcurementDetail } from "@/components/procurement/procurement-detail"
import { ProcurementContact } from "@/components/procurement/procurement-contact"
import { SiteFooter } from "@/components/site-footer"
import { getProcurementBySlug } from "@/lib/actions/opportunities"
import { procurementMeta } from "@/lib/data/procurement"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getProcurementBySlug(slug)
  if (!result.success || !result.data) {
    return { title: `${procurementMeta.title} | KCIC` }
  }
  return {
    title: `${result.data.title} | ${procurementMeta.title} | KCIC`,
    description: result.data.summary,
  }
}

export default async function ProcurementDetailPage({ params }: PageProps) {
  const { slug } = await params
  const result = await getProcurementBySlug(slug)

  if (!result.success || !result.data) {
    notFound()
  }

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
          <ProcurementDetail opportunity={result.data} />
          <ProcurementContact />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

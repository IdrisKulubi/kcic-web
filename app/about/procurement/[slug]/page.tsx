import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/seo/json-ld"
import { ProcurementDetail } from "@/components/procurement/procurement-detail"
import { ProcurementContact } from "@/components/procurement/procurement-contact"
import { SiteFooter } from "@/components/site-footer"
import { getProcurementBySlug } from "@/lib/actions/opportunities"
import { procurementMeta } from "@/lib/data/procurement"
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getProcurementBySlug(slug)
  if (!result.success || !result.data) {
    return { title: procurementMeta.title }
  }
  return pageMetadata({
    title: `${result.data.title} | ${procurementMeta.title}`,
    description: result.data.summary,
    path: `/about/procurement/${slug}`,
  })
}

export default async function ProcurementDetailPage({ params }: PageProps) {
  const { slug } = await params
  const result = await getProcurementBySlug(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  const opportunity = result.data

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: procurementMeta.title, path: "/about/procurement" },
          { name: opportunity.title, path: `/about/procurement/${slug}` },
        ])}
      />
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
          <ProcurementDetail opportunity={opportunity} />
          <ProcurementContact />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

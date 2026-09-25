import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/seo/json-ld"
import { CareersContact } from "@/components/careers/careers-contact"
import { CareersDetail } from "@/components/careers/careers-detail"
import { SiteFooter } from "@/components/site-footer"
import { getCareerBySlug } from "@/lib/actions/opportunities"
import { careersMeta } from "@/lib/data/careers"
import { buildBreadcrumbJsonLd, buildJobPostingJsonLd, pageMetadata } from "@/lib/seo"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getCareerBySlug(slug)
  if (!result.success || !result.data) {
    return { title: careersMeta.title }
  }
  return pageMetadata({
    title: `${result.data.title} | ${careersMeta.title}`,
    description: result.data.summary,
    path: `/about/careers/${slug}`,
  })
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const result = await getCareerBySlug(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  const opportunity = result.data
  const structuredData: Record<string, unknown>[] = [
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: careersMeta.title, path: "/about/careers" },
      { name: opportunity.title, path: `/about/careers/${slug}` },
    ]),
  ]

  if (opportunity.title && opportunity.summary && opportunity.location) {
    const toIso = (value: Date | string | null | undefined) => {
      if (!value) return null
      return value instanceof Date ? value.toISOString() : value
    }
    structuredData.push(
      buildJobPostingJsonLd({
        title: opportunity.title,
        description: opportunity.summary,
        slug,
        location: opportunity.location,
        employmentType: opportunity.employmentType,
        datePosted: toIso(opportunity.issuedDate),
        validThrough: toIso(opportunity.deadline),
      })
    )
  }

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <JsonLd data={structuredData} />
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
          <CareersDetail opportunity={opportunity} />
          <CareersContact />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

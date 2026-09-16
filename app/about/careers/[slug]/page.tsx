import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CareersContact } from "@/components/careers/careers-contact"
import { CareersDetail } from "@/components/careers/careers-detail"
import { SiteFooter } from "@/components/site-footer"
import { getCareerBySlug } from "@/lib/actions/opportunities"
import { careersMeta } from "@/lib/data/careers"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getCareerBySlug(slug)
  if (!result.success || !result.data) {
    return { title: `${careersMeta.title} | KCIC` }
  }
  return {
    title: `${result.data.title} | ${careersMeta.title} | KCIC`,
    description: result.data.summary,
  }
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const result = await getCareerBySlug(slug)

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
          <CareersDetail opportunity={result.data} />
          <CareersContact />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

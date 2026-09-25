import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/seo/json-ld"
import { ProgrammeDetail } from "@/components/programmes/programme-detail"
import { SiteFooter } from "@/components/site-footer"
import { getProgrammeBySlug } from "@/lib/actions/programmes"
import { programmesMeta } from "@/lib/data/programmes"
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const revalidate = 60

interface ProgrammePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProgrammePageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getProgrammeBySlug(slug)
  if (!result.success || !result.data) {
    return { title: "Programme" }
  }
  return pageMetadata({
    title: result.data.title,
    description: result.data.description,
    path: `/programmes/${slug}`,
  })
}

export default async function ProgrammeSlugPage({ params }: ProgrammePageProps) {
  const { slug } = await params
  const result = await getProgrammeBySlug(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  const programme = result.data

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: programmesMeta.title, path: "/programmes" },
          { name: programme.title, path: `/programmes/${slug}` },
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
          <ProgrammeDetail programme={programme} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

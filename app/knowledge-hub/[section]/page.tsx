import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { KnowledgeCard } from "@/components/knowledge-hub/knowledge-card"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { listKnowledgeItems } from "@/lib/actions/knowledge-hub"
import { getKnowledgeSection, knowledgeHubCopy } from "@/lib/data/knowledge-hub"
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const revalidate = 60

interface KnowledgeSectionPageProps {
  params: Promise<{ section: string }>
}

export async function generateMetadata({
  params,
}: KnowledgeSectionPageProps): Promise<Metadata> {
  const { section: slug } = await params
  const section = getKnowledgeSection(slug)
  if (!section) return {}
  return pageMetadata({
    title: section.label,
    description: section.description,
    path: `/knowledge-hub/${section.slug}`,
  })
}

export default async function KnowledgeSectionPage({
  params,
}: KnowledgeSectionPageProps) {
  const { section: slug } = await params
  const section = getKnowledgeSection(slug)
  if (!section) notFound()

  const result = await listKnowledgeItems({ section: section.slug })
  const items = result.success && result.data ? result.data : []

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: section.label, path: `/knowledge-hub/${section.slug}` },
        ])}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_22%,rgba(127,204,47,0.11),transparent_26%),radial-gradient(circle_at_92%_58%,rgba(0,173,239,0.08),transparent_28%)]"
      />
      <div className="relative z-10 flex flex-col gap-(--canvas-gutter) p-(--canvas-gutter)">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-col gap-(--canvas-gutter) outline-none"
        >
          <section
            aria-labelledby="knowledge-section-title"
            className="canvas-panel bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
          >
            <div className="mx-auto max-w-7xl">
              <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
                {section.eyebrow}
              </p>
              <h1
                id="knowledge-section-title"
                className="mt-3 m-0 max-w-[18ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.04em] text-[#1b241d]"
              >
                {section.heading}
              </h1>
              <p className="mt-5 m-0 max-w-[48ch] text-[1.05rem] leading-[1.7] text-[#566159]">
                {section.lede}
              </p>
            </div>
          </section>

          <section
            aria-label={section.label}
            className="canvas-panel bg-[#f4f7f2] px-5 py-12 sm:px-8 sm:py-14 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-16"
          >
            <div className="mx-auto max-w-7xl">
              {!result.success ? (
                <p className="m-0 text-[#566159]" role="alert">
                  {knowledgeHubCopy.failed}
                </p>
              ) : items.length === 0 ? (
                <p className="m-0 text-[#566159]">{knowledgeHubCopy.emptyList}</p>
              ) : (
                <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                  {items.map((item) => (
                    <li key={item.id}>
                      <KnowledgeCard item={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { KnowledgeDetail } from "@/components/knowledge-hub/knowledge-detail"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { getKnowledgeItemBySlug } from "@/lib/actions/knowledge-hub"
import { getKnowledgeSection } from "@/lib/data/knowledge-hub"
import { hasNewsThumbnail } from "@/lib/data/news"
import { buildBreadcrumbJsonLd, canonicalFor, pageMetadata } from "@/lib/seo"

export const revalidate = 60

interface KnowledgeItemPageProps {
  params: Promise<{ section: string; slug: string }>
}

export async function generateMetadata({
  params,
}: KnowledgeItemPageProps): Promise<Metadata> {
  const { section: sectionSlug, slug } = await params
  const section = getKnowledgeSection(sectionSlug)
  const path = `/knowledge-hub/${sectionSlug}/${slug}`
  if (!section) return {}
  const result = await getKnowledgeItemBySlug(section.slug, slug)
  if (!result.success || !result.data) {
    return { title: section.label, ...canonicalFor(path) }
  }
  const item = result.data
  const hasImage = hasNewsThumbnail(item.coverImage)
  return {
    ...pageMetadata({ title: item.title, description: item.summary, path }),
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      images: hasImage ? [{ url: item.coverImage, alt: item.title }] : undefined,
    },
    twitter: {
      card: hasImage ? "summary_large_image" : "summary",
      title: item.title,
      description: item.summary,
      images: hasImage ? [item.coverImage] : undefined,
    },
  }
}

export default async function KnowledgeItemPage({ params }: KnowledgeItemPageProps) {
  const { section: sectionSlug, slug } = await params
  const section = getKnowledgeSection(sectionSlug)
  if (!section) notFound()

  const result = await getKnowledgeItemBySlug(section.slug, slug)
  if (!result.success || !result.data) notFound()

  const item = result.data

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: section.label, path: `/knowledge-hub/${section.slug}` },
          { name: item.title, path: `/knowledge-hub/${section.slug}/${item.slug}` },
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
          <KnowledgeDetail item={item} section={section} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

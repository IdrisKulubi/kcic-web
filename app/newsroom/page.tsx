import type { Metadata } from "next"

import { JsonLd } from "@/components/seo/json-ld"
import { NewsroomGallery } from "@/components/newsroom/newsroom-gallery"
import { NewsroomIntro } from "@/components/newsroom/newsroom-intro"
import { SiteFooter } from "@/components/site-footer"
import { listNews } from "@/lib/actions/news"
import { newsMeta, toNewsListItem } from "@/lib/data/news"
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = pageMetadata({
  title: newsMeta.title,
  description: newsMeta.description,
  path: "/newsroom",
})

export default async function NewsroomPage() {
  const result = await listNews()
  const items =
    result.success && result.data
      ? result.data.articles.map(toNewsListItem)
      : []

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: newsMeta.title, path: "/newsroom" },
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
          <NewsroomIntro />
          <NewsroomGallery items={items} failed={!result.success} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

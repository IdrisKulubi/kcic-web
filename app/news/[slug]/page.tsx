import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { NewsArticle } from "@/components/newsroom/news-article"
import { SiteFooter } from "@/components/site-footer"
import { getNewsArticleBySlug, listNews } from "@/lib/actions/news"
import { hasNewsThumbnail, pickRelatedNews, toNewsListItem } from "@/lib/data/news"

export const dynamic = "force-dynamic"

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getNewsArticleBySlug(slug)
  if (!result.success || !result.data) {
    return { title: "News | KCIC" }
  }
  const article = result.data
  const openGraph: Metadata["openGraph"] = {
    title: article.title,
    description: article.excerpt,
    type: "article",
  }
  if (hasNewsThumbnail(article.thumbnail)) {
    openGraph.images = [{ url: article.thumbnail, alt: article.title }]
  }
  return {
    title: `${article.title} | KCIC`,
    description: article.excerpt,
    openGraph,
    twitter: {
      card: hasNewsThumbnail(article.thumbnail) ? "summary_large_image" : "summary",
      title: article.title,
      description: article.excerpt,
      images: hasNewsThumbnail(article.thumbnail) ? [article.thumbnail] : undefined,
    },
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const [articleResult, listResult] = await Promise.all([
    getNewsArticleBySlug(slug),
    listNews(),
  ])

  if (!articleResult.success || !articleResult.data) {
    notFound()
  }

  const allItems =
    listResult.success && listResult.data
      ? listResult.data.articles.map(toNewsListItem)
      : []
  const related = pickRelatedNews(
    allItems,
    slug,
    articleResult.data.category
  )

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
          <NewsArticle article={articleResult.data} related={related} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

import { fetchLatestNewsArticles } from "@/lib/data/news"
import {
  fetchKcicYouTubeFeed,
  KCIC_YOUTUBE_CHANNEL_URL,
  type KcicYouTubeFeed,
} from "@/lib/youtube"

import { NewsInsightsPanel, type NewsInsightsArticle } from "./news-insights-panel"

export async function NewsInsights() {
  const [newsResult, youtubeResult] = await Promise.all([
    fetchLatestNewsArticles(3)
      .then((articles) => ({ ok: true as const, articles }))
      .catch((error: unknown) => {
        console.error("Error fetching latest news for homepage:", error)
        return { ok: false as const, articles: [] as const }
      }),
    fetchKcicYouTubeFeed(),
  ])

  const articles: NewsInsightsArticle[] = newsResult.ok
    ? newsResult.articles.map((article) => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        thumbnail: article.thumbnail,
        category: article.category,
        slug: article.slug,
        publishedAt:
          article.publishedAt instanceof Date
            ? article.publishedAt.toISOString()
            : String(article.publishedAt),
      }))
    : []

  const youtube: KcicYouTubeFeed | null = youtubeResult.ok
    ? youtubeResult.data
    : null

  return (
    <NewsInsightsPanel
      articles={articles}
      newsFailed={!newsResult.ok}
      youtube={youtube}
      youtubeFailed={!youtubeResult.ok}
      channelUrl={KCIC_YOUTUBE_CHANNEL_URL}
    />
  )
}

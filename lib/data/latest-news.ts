import { unstable_cache } from "next/cache"
import { desc } from "drizzle-orm/sql"

import db from "@/db/drizzle"
import { news } from "@/db/schema"
import { NEWS_CACHE_TAG } from "@/lib/cache-tags"
import type { LatestNewsArticle } from "@/lib/data/news"

async function queryLatestNewsArticles(
  limit: number
): Promise<LatestNewsArticle[]> {
  return db
    .select({
      id: news.id,
      title: news.title,
      excerpt: news.excerpt,
      thumbnail: news.thumbnail,
      category: news.category,
      slug: news.slug,
      publishedAt: news.publishedAt,
    })
    .from(news)
    .orderBy(desc(news.publishedAt), desc(news.createdAt))
    .limit(limit)
}

export function fetchLatestNewsArticles(limit = 3) {
  return unstable_cache(
    () => queryLatestNewsArticles(limit),
    ["latest-news", String(limit)],
    { revalidate: 60, tags: [NEWS_CACHE_TAG] }
  )()
}

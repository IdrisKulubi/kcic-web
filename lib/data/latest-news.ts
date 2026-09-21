import db from "@/db/drizzle"
import { news } from "@/db/schema"
import { desc } from "drizzle-orm/sql"

import { ensureLiveCmsData } from "@/lib/cms-live"
import type { LatestNewsArticle } from "@/lib/data/news"

export async function fetchLatestNewsArticles(
  limit = 3
): Promise<LatestNewsArticle[]> {
  await ensureLiveCmsData()
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

import db from "@/db/drizzle"
import { news } from "@/db/schema"
import { desc } from "drizzle-orm/sql"

import type { LatestNewsArticle } from "@/lib/data/news"

export async function fetchLatestNewsArticles(
  limit = 3
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
    .orderBy(desc(news.publishedAt))
    .limit(limit)
}

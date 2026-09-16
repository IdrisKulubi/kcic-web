export const newsMeta = {
  title: "Newsroom",
  description:
    "News and stories from KCIC — climate enterprise support, programmes, and impact across Africa.",
}

export const newsPageCopy = {
  eyebrow: "Newsroom",
  heading: "Stories from the work.",
  lede:
    "Updates from KCIC programmes, partnerships, and the entrepreneurs building climate solutions.",
  galleryHeading: "All news",
}

export const newsGalleryCopy = {
  tabAll: "All",
  yearAll: "All years",
  featuredOnly: "Featured",
  readLabel: "Read story",
  emptyAll: "No articles have been published yet.",
  emptyFilter: "No stories match these filters.",
  failed: "News could not be loaded right now. Please try again later.",
}

export const newsArticleCopy = {
  backLink: "Newsroom",
  shareCopyLink: "Copy link",
  shareCopied: "Copied",
  shareGroupLabel: "Share this story",
  shareWhatsApp: "WhatsApp",
  shareX: "X",
  shareLinkedIn: "LinkedIn",
  shareHeading: "Share",
  emptyBodyNote:
    "This briefing is the full update for now. Check back for a longer write-up.",
  relatedHeading: "More stories",
  featuredLabel: "Featured",
}

export interface LatestNewsArticle {
  id: string
  title: string
  excerpt: string
  thumbnail: string
  category: string
  slug: string
  publishedAt: Date | string
}

export interface NewsListItem {
  id: string
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  category: string
  categoryKey: string
  readTime: string
  featured: boolean
  publishedAt: string
  year: number
}

export function categoryKey(category: string) {
  return category.trim().toLowerCase()
}

export function categoryToHash(category: string) {
  return categoryKey(category).replace(/\s+/g, "-")
}

export function categoryFromHash(
  hash: string,
  categories: string[]
): string | null {
  const id = hash.replace("#", "").toLowerCase()
  if (!id) return null
  return (
    categories.find((c) => categoryToHash(c) === id) ?? null
  )
}

export function toNewsListItem(article: {
  id?: string
  slug?: string
  title: string
  excerpt: string
  thumbnail: string
  category: string
  readTime?: string
  featured: boolean
  publishedAt: Date | string
}): NewsListItem {
  const published =
    typeof article.publishedAt === "string"
      ? new Date(article.publishedAt)
      : article.publishedAt
  const publishedAt = Number.isNaN(published.getTime())
    ? new Date().toISOString()
    : published.toISOString()

  return {
    id: article.id ?? "",
    slug: article.slug ?? "",
    title: article.title,
    excerpt: article.excerpt,
    thumbnail: article.thumbnail,
    category: article.category.trim(),
    categoryKey: categoryKey(article.category),
    readTime: article.readTime?.trim() ?? "",
    featured: article.featured,
    publishedAt,
    year: new Date(publishedAt).getFullYear(),
  }
}

export function newsCategories(items: NewsListItem[]): string[] {
  const map = new Map<string, string>()
  for (const item of items) {
    if (!item.category) continue
    const key = item.categoryKey
    if (!map.has(key)) map.set(key, item.category)
  }
  return Array.from(map.values()).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  )
}

export function filterNewsArticles(
  items: NewsListItem[],
  options: {
    category: string | null
    featuredOnly: boolean
  }
) {
  return items.filter((item) => {
    if (options.featuredOnly && !item.featured) return false
    if (
      options.category &&
      item.categoryKey !== categoryKey(options.category)
    ) {
      return false
    }
    return true
  })
}

export function formatNewsDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function hasNewsThumbnail(thumbnail: string | null | undefined) {
  const value = thumbnail?.trim() ?? ""
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function hasNewsBodyContent(content: string | null | undefined) {
  const stripped = (content ?? "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
  return stripped.length > 0
}

export function pickRelatedNews(
  items: NewsListItem[],
  currentSlug: string,
  category: string,
  limit = 3
): NewsListItem[] {
  const others = items.filter((item) => item.slug && item.slug !== currentSlug)
  const byDate = (a: NewsListItem, b: NewsListItem) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()

  const sameCategory = others
    .filter((item) => item.categoryKey === categoryKey(category))
    .sort(byDate)
  const otherCategories = others
    .filter((item) => item.categoryKey !== categoryKey(category))
    .sort(byDate)

  return [...sameCategory, ...otherCategories].slice(0, limit)
}

import type { MetadataRoute } from "next"

import {
  listCareerOpportunities,
  listProcurementOpportunities,
} from "@/lib/actions/opportunities"
import { listNews } from "@/lib/actions/news"
import { listProgrammes } from "@/lib/actions/programmes"
import { absoluteUrl } from "@/lib/seo"

const staticPaths = [
  "/",
  "/about",
  "/our-work",
  "/programmes",
  "/founders-collective",
  "/impact",
  "/newsroom",
  "/contact",
  "/faqs",
  "/about/careers",
  "/about/policies-disclosures",
  "/about/procurement",
] as const

function toLastModified(value: Date | string | null | undefined): Date | undefined {
  if (!value) return undefined
  return value instanceof Date ? value : new Date(value)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }))

  const [newsResult, programmesResult, careersResult, procurementResult] =
    await Promise.all([
      listNews(),
      listProgrammes(),
      listCareerOpportunities(),
      listProcurementOpportunities(),
    ])

  if (newsResult.success && newsResult.data) {
    for (const article of newsResult.data.articles) {
      entries.push({
        url: absoluteUrl(`/news/${article.slug}`),
        lastModified: toLastModified(article.publishedAt) ?? now,
        changeFrequency: "weekly",
        priority: 0.7,
      })
    }
  }

  if (programmesResult.success && programmesResult.data) {
    for (const programme of programmesResult.data) {
      entries.push({
        url: absoluteUrl(`/programmes/${programme.slug}`),
        lastModified: toLastModified(programme.updatedAt) ?? now,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  }

  if (careersResult.success && careersResult.data) {
    for (const job of careersResult.data) {
      entries.push({
        url: absoluteUrl(`/about/careers/${job.slug}`),
        lastModified: toLastModified(job.updatedAt) ?? now,
        changeFrequency: "weekly",
        priority: 0.6,
      })
    }
  }

  if (procurementResult.success && procurementResult.data) {
    for (const item of procurementResult.data) {
      entries.push({
        url: absoluteUrl(`/about/procurement/${item.slug}`),
        lastModified: toLastModified(item.updatedAt) ?? now,
        changeFrequency: "weekly",
        priority: 0.6,
      })
    }
  }

  return entries
}

export const dynamic = "force-dynamic"

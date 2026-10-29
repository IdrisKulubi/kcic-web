export const knowledgeSections = [
  {
    slug: "publications",
    label: "Publications",
    singular: "Publication",
    eyebrow: "Knowledge Hub",
    heading: "Publications.",
    lede:
      "Research, guides and long-form resources from KCIC's work with climate enterprises across Kenya and the region.",
    description:
      "Research, guides and long-form resources from the Kenya Climate Innovation Center.",
  },
  {
    slug: "policy-briefs",
    label: "Policy briefs",
    singular: "Policy brief",
    eyebrow: "Knowledge Hub",
    heading: "Policy briefs.",
    lede:
      "Evidence and recommendations for decision-makers shaping climate, enterprise and green-growth policy.",
    description:
      "Evidence and recommendations for decision-makers from the Kenya Climate Innovation Center.",
  },
  {
    slug: "fact-sheets",
    label: "Fact sheets",
    singular: "Fact sheet",
    eyebrow: "Knowledge Hub",
    heading: "Fact sheets.",
    lede:
      "Quick reference on KCIC programmes, sectors and impact, ready to read or download.",
    description:
      "Quick reference on Kenya Climate Innovation Center programmes and impact.",
  },
] as const

export type KnowledgeSection = (typeof knowledgeSections)[number]
export type KnowledgeSectionSlug = KnowledgeSection["slug"]

export const knowledgeSectionSlugs = knowledgeSections.map(
  (section) => section.slug
) as [KnowledgeSectionSlug, ...KnowledgeSectionSlug[]]

export function getKnowledgeSection(slug: string): KnowledgeSection | undefined {
  return knowledgeSections.find((section) => section.slug === slug)
}

export const knowledgeHubCopy = {
  emptyList: "Nothing has been published here yet. Check back soon.",
  failed: "This page could not be loaded right now. Please try again later.",
  download: "Download",
  emptyBodyNote: "The full document is available to download below.",
}

export interface KnowledgeItem {
  id: string
  section: KnowledgeSectionSlug
  title: string
  slug: string
  summary: string
  content: string
  coverImage: string
  attachmentUrl: string
  attachmentName: string
  attachmentSize: number | null
  /** ISO timestamp, stored at 12:00 UTC on the chosen day. */
  publishedAt: string
}

/** Calendar day as `YYYY-MM-DD`, read in UTC to match how dates are stored. */
export function toDateInputValue(iso: string) {
  return iso.slice(0, 10)
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

/** `26-Oct-2026` */
export function formatKnowledgeDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const day = String(date.getUTCDate()).padStart(2, "0")
  return `${day}-${MONTHS[date.getUTCMonth()]}-${date.getUTCFullYear()}`
}

export function formatFileSize(bytes: number | null | undefined) {
  if (!bytes || bytes <= 0) return ""
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function fileExtension(name: string) {
  const match = /\.([a-z0-9]+)$/i.exec(name.trim())
  return match ? match[1].toUpperCase() : ""
}

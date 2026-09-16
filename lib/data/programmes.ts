import type { ProgrammeData } from "@/lib/actions/programmes"

export const programmesMeta = {
  title: "Our programmes",
  description:
    "Explore KCIC flagship programmes, special initiatives, and past projects supporting climate enterprise across Africa.",
}

export const programmesPageCopy = {
  eyebrow: "Our programmes",
  heading: "Programmes & initiatives.",
  lede:
    "Image-led support for entrepreneurs  from flagship facilities to special projects and completed work.",
  galleryHeading: "Browse programmes",
}

export const programmesGalleryCopy = {
  tabAll: "All",
  tabFlagship: "Flagship",
  tabSpecial: "Special",
  tabPast: "Past",
  openStatus: "Open",
  completedStatus: "Completed",
  categoryFlagship: "Flagship",
  categorySpecial: "Special",
  applyLabel: "Apply",
  viewLabel: "View programme",
  emptyAll: "Programmes will appear here once published.",
  emptyTab: "No programmes in this view yet.",
  failed: "Programmes could not be loaded right now. Please try again later.",
}

export const programmeDetailCopy = {
  backLink: "All programmes",
  completedBanner:
    "This programme is completed. Application is no longer open.",
  applyHeading: "Apply",
  applyExternal: "Apply online",
  sponsorsHeading: "Partners & funders",
  introductionHeading: "Overview",
}

export type ProgrammeGalleryTab = "all" | "flagship" | "special" | "past"

export const programmeTabFromHash = (hash: string): ProgrammeGalleryTab | null => {
  const id = hash.replace("#", "").toLowerCase()
  if (id === "flagship" || id === "special" || id === "past") return id
  return null
}

export interface ProgrammeListItem {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  category: ProgrammeData["category"]
  isActive: boolean
  applicationLink: string | null
}

export function programmeExcerpt(description: string, maxLength = 140) {
  const text = description.replace(/\s+/g, " ").trim()
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

export function filterProgrammesByTab(
  items: ProgrammeListItem[],
  tab: ProgrammeGalleryTab
) {
  if (tab === "all") return items
  if (tab === "past") return items.filter((item) => !item.isActive)
  if (tab === "flagship") {
    return items.filter((item) => item.isActive && item.category === "flagship")
  }
  return items.filter((item) => item.isActive && item.category === "special")
}

export function categoryLabel(category: ProgrammeData["category"]) {
  return category === "special"
    ? programmesGalleryCopy.categorySpecial
    : programmesGalleryCopy.categoryFlagship
}

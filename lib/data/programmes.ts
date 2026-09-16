import type {
  ProgrammeData,
  ProgrammeWithSponsors,
} from "@/lib/actions/programmes"

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
  contentsHeading: "On this page",
  copyLinkLabel: "Copy link",
  copyLinkCopied: "Copied",
  shareLabel: "Share",
}

export type ProgrammeContentField =
  | "introduction"
  | "eligibility"
  | "criteria"
  | "applicationProcess"
  | "applicationSelection"
  | "technicalSupport"
  | "scoringSystem"
  | "definitions"
  | "terms"
  | "fraudPolicy"

export interface ProgrammeContentSectionDef {
  id: string
  field: ProgrammeContentField
  title: string
}

export const programmeContentSectionDefs: ProgrammeContentSectionDef[] = [
  { id: "overview", field: "introduction", title: "Overview" },
  { id: "eligibility", field: "eligibility", title: "Eligibility" },
  { id: "criteria", field: "criteria", title: "Criteria" },
  { id: "how-to-apply", field: "applicationProcess", title: "How to apply" },
  {
    id: "application-selection",
    field: "applicationSelection",
    title: "Application and selection",
  },
  {
    id: "technical-support",
    field: "technicalSupport",
    title: "Technical support",
  },
  { id: "scoring", field: "scoringSystem", title: "Scoring" },
  { id: "definitions", field: "definitions", title: "Definitions" },
  { id: "terms", field: "terms", title: "Terms" },
  { id: "fraud-policy", field: "fraudPolicy", title: "Fraud policy" },
]

export interface ProgrammeRenderedSection {
  id: string
  title: string
  html: string
}

export function hasProgrammeHtml(value: string | null | undefined) {
  if (!value?.trim()) return false
  const stripped = value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
  return stripped.length > 0
}

export function getProgrammeContentSections(
  programme: ProgrammeWithSponsors
): ProgrammeRenderedSection[] {
  return programmeContentSectionDefs
    .map((def) => {
      const html = programme[def.field]
      if (!hasProgrammeHtml(html)) return null
      return { id: def.id, title: def.title, html: html!.trim() }
    })
    .filter((section): section is ProgrammeRenderedSection => section !== null)
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

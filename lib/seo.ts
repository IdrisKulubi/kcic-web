import type { Metadata } from "next"

import { contactDetails } from "@/lib/data/contact"

export const siteName = "Kenya Climate Innovation Center"

export const defaultDescription =
  "KCIC catalyzes climate entrepreneurship in Africa through programmes, enterprise support, partnerships, and impact across Kenya and the region."

function resolveSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const href = raw && raw.length > 0 ? raw : "https://www.kenyacic.org"
  return new URL(href.endsWith("/") ? href.slice(0, -1) : href)
}

export const siteUrl = resolveSiteUrl()

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return new URL(normalized, siteUrl).toString()
}

export function canonicalFor(path: string): Metadata["alternates"] {
  return { canonical: absoluteUrl(path) }
}

export function pageMetadata(options: {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
}): Metadata {
  const { title, description, path, absoluteTitle } = options
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: canonicalFor(path),
  }
}

export const rootMetadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteName,
    template: `%s | KCIC`,
  },
  description: defaultDescription,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName,
    title: siteName,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    alternateName: "KCIC",
    url: siteUrl.toString(),
    email: contactDetails.email,
    telephone: contactDetails.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "KCIC Head Office, Mokoyeti Road West, Off Langata Road",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
  }
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl.toString(),
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl.toString(),
    },
  }
}

export interface BreadcrumbItem {
  name: string
  path: string
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildNewsArticleJsonLd(options: {
  title: string
  description: string
  slug: string
  publishedAt: string
  imageUrl?: string
}) {
  const articleUrl = absoluteUrl(`/news/${options.slug}`)
  const publisher = {
    "@type": "Organization",
    name: siteName,
    url: siteUrl.toString(),
  }
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: options.title,
    description: options.description,
    datePublished: options.publishedAt,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    publisher,
    ...(options.imageUrl ? { image: [options.imageUrl] } : {}),
  }
}

export function buildJobPostingJsonLd(options: {
  title: string
  description: string
  slug: string
  location?: string | null
  employmentType?: string | null
  datePosted?: string | null
  validThrough?: string | null
}) {
  const jobUrl = absoluteUrl(`/about/careers/${options.slug}`)
  const posting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: options.title,
    description: options.description,
    url: jobUrl,
    hiringOrganization: {
      "@type": "Organization",
      name: siteName,
      sameAs: siteUrl.toString(),
    },
  }
  if (options.location) {
    posting.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: options.location,
        addressCountry: "KE",
      },
    }
  }
  if (options.employmentType) {
    posting.employmentType = options.employmentType
  }
  if (options.datePosted) {
    posting.datePosted = options.datePosted
  }
  if (options.validThrough) {
    posting.validThrough = options.validThrough
  }
  return posting
}

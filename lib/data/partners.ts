import db from "@/db/drizzle"
import { partners } from "@/db/schema"
import { asc } from "drizzle-orm/sql"

import type { PartnerLogoItem } from "@/lib/types/partner-logo"

export type { PartnerLogoItem as LogoImageItem }

export interface PartnerRecord {
  id: string
  name: string
  logo: string
  website: string | null
  order: number
}

export async function fetchAllPartners(): Promise<PartnerRecord[]> {
  return db
    .select({
      id: partners.id,
      name: partners.name,
      logo: partners.logo,
      website: partners.website,
      order: partners.order,
    })
    .from(partners)
    .orderBy(asc(partners.order))
}

const MIN_ROW_ITEMS = 4

function partnerToLogoItem(partner: PartnerRecord): PartnerLogoItem {
  const href =
    partner.website && partner.website.trim().length > 0
      ? partner.website.trim()
      : undefined

  return {
    src: partner.logo,
    alt: partner.name,
    title: partner.name,
    href,
  }
}

function ensureMinimumItems(items: PartnerLogoItem[]): PartnerLogoItem[] {
  if (items.length === 0) return items
  if (items.length >= MIN_ROW_ITEMS) return items

  const expanded: PartnerLogoItem[] = []
  while (expanded.length < MIN_ROW_ITEMS) {
    expanded.push(...items)
  }
  return expanded
}

export function splitPartnersIntoLogoRows(partnersList: PartnerRecord[]): {
  rowOne: PartnerLogoItem[]
  rowTwo: PartnerLogoItem[]
} {
  const valid = partnersList.filter((p) => p.logo.trim().length > 0)

  const rowOneRaw: PartnerLogoItem[] = []
  const rowTwoRaw: PartnerLogoItem[] = []

  valid.forEach((partner, index) => {
    const item = partnerToLogoItem(partner)
    if (index % 2 === 0) {
      rowOneRaw.push(item)
    } else {
      rowTwoRaw.push(item)
    }
  })

  if (rowTwoRaw.length === 0 && rowOneRaw.length > 1) {
    const half = Math.ceil(rowOneRaw.length / 2)
    return {
      rowOne: ensureMinimumItems(rowOneRaw.slice(0, half)),
      rowTwo: ensureMinimumItems(rowOneRaw.slice(half)),
    }
  }

  if (rowOneRaw.length === 0 && rowTwoRaw.length > 0) {
    return {
      rowOne: ensureMinimumItems(rowTwoRaw),
      rowTwo: ensureMinimumItems(rowTwoRaw),
    }
  }

  return {
    rowOne: ensureMinimumItems(rowOneRaw),
    rowTwo: ensureMinimumItems(rowTwoRaw),
  }
}

export async function fetchPartnerLogoRows(): Promise<{
  rowOne: PartnerLogoItem[]
  rowTwo: PartnerLogoItem[]
}> {
  const all = await fetchAllPartners()
  return splitPartnersIntoLogoRows(all)
}

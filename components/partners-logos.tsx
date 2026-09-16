import { fetchPartnerLogoRows } from "@/lib/data/partners"

import { PartnersLogosPanel } from "./partners-logos-panel"

export async function PartnersLogos() {
  const result = await fetchPartnerLogoRows()
    .then((rows) => ({ ok: true as const, ...rows }))
    .catch((error: unknown) => {
      console.error("Error fetching partner logos for homepage:", error)
      return {
        ok: false as const,
        rowOne: [] as const,
        rowTwo: [] as const,
      }
    })

  return (
    <PartnersLogosPanel
      rowOne={result.ok ? result.rowOne : []}
      rowTwo={result.ok ? result.rowTwo : []}
      failed={!result.ok}
    />
  )
}

import type { Metadata } from "next"

import { WorkHashRedirect } from "@/components/work/work-hash-redirect"
import { workPageMeta } from "@/lib/data/our-work"

export const metadata: Metadata = {
  title: `${workPageMeta.partners.title} | KCIC`,
  description: workPageMeta.partners.description,
}

export default function OurPartnersPage() {
  return <WorkHashRedirect href="/our-work#partners" />
}

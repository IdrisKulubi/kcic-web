import type { Metadata } from "next"

import { WorkHashRedirect } from "@/components/work/work-hash-redirect"
import { workPageMeta } from "@/lib/data/our-work"

export const metadata: Metadata = {
  title: `${workPageMeta.sectors.title} | KCIC`,
  description: workPageMeta.sectors.description,
}

export default function KeySectorsPage() {
  return <WorkHashRedirect href="/our-work#sectors" />
}

import type { Metadata } from "next"

import { WorkHashRedirect } from "@/components/work/work-hash-redirect"
import { workPageMeta } from "@/lib/data/our-work"

export const metadata: Metadata = {
  title: `${workPageMeta.crossCutting.title} | KCIC`,
  description: workPageMeta.crossCutting.description,
}

export default function CrossCuttingIssuesPage() {
  return <WorkHashRedirect href="/our-work#cross-cutting" />
}

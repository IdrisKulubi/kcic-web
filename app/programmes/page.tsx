import type { Metadata } from "next"

import { ProgrammesGallery } from "@/components/programmes/programmes-gallery"
import { ProgrammesIntro } from "@/components/programmes/programmes-intro"
import { SiteFooter } from "@/components/site-footer"
import { listProgrammes } from "@/lib/actions/programmes"
import { programmesMeta } from "@/lib/data/programmes"
import { toProgrammeListItem } from "@/lib/programmes/serialize"

export const metadata: Metadata = {
  title: `${programmesMeta.title} | KCIC`,
  description: programmesMeta.description,
}

export default async function ProgrammesPage() {
  const result = await listProgrammes()
  const items =
    result.success && result.data ? result.data.map(toProgrammeListItem) : []

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(0,173,239,0.10),transparent_25%),radial-gradient(circle_at_88%_60%,rgba(127,204,47,0.12),transparent_28%)]"
      />
      <div className="relative z-10 flex flex-col gap-(--canvas-gutter) p-(--canvas-gutter)">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-col gap-(--canvas-gutter) outline-none"
        >
          <ProgrammesIntro />
          <ProgrammesGallery items={items} failed={!result.success} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

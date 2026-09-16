import type { Metadata } from "next"

import { AboutHero } from "@/components/about-hero"
import { AboutIdentity } from "@/components/about-identity"
import { AboutStory } from "@/components/about-story"
import { AboutTeam } from "@/components/about-team"
import { SiteFooter } from "@/components/site-footer"
import { listTeamMembers } from "@/lib/actions/team"
import { aboutMeta } from "@/lib/data/about"

export const metadata: Metadata = {
  title: `${aboutMeta.title} | KCIC`,
  description: aboutMeta.description,
}

export default async function AboutPage() {
  const teamResult = await listTeamMembers()
  const members = teamResult.success ? teamResult.data ?? [] : []

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
          <AboutHero />
          <AboutStory />
          <AboutIdentity />
          <AboutTeam members={members} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

import type { Metadata } from "next"

import { AboutHero } from "@/components/about-hero"
import { AboutIdentity } from "@/components/about-identity"
import { AboutStory } from "@/components/about-story"
import { AboutTeam } from "@/components/about-team"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { listTeamMembers } from "@/lib/actions/team"
import { aboutMeta } from "@/lib/data/about"
import { buildBreadcrumbJsonLd, pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: aboutMeta.title,
  description: aboutMeta.description,
  path: "/about",
})

export default async function AboutPage() {
  const teamResult = await listTeamMembers()
  const members = teamResult.success ? teamResult.data ?? [] : []

  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: aboutMeta.title, path: "/about" },
        ])}
      />
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

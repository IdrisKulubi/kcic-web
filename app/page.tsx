import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"

import { Hero } from "@/components/hero"
import { FoundersCollectiveTeaser } from "@/components/founders-collective-teaser"
import { SiteFooter } from "@/components/site-footer"
import { defaultDescription, pageMetadata, siteName } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: siteName,
  description: defaultDescription,
  path: "/",
  absoluteTitle: true,
})

export const revalidate = 60

const ClimateChallenge = dynamic(() =>
  import("@/components/climate-challenge").then((mod) => mod.ClimateChallenge)
)

const WhatWeBelieve = dynamic(() =>
  import("@/components/what-we-believe").then((mod) => mod.WhatWeBelieve)
)

const ImpactOverview = dynamic(() =>
  import("@/components/impact-overview").then((mod) => mod.ImpactOverview)
)

const AwardsRecognition = dynamic(() =>
  import("@/components/awards-recognition").then((mod) => mod.AwardsRecognition)
)

const NewsInsights = dynamic(() =>
  import("@/components/news-insights").then((mod) => mod.NewsInsights)
)

const PartnersLogos = dynamic(() =>
  import("@/components/partners-logos").then((mod) => mod.PartnersLogos)
)

function PanelFallback({ className }: { className: string }) {
  return <div className={`canvas-panel ${className}`} aria-hidden="true" />
}

export default function Page() {
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
          <Hero />
          <Suspense fallback={<PanelFallback className="min-h-[82svh]" />}>
            <ClimateChallenge />
          </Suspense>
          <FoundersCollectiveTeaser />
          <Suspense fallback={<PanelFallback className="min-h-[28rem]" />}>
            <WhatWeBelieve />
          </Suspense>
          <Suspense fallback={<PanelFallback className="min-h-[32rem]" />}>
            <ImpactOverview />
          </Suspense>
          <Suspense fallback={<PanelFallback className="min-h-[24rem] bg-[#7fcc2f]" />}>
            <AwardsRecognition />
          </Suspense>
          <Suspense fallback={<PanelFallback className="min-h-[28rem]" />}>
            <NewsInsights />
          </Suspense>
          <Suspense fallback={<PanelFallback className="min-h-40" />}>
            <PartnersLogos />
          </Suspense>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

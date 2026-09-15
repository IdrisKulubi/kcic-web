import { Hero } from "@/components/hero"
import { ClimateChallenge } from "@/components/climate-challenge"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#dff2f7_0%,#eef6ef_38%,#e7f0df_72%,#c8d9c7_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(0,173,239,0.10),transparent_25%),radial-gradient(circle_at_88%_60%,rgba(127,204,47,0.12),transparent_28%)]"
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 outline-none"
      >
        <Hero />
        <ClimateChallenge />
      </main>
      <div
        aria-hidden="true"
        className="relative z-10 h-32 bg-gradient-to-b from-transparent to-[#173623] sm:h-44"
      />
      <SiteFooter />
    </div>
  )
}

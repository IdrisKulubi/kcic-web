import { PartnerLogoGrid } from "@/components/work/partner-logo-grid"
import type { PartnerRecord } from "@/lib/data/partners"
import { ourWorkPartners } from "@/lib/data/our-work"

interface WorkPartnersProps {
  partners: PartnerRecord[]
  failed?: boolean
}

export function WorkPartners({ partners, failed = false }: WorkPartnersProps) {
  return (
    <section
      id="partners"
      aria-labelledby="work-partners-title"
      className="canvas-panel scroll-mt-32 bg-[#e8eee6] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
          {ourWorkPartners.eyebrow}
        </p>
        <h2
          id="work-partners-title"
          className="mt-3 m-0 max-w-[18ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {ourWorkPartners.heading}
        </h2>
        <p className="mt-5 mb-12 m-0 max-w-[62ch] text-[1.02rem] leading-[1.7] text-[#566159]">
          {ourWorkPartners.intro}
        </p>
        <PartnerLogoGrid partners={partners} failed={failed} />
      </div>
    </section>
  )
}

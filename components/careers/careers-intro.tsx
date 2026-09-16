import Image from "next/image"
import Link from "next/link"

import teamImage from "@/public/policy/team.png"
import { careersIntro } from "@/lib/data/careers"

export function CareersIntro() {
  return (
    <section
      aria-labelledby="careers-intro-title"
      className="canvas-panel scroll-mt-24 bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h2
            id="careers-intro-title"
            className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            {careersIntro.heading}
          </h2>
          <div>
            <p className="m-0 text-[1.05rem] leading-[1.75] text-[#566159]">
              {careersIntro.body}
            </p>
            <Link
              href={careersIntro.teamLink.href}
              prefetch={false}
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.12em] text-[#315e13] uppercase underline-offset-4 hover:text-[#7fcc2f] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
            >
              {careersIntro.teamLink.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="relative mt-12 aspect-[21/9] min-h-[12rem] overflow-hidden rounded-[1.5rem] sm:aspect-[2.4/1]">
          <Image
            src={teamImage}
            alt="KCIC colleagues in a meeting and presentation"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  )
}

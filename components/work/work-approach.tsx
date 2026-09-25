import Image from "next/image"

import approachImage from "@/public/work/approach4.jpg"
import { ourWorkApproach } from "@/lib/data/our-work"

export function WorkApproach() {
  return (
    <section
      id="approach"
      aria-labelledby="work-approach-title"
      className="canvas-panel scroll-mt-32 overflow-hidden bg-[#eef3eb] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
            {ourWorkApproach.eyebrow}
          </p>
          <h2
            id="work-approach-title"
            className="mt-3 m-0 max-w-[16ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            {ourWorkApproach.heading}
          </h2>
          <p className="mt-5 m-0 max-w-[42ch] text-[1.02rem] leading-[1.7] text-[#566159]">
            {ourWorkApproach.intro}
          </p>
          <p className="mt-4 m-0 max-w-[42ch] text-sm leading-6 text-[#315e13]">
            {ourWorkApproach.note}
          </p>
          <figure className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[1.5rem] lg:mt-12">
            <Image
              src={approachImage}
              alt="KCIC team supporting climate enterprises"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>

        <ol className="m-0 flex list-none flex-col p-0">
          {ourWorkApproach.pillars.map((pillar, index) => (
            <li
              key={pillar.id}
              className="grid gap-4 border-t border-[#1b241d]/10 py-8 last:border-b last:pb-0 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8 sm:py-10"
            >
              <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.35rem] tracking-[-0.04em] text-[#315e13]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.35rem] font-medium tracking-[-0.03em] text-[#1b241d]">
                  {pillar.title}
                </h3>
                <ul className="mt-4 m-0 flex list-none flex-col gap-2 p-0">
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-[#7fcc2f]/70 pl-4 text-[0.95rem] leading-6 text-[#566159]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { FileText, ShieldCheck, UsersThree } from "@phosphor-icons/react/dist/ssr"

import { policiesIntro } from "@/lib/data/policies"

const pillarIcons = [ShieldCheck, UsersThree, FileText]

export function PoliciesIntro() {
  return (
    <section
      aria-labelledby="policies-intro-title"
      className="canvas-panel scroll-mt-24 bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="policies-intro-title"
          className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {policiesIntro.heading}
        </h2>
        <p className="mt-5 m-0 max-w-[65ch] text-[1.05rem] leading-[1.75] text-[#566159]">
          {policiesIntro.body}
        </p>

        <ul className="mt-12 flex list-none flex-col gap-0 border-t border-[#d9e1d8] p-0 lg:flex-row lg:divide-x lg:divide-[#d9e1d8]">
          {policiesIntro.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? FileText
            return (
              <li
                key={pillar.title}
                className="flex gap-4 border-b border-[#d9e1d8] py-8 last:border-b-0 lg:flex-1 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <span
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e8f4dc] text-[#315e13]"
                  aria-hidden
                >
                  <Icon className="size-5" weight="regular" />
                </span>
                <div>
                  <h3 className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-base font-medium tracking-[-0.02em] text-[#1b241d]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 m-0 text-sm leading-6 text-[#566159]">
                    {pillar.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

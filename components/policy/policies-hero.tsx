import Image from "next/image"

import heroImage from "@/public/policy/policy1.png"
import { policiesHero } from "@/lib/data/policies"

export function PoliciesHero() {
  return (
    <section
      className="canvas-panel isolate grid min-h-[min(60svh,38rem)] grid-cols-1 grid-rows-1"
      aria-labelledby="policies-hero-title"
    >
      <Image
        src={heroImage}
        alt="KCIC team in dialogue and presenting at a community event"
        fill
        placeholder="blur"
        sizes="100vw"
        priority
        className="-z-20 object-cover object-[50%_42%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-[linear-gradient(0deg,rgba(14,30,20,0.85)_0%,rgba(14,30,20,0.5)_45%,rgba(14,30,20,0.25)_100%)]"
      />
      <div className="flex flex-col items-center justify-center px-5 py-24 text-center sm:px-8 md:px-[clamp(2rem,5vw,4.25rem)]">
        <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#c9dcc4] uppercase">
          {policiesHero.eyebrow}
        </p>
        <h1
          id="policies-hero-title"
          className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.06] font-medium tracking-[-0.04em] text-[#f7fbf5] drop-shadow-[0_2px_24px_rgba(14,30,20,0.45)]"
        >
          {policiesHero.headline}
        </h1>
        <p className="mt-4 m-0 max-w-[40ch] text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.65] text-[#e2ede0] drop-shadow-[0_1px_16px_rgba(14,30,20,0.35)]">
          {policiesHero.subline}
        </p>
      </div>
    </section>
  )
}

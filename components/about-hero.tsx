import Image from "next/image"

import heroImage from "@/public/about/about-3.png"
import { aboutHero } from "@/lib/data/about"

export function AboutHero() {
  return (
    <section
      className="canvas-panel isolate grid min-h-[min(72svh,44rem)] grid-cols-1 grid-rows-1"
      aria-labelledby="about-hero-title"
    >
      <Image
        src={heroImage}
        alt="Climate entrepreneurs and communities supported by KCIC across Kenya"
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center] md:object-[55%_42%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(14,30,20,0.88)_0%,rgba(14,30,20,0.55)_42%,rgba(14,30,20,0.22)_100%)]"
      />
      <div className="flex flex-col items-center justify-center px-5 py-28 text-center sm:px-8 md:px-[clamp(2rem,5vw,4.25rem)]">
        <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#c9dcc4] uppercase">
          {aboutHero.eyebrow}
        </p>
        <h1
          id="about-hero-title"
          className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.04em] text-[#f7fbf5]"
        >
          {aboutHero.headline}
        </h1>
        <p className="mt-4 m-0 max-w-[36ch] text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.65] text-[#cfdfcb]">
          {aboutHero.subline}
        </p>
      </div>
    </section>
  )
}

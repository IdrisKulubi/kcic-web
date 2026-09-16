import Image from "next/image"

import heroImage from "@/public/policy/contact2.png"
import { contactHero } from "@/lib/data/contact"

export function ContactHero() {
  return (
    <section
      className="canvas-panel isolate grid min-h-[min(55svh,36rem)] grid-cols-1 grid-rows-1"
      aria-labelledby="contact-hero-title"
    >
      <Image
        src={heroImage}
        alt="KCIC team at work"
        fill
        placeholder="blur"
        sizes="100vw"
        priority
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-[linear-gradient(0deg,rgba(14,30,20,0.85)_0%,rgba(14,30,20,0.5)_45%,rgba(14,30,20,0.25)_100%)]"
      />
      <div className="flex flex-col items-center justify-center px-5 py-22 text-center sm:px-8 md:px-[clamp(2rem,5vw,4.25rem)]">
        <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#c9dcc4] uppercase">
          {contactHero.eyebrow}
        </p>
        <h1
          id="contact-hero-title"
          className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.06] font-medium tracking-[-0.04em] text-[#f7fbf5] drop-shadow-[0_2px_24px_rgba(14,30,20,0.45)]"
        >
          {contactHero.headline}
        </h1>
        <p className="mt-4 m-0 max-w-[36ch] text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.65] text-[#e2ede0] drop-shadow-[0_1px_16px_rgba(14,30,20,0.35)]">
          {contactHero.subline}
        </p>
      </div>
    </section>
  )
}

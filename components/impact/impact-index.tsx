import Image from "next/image"

import heroImage from "@/public/work/impact.jpg"
import { ImpactChapterNav } from "@/components/impact/impact-chapter-nav"
import { impactIndex } from "@/lib/data/impact"

export function ImpactIndex() {
  return (
    <section
      aria-labelledby="impact-page-title"
      className="canvas-panel relative overflow-hidden bg-[#7fcc2f] px-5 py-16 text-[#1b241d] sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-8 size-72 rounded-full border border-[#315e13]/20 lg:size-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgb(144_212_75/0.35),transparent_45%),radial-gradient(circle_at_88%_100%,rgb(49_94_19/0.12),transparent_40%)]"
      />
      <div
        className="relative mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.75fr)] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-5"
      >
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
            {impactIndex.eyebrow}
          </p>
          <h1
            id="impact-page-title"
            className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2.4rem,6.5vw,4.75rem)] leading-[0.94] font-medium tracking-[-0.05em] text-[#1b241d]"
          >
            {impactIndex.headline}
          </h1>
          <p className="mt-6 m-0 max-w-[44ch] text-[1.05rem] leading-[1.7] text-[#27332a]">
            {impactIndex.lede}
          </p>
        </div>
        <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:self-start">
          <ImpactChapterNav variant="brand" />
        </div>

        <figure
          className="relative order-2 mt-4 overflow-hidden rounded-[1.5rem] ring-1 ring-[#315e13]/15 sm:mt-5 lg:order-none lg:col-span-2 lg:row-start-2 lg:mt-0"
        >
        <div className="relative aspect-[16/9] min-h-[13.5rem] w-full sm:min-h-[16rem] lg:min-h-[18.5rem]">
          <Image
            src={heroImage}
            alt="Climate enterprise work supported by KCIC"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(27_36_29/0.55)_100%)]"
          />
        </div>
        <figcaption className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2 sm:bottom-5 sm:left-6 sm:right-6">
          <span className="rounded-full border border-white/20 bg-[#1b241d]/50 px-3 py-1 text-[0.65rem] font-medium tracking-[0.14em] text-[#e8f4dc] uppercase backdrop-blur-sm">
            {impactIndex.photoStamp}
          </span>
        </figcaption>
        </figure>
      </div>
    </section>
  )
}

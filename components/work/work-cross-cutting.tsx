import Image from "next/image"

import fieldImage from "@/public/work/priority.jpg"
import { ourWorkCrossCutting } from "@/lib/data/our-work"

export function WorkCrossCutting() {
  return (
    <section
      id="cross-cutting"
      aria-labelledby="work-cross-title"
      className="canvas-panel scroll-mt-32 overflow-hidden bg-[#27332A] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div>
          <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
            {ourWorkCrossCutting.eyebrow}
          </p>
          <h2
            id="work-cross-title"
            className="mt-3 m-0 max-w-[14ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#f7fbf5]"
          >
            {ourWorkCrossCutting.heading}
          </h2>
          <p className="mt-5 m-0 max-w-[40ch] text-[1.02rem] leading-[1.7] text-[#c9d6c6]">
            {ourWorkCrossCutting.intro}
          </p>
          <figure className="relative mt-10 aspect-[5/4] overflow-hidden rounded-[1.5rem]">
            <Image
              src={fieldImage}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>

        <ol className="m-0 flex list-none flex-col p-0">
          {ourWorkCrossCutting.items.map((item, index) => (
            <li
              key={item.title}
              className="border-t border-white/10 py-8 last:border-b last:pb-0"
            >
              <p className="m-0 text-[0.68rem] font-medium tracking-[0.16em] text-[#315e13] uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.35rem] font-medium tracking-[-0.03em] text-[#f7fbf5]">
                {item.title}
              </h3>
              <p className="mt-3 m-0 max-w-[52ch] text-sm leading-6 text-[#c9d6c6]">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

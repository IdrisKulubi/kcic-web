import Image, { type StaticImageData } from "next/image"

import agricultureImage from "@/public/work/land.jpg"
import circularImage from "@/public/work/renew.jpg"
import mobilityImage from "@/public/work/bikes.png"
import natureImage from "@/public/work/forest.jpg"
import renewableImage from "@/public/work/solar.png"
import waterImage from "@/public/work/water.jpg"
import { ourWorkSectors } from "@/lib/data/our-work"

const sectorImages: Record<string, StaticImageData> = {
  "renewable-energy": renewableImage,
  "circular-economy": circularImage,
  mobility: mobilityImage,
  "nature-based-solutions": natureImage,
  water: waterImage,
  agriculture: agricultureImage,
}

export function WorkSectors() {
  return (
    <section
      id="sectors"
      aria-labelledby="work-sectors-title"
      className="canvas-panel scroll-mt-32 bg-[#f7fbf5] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
          {ourWorkSectors.eyebrow}
        </p>
        <div className="mt-3 flex max-w-4xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="work-sectors-title"
            className="m-0 max-w-[16ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            {ourWorkSectors.heading}
          </h2>
          <p className="m-0 max-w-[42ch] text-[1.02rem] leading-[1.7] text-[#566159]">
            {ourWorkSectors.intro}
          </p>
        </div>

        <ul className="mt-12 m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
          {ourWorkSectors.items.map((sector, index) => {
            const image = sectorImages[sector.slug]
            const featured = index === 0 || index === 5
            return (
              <li
                key={sector.slug}
                id={sector.slug}
                className={
                  featured
                    ? "md:col-span-2 lg:col-span-1 lg:row-span-1"
                    : undefined
                }
              >
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-[#eef3eb]">
                  {image ? (
                    <div
                      className={
                        featured
                          ? "relative aspect-[16/10] overflow-hidden"
                          : "relative aspect-[16/9] overflow-hidden"
                      }
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
                    <p className="m-0 text-[0.65rem] font-medium tracking-[0.16em] text-[#315e13] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.35rem] font-medium tracking-[-0.03em] text-[#1b241d]">
                      {sector.title}
                    </h3>
                    <p className="mt-3 m-0 text-sm leading-6 text-[#566159]">
                      {sector.body}
                    </p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

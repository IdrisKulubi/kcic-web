import Image from "next/image"
import Link from "next/link"

import climateImage from "@/public/work/work2.jpg"
import fieldImage from "@/public/work/team1.jpg"
import peopleImage from "@/public/work/work3.jpg"
import { ourWorkIndex } from "@/lib/data/our-work"

export function WorkIndex() {
  return (
    <section
      aria-labelledby="our-work-title"
      className="canvas-panel relative overflow-hidden bg-[#f4f7f2] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.7fr)] lg:gap-16">
        <div>
          <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
            {ourWorkIndex.eyebrow}
          </p>
          <h1
            id="our-work-title"
            className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] font-medium tracking-[-0.05em] text-[#1b241d]"
          >
            {ourWorkIndex.headline}
          </h1>
          <p className="mt-6 m-0 max-w-[42ch] text-[1.05rem] leading-[1.7] text-[#566159]">
            {ourWorkIndex.lede}
          </p>
        </div>

        <nav aria-label="Our work chapters" className="lg:pb-2">
          <ol className="m-0 flex list-none flex-col gap-0 border-t border-[#1b241d]/10 p-0">
            {ourWorkIndex.chapters.map((chapter) => (
              <li key={chapter.number} className="border-b border-[#1b241d]/10">
                <Link
                  href={chapter.pageHref}
                  className="group flex min-h-14 items-baseline justify-between gap-4 py-3.5 text-[#1b241d] transition-colors hover:text-[#315e13] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
                >
                  <span className="text-[0.68rem] font-medium tracking-[0.16em] text-[#315e13] uppercase">
                    {chapter.number}
                  </span>
                  <span className="flex-1 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.05rem] font-medium tracking-[-0.02em]">
                    {chapter.title}
                  </span>
                  <span
                    aria-hidden
                    className="text-[#7fcc2f] transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-3 gap-3 sm:mt-16 sm:gap-4 lg:mt-20">
        <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] sm:aspect-[5/4] lg:translate-y-3">
          <Image
            src={fieldImage}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 28vw, 33vw"
            className="object-cover"
          />
        </figure>
        <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] sm:aspect-[5/4] lg:-translate-y-6">
          <Image
            src={climateImage}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 28vw, 33vw"
            className="object-cover"
          />
        </figure>
        <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] sm:aspect-[5/4] lg:translate-y-8">
          <Image
            src={peopleImage}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 28vw, 33vw"
            className="object-cover"
          />
        </figure>
      </div>
    </section>
  )
}

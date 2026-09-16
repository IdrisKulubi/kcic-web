import { newsPageCopy } from "@/lib/data/news"

export function NewsroomIntro() {
  return (
    <section
      aria-labelledby="newsroom-intro-title"
      className="canvas-panel bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
          {newsPageCopy.eyebrow}
        </p>
        <h1
          id="newsroom-intro-title"
          className="mt-3 m-0 max-w-[18ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.04em] text-[#1b241d]"
        >
          {newsPageCopy.heading}
        </h1>
        <p className="mt-5 m-0 max-w-[48ch] text-[1.05rem] leading-[1.7] text-[#566159]">
          {newsPageCopy.lede}
        </p>
      </div>
    </section>
  )
}

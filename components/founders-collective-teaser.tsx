import Link from "next/link"

export function FoundersCollectiveTeaser() {
  return (
    <section
      id="founders-collective"
      aria-labelledby="founders-collective-teaser-title"
      className="canvas-panel scroll-mt-24 border border-[#1b241d]/8 bg-[linear-gradient(135deg,#f4f7f2_0%,#e8f3ea_48%,rgb(127_204_47/0.12)_100%)] px-5 py-10 sm:px-8 sm:py-12 lg:px-[clamp(2rem,5vw,4.25rem)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <p className="mb-3 text-[0.7rem] font-medium tracking-[0.18em] text-[#566159] uppercase">
            Founders Collective
          </p>
          <h2
            id="founders-collective-teaser-title"
            className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.5rem,2.8vw,2.15rem)] leading-[1.12] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            Connected for growth. Building climate impact together.
          </h2>
          <p className="mt-4 max-w-[58ch] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-[#566159]">
            A founder-first community for KCIC alumni and climate entrepreneurs
            across the ecosystem: relationships, capability, markets, capital, and
            peer support as your enterprise grows.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/founders-collective"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#7FCC2F] px-6 text-sm font-semibold text-[#1b241d] transition-colors duration-200 ease-out hover:bg-[#6BBA21] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]"
          >
            View more
            <span className="ml-2" aria-hidden="true">
              ↗
            </span>
          </Link>
     
        </div>
      </div>
    </section>
  )
}

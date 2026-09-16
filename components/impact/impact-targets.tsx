import { impactTargets } from "@/lib/data/impact"

export function ImpactTargets() {
  return (
    <section
      id={impactTargets.id}
      aria-labelledby="impact-targets-title"
      className="canvas-panel scroll-mt-32 overflow-hidden bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <div>
            <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#005a7c] uppercase">
              {impactTargets.eyebrow}
            </p>
            <h2
              id="impact-targets-title"
              className="mt-3 m-0 max-w-[16ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.7rem,3vw,2.45rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
            >
              {impactTargets.heading}
            </h2>
            <p className="mt-4 m-0 max-w-[48ch] text-sm leading-[1.65] text-[#566159]">
              {impactTargets.intro}
            </p>
          </div>
          <div className="flex items-baseline gap-3 border-b border-dashed border-[#005a7c]/40 pb-2 lg:min-w-[11rem] lg:justify-end">
            <span className="text-[0.68rem] font-semibold tracking-[0.18em] text-[#005a7c] uppercase">
              Horizon
            </span>
            <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2.4rem,5vw,3.5rem)] leading-none font-medium tracking-[-0.05em] text-[#005a7c] tabular-nums">
              {impactTargets.horizonLabel}
            </span>
          </div>
        </div>

        <ul
          className="mt-10 m-0 grid list-none grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-[#005a7c]/12 p-0 sm:grid-cols-3 lg:mt-12 lg:grid-cols-4"
        >
          {impactTargets.targets.map((target) => (
            <li
              key={target.id}
              className="flex flex-col justify-between gap-4 bg-[#f4f7f2] px-4 py-5 sm:px-5 sm:py-6"
            >
              <div>
                <p className="m-0 text-[0.62rem] font-semibold tracking-[0.14em] text-[#005a7c] uppercase">
                  Target
                </p>
                {target.qualitative ? (
                  <p className="mt-3 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.05rem] font-medium tracking-[-0.02em] text-[#1b241d]">
                    {target.label}
                  </p>
                ) : (
                  <p className="mt-2 m-0 flex flex-wrap items-baseline gap-1.5">
                    <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium tracking-[-0.04em] text-[#1b241d] tabular-nums">
                      {target.value}
                    </span>
                    {target.unit ? (
                      <span className="text-[0.7rem] font-medium text-[#566159]">
                        {target.unit}
                      </span>
                    ) : null}
                  </p>
                )}
              </div>
              {!target.qualitative ? (
                <p className="m-0 text-[0.88rem] leading-snug font-medium tracking-[-0.02em] text-[#27332a]">
                  {target.label}
                </p>
              ) : (
                <p className="m-0 text-[0.72rem] leading-5 text-[#566159]">
                  Qualitative ambition
                </p>
              )}
              {target.note ? (
                <p className="m-0 text-[0.72rem] leading-5 text-[#566159]">
                  {target.note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mt-6 m-0 max-w-[62ch] text-sm leading-6 text-[#566159]">
          {impactTargets.jobsConflictNote}
        </p>
      </div>
    </section>
  )
}

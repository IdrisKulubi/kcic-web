import { impactTargets } from "@/lib/data/impact"

export function ImpactTargets() {
  return (
    <section
      id={impactTargets.id}
      aria-labelledby="impact-targets-title"
      className="canvas-panel scroll-mt-32 overflow-hidden bg-[#f4f7f2] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#005a7c] uppercase">
          {impactTargets.eyebrow}
        </p>
        <h2
          id="impact-targets-title"
          className="mt-3 m-0 max-w-[16ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {impactTargets.heading}
        </h2>
        <p className="mt-5 m-0 max-w-[52ch] text-[1.02rem] leading-[1.7] text-[#566159]">
          {impactTargets.intro}
        </p>

        <div
          aria-hidden="true"
          className="mt-10 flex items-center gap-4 border-b border-dashed border-[#005a7c]/35 pb-3"
        >
          <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.7rem] font-semibold tracking-[0.2em] text-[#005a7c] uppercase">
            Horizon
          </span>
          <span className="h-px flex-1 bg-[linear-gradient(90deg,#00adef/0.4,transparent)]" />
          <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-2xl font-medium tracking-[-0.04em] text-[#005a7c] tabular-nums">
            {impactTargets.horizonLabel}
          </span>
        </div>

        <ul className="mt-8 m-0 flex list-none flex-col gap-0 p-0">
          {impactTargets.targets.map((target) => (
            <li
              key={target.id}
              className="grid gap-3 border-b border-[#1b241d]/10 py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-6 sm:py-7"
            >
              <div className="flex flex-wrap items-baseline gap-2 sm:flex-col sm:items-start sm:gap-1">
                <span
                  className="inline-flex rounded-full border border-[#005a7c]/25 bg-[#eaf6f4] px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] text-[#005a7c] uppercase"
                >
                  Target
                </span>
                {!target.qualitative ? (
                  <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-[-0.04em] text-[#1b241d] tabular-nums">
                    {target.value}
                    {target.unit ? (
                      <span className="ml-1 text-sm font-medium text-[#566159]">
                        {target.unit}
                      </span>
                    ) : null}
                  </span>
                ) : (
                  <span className="text-sm font-medium text-[#566159]">
                    Qualitative ambition
                  </span>
                )}
              </div>
              <div>
                <p className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.05rem] font-medium tracking-[-0.02em] text-[#1b241d]">
                  {target.label}
                </p>
                {target.note ? (
                  <p className="mt-2 m-0 text-sm leading-6 text-[#566159]">
                    {target.note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 m-0 max-w-[58ch] rounded-[1rem] border border-[#005a7c]/15 bg-[#eaf6f4]/60 px-4 py-3 text-sm leading-6 text-[#566159]">
          {impactTargets.jobsConflictNote}
        </p>
      </div>
    </section>
  )
}

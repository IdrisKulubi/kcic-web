import { careersContact } from "@/lib/data/careers"

export function CareersContact() {
  return (
    <section
      aria-labelledby="careers-contact-title"
      className="canvas-panel scroll-mt-24 bg-[#27332A] px-5 py-12 sm:px-8 sm:py-14 lg:px-[clamp(2rem,5vw,4.25rem)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2
            id="careers-contact-title"
            className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-[#f7fbf5]"
          >
            {careersContact.heading}
          </h2>
          <p className="mt-2 m-0 max-w-[42ch] text-sm leading-6 text-[#cfdfcb]">
            {careersContact.body}
          </p>
          <p className="mt-3 m-0 text-sm text-[#bdd0b9]">
            <a
              href={`mailto:${careersContact.email}`}
              className="text-[#c9dcc4] underline-offset-4 hover:underline"
            >
              {careersContact.email}
            </a>
            <span aria-hidden="true" className="mx-2">·</span>
            <a
              href={careersContact.phoneHref}
              className="text-[#c9dcc4] underline-offset-4 hover:underline"
            >
              {careersContact.phone}
            </a>
          </p>
        </div>
        <a
          href={`mailto:${careersContact.email}`}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#7fcc2f] px-6 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.1em] text-[#1b241d] uppercase transition-colors duration-200 ease-out hover:bg-[#8fd83f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7fbf5]"
        >
          {careersContact.ctaLabel}
          <span className="ml-2" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

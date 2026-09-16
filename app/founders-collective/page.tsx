import Link from "next/link"
import type { Metadata } from "next"

import { FoundersCollectiveFaq } from "@/components/founders-collective-faq"
import { SiteFooter } from "@/components/site-footer"
import {
  FOUNDERS_COLLECTIVE_APPLY_URL,
  foundersCollectiveActivities,
  foundersCollectiveBenefits,
  foundersCollectiveClosing,
  foundersCollectiveEligibility,
  foundersCollectiveJoinSteps,
  foundersCollectiveMembership,
  foundersCollectiveMeta,
  foundersCollectivePaymentAccounts,
  foundersCollectiveWhat,
  foundersCollectiveWhy,
} from "@/lib/data/founders-collective"

export const metadata: Metadata = {
  title: `${foundersCollectiveMeta.title} | KCIC`,
  description: foundersCollectiveMeta.description,
}

function ApplyLink({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={FOUNDERS_COLLECTIVE_APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

export default function FoundersCollectivePage() {
  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(0,173,239,0.10),transparent_25%),radial-gradient(circle_at_88%_60%,rgba(127,204,47,0.12),transparent_28%)]"
      />
      <div className="relative z-10 flex flex-col gap-(--canvas-gutter) p-(--canvas-gutter)">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-col gap-(--canvas-gutter) outline-none"
        >
          <section
            aria-labelledby="fc-hero-title"
            className="canvas-panel scroll-mt-24 bg-[#27332A] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
          >
            <div className="mx-auto max-w-7xl">
              <p className="mb-4 text-[0.7rem] font-medium tracking-[0.18em] text-[#c9dcc4] uppercase">
                KCIC Founders Collective
              </p>
              <h1
                id="fc-hero-title"
                className="m-0 max-w-[16ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.06] font-medium tracking-[-0.04em] text-[#f7fbf5]"
              >
                {foundersCollectiveMeta.title}
              </h1>
              <p className="mt-5 max-w-[42ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-snug text-[#cfdfcb]">
                {foundersCollectiveMeta.tagline}
              </p>
              <ApplyLink className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#7fcc2f] px-6 text-sm font-semibold text-[#1b241d] transition-colors duration-200 ease-out hover:bg-[#8fd83f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7fbf5]">
                Apply to join
                <span className="ml-2" aria-hidden="true">
                  ↗
                </span>
              </ApplyLink>
            </div>
          </section>

          <section
            aria-labelledby="fc-what-why"
            className="canvas-panel scroll-mt-24 bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)]"
          >
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2
                  id="fc-what-why"
                  className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-xl font-medium tracking-[-0.02em] text-[#1b241d] sm:text-2xl"
                >
                  {foundersCollectiveWhat.title}
                </h2>
                <p className="mt-4 text-[#566159] leading-[1.7]">
                  {foundersCollectiveWhat.body}
                </p>
              </div>
              <div>
                <h2 className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-xl font-medium tracking-[-0.02em] text-[#1b241d] sm:text-2xl">
                  {foundersCollectiveWhy.title}
                </h2>
                <p className="mt-4 text-[#566159] leading-[1.7]">
                  {foundersCollectiveWhy.body}
                </p>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="fc-benefits-title"
            className="canvas-panel scroll-mt-24 border border-[#1b241d]/8 bg-[linear-gradient(180deg,rgb(255_255_255/0.55)_0%,rgb(244_247_242/0.95)_100%)] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)]"
          >
            <div className="mx-auto max-w-7xl">
              <h2
                id="fc-benefits-title"
                className="m-0 max-w-[20ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.65rem,2.8vw,2.25rem)] font-medium tracking-[-0.03em] text-[#1b241d]"
              >
                What members get
              </h2>
              <ol className="mt-10 m-0 list-none space-y-0 divide-y divide-[#1b241d]/10 p-0">
                {foundersCollectiveBenefits.map((benefit, index) => (
                  <li
                    key={benefit.name}
                    className="grid gap-3 py-8 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-10"
                  >
                    <span
                      className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-medium tracking-[-0.04em] text-[#7fcc2f]/90 tabular-nums"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="m-0 text-lg font-semibold text-[#1b241d]">
                        {benefit.name}
                      </h3>
                      <p className="mt-2 max-w-[62ch] text-[#566159] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            aria-labelledby="fc-eligibility-title"
            className="canvas-panel scroll-mt-24 bg-[#1b241d] px-5 py-14 text-[#f7fbf5] sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)]"
          >
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2
                  id="fc-eligibility-title"
                  className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-[-0.03em]"
                >
                  {foundersCollectiveEligibility.title}
                </h2>
                <p className="mt-4 text-[#cfdfcb]">{foundersCollectiveEligibility.intro}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[#cfdfcb] marker:text-[#7fcc2f]">
                  {foundersCollectiveEligibility.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-[#bdd0b9]">
                  {foundersCollectiveEligibility.qualification}
                </p>
              </div>
              <div>
                <h2 className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-[-0.03em]">
                  {foundersCollectiveActivities.title}
                </h2>
                <p className="mt-4 text-[#cfdfcb]">{foundersCollectiveActivities.intro}</p>
                <ul className="mt-4 list-none space-y-3 p-0">
                  {foundersCollectiveActivities.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[#cfdfcb] before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-[#00adef] before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="fc-membership-title"
            className="canvas-panel scroll-mt-24 px-5 py-12 sm:px-8 lg:px-[clamp(2rem,5vw,4.25rem)]"
          >
            <div className="mx-auto max-w-7xl rounded-2xl border border-[#1b241d]/10 bg-[#f4f7f2] px-6 py-10 sm:px-10 sm:py-12">
              <h2
                id="fc-membership-title"
                className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-xl font-medium text-[#1b241d] sm:text-2xl"
              >
                Membership
              </h2>
              <p className="mt-4 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-[-0.03em] text-[#315e13]">
                {foundersCollectiveMembership.fee}{" "}
                <span className="text-lg font-normal text-[#566159]">
                  {foundersCollectiveMembership.period}
                </span>
              </p>
              <p className="mt-3 max-w-[52ch] text-[#566159] leading-relaxed">
                {foundersCollectiveMembership.note}
              </p>
            </div>
          </section>

          <section
            aria-labelledby="fc-join-title"
            className="canvas-panel scroll-mt-24 bg-[linear-gradient(135deg,#eef6ef_0%,#e8f3ea_100%)] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)]"
          >
            <div className="mx-auto max-w-7xl">
              <h2
                id="fc-join-title"
                className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.65rem,2.8vw,2.25rem)] font-medium tracking-[-0.03em] text-[#1b241d]"
              >
                How to join
              </h2>
              <ol className="mt-10 m-0 list-none space-y-10 p-0">
                {foundersCollectiveJoinSteps.map((step) => (
                  <li key={step.step} className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                    <span
                      className="flex size-10 items-center justify-center rounded-full bg-[#1b241d] font-semibold text-[#f7fbf5]"
                      aria-hidden="true"
                    >
                      {step.step}
                    </span>
                    <div>
                      <h3 className="m-0 text-lg font-semibold text-[#1b241d]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[65ch] text-[#566159] leading-relaxed">
                        {step.body}
                      </p>
                      {"ctaHref" in step && step.ctaHref ? (
                        <ApplyLink className="mt-4 inline-flex min-h-10 items-center rounded-full border border-[#1b241d]/20 bg-white px-5 text-sm font-semibold text-[#1b241d] transition-colors hover:border-[#315e13] hover:text-[#315e13] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]">
                          {step.ctaLabel}
                          <span className="ml-2" aria-hidden="true">
                            ↗
                          </span>
                        </ApplyLink>
                      ) : null}
                      {"paymentDetails" in step && step.paymentDetails ? (
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {foundersCollectivePaymentAccounts.map((account) => (
                            <div
                              key={account.label}
                              className="rounded-xl border border-[#1b241d]/10 bg-white/80 p-5"
                            >
                              <h4 className="m-0 text-sm font-semibold text-[#1b241d]">
                                {account.label}
                              </h4>
                              <dl className="mt-3 space-y-2">
                                {account.rows.map((row) => (
                                  <div key={row.label}>
                                    <dt className="text-xs text-[#566159]">
                                      {row.label}
                                    </dt>
                                    <dd className="m-0 font-medium text-[#1b241d] tabular-nums">
                                      {row.value}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            aria-labelledby="fc-faq-title"
            className="canvas-panel scroll-mt-24 px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)]"
          >
            <div className="mx-auto max-w-3xl">
              <h2
                id="fc-faq-title"
                className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.65rem,2.8vw,2.25rem)] font-medium tracking-[-0.03em] text-[#1b241d]"
              >
                Frequently asked questions
              </h2>
              <div className="mt-8">
                <FoundersCollectiveFaq />
              </div>
            </div>
          </section>

          <section
            aria-labelledby="fc-closing-title"
            className="canvas-panel scroll-mt-24 bg-[#27332A] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)]"
          >
            <div className="mx-auto max-w-7xl text-center lg:text-left">
              <p className="text-sm font-medium tracking-wide text-[#8fa88c] uppercase">
                Applications are ongoing
              </p>
              <h2
                id="fc-closing-title"
                className="mx-auto mt-4 max-w-[48ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.5rem,2.8vw,2.1rem)] leading-snug font-medium tracking-[-0.03em] text-[#f7fbf5] lg:mx-0"
              >
                {foundersCollectiveClosing}
              </h2>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <ApplyLink className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#7fcc2f] px-6 text-sm font-semibold text-[#1b241d] transition-colors duration-200 ease-out hover:bg-[#8fd83f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7fbf5]">
                  Apply to join
                  <span className="ml-2" aria-hidden="true">
                    ↗
                  </span>
                </ApplyLink>
                <Link
                  href="/"
                  className="text-sm font-medium text-[#cfdfcb] underline-offset-4 hover:text-[#f7fbf5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7fbf5]"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

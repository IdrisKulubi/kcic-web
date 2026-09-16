import Link from "next/link"
import { ArrowLeft, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr"

import type { OpportunityWithAttachments } from "@/lib/actions/opportunities"
import {
  careersDetailCopy,
  careersListCopy,
  formatEngagement,
} from "@/lib/data/careers"
import { deriveOpportunityStatus } from "@/lib/opportunity/status"
import {
  formatProcurementDate,
  formatProcurementDateTime,
} from "@/lib/procurement/format"
import { cn } from "@/lib/utils"

function HtmlBlock({ html, heading }: { html: string; heading: string }) {
  const trimmed = html.trim()
  if (!trimmed) return null
  return (
    <div>
      {heading ? (
        <h2
          className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]"
        >
          {heading}
        </h2>
      ) : null}
      <div
        className={cn(
          "prose prose-sm max-w-none text-[#566159] prose-headings:font-['Gotham','Century_Gothic',Arial,sans-serif] prose-headings:text-[#1b241d] prose-a:text-[#005a7c]",
          heading ? "mt-4" : ""
        )}
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    </div>
  )
}

interface CareersDetailProps {
  opportunity: OpportunityWithAttachments
}

export function CareersDetail({ opportunity }: CareersDetailProps) {
  const status = deriveOpportunityStatus(opportunity)
  const isOpen = status === "open"
  const engagement = formatEngagement(
    opportunity.employmentType,
    opportunity.workMode
  )

  return (
    <article className="canvas-panel scroll-mt-24 bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/about/careers"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#005a7c] underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {careersDetailCopy.backLink}
        </Link>

        {!isOpen ? (
          <p
            role="status"
            className="mt-8 rounded-[1rem] border border-[#d9e1d8] bg-[#eef3eb] px-5 py-4 text-sm leading-6 text-[#566159]"
          >
            {careersDetailCopy.closedBanner}
          </p>
        ) : null}

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
                isOpen
                  ? "bg-[#e8f4dc] text-[#315e13]"
                  : "bg-[#e8ecef] text-[#566159]"
              )}
            >
              {isOpen
                ? careersListCopy.openStatus
                : careersListCopy.closedStatus}
            </span>
            <span className="text-sm text-[#566159]">{engagement}</span>
          </div>
          <h1
            className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
          >
            {opportunity.title}
          </h1>
          <dl className="mt-4 grid gap-2 text-sm text-[#566159] sm:grid-cols-2">
            <div>
              <dt className="font-medium text-[#315e13]">Location</dt>
              <dd className="m-0">
                {opportunity.location ?? careersListCopy.locationFallback}
              </dd>
            </div>
            {opportunity.department ? (
              <div>
                <dt className="font-medium text-[#315e13]">Department</dt>
                <dd className="m-0">{opportunity.department}</dd>
              </div>
            ) : null}
            {opportunity.deadline ? (
              <div>
                <dt className="font-medium text-[#315e13]">
                  {careersListCopy.closesLabel}
                </dt>
                <dd className="m-0">
                  {formatProcurementDateTime(opportunity.deadline)}
                </dd>
              </div>
            ) : null}
            {opportunity.issuedDate ? (
              <div>
                <dt className="font-medium text-[#315e13]">Posted</dt>
                <dd className="m-0">
                  {formatProcurementDate(opportunity.issuedDate)}
                </dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-6 m-0 text-[1.05rem] leading-[1.75] text-[#566159]">
            {opportunity.summary}
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-10 border-t border-[#d9e1d8] pt-10">
          <HtmlBlock
            html={opportunity.description ?? ""}
            heading={careersDetailCopy.descriptionHeading}
          />
          <HtmlBlock
            html={opportunity.responsibilities ?? ""}
            heading={careersDetailCopy.responsibilitiesHeading}
          />
          <HtmlBlock
            html={opportunity.requirements ?? ""}
            heading={careersDetailCopy.requirementsHeading}
          />
          <HtmlBlock
            html={opportunity.qualifications ?? ""}
            heading={careersDetailCopy.qualificationsHeading}
          />

          {(opportunity.applicationInstructions ||
            opportunity.applicationEmail ||
            opportunity.applicationLink) && (
            <div>
              <h2
                className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]"
              >
                {careersDetailCopy.applyHeading}
              </h2>
              <HtmlBlock
                html={opportunity.applicationInstructions ?? ""}
                heading=""
              />
              {isOpen ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {opportunity.applicationLink ? (
                    <a
                      href={opportunity.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#7fcc2f] px-6 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.1em] text-[#1b241d] uppercase hover:bg-[#8fd83f]"
                    >
                      {careersDetailCopy.applyExternal}
                      <ArrowSquareOut className="size-4" aria-hidden />
                    </a>
                  ) : null}
                  {opportunity.applicationEmail ? (
                    <a
                      href={`mailto:${opportunity.applicationEmail}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-[#7fcc2f]/45 px-6 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.1em] text-[#315e13] uppercase hover:bg-[#eef8e4]"
                    >
                      {careersDetailCopy.applyEmail}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

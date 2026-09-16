"use client"

import { ArrowSquareOut, DownloadSimple, FilePdf } from "@phosphor-icons/react"

import {
  impactReports,
  impactReportsCopy,
} from "@/lib/data/impact"

function formatDate(iso: string | null) {
  if (!iso) return "Date pending"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function yearFromReport(report: { publishedAt: string | null; reportingPeriod: string }) {
  if (report.publishedAt) {
    const y = new Date(report.publishedAt).getFullYear()
    if (!Number.isNaN(y)) return String(y)
  }
  const match = report.reportingPeriod.match(/\d{4}/)
  return match?.[0] ?? "—"
}

export function ImpactReports() {
  const hasReports = impactReports.length > 0

  return (
    <section
      id={impactReportsCopy.id}
      aria-labelledby="impact-reports-title"
      className="canvas-panel scroll-mt-32 overflow-hidden bg-[#eef3eb] px-5 py-16 sm:px-8 sm:py-20 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <p className="m-0 text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
          {impactReportsCopy.eyebrow}
        </p>
        <h2
          id="impact-reports-title"
          className="mt-3 m-0 max-w-[16ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {impactReportsCopy.heading}
        </h2>
        <p className="mt-5 m-0 max-w-[48ch] text-[1.02rem] leading-[1.7] text-[#566159]">
          {impactReportsCopy.intro}
        </p>

        {!hasReports ? (
          <div
            className="mt-12 rounded-[1.25rem] border border-dashed border-[#1b241d]/15 bg-[#f7fbf5] px-6 py-12 text-center sm:px-10"
          >
            <p className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-base font-medium text-[#1b241d]">
              {impactReportsCopy.emptyMessage}
            </p>
            <p className="mt-2 m-0 text-sm text-[#566159]">
              {impactReportsCopy.emptyHint}
            </p>
          </div>
        ) : (
          <ul className="mt-12 m-0 flex list-none flex-col gap-0 border-t border-[#1b241d]/10 p-0">
            {impactReports.map((report) => {
              const isExternal = report.href.startsWith("http")
              const year = yearFromReport(report)
              return (
                <li
                  key={report.id}
                  className="grid gap-4 border-b border-[#1b241d]/10 py-8 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
                >
                  <span
                    className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[1.75rem] font-medium tracking-[-0.04em] text-[#7fcc2f] tabular-nums"
                    aria-hidden="true"
                  >
                    {year}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-md bg-[#eef3eb] px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-[#315e13] uppercase"
                      >
                        <FilePdf className="size-3.5" aria-hidden />
                        {report.format}
                      </span>
                      <span className="text-xs text-[#566159]">
                        {report.reportingPeriod}
                      </span>
                    </div>
                    <h3 className="mt-2 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-base font-medium tracking-[-0.02em] text-[#1b241d]">
                      {report.title}
                    </h3>
                    {report.summary ? (
                      <p className="mt-1.5 m-0 text-sm leading-6 text-[#566159]">
                        {report.summary}
                      </p>
                    ) : null}
                    <p className="mt-1.5 m-0 text-xs text-[#566159]">
                      {formatDate(report.publishedAt)}
                      {report.fileSize ? ` · ${report.fileSize}` : ""}
                    </p>
                  </div>
                  <a
                    href={report.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    download={!isExternal ? true : undefined}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#7fcc2f]/45 bg-[#f7fbf5] px-5 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.08em] text-[#315e13] uppercase transition-colors duration-200 ease-out hover:border-[#7fcc2f] hover:bg-[#eef8e4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
                  >
                    {isExternal ? (
                      <>
                        {impactReportsCopy.openLabel}
                        <ArrowSquareOut className="size-4" aria-hidden />
                      </>
                    ) : (
                      <>
                        {impactReportsCopy.downloadLabel}
                        <DownloadSimple className="size-4" aria-hidden />
                      </>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

"use client"

import { useMemo, useState } from "react"
import { ArrowSquareOut, DownloadSimple, FilePdf } from "@phosphor-icons/react"

import {
  policyCategories,
  policyDocuments,
  policiesLibrary,
  type PolicyCategory,
  type PolicyDocument,
  type PolicyDocumentStatus,
} from "@/lib/data/policies"
import { cn } from "@/lib/utils"

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

function statusLabel(status: PolicyDocumentStatus) {
  switch (status) {
    case "current":
      return policiesLibrary.currentLabel
    case "archived":
      return policiesLibrary.archivedLabel
    case "superseded":
      return policiesLibrary.supersededLabel
  }
}

function StatusChip({ status }: { status: PolicyDocumentStatus }) {
  const label = statusLabel(status)
  const isCurrent = status === "current"
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
        isCurrent
          ? "bg-[#e8f4dc] text-[#315e13]"
          : "bg-[#e8ecef] text-[#566159]"
      )}
    >
      {label}
    </span>
  )
}

function DocumentRow({ doc }: { doc: PolicyDocument }) {
  const isExternal = doc.href.startsWith("http")
  return (
    <li
      className="flex flex-col gap-4 border-b border-[#d9e1d8] py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-md bg-[#eef3eb] px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-[#315e13] uppercase"
          >
            <FilePdf className="size-3.5" aria-hidden />
            {doc.type}
          </span>
          <StatusChip status={doc.status} />
        </div>
        <h3 className="mt-2 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-base font-medium tracking-[-0.02em] text-[#1b241d]">
          {doc.title}
        </h3>
        <p className="mt-1.5 m-0 text-sm text-[#566159]">
          <span>{formatDate(doc.publishedAt)}</span>
          <span aria-hidden="true" className="mx-2 text-[#c5d4c3]">·</span>
          <span>
            {doc.format}
            {doc.fileSize ? ` · ${doc.fileSize}` : ""}
          </span>
        </p>
      </div>
      <a
        href={doc.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        download={!isExternal ? true : undefined}
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#7fcc2f]/45 bg-[#f7fbf5] px-5 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.08em] text-[#315e13] uppercase transition-colors duration-200 ease-out hover:border-[#7fcc2f] hover:bg-[#eef8e4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
      >
        {isExternal ? (
          <>
            Open
            <ArrowSquareOut className="size-4" aria-hidden />
          </>
        ) : (
          <>
            Download
            <DownloadSimple className="size-4" aria-hidden />
          </>
        )}
      </a>
    </li>
  )
}

export function PoliciesLibrary() {
  const [category, setCategory] = useState<PolicyCategory>("all")

  const filtered = useMemo(() => {
    if (category === "all") return policyDocuments
    return policyDocuments.filter((doc) => doc.category === category)
  }, [category])

  const currentDocs = filtered.filter((doc) => doc.status === "current")
  const earlierDocs = filtered.filter(
    (doc) => doc.status === "archived" || doc.status === "superseded"
  )

  const isEmpty = policyDocuments.length === 0
  const isCategoryEmpty = !isEmpty && filtered.length === 0

  return (
    <section
      id="document-library"
      aria-labelledby="policies-library-title"
      className="canvas-panel scroll-mt-24 bg-[#eef3eb] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="policies-library-title"
          className="m-0 text-center font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d] sm:text-left"
        >
          {policiesLibrary.heading}
        </h2>

        <div
          className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start"
          role="tablist"
          aria-label="Document categories"
        >
          {policyCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={category === item.id}
              onClick={() => setCategory(item.id)}
              className={cn(
                "min-h-10 rounded-full px-4 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.68rem] font-medium tracking-[0.08em] uppercase transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f] sm:text-[0.72rem]",
                category === item.id
                  ? "border border-[#7fcc2f] bg-[#7fcc2f] text-[#1b241d] shadow-[0_8px_24px_-12px_rgba(127,204,47,0.65)]"
                  : "border border-[#7fcc2f]/45 bg-[#f7fbf5] text-[#315e13] hover:border-[#7fcc2f] hover:bg-[#eef8e4]"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className="mt-8 rounded-[1.25rem] border border-[#d9e1d8] bg-[#f7fbf5] px-5 sm:px-8"
          role="tabpanel"
        >
          {isEmpty ? (
            <div className="py-16 text-center">
              <p className="m-0 text-[#566159]">{policiesLibrary.emptyMessage}</p>
              <p className="mt-3 m-0 text-sm text-[#8a958c]">
                {policiesLibrary.emptyHint}
              </p>
              <a
                href="mailto:info@kenyacic.org"
                className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-[#005a7c] underline-offset-4 hover:underline"
              >
                info@kenyacic.org
              </a>
            </div>
          ) : isCategoryEmpty ? (
            <p className="py-12 text-center text-[#566159]">
              No documents in this category yet.
            </p>
          ) : (
            <>
              {currentDocs.length > 0 ? (
                <ul className="m-0 list-none p-0">
                  {currentDocs.map((doc) => (
                    <DocumentRow key={doc.id} doc={doc} />
                  ))}
                </ul>
              ) : null}

              {earlierDocs.length > 0 ? (
                <div className={currentDocs.length > 0 ? "border-t border-[#d9e1d8] pt-6" : ""}>
                  <h3 className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-sm font-medium tracking-[0.06em] text-[#566159] uppercase">
                    {policiesLibrary.earlierVersionsHeading}
                  </h3>
                  <ul className="mt-4 m-0 list-none p-0">
                    {earlierDocs.map((doc) => (
                      <DocumentRow key={doc.id} doc={doc} />
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

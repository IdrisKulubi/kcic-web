"use client"

import { Check, CopySimple, ShareNetwork } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

import { programmeDetailCopy } from "@/lib/data/programmes"

interface ProgrammeShareProps {
  title: string
}

export function ProgrammeShare({ title }: ProgrammeShareProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function"

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  async function copyLink() {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const field = document.createElement("textarea")
      field.value = url
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.left = "-9999px"
      document.body.appendChild(field)
      field.select()
      document.execCommand("copy")
      document.body.removeChild(field)
    }
    setCopied(true)
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1800)
  }

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url: window.location.href })
    } catch {
      /* user cancelled or share failed */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d9e1d8] bg-[#f7fbf5] px-4 text-[0.72rem] font-medium tracking-[0.06em] text-[#315e13] uppercase transition-colors hover:border-[#7fcc2f]/50 hover:bg-[#fafcf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
      >
        {copied ? (
          <Check className="size-4" weight="bold" aria-hidden />
        ) : (
          <CopySimple className="size-4" aria-hidden />
        )}
        {copied ? programmeDetailCopy.copyLinkCopied : programmeDetailCopy.copyLinkLabel}
      </button>
      {canNativeShare ? (
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d9e1d8] bg-[#f7fbf5] px-4 text-[0.72rem] font-medium tracking-[0.06em] text-[#315e13] uppercase transition-colors hover:border-[#7fcc2f]/50 hover:bg-[#fafcf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
        >
          <ShareNetwork className="size-4" aria-hidden />
          {programmeDetailCopy.shareLabel}
        </button>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {copied ? programmeDetailCopy.copyLinkCopied : ""}
      </span>
    </div>
  )
}

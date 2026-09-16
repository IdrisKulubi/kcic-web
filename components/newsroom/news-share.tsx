"use client"

import {
  Check,
  CopySimple,
  LinkedinLogo,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react"
import { useEffect, useMemo, useRef, useState } from "react"

import { newsArticleCopy } from "@/lib/data/news"
import { cn } from "@/lib/utils"

interface NewsShareProps {
  title: string
  layout?: "inline" | "stack"
}

function buildShareLinks(title: string, url: string) {
  const text = `${title} — ${url}`
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }
}

export function NewsShare({ title, layout = "inline" }: NewsShareProps) {
  const [copied, setCopied] = useState(false)
  const [pageUrl, setPageUrl] = useState("")
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setPageUrl(window.location.href)
  }, [])

  const links = useMemo(
    () => (pageUrl ? buildShareLinks(title, pageUrl) : null),
    [title, pageUrl]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  async function copyLink() {
    const url = pageUrl || window.location.href
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

  const isStack = layout === "stack"

  return (
    <div
      className={cn(
        isStack ? "flex flex-col gap-2" : "flex flex-wrap items-center gap-2"
      )}
      role="group"
      aria-label={newsArticleCopy.shareGroupLabel}
    >
      <button
        type="button"
        onClick={copyLink}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d9e1d8] bg-[#f7fbf5] px-4 text-[0.72rem] font-medium tracking-[0.06em] text-[#315e13] uppercase transition-colors hover:border-[#7fcc2f]/50 hover:bg-[#fafcf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]",
          isStack && "w-full"
        )}
      >
        {copied ? (
          <Check className="size-4" weight="bold" aria-hidden />
        ) : (
          <CopySimple className="size-4" aria-hidden />
        )}
        {copied ? newsArticleCopy.shareCopied : newsArticleCopy.shareCopyLink}
      </button>

      {links ? (
        <>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d9e1d8] bg-[#f7fbf5] px-4 text-[0.72rem] font-medium tracking-[0.06em] text-[#315e13] uppercase no-underline transition-colors hover:border-[#7fcc2f]/50 hover:bg-[#fafcf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]",
              isStack && "w-full"
            )}
          >
            <WhatsappLogo className="size-4" weight="fill" aria-hidden />
            {newsArticleCopy.shareWhatsApp}
          </a>
          <a
            href={links.x}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d9e1d8] bg-[#f7fbf5] px-4 text-[0.72rem] font-medium tracking-[0.06em] text-[#315e13] uppercase no-underline transition-colors hover:border-[#7fcc2f]/50 hover:bg-[#fafcf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]",
              isStack && "w-full"
            )}
          >
            <XLogo className="size-4" weight="bold" aria-hidden />
            {newsArticleCopy.shareX}
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d9e1d8] bg-[#f7fbf5] px-4 text-[0.72rem] font-medium tracking-[0.06em] text-[#315e13] uppercase no-underline transition-colors hover:border-[#7fcc2f]/50 hover:bg-[#fafcf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]",
              isStack && "w-full"
            )}
          >
            <LinkedinLogo className="size-4" weight="fill" aria-hidden />
            {newsArticleCopy.shareLinkedIn}
          </a>
        </>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {copied ? newsArticleCopy.shareCopied : ""}
      </span>
    </div>
  )
}

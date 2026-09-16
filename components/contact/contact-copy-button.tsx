"use client"

import { Check, CopySimple } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

import { contactSplitCopy } from "@/lib/data/contact"

interface ContactCopyButtonProps {
  value: string
  label: string
}

export function ContactCopyButton({ value, label }: ContactCopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const field = document.createElement("textarea")
      field.value = value
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

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? contactSplitCopy.copied : label}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[#315e13] transition-colors duration-200 ease-out hover:bg-[#e8f4dc] hover:text-[#1b241d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
    >
      {copied ? (
        <Check className="size-5" weight="bold" aria-hidden />
      ) : (
        <CopySimple className="size-5" weight="regular" aria-hidden />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? contactSplitCopy.copied : label}
      </span>
    </button>
  )
}

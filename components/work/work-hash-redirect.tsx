"use client"

import { useEffect } from "react"

export function WorkHashRedirect({
  href,
  message = "Taking you to the right section…",
}: {
  href: string
  message?: string
}) {
  useEffect(() => {
    window.location.replace(href)
  }, [href])

  return <p className="px-6 py-16 text-sm text-[#566159]">{message}</p>
}

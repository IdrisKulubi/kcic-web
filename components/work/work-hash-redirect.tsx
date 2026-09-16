"use client"

import { useEffect } from "react"

export function WorkHashRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href)
  }, [href])

  return (
    <p className="px-6 py-16 text-sm text-[#566159]">Taking you to Our work…</p>
  )
}

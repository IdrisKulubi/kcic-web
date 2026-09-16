"use client"

import { useEffect, type MouseEvent } from "react"

function scrollToHash() {
  const id = window.location.hash.replace("#", "")
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
}

export function WorkHashScroll() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      scrollToHash()
    })
    window.addEventListener("hashchange", scrollToHash)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("hashchange", scrollToHash)
    }
  }, [])

  return null
}

export function handleSamePageHashClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string
) {
  const [path, hash] = href.split("#")
  if (!hash || pathname !== path) return
  event.preventDefault()
  window.history.pushState(null, "", `#${hash}`)
  document.getElementById(hash)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  })
}

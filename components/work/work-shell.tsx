import type { ReactNode } from "react"

import { SiteFooter } from "@/components/site-footer"

export function WorkShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative -mt-20 overflow-hidden bg-[linear-gradient(180deg,#eaf6f4_0%,#eef6ef_42%,#d7e4d8_72%,#8fa89a_100%)] max-[1050px]:-mt-17">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(127,204,47,0.14),transparent_26%),radial-gradient(circle_at_88%_72%,rgba(0,173,239,0.08),transparent_24%)]"
      />
      <div className="relative z-10 flex flex-col gap-(--canvas-gutter) p-(--canvas-gutter)">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-col gap-(--canvas-gutter) outline-none"
        >
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

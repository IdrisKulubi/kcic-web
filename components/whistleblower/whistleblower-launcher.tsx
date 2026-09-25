"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { ShieldWarning } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

const WhistleblowerDialog = dynamic(
  () =>
    import("@/components/whistleblower/whistleblower-dialog").then(
      (mod) => mod.WhistleblowerDialog
    ),
  { ssr: false }
)

export function WhistleblowerLauncher() {
  const [isLoaded, setIsLoaded] = useState(false)

  if (isLoaded) {
    return <WhistleblowerDialog initialOpen />
  }

  return (
    <Button
      type="button"
      size="sm"
      className="min-h-11 border-transparent bg-[#7fcc2f] px-5 text-[0.85rem] font-medium text-[#1b241d] hover:bg-[#e8f4dc] hover:text-[#1b241d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
      onClick={() => setIsLoaded(true)}
    >
      <ShieldWarning className="size-4 text-[#1b241d]" aria-hidden />
      Whistleblower
    </Button>
  )
}

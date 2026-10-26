"use client"

import { useTransition } from "react"
import { signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { SignOut } from "@phosphor-icons/react"

export function SignOutButton() {
  const [pending, startTransition] = useTransition()

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      aria-label="Sign out"
      className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
      onClick={() => {
        startTransition(async () => {
          await signOut()
          window.location.href = "/staff/login"
        })
      }}
    >
      <SignOut className="size-4" />
      <span className="group-data-[collapsible=icon]:hidden">
        {pending ? "Signing out…" : "Sign out"}
      </span>
    </Button>
  )
}

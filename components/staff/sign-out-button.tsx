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
      className="w-full justify-start gap-2"
      onClick={() => {
        startTransition(async () => {
          await signOut()
          window.location.href = "/staff/login"
        })
      }}
    >
      <SignOut className="size-4" />
      Sign out
    </Button>
  )
}

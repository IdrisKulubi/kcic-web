"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import logo from "@/public/KCIC logo.png"
import { WarningCircle } from "@phosphor-icons/react"

export default function StaffLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const result = await signIn.email({
      email,
      password,
      callbackURL: "/staff/news",
    })

    if (result.error) {
      setPending(false)
      setError("That email and password don't match a staff account.")
      return
    }

    // Full navigation so the new session cookie is sent on the next request.
    // Client router.push + refresh can race the cookie and trigger a second load.
    window.location.assign("/staff/news")
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image
          src={logo}
          alt="Kenya Climate Innovation Center"
          sizes="56px"
          priority
          className="h-auto w-14"
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-2xl font-bold tracking-[-0.02em]">
            Staff sign in
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage news and content on the KCIC website.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-xl bg-card p-6 ring-1 ring-border"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            aria-invalid={Boolean(error)}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "login-error" : undefined}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10"
          />
        </div>
        {error ? (
          <p
            id="login-error"
            role="alert"
            className="flex gap-2 rounded-lg bg-destructive/8 p-3 text-sm text-destructive"
          >
            <WarningCircle className="mt-0.5 size-4 shrink-0" weight="fill" aria-hidden />
            {error}
          </p>
        ) : null}
        <Button
          type="submit"
          disabled={pending}
          className="h-10 w-full rounded-lg font-semibold"
        >
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        No account? Ask a colleague with staff access to add you.{" "}
        <Link href="/" className="underline underline-offset-3 hover:text-foreground">
          Back to the website
        </Link>
      </p>
    </div>
  )
}

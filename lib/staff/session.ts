import { cache } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export const getStaffSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  })
})

type RequireStaffOptions = {
  /** When false, throws instead of redirecting (for server actions). */
  redirect?: boolean
}

export async function requireStaff(options: RequireStaffOptions = {}) {
  const { redirect: shouldRedirect = true } = options
  const session = await getStaffSession()

  if (!session?.user) {
    if (shouldRedirect) {
      redirect("/staff/login")
    }
    throw new Error("Unauthorized")
  }

  return session
}

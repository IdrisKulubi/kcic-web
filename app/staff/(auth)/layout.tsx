import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Staff sign in",
}

export default function StaffAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main
      data-staff-theme=""
      className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12"
    >
      {children}
    </main>
  )
}

import type { Metadata } from "next"
import { requireStaff } from "@/lib/staff/session"
import { StaffPanelShell } from "@/components/staff/staff-panel-shell"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: {
    default: "Staff",
    template: "%s · KCIC Staff",
  },
}

export default async function StaffPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireStaff()

  return (
    <StaffPanelShell
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
    >
      {children}
    </StaffPanelShell>
  )
}

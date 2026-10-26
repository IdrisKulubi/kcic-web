import type { Metadata } from "next"
import { listStaffUsersAction } from "@/lib/actions/staff-users"
import { getStaffSession } from "@/lib/staff/session"
import { AddStaffDialog } from "@/components/staff/add-staff-dialog"
import { StaffPageHeader } from "@/components/staff/staff-page-header"
import { StaffUsersTable } from "@/components/staff/staff-users-table"

export const metadata: Metadata = {
  title: "Staff accounts",
}

export default async function StaffUsersPage() {
  const session = await getStaffSession()
  const users = await listStaffUsersAction()
  const currentUserId = session?.user?.id ?? ""

  return (
    <div className="flex flex-col gap-6">
      <StaffPageHeader
        title="Staff accounts"
        description="People who can sign in and edit website content."
        actions={<AddStaffDialog />}
      />

      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
        <StaffUsersTable users={users} currentUserId={currentUserId} />
      </div>
    </div>
  )
}

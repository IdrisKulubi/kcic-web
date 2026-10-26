import type { Metadata } from "next"
import { listStaffUsersAction } from "@/lib/actions/staff-users"
import { AddStaffDialog } from "@/components/staff/add-staff-dialog"
import { StaffPageHeader } from "@/components/staff/staff-page-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Staff accounts",
}

export default async function StaffUsersPage() {
  const users = await listStaffUsersAction()

  return (
    <div className="flex flex-col gap-6">
      <StaffPageHeader
        title="Staff accounts"
        description="People who can sign in and edit website content."
        actions={<AddStaffDialog />}
      />

      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No staff accounts yet. Use the seed script or add a user above.
                </TableCell>
              </TableRow>
            ) : (
              users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.createdAt.toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

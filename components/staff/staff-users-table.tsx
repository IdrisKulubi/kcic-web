"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  EditStaffDialog,
  type StaffUserRow,
} from "@/components/staff/edit-staff-dialog"
import { StaffDeleteButton } from "@/components/staff/staff-delete-button"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PencilSimple } from "@phosphor-icons/react"

interface StaffUsersTableProps {
  users: StaffUserRow[]
  currentUserId: string
}

function formatCreated(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date
  return value.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function StaffUsersTable({ users, currentUserId }: StaffUsersTableProps) {
  const router = useRouter()
  const [editing, setEditing] = useState<StaffUserRow | null>(null)

  if (users.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        No staff accounts yet. Use the seed script or add a user above.
      </div>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[100px] text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((row) => {
            const isSelf = row.id === currentUserId
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">
                  {row.name}
                  {isSelf ? (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      (you)
                    </span>
                  ) : null}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatCreated(row.createdAt as Date)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Edit ${row.name}`}
                      onClick={() => setEditing(row)}
                    >
                      <PencilSimple className="size-4" />
                    </Button>
                    <StaffDeleteButton
                      userId={row.id}
                      userName={row.name}
                      disabled={isSelf}
                      disabledReason="You cannot delete your own account"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <EditStaffDialog
        user={editing}
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null)
        }}
        onSaved={() => router.refresh()}
      />
    </>
  )
}

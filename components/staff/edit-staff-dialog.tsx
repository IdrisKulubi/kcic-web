"use client"

import { useEffect, useState, useTransition } from "react"
import { updateStaffUserAction } from "@/lib/actions/staff-users"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface StaffUserRow {
  id: string
  name: string
  email: string
  createdAt?: Date | string
}

interface EditStaffDialogProps {
  user: StaffUserRow | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaved?: () => void
}

export function EditStaffDialog({
  user,
  open,
  onOpenChange,
  onSaved,
}: EditStaffDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    if (!user || !open) return
    setName(user.name)
    setEmail(user.email)
    setPassword("")
    setError(null)
  }, [user, open])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!user) return
    setError(null)

    startTransition(async () => {
      const result = await updateStaffUserAction({
        id: user.id,
        name,
        email,
        password: password.trim() ? password : undefined,
      })

      if (!result.success) {
        setError(result.error)
        return
      }

      onOpenChange(false)
      onSaved?.()
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit staff account</DialogTitle>
          <DialogDescription>
            Update name or email. Leave password blank to keep the current one.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-staff-name">Name</Label>
            <Input
              id="edit-staff-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-staff-email">Email</Label>
            <Input
              id="edit-staff-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-staff-password">New password</Label>
            <Input
              id="edit-staff-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={10}
              autoComplete="new-password"
              placeholder="Leave blank to keep current password"
              className="h-10"
            />
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">{error}</p>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending} className="font-semibold">
              {pending ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

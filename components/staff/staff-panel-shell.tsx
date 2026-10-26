"use client"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { StaffSidebar } from "@/components/staff/staff-sidebar"
import { Separator } from "@/components/ui/separator"

interface StaffPanelShellProps {
  user: {
    name: string
    email: string
  }
  children: React.ReactNode
}

export function StaffPanelShell({ user, children }: StaffPanelShellProps) {
  return (
    <SidebarProvider>
      <StaffSidebar user={user} />
      <SidebarInset className="min-h-svh bg-muted/30">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm text-muted-foreground">Staff workspace</span>
        </header>
        <div className="flex flex-1 flex-col p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

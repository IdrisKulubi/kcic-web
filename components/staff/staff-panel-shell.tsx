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
    <SidebarProvider
      style={
        {
          "--sidebar": "#eef3ec",
          "--sidebar-foreground": "#1b241d",
          "--sidebar-accent": "#d7e4d8",
          "--sidebar-accent-foreground": "#1b241d",
          "--sidebar-border": "#d9e1d8",
          "--sidebar-primary": "#315e13",
          "--sidebar-primary-foreground": "#f4f7f2",
          "--sidebar-ring": "#315e13",
        } as React.CSSProperties
      }
    >
      <StaffSidebar user={user} />
      <SidebarInset className="min-h-svh bg-[#f4f7f2] text-[#1b241d]">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#d9e1d8] bg-[#f7faf6] px-4 md:px-6">
          <SidebarTrigger className="text-[#1b241d]" />
          <Separator orientation="vertical" className="h-4 bg-[#d9e1d8]" />
          <span className="text-sm text-[#566159]">Staff workspace</span>
        </header>
        <div className="flex w-full min-w-0 flex-1 flex-col px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

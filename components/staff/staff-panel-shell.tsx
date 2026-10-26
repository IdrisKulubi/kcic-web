"use client"

import Link from "next/link"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { StaffSidebar } from "@/components/staff/staff-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ArrowUpRight } from "@phosphor-icons/react"

interface StaffPanelShellProps {
  user: {
    name: string
    email: string
  }
  children: React.ReactNode
}

export function StaffPanelShell({ user, children }: StaffPanelShellProps) {
  return (
    <TooltipProvider delay={400}>
    <SidebarProvider data-staff-theme="">
      <StaffSidebar user={user} />
      <SidebarInset className="min-h-svh bg-background">
        <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-3 backdrop-blur-sm md:px-6">
          <SidebarTrigger className="-ml-1" />
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            View website
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </header>
        <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </TooltipProvider>
  )
}

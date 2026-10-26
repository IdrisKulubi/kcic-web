"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SignOutButton } from "@/components/staff/sign-out-button"
import {
  Newspaper,
  Users,
  Briefcase,
  UsersThree,
  Handshake,
  Sparkle,
} from "@phosphor-icons/react"

interface StaffSidebarProps {
  user: {
    name: string
    email: string
  }
}

const mainNav = [
  { href: "/staff/news", label: "News", icon: Newspaper },
  { href: "/staff/users", label: "Staff users", icon: Users },
]

const comingSoon = [
  { label: "Programmes", icon: Sparkle },
  { label: "Opportunities", icon: Briefcase },
  { label: "Team", icon: UsersThree },
  { label: "Partners", icon: Handshake },
]

export function StaffSidebar({ user }: StaffSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-semibold tracking-tight">KCIC Staff</span>
          <span className="text-xs text-muted-foreground">Content management</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Coming soon</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {comingSoon.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton disabled className="opacity-50">
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="mb-2 space-y-0.5 group-data-[collapsible=icon]:hidden">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <SignOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

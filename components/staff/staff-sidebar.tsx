"use client"

import Image from "next/image"
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
import logo from "@/public/KCIC logo.png"
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

const contentNav = [{ href: "/staff/news", label: "News", icon: Newspaper }]

const plannedNav = [
  { label: "Programmes", icon: Sparkle },
  { label: "Opportunities", icon: Briefcase },
  { label: "Team", icon: UsersThree },
  { label: "Partners", icon: Handshake },
]

const accessNav = [{ href: "/staff/users", label: "Staff accounts", icon: Users }]

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function StaffSidebar({ user }: StaffSidebarProps) {
  const pathname = usePathname()

  const renderLinks = (items: typeof contentNav) =>
    items.map((item) => {
      const isActive = pathname.startsWith(item.href)
      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            isActive={isActive}
            tooltip={item.label}
            render={
              <Link href={item.href} aria-current={isActive ? "page" : undefined} />
            }
          >
            <item.icon weight={isActive ? "fill" : "regular"} />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    })

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 pt-4 pb-3">
        <Link
          href="/staff/news"
          className="flex items-center gap-2.5 rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Image
            src={logo}
            alt="Kenya Climate Innovation Center"
            sizes="32px"
            className="h-auto w-8 shrink-0"
          />
          <span className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">KCIC</span>
            <span className="text-xs text-muted-foreground">Website content</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderLinks(contentNav)}
              {plannedNav.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    aria-disabled="true"
                    tooltip={`${item.label} (not yet available)`}
                    className="text-muted-foreground"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                    <span className="ml-auto rounded-full bg-muted px-1.5 py-px text-[0.65rem] font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
                      Soon
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderLinks(accessNav)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground"
          >
            {initials(user.name)}
          </span>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

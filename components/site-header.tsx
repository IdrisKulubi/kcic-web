"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  CaretDown,
  CaretRight,
  List,
  X,
  Buildings,
  ShieldCheck,
  Briefcase,
  Envelope,
  Compass,
  Leaf,
  Intersect,
  Handshake,
  RocketLaunch,
  Sparkle,
  Archive,
  ChartLineUp,
  TreeStructure,
  Target,
  Files,
  BookOpen,
  Newspaper,
  PencilLine,
  CalendarBlank,
  Microphone,
  Broadcast,
  UsersThree,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"
import logo from "@/public/KCIC logo.png"
import { handleSamePageHashClick } from "@/components/work/work-hash-scroll"
import { cn } from "@/lib/utils"

function hrefPath(href: string) {
  return href.split("#")[0]
}

type NavItem = { title: string; description: string; href: string; icon: Icon }
const groups: { title: string; items: NavItem[] }[] = [
  {
    title: "About us",
    items: [
      {
        title: "Who we are",
        description: "Our purpose, values, strategy and team",
        href: "/about",
        icon: Buildings,
      },
      {
        title: "Policies & disclosures",
        description: "Our commitments and governance",
        href: "/about/policies-disclosures",
        icon: ShieldCheck,
      },
      {
        title: "Procurement",
        description: "Explore supplier opportunities",
        href: "/about/procurement",
        icon: Files,
      },
      {
        title: "Careers",
        description: "Build your future with KCIC",
        href: "/about/careers",
        icon: Briefcase,
      },
      {
        title: "Contact us",
        description: "Start a conversation with our team",
        href: "/contact",
        icon: Envelope,
      },
    ],
  },
  {
    title: "Our work",
    items: [
      {
        title: "Our approach",
        description: "How we support climate innovation",
        href: "/our-work#approach",
        icon: Compass,
      },
      {
        title: "Key sectors",
        description: "Where innovation makes a difference",
        href: "/our-work#sectors",
        icon: Leaf,
      },
      {
        title: "Cross-cutting issues",
        description: "The priorities connecting our work",
        href: "/our-work#cross-cutting",
        icon: Intersect,
      },
      {
        title: "Our partners",
        description: "Working together for lasting change",
        href: "/our-work#partners",
        icon: Handshake,
      },
    ],
  },
  {
    title: "Our programmes",
    items: [
      {
        title: "Flagship programmes",
        description: "Discover our core programmes",
        href: "/programmes#flagship",
        icon: RocketLaunch,
      },
      {
        title: "Special projects & initiatives",
        description: "New possibilities for climate action",
        href: "/programmes#special",
        icon: Sparkle,
      },
      {
        title: "Founders Collective",
        description: "A founder-first community for climate entrepreneurs",
        href: "/founders-collective",
        icon: UsersThree,
      },
      {
        title: "Past projects",
        description: "Explore the work that came before",
        href: "/programmes#past",
        icon: Archive,
      },
    ],
  },
  {
    title: "Impact",
    items: [
      {
        title: "Overview",
        description: "See the difference we are making",
        href: "/impact",
        icon: ChartLineUp,
      },
      {
        title: "Our theory of change",
        description: "Our pathway to lasting impact",
        href: "/impact/theory-of-change",
        icon: TreeStructure,
      },
      {
        title: "Our targets",
        description: "The future we are working towards",
        href: "/impact/targets",
        icon: Target,
      },
      {
        title: "Impact reports",
        description: "Explore our results and insights",
        href: "/impact/reports",
        icon: Files,
      },
      {
        title: "Impact stories",
        description: "Meet the people behind the progress",
        href: "/impact/stories",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "Newsroom",
    items: [
      {
        title: "News",
        description: "The latest from KCIC",
        href: "/newsroom",
        icon: Newspaper,
      },
      {
        title: "Blogs",
        description: "Ideas and perspectives on climate",
        href: "/newsroom/blogs",
        icon: PencilLine,
      },
      {
        title: "Events",
        description: "Connect, learn and get involved",
        href: "/newsroom/events",
        icon: CalendarBlank,
      },
      {
        title: "Podcast",
        description: "Listen to climate conversations",
        href: "/newsroom/podcast",
        icon: Microphone,
      },
      {
        title: "Media coverage",
        description: "KCIC in the headlines",
        href: "/newsroom/media-coverage",
        icon: Broadcast,
      },
    ],
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const header = useRef<HTMLElement>(null)
  const mobileTrigger = useRef<HTMLButtonElement>(null)
  const close = () => {
    setOpen(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) close()
    }
    const onResize = () => close()
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("pointerdown", onPointer)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("pointerdown", onPointer)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <header
      ref={header}
      className="sticky top-5 z-30 mx-auto mt-6 w-[calc(100%-3rem)] max-w-[70rem] font-sans text-[#27332a] max-[1050px]:top-3 max-[1050px]:mt-4 max-[1050px]:w-[calc(100%-2rem)]"
      data-scrolled={scrolled}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close()
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return
        if (open) {
          header.current
            ?.querySelector<HTMLButtonElement>(`[data-group="${open}"]`)
            ?.focus()
          setOpen(null)
        } else if (mobileOpen) {
          setMobileOpen(false)
          mobileTrigger.current?.focus()
        }
      }}
    >
      <a
        href="#main-content"
        className="absolute top-[-7.5rem] left-4 z-50 rounded-lg bg-white px-5 py-3 focus:top-0"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "flex min-h-14 items-center gap-4 rounded-full border border-[#e5e7e3] px-2 py-1.5 pl-4 shadow-[0_3px_5px_rgba(39,51,42,0.04)] transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none max-[1050px]:min-h-13 max-[1050px]:justify-between max-[1050px]:px-2.5 max-[1050px]:pl-3.5",
          scrolled
            ? "bg-[#f4f7f2] shadow-[0_4px_8px_rgba(39,51,42,0.07)]"
            : "bg-white"
        )}
      >
        <Link
          href="/"
          className="block w-12 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13] max-[1050px]:w-[38px]"
          aria-label="KCIC home"
          onClick={close}
        >
          <Image
            src={logo}
            alt="Kenya Climate Innovation Center"
            sizes="48px"
            preload
            className="block h-auto w-full"
          />
        </Link>
        <span
          className="h-[22px] w-px shrink-0 bg-[#e6e9e4] max-[1050px]:hidden"
          aria-hidden="true"
        />
        <button
          ref={mobileTrigger}
          type="button"
          className="hidden size-9 cursor-pointer place-items-center rounded-full bg-[#f4f7f2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13] max-[1050px]:grid"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => {
            setMobileOpen(!mobileOpen)
            setOpen(null)
          }}
        >
          {mobileOpen ? <X size={22} /> : <List size={24} />}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={cn(
            "flex min-w-0 flex-1 items-center justify-between gap-4 max-[1050px]:absolute max-[1050px]:top-[calc(100%+0.625rem)] max-[1050px]:right-0 max-[1050px]:left-0 max-[1050px]:max-h-[calc(100dvh-7.875rem)] max-[1050px]:flex-col max-[1050px]:items-stretch max-[1050px]:gap-4 max-[1050px]:overflow-y-auto max-[1050px]:rounded-[18px] max-[1050px]:bg-white max-[1050px]:p-4 max-[1050px]:shadow-[0_12px_36px_rgba(39,51,42,0.10)]",
            mobileOpen ? "max-[1050px]:flex" : "max-[1050px]:hidden"
          )}
          data-mobile-open={mobileOpen}
        >
          <ul className="m-0 flex list-none items-center gap-1 p-0 max-[1050px]:flex-col max-[1050px]:items-stretch">
            {groups.map((group, index) => {
              const expanded = open === group.title
              const active = group.items.some((item) => {
                const path = hrefPath(item.href)
                return pathname === path || pathname.startsWith(`${path}/`)
              })
              return (
                <li key={group.title} className="relative">
                  <button
                    type="button"
                    data-group={group.title}
                    className={cn(
                      "flex min-h-9 cursor-pointer items-center justify-between gap-1.5 rounded-full px-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[#f0f7e9] hover:text-[#315e13] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315e13] max-[1050px]:min-h-12 max-[1050px]:w-full max-[1050px]:px-3 max-[1050px]:text-[15px]",
                      (expanded || active) && "bg-[#f0f7e9] text-[#315e13]"
                    )}
                    data-active={active}
                    aria-expanded={expanded}
                    aria-controls={`nav-panel-${index}`}
                    onClick={() => setOpen(expanded ? null : group.title)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault()
                        setOpen(group.title)
                        requestAnimationFrame(() =>
                          document
                            .getElementById(`nav-panel-${index}`)
                            ?.querySelector("a")
                            ?.focus()
                        )
                      }
                    }}
                  >
                    {group.title}
                    <CaretDown
                      size={12}
                      weight="bold"
                      className={cn(
                        "text-[#788173] transition-transform duration-200 motion-reduce:transition-none",
                        expanded && "rotate-180 text-[#315e13]"
                      )}
                    />
                  </button>
                  <div
                    id={`nav-panel-${index}`}
                    className={cn(
                      "absolute top-[calc(100%+0.875rem)] left-[-0.5rem] max-h-[calc(100dvh-9.375rem)] w-[355px] overflow-y-auto rounded-[18px] bg-white p-2.5 shadow-[0_12px_36px_rgba(39,51,42,0.10),0_2px_3px_rgba(39,51,42,0.05)] max-[1050px]:static max-[1050px]:max-h-none max-[1050px]:w-full max-[1050px]:px-0 max-[1050px]:pb-1.5 max-[1050px]:shadow-none",
                      index >= groups.length - 2 &&
                        "right-[-0.5rem] left-auto max-[1050px]:right-auto"
                    )}
                    hidden={!expanded}
                  >
                    <ul className="m-0 list-none p-0">
                      {group.items.map(
                        ({ title, description, href, icon: ItemIcon }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              prefetch={false}
                              className="flex min-h-[72px] items-center gap-3.5 rounded-[10px] px-2.5 py-3 no-underline transition-colors duration-150 hover:bg-[#f4f8ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315e13] max-[1050px]:min-h-[68px] max-[1050px]:gap-2.5 max-[1050px]:px-3"
                              onClick={(event) => {
                                handleSamePageHashClick(event, href, pathname)
                                close()
                              }}
                              aria-current={
                                pathname === hrefPath(href) ? "page" : undefined
                              }
                            >
                              <span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] border border-[#e4e8e0] text-[#6b7565]">
                                <ItemIcon size={20} />
                              </span>
                              <span className="flex min-w-0 flex-col gap-1">
                                <span className="text-[13px] leading-[1.4] font-medium">
                                  {title}
                                </span>
                                <span className="text-[11.5px] leading-[1.45] text-[#626b5e] max-[1050px]:text-xs">
                                  {description}
                                </span>
                              </span>
                              <CaretRight
                                size={13}
                                className="ml-auto shrink-0 text-[#7b8377]"
                              />
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </li>
              )
            })}
            <li>
              <Link
                href="/faqs"
                prefetch={false}
                onClick={close}
                className={cn(
                  "flex min-h-9 items-center rounded-full px-2 text-[13px] font-medium no-underline transition-colors duration-150 hover:bg-[#f0f7e9] hover:text-[#315e13] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315e13] max-[1050px]:min-h-12 max-[1050px]:w-full max-[1050px]:px-3 max-[1050px]:text-[15px]",
                  pathname === "/faqs" && "bg-[#f0f7e9] text-[#315e13]"
                )}
                aria-current={pathname === "/faqs" ? "page" : undefined}
              >
                FAQs
              </Link>
            </li>
          </ul>
          <Link
            href="/contact"
            prefetch={false}
            className="flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#7fcc2f] px-4 text-[13px] font-semibold text-[#1b241d] no-underline transition-colors duration-150 hover:bg-[#90d44b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13] max-[1050px]:min-h-12"
            onClick={close}
          >
            Contact us <ArrowUpRight size={16} weight="bold" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

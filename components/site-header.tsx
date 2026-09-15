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
  Users,
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
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"
import logo from "@/public/KCIC logo.png"
import styles from "./site-header.module.css"

type NavItem = { title: string; description: string; href: string; icon: Icon }
const groups: { title: string; items: NavItem[] }[] = [
  {
    title: "About us",
    items: [
      {
        title: "Who we are",
        description: "Our purpose, values and strategy",
        href: "/about",
        icon: Buildings,
      },
      {
        title: "Our team",
        description: "Meet our board and staff",
        href: "/about/team",
        icon: Users,
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
        href: "/our-work",
        icon: Compass,
      },
      {
        title: "Key sectors",
        description: "Where innovation makes a difference",
        href: "/our-work/sectors",
        icon: Leaf,
      },
      {
        title: "Cross-cutting issues",
        description: "The priorities connecting our work",
        href: "/our-work/cross-cutting-issues",
        icon: Intersect,
      },
      {
        title: "Our partners",
        description: "Working together for lasting change",
        href: "/our-work/partners",
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
        href: "/programmes",
        icon: RocketLaunch,
      },
      {
        title: "Special projects & initiatives",
        description: "New possibilities for climate action",
        href: "/programmes/special-projects",
        icon: Sparkle,
      },
      {
        title: "Past projects",
        description: "Explore the work that came before",
        href: "/programmes/past-projects",
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
      className={styles.position}
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
      <a href="#main-content" className={styles.skip}>
        Skip to content
      </a>
      <div className={styles.shell}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="KCIC home"
          onClick={close}
        >
          <Image
            src={logo}
            alt="Kenya Climate Innovation Center"
            sizes="90px"
            preload
          />
        </Link>
        <span className={styles.divider} aria-hidden="true" />
        <button
          ref={mobileTrigger}
          type="button"
          className={styles.mobileToggle}
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
          className={styles.navigation}
          data-mobile-open={mobileOpen}
        >
          <ul className={styles.navList}>
            {groups.map((group, index) => {
              const expanded = open === group.title
              const active = group.items.some(
                (item) =>
                  pathname === item.href || pathname.startsWith(item.href + "/")
              )
              return (
                <li key={group.title} className={styles.group}>
                  <button
                    type="button"
                    data-group={group.title}
                    className={styles.trigger}
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
                    <CaretDown size={12} weight="bold" />
                  </button>
                  <div
                    id={`nav-panel-${index}`}
                    className={styles.panel}
                    hidden={!expanded}
                  >
                    <ul>
                      {group.items.map(
                        ({ title, description, href, icon: ItemIcon }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              prefetch={false}
                              className={styles.item}
                              onClick={close}
                              aria-current={
                                pathname === href ? "page" : undefined
                              }
                            >
                              <span className={styles.icon}>
                                <ItemIcon size={20} />
                              </span>
                              <span className={styles.itemCopy}>
                                <span className={styles.itemTitle}>
                                  {title}
                                </span>
                                <span className={styles.description}>
                                  {description}
                                </span>
                              </span>
                              <CaretRight
                                size={13}
                                className={styles.itemArrow}
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
                className={styles.trigger}
                aria-current={pathname === "/faqs" ? "page" : undefined}
              >
                FAQs
              </Link>
            </li>
          </ul>
          <Link
            href="/contact"
            prefetch={false}
            className={styles.contact}
            onClick={close}
          >
            Contact us <ArrowUpRight size={16} weight="bold" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

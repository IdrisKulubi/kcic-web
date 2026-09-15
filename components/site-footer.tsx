import Image from "next/image"
import Link from "next/link"

import logo from "@/public/KCIC logo.png"

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our work", href: "/our-work" },
      { label: "Our programmes", href: "/programmes" },
      { label: "Our impact", href: "/impact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Newsroom", href: "/newsroom" },
      { label: "Events", href: "/newsroom/events" },
      { label: "Careers", href: "/about/careers" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Impact reports", href: "/impact/reports" },
      { label: "Policies & disclosures", href: "/about/policies-disclosures" },
      { label: "Procurement", href: "/about/procurement" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "info@kenyacic.org", href: "mailto:info@kenyacic.org" },
      { label: "+254 703 034 701", href: "tel:+254703034701" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden rounded-[2rem] border border-white/50 bg-[linear-gradient(180deg,rgb(255_255_255/0.18)_0%,rgb(184_204_190/0.28)_38%,rgb(130_156_140/0.58)_100%)] px-5 pt-16 pb-8 font-sans text-[#1b241d] shadow-[inset_0_1px_0_rgb(255_255_255/0.55),0_1px_2px_rgb(23_54_35/0.05)] backdrop-blur-[10px] sm:px-8 sm:pt-20 lg:rounded-[2.5rem] lg:px-[clamp(2rem,5vw,4.25rem)] lg:pt-24 lg:pb-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-88"
      >
        <span className="absolute top-10 right-[8%] size-32 rounded-[2rem] bg-white/55 shadow-[0_20px_50px_rgba(23,54,35,0.08)]" />
        <span className="absolute top-24 right-[18%] size-24 rounded-[1.75rem] bg-[#7fcc2f]/18" />
        <span className="absolute top-16 right-[13%] size-16 rounded-full bg-[#00adef]/12" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 pb-16 lg:grid-cols-[minmax(0,1.15fr)_0.85fr] lg:items-center lg:pb-20">
          <div>
            <h2 className="m-0 max-w-[18ch] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.65rem,3vw,2.35rem)] leading-[1.15] font-medium tracking-[-0.03em] text-[#1b241d]">
              Let&apos;s build a climate-resilient future.
            </h2>
            <p className="mt-3 max-w-[36ch] text-[clamp(1.05rem,2vw,1.35rem)] leading-snug text-[#566159]">
              Start a conversation with our team today.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#1b241d] px-5 text-sm font-semibold text-[#f7fbf5] transition-colors duration-200 ease-out hover:bg-[#27332a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]"
            >
              Contact us
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>

        <div className="grid gap-10 border-t border-[#1b241d]/10 pt-12 md:grid-cols-[1.1fr_repeat(4,1fr)] md:gap-8 md:pt-14">
          <div>
            <Link
              href="/"
              aria-label="KCIC home"
              className="inline-flex focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]"
            >
              <Image
                src={logo}
                alt="Kenya Climate Innovation Center"
                sizes="72px"
                className="h-auto w-18"
              />
            </Link>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold text-[#1b241d]">
                {group.title}
              </h3>
              <ul className="m-0 list-none space-y-2.5 p-0">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#566159] transition-colors hover:text-[#1b241d] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315e13]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#1b241d]/10 pt-6 text-xs text-[#566159] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kenya Climate Innovation Center.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

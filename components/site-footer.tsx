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
]

export function SiteFooter() {
  return (
    <footer className="relative z-10 min-h-[34rem] bg-[linear-gradient(180deg,#173623_0%,#0b2116_100%)] px-5 pt-16 pb-8 font-sans text-[#eef7ec] sm:px-8 sm:pt-24 lg:px-[clamp(2rem,5vw,4.25rem)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:pb-20">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.15em] text-[#9edb63] uppercase">
              Build with KCIC
            </p>
            <h2 className="m-0 max-w-[14ch] text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.055em] text-balance">
              Let&apos;s build a climate-resilient future.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[#7fcc2f] px-6 text-sm font-semibold text-[#182b1d] transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9fdcff] lg:justify-self-end"
          >
            Start a conversation
            <span className="ml-3" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-[1.3fr_repeat(3,1fr)] md:py-16">
          <div>
            <Link
              href="/"
              aria-label="KCIC home"
              className="inline-flex rounded-xl bg-[#f8fbf6] p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9fdcff]"
            >
              <Image
                src={logo}
                alt="Kenya Climate Innovation Center"
                sizes="72px"
                className="h-auto w-[72px]"
              />
            </Link>
            <p className="mt-6 max-w-[28ch] text-sm leading-6 text-[#b9cabb]">
              Catalysing climate entrepreneurship for sustainable enterprises
              and climate-resilient communities.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-sm font-semibold text-[#eef7ec]">
                {group.title}
              </h3>
              <ul className="m-0 list-none space-y-3 p-0">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#b9cabb] transition-colors hover:text-[#eef7ec] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9fdcff]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 pt-7 text-xs text-[#91a795] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kenya Climate Innovation Center.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="mailto:info@kenyacic.org" className="hover:text-[#eef7ec]">
              info@kenyacic.org
            </a>
            <a href="tel:+254703034701" className="hover:text-[#eef7ec]">
              +254 703 034 701
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

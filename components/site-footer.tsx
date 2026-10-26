import Image from "next/image"
import Link from "next/link"

import logo from "@/public/KCIC logo.png"
import { WhistleblowerLauncher } from "@/components/whistleblower/whistleblower-launcher"

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our work", href: "/our-work" },
      { label: "Our programmes", href: "/programmes" },
      { label: "Founders Collective", href: "/founders-collective" },
      { label: "Our impact", href: "/impact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Newsroom", href: "/newsroom" },
      { label: "Careers", href: "/about/careers" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Impact reports", href: "/impact#reports" },
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
    <footer
      className="canvas-panel relative isolate overflow-hidden bg-black px-5 pt-14 pb-8 font-sans text-white sm:px-8 sm:pt-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:pt-20 lg:pb-10"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.1fr_repeat(4,1fr)] md:gap-8">
          <div>
            <Link
              href="/"
              aria-label="KCIC home"
              className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
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
              <h3 className="mb-4 text-sm font-semibold text-white">
                {group.title}
              </h3>
              <ul className="m-0 list-none space-y-2.5 p-0">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kenya Climate Innovation Center.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <WhistleblowerLauncher />
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

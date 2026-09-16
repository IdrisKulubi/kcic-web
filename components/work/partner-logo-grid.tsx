import Link from "next/link"

import { RemoteThumbnail } from "@/components/remote-thumbnail"
import type { PartnerRecord } from "@/lib/data/partners"
import { partnersWithLogos } from "@/lib/data/partners"
import { ourWorkPartners } from "@/lib/data/our-work"

interface PartnerLogoGridProps {
  partners: PartnerRecord[]
  failed?: boolean
}

export function PartnerLogoGrid({
  partners,
  failed = false,
}: PartnerLogoGridProps) {
  const items = partnersWithLogos(partners)

  if (failed) {
    return (
      <p className="m-0 max-w-[46ch] text-sm leading-6 text-[#566159]">
        {ourWorkPartners.failed}
      </p>
    )
  }

  if (items.length === 0) {
    return (
      <p className="m-0 max-w-[46ch] text-sm leading-6 text-[#566159]">
        {ourWorkPartners.empty}
      </p>
    )
  }

  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((partner) => {
        const href = partner.website?.trim()
        const inner = (
          <>
            <span className="flex min-h-[5.5rem] items-center justify-center px-5 py-6 sm:min-h-[6.5rem]">
              <RemoteThumbnail
                src={partner.logo}
                alt={partner.name}
                className="max-h-14 w-auto max-w-full object-contain mix-blend-multiply"
              />
            </span>
            <span className="block border-t border-[#1b241d]/10 px-4 py-3 text-center text-xs font-medium text-[#315e13]">
              {partner.name}
            </span>
          </>
        )

        return (
          <li key={partner.id}>
            {href ? (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-[#f7fbf5] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
              >
                {inner}
                <span className="sr-only">{ourWorkPartners.visit}</span>
              </Link>
            ) : (
              <div className="flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-[#f7fbf5]">
                {inner}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

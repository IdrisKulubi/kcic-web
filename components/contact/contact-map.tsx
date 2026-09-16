import Link from "next/link"

import { contactDetails, contactMapCopy } from "@/lib/data/contact"

export function ContactMap() {
  return (
    <section
      aria-labelledby="contact-map-title"
      className="canvas-panel scroll-mt-24 bg-[#eef3eb] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="contact-map-title"
          className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {contactMapCopy.heading}
        </h2>
        <p className="mt-3 m-0 max-w-[36ch] text-[#566159]">
          {contactDetails.addressLines.map((line) => (
            <span key={line} className="block leading-6">
              {line}
            </span>
          ))}
        </p>
        <Link
          href={contactDetails.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-[#005a7c] underline-offset-4 hover:underline"
        >
          {contactMapCopy.openMaps}
        </Link>

        <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-[#d9e1d8] bg-[#f7fbf5]">
          <iframe
            title={contactMapCopy.mapTitle}
            src={contactDetails.mapEmbedUrl}
            className="block h-[min(28rem,70vw)] w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  )
}

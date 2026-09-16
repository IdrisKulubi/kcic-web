import {
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr"

import { ContactCopyButton } from "@/components/contact/contact-copy-button"
import { GradientWaves } from "@/components/gradient-waves"
import { contactDetails, contactSplitCopy } from "@/lib/data/contact"

const rows = [
  {
    key: "visit",
    label: contactSplitCopy.visitLabel,
    href: contactDetails.mapsUrl,
    lines: contactDetails.addressLines,
    icon: MapPin,
    external: true,
    copyValue: contactDetails.address,
    copyLabel: contactSplitCopy.copyAddress,
  },
  {
    key: "phone",
    label: contactSplitCopy.phoneLabel,
    href: contactDetails.phoneHref,
    lines: [contactDetails.phone, contactDetails.hoursShort],
    icon: Phone,
    external: false,
    copyValue: contactDetails.phone,
    copyLabel: contactSplitCopy.copyPhone,
  },
  {
    key: "email",
    label: contactSplitCopy.emailLabel,
    href: `mailto:${contactDetails.email}`,
    lines: [contactDetails.email],
    icon: EnvelopeSimple,
    external: false,
    copyValue: contactDetails.email,
    copyLabel: contactSplitCopy.copyEmail,
  },
  {
    key: "hours",
    label: contactSplitCopy.hoursLabel,
    href: undefined,
    lines: contactDetails.hoursLines,
    icon: Clock,
    external: false,
    copyValue: undefined,
    copyLabel: undefined,
  },
] as const

export function ContactSplit() {
  return (
    <section
      aria-labelledby="contact-split-title"
      className="canvas-panel relative isolate min-h-[min(42rem,78svh)] scroll-mt-24 overflow-hidden bg-[#27332A] p-0"
    >
      <div className="absolute inset-0 z-0">
        <GradientWaves
          horizonColor="#27332A"
          waveColor="#315e13"
          crestColor="#7fcc2f"
          speed={0.32}
          amplitude={2.2}
          waveScale={0.55}
          waveRatio={0.85}
          swell={28}
          turbulence={16}
          tilt={1.08}
          zoom={1.05}
          height={5.2}
          fogDepth={14}
          detail="medium"
          brightness={1.05}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.35}
          grain
          grainIntensity={0.04}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(39,51,42,0.28)_0%,rgba(39,51,42,0.08)_40%,rgba(39,51,42,0.45)_100%)]"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <h2
          id="contact-split-title"
          className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#f7fbf5]"
        >
          {contactSplitCopy.reachHeading}
        </h2>

        <ul className="mt-10 flex list-none flex-col gap-3 p-0">
          {rows.map((row) => {
            const Icon = row.icon
            const body = (
              <>
                <span
                  className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e8f4dc] text-[#315e13] transition-colors group-hover:bg-[#7fcc2f] group-hover:text-[#1b241d]"
                  aria-hidden
                >
                  <Icon className="size-5" weight="regular" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.68rem] font-medium tracking-[0.12em] text-[#315e13] uppercase">
                    {row.label}
                  </span>
                  {row.lines.map((line) => (
                    <span
                      key={line}
                      className="mt-1 block text-sm leading-5 font-medium text-[#1b241d]"
                    >
                      {line}
                    </span>
                  ))}
                </span>
              </>
            )

            return (
              <li key={row.key}>
                <div className="group flex items-start gap-2 rounded-[1.25rem] border border-white/15 bg-[#f7fbf5]/92 py-3 pr-3 pl-5 backdrop-blur-md transition-colors duration-200 ease-out hover:border-[#7fcc2f]/70 hover:bg-[#f7fbf5]">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.external ? "_blank" : undefined}
                      rel={row.external ? "noopener noreferrer" : undefined}
                      className="flex min-w-0 flex-1 items-start gap-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex min-w-0 flex-1 items-start gap-4 py-2">
                      {body}
                    </div>
                  )}
                  {row.copyLabel && row.copyValue ? (
                    <div className="mt-2">
                      <ContactCopyButton
                        value={row.copyValue}
                        label={row.copyLabel}
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

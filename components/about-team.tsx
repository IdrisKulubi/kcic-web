"use client"

import { useMemo, useState } from "react"
import { LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react"

import { RemoteThumbnail } from "@/components/remote-thumbnail"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { aboutTeamSection } from "@/lib/data/about"
import type { TeamMemberData } from "@/lib/actions/team"
import { cn } from "@/lib/utils"

type TeamTab = "board" | "staff"

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function normalizeCategory(category: string): TeamTab | "other" {
  const value = category.trim().toLowerCase()
  if (value.includes("board")) return "board"
  if (value.includes("staff")) return "staff"
  return "other"
}

function oneLineBio(bio: string) {
  const trimmed = bio.trim()
  if (!trimmed) return ""
  const firstSentence = trimmed.split(/(?<=[.!?])\s+/)[0] ?? trimmed
  if (firstSentence.length <= 120) return firstSentence
  return `${firstSentence.slice(0, 117).trimEnd()}…`
}

const portraitRings = [
  "bg-[#e8ecef]",
  "bg-[#dfeaf3]",
  "bg-[#f3e4e8]",
  "bg-[#f0ead8]",
]

function TeamPortrait({
  name,
  photo,
  className,
  fallbackClassName,
}: {
  name: string
  photo: string
  className?: string
  fallbackClassName?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={cn(
          "flex size-full items-center justify-center rounded-full bg-[#d9e1d8] font-medium text-[#315e13]",
          fallbackClassName
        )}
        aria-hidden
      >
        {initials(name)}
      </span>
    )
  }

  return (
    <RemoteThumbnail
      src={photo}
      alt=""
      className={cn("size-full rounded-full object-cover", className)}
      onError={() => setFailed(true)}
    />
  )
}

interface AboutTeamProps {
  members: TeamMemberData[]
}

export function AboutTeam({ members }: AboutTeamProps) {
  const [tab, setTab] = useState<TeamTab>("staff")
  const [selected, setSelected] = useState<TeamMemberData | null>(null)

  const grouped = useMemo(() => {
    const board: TeamMemberData[] = []
    const staff: TeamMemberData[] = []
    for (const member of members) {
      const bucket = normalizeCategory(member.category)
      if (bucket === "board") board.push(member)
      else if (bucket === "staff") staff.push(member)
      else staff.push(member)
    }
    return { board, staff }
  }, [members])

  const visible = tab === "board" ? grouped.board : grouped.staff
  const isEmpty = grouped.board.length === 0 && grouped.staff.length === 0

  return (
    <section
      id="our-team"
      aria-labelledby="about-team-title"
      className="canvas-panel scroll-mt-24 bg-[#f4f7f2] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <p className="m-0 text-center text-[0.7rem] font-medium tracking-[0.18em] text-[#315e13] uppercase">
          {aboutTeamSection.eyebrow}
        </p>
        <h2
          id="about-team-title"
          className="mt-3 m-0 text-center font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {aboutTeamSection.heading}
        </h2>

        <div
          className="mt-10 flex justify-center gap-2"
          role="tablist"
          aria-label="Team groups"
        >
          {(
            [
              { id: "staff" as const, label: aboutTeamSection.staffLabel },
              { id: "board" as const, label: aboutTeamSection.boardLabel },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              aria-controls={`team-panel-${item.id}`}
              id={`team-tab-${item.id}`}
              onClick={() => setTab(item.id)}
              className={cn(
                "min-h-11 rounded-full px-5 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.1em] uppercase transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]",
                tab === item.id
                  ? "border border-[#7fcc2f] bg-[#7fcc2f] text-[#1b241d] shadow-[0_8px_24px_-12px_rgba(127,204,47,0.65)]"
                  : "border border-[#7fcc2f]/45 bg-[#f7fbf5] text-[#315e13] hover:border-[#7fcc2f] hover:bg-[#eef8e4]"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {isEmpty ? (
          <p className="mt-12 text-center text-[#566159]">
            {aboutTeamSection.emptyMessage}
          </p>
        ) : (
          <ul
            id={`team-panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`team-tab-${tab}`}
            className="mt-12 grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visible.length === 0 ? (
              <li className="col-span-full text-center text-[#566159]">
                No profiles in this group yet.
              </li>
            ) : (
              visible.map((member, index) => {
                const ring = portraitRings[index % portraitRings.length]
                const summary = oneLineBio(member.bio ?? "")
                return (
                  <li key={member.id ?? member.name}>
                    <button
                      type="button"
                      onClick={() => setSelected(member)}
                      className="group flex w-full flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
                    >
                      <span
                        className={cn(
                          "relative flex size-[7.5rem] items-center justify-center rounded-full p-1.5 transition-transform duration-200 ease-out group-hover:scale-[1.02]",
                          ring
                        )}
                      >
                        <span className="relative block size-full overflow-hidden rounded-full">
                          <TeamPortrait
                            name={member.name}
                            photo={member.photo}
                            fallbackClassName="text-lg"
                          />
                        </span>
                      </span>
                      <span className="mt-5 block font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.95rem] font-medium tracking-[0.06em] text-[#1b241d] uppercase">
                        {member.name}
                      </span>
                      <span className="mt-1 block text-sm text-[#566159]">
                        {member.role}
                      </span>
                      {summary ? (
                        <span className="mt-3 block max-w-[24ch] text-sm leading-6 text-[#566159]">
                          {summary}
                        </span>
                      ) : null}
                      <span className="mt-3 text-xs font-medium tracking-wide text-[#5a8f1f] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        View profile
                      </span>
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        )}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        {selected ? (
          <DialogContent className="sm:max-w-md" showCloseButton>
            <DialogHeader>
              <DialogTitle className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-xl tracking-[-0.02em]">
                {selected.name}
              </DialogTitle>
              <DialogDescription className="text-[#566159]">
                {selected.role}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-start gap-4">
              <span className="relative block size-16 shrink-0 overflow-hidden rounded-full">
                <TeamPortrait
                  name={selected.name}
                  photo={selected.photo}
                  fallbackClassName="text-base"
                />
              </span>
              <p className="m-0 text-sm leading-7 text-[#566159]">
                {selected.bio?.trim() || "Biography coming soon."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {selected.linkedin ? (
                <a
                  href={selected.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#005a7c] underline-offset-4 hover:underline"
                >
                  <LinkedinLogo className="size-4" aria-hidden />
                  LinkedIn
                </a>
              ) : null}
              {selected.email ? (
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex items-center gap-2 text-sm text-[#005a7c] underline-offset-4 hover:underline"
                >
                  <EnvelopeSimple className="size-4" aria-hidden />
                  Email
                </a>
              ) : null}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  )
}

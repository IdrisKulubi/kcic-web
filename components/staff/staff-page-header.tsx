import Link from "next/link"
import { CaretLeft } from "@phosphor-icons/react/dist/ssr"

interface StaffPageHeaderProps {
  title: string
  description?: string
  back?: { href: string; label: string }
  actions?: React.ReactNode
}

export function StaffPageHeader({
  title,
  description,
  back,
  actions,
}: StaffPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-1.5">
        {back ? (
          <Link
            href={back.href}
            className="-ml-1 inline-flex w-fit items-center gap-1 rounded-md px-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <CaretLeft className="size-3.5" aria-hidden />
            {back.label}
          </Link>
        ) : null}
        <h1 className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-2xl font-bold tracking-[-0.02em] md:text-[1.75rem]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-[60ch] text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </div>
  )
}

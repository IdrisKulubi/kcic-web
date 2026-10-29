import Link from "next/link"
import { CalendarDots } from "@phosphor-icons/react/dist/ssr"

import { RemoteThumbnail } from "@/components/remote-thumbnail"
import { formatKnowledgeDate, type KnowledgeItem } from "@/lib/data/knowledge-hub"

export function KnowledgeDate({ iso }: { iso: string }) {
  return (
    <p className="m-0 flex items-center gap-2 text-[1.05rem] font-medium text-[#2f7899]">
      <CalendarDots className="size-5 shrink-0 text-[#2f8f3a]" weight="fill" aria-hidden />
      <time dateTime={iso}>{formatKnowledgeDate(iso)}</time>
    </p>
  )
}

export function KnowledgeCard({ item }: { item: KnowledgeItem }) {
  return (
    <Link
      href={`/knowledge-hub/${item.section}/${item.slug}`}
      className="group flex h-full flex-col gap-4 rounded-2xl bg-white p-5 no-underline shadow-[0_2px_6px_rgba(27,36,29,0.05),0_12px_32px_-12px_rgba(27,36,29,0.14)] transition-shadow duration-300 outline-none hover:shadow-[0_2px_6px_rgba(27,36,29,0.06),0_20px_40px_-14px_rgba(27,36,29,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f] sm:p-6"
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-[#e8ece8]">
        <RemoteThumbnail
          src={item.coverImage}
          alt=""
          className="absolute inset-0 size-full object-cover object-center transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <KnowledgeDate iso={item.publishedAt} />
      <h2 className="m-0 text-xl leading-snug font-semibold tracking-[-0.01em] text-[#1b241d] group-hover:text-[#315e13]">
        {item.title}
      </h2>
    </Link>
  )
}

import Link from "next/link"
import { ArrowLeft, DownloadSimple, FileText } from "@phosphor-icons/react/dist/ssr"

import { KnowledgeDate } from "@/components/knowledge-hub/knowledge-card"
import { RemoteThumbnail } from "@/components/remote-thumbnail"
import {
  fileExtension,
  formatFileSize,
  knowledgeHubCopy,
  type KnowledgeItem,
  type KnowledgeSection,
} from "@/lib/data/knowledge-hub"
import { hasNewsBodyContent } from "@/lib/data/news"
import {
  newsArticleBodyClassName,
  newsThumbnailFrameClass,
  newsThumbnailImageClass,
} from "@/lib/news-article-media"
import { sanitizeArticleHtml } from "@/lib/sanitize-rich-html"

function DownloadCard({ item }: { item: KnowledgeItem }) {
  const name = item.attachmentName || "Document"
  const meta = [fileExtension(name), formatFileSize(item.attachmentSize)]
    .filter(Boolean)
    .join(" · ")

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_2px_6px_rgba(27,36,29,0.05),0_12px_32px_-12px_rgba(27,36,29,0.14)] sm:flex-row sm:items-center">
      <FileText className="size-9 shrink-0 text-[#2f8f3a]" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="m-0 truncate font-medium text-[#1b241d]">{name}</p>
        {meta ? <p className="m-0 mt-0.5 text-sm text-[#566159]">{meta}</p> : null}
      </div>
      <a
        href={item.attachmentUrl}
        target="_blank"
        rel="noopener noreferrer"
        download={item.attachmentName || undefined}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1b241d] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#315e13] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
      >
        <DownloadSimple className="size-4" weight="bold" aria-hidden />
        {knowledgeHubCopy.download}
      </a>
    </div>
  )
}

interface KnowledgeDetailProps {
  item: KnowledgeItem
  section: KnowledgeSection
}

export function KnowledgeDetail({ item, section }: KnowledgeDetailProps) {
  const showBody = hasNewsBodyContent(item.content)
  const safe = showBody ? sanitizeArticleHtml(item.content) : ""

  return (
    <article className="canvas-panel overflow-hidden bg-[#f4f7f2] px-5 py-12 sm:px-8 sm:py-14 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-16">
      <div className="mx-auto max-w-[46rem]">
        <Link
          href={`/knowledge-hub/${section.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#315e13] transition-colors hover:text-[#1b241d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {section.label}
        </Link>

        <figure className="mt-8 w-full max-w-full">
          <div className={newsThumbnailFrameClass}>
            <RemoteThumbnail
              src={item.coverImage}
              alt={item.title}
              className={newsThumbnailImageClass}
            />
          </div>
        </figure>

        <div className="mt-8">
          <KnowledgeDate iso={item.publishedAt} />
        </div>

        <h1 className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.85rem,4.5vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.035em] text-[#1b241d]">
          {item.title}
        </h1>

        <p className="mt-5 m-0 text-[1.125rem] leading-[1.65] text-[#566159]">
          {item.summary}
        </p>

        {item.attachmentUrl ? (
          <div className="mt-8">
            <DownloadCard item={item} />
          </div>
        ) : null}

        <div className="mt-10">
          {safe ? (
            <div
              className={newsArticleBodyClassName}
              dangerouslySetInnerHTML={{ __html: safe }}
            />
          ) : item.attachmentUrl ? (
            <p className="m-0 text-base leading-[1.75] text-[#566159]">
              {knowledgeHubCopy.emptyBodyNote}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

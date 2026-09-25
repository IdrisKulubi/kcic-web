import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

import { NewsShare } from "@/components/newsroom/news-share"
import { RemoteThumbnail } from "@/components/remote-thumbnail"
import type { NewsData } from "@/lib/actions/news"
import {
  formatNewsDate,
  hasNewsBodyContent,
  hasNewsThumbnail,
  newsArticleCopy,
  type NewsListItem,
} from "@/lib/data/news"
import {
  newsArticleBodyClassName,
  newsCardThumbnailImageClass,
  newsThumbnailFrameClass,
  newsThumbnailImageClass,
} from "@/lib/news-article-media"
import { sanitizeArticleHtml } from "@/lib/sanitize-rich-html"

function ArticleBody({ html }: { html: string }) {
  const safe = sanitizeArticleHtml(html)
  if (!safe) return null
  return (
    <div
      className={newsArticleBodyClassName}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}

function RelatedStories({ items }: { items: NewsListItem[] }) {
  if (items.length === 0) return null

  return (
    <aside
      className="mt-14 border-t border-[#1b241d]/10 pt-10"
      aria-labelledby="related-news-title"
    >
      <h2
        id="related-news-title"
        className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-lg font-medium tracking-[-0.02em] text-[#1b241d]"
      >
        {newsArticleCopy.relatedHeading}
      </h2>
      <ul className="mt-6 m-0 flex list-none flex-col gap-0 divide-y divide-[#1b241d]/10 p-0">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/news/${item.slug}`}
              className="group flex gap-4 py-5 no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-[1rem] bg-[#e8ece8] ring-1 ring-[#1b241d]/8 sm:size-24">
                <RemoteThumbnail
                  src={item.thumbnail}
                  alt={item.title}
                  className={`${newsCardThumbnailImageClass} transition-transform duration-500 motion-safe:group-hover:scale-[1.03]`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[0.65rem] font-medium tracking-[0.12em] text-[#315e13] uppercase">
                  {item.category}
                </p>
                <p
                  className="mt-1.5 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-base font-medium leading-snug tracking-[-0.02em] text-[#1b241d] group-hover:text-[#315e13]"
                >
                  {item.title}
                </p>
                <time
                  dateTime={item.publishedAt}
                  className="mt-2 block text-sm text-[#566159]"
                >
                  {formatNewsDate(item.publishedAt)}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

interface NewsArticleProps {
  article: NewsData
  related: NewsListItem[]
}

export function NewsArticle({ article, related }: NewsArticleProps) {
  const published =
    typeof article.publishedAt === "string"
      ? article.publishedAt
      : article.publishedAt.toISOString()

  const showHero = hasNewsThumbnail(article.thumbnail)
  const showBody = hasNewsBodyContent(article.content)
  const readTime = article.readTime?.trim()

  return (
    <article
      className="canvas-panel overflow-hidden bg-[#f4f7f2] px-5 py-12 sm:px-8 sm:py-14 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <Link
          href="/newsroom"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#315e13] transition-colors hover:text-[#1b241d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {newsArticleCopy.backLink}
        </Link>

        <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-[9rem_minmax(0,42rem)] lg:gap-x-12 lg:justify-center">
          <div className="hidden lg:block">
            <p
              className="m-0 text-[0.68rem] font-medium tracking-[0.14em] text-[#566159] uppercase"
            >
              {newsArticleCopy.shareHeading}
            </p>
            <div className="sticky top-28 mt-4">
              <NewsShare title={article.title} layout="stack" />
            </div>
          </div>

          <div className="min-w-0 lg:max-w-[42rem]">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[0.7rem] font-semibold tracking-[0.16em] text-[#315e13] uppercase"
              >
                {article.category}
              </span>
              {article.featured ? (
                <span
                  className="rounded-full bg-[#7fcc2f] px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.1em] text-[#1b241d] uppercase"
                >
                  {newsArticleCopy.featuredLabel}
                </span>
              ) : null}
            </div>

            <h1
              className="mt-4 m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2rem,5vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.04em] text-[#1b241d]"
            >
              {article.title}
            </h1>

            <p className="mt-5 m-0 text-[1.125rem] leading-[1.65] text-[#566159]">
              {article.excerpt}
            </p>

            <p
              className="mt-5 m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#566159]"
            >
              <time dateTime={published}>{formatNewsDate(published)}</time>
              {readTime ? (
                <>
                  <span className="text-[#c5d4c3]" aria-hidden>·</span>
                  <span>{readTime}</span>
                </>
              ) : null}
            </p>

            <div className="mt-6 lg:hidden">
              <NewsShare title={article.title} layout="inline" />
            </div>

            {showHero ? (
              <figure className="mt-8 w-full max-w-full">
                <div className={newsThumbnailFrameClass}>
                  <RemoteThumbnail
                    src={article.thumbnail}
                    alt={article.title}
                    className={newsThumbnailImageClass}
                  />
                </div>
              </figure>
            ) : null}

            <div className={showHero ? "mt-10" : "mt-8"}>
              {showBody ? (
                <ArticleBody html={article.content ?? ""} />
              ) : (
                <p className="m-0 text-base leading-[1.75] text-[#566159]">
                  {newsArticleCopy.emptyBodyNote}
                </p>
              )}
            </div>

            <div className="mt-10 border-t border-[#1b241d]/10 pt-8 lg:hidden">
              <p
                className="mb-4 m-0 text-[0.68rem] font-medium tracking-[0.14em] text-[#566159] uppercase"
              >
                {newsArticleCopy.shareHeading}
              </p>
              <NewsShare title={article.title} layout="inline" />
            </div>

            <RelatedStories items={related} />
          </div>
        </div>
      </div>
    </article>
  )
}

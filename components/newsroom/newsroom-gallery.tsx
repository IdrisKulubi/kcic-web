"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { gsap } from "gsap"

import { RemoteThumbnail } from "@/components/remote-thumbnail"
import {
  categoryFromHash,
  categoryToHash,
  filterNewsArticles,
  formatNewsDate,
  newsCategories,
  newsGalleryCopy,
  newsPageCopy,
  type NewsListItem,
} from "@/lib/data/news"
import { newsCardThumbnailImageClass } from "@/lib/news-article-media"
import { cn } from "@/lib/utils"

function NewsCard({ item }: { item: NewsListItem }) {
  return (
    <li className="js-news-card flex flex-col gap-2.5">
      <Link
        href={`/news/${item.slug}`}
        className="group flex flex-col gap-2.5 text-inherit no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#e8ece8] ring-1 ring-[#1b241d]/8">
          <RemoteThumbnail
            src={item.thumbnail}
            alt={item.title}
            className={`${newsCardThumbnailImageClass} transition-transform duration-[600ms] ease-[cubic-bezier(0.22,0.03,0.26,1)] motion-safe:group-hover:scale-[1.04]`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(14,30,20,0.6)_100%)]"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 p-4">
            <span className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.65rem] font-medium tracking-[0.14em] text-[#e2ede0] uppercase">
              {item.category}
            </span>
            <time
              dateTime={item.publishedAt}
              className="text-[0.65rem] font-medium tracking-[0.08em] text-[#c9dcc4]/90"
            >
              {formatNewsDate(item.publishedAt)}
            </time>
          </div>
          {item.featured ? (
            <span
              className="absolute top-3 left-3 rounded-full bg-[#7fcc2f] px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.1em] text-[#1b241d] uppercase"
            >
              Featured
            </span>
          ) : null}
        </div>
        <div>
          <p
            className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.95rem] font-medium leading-snug tracking-[-0.01em] text-[#1b241d]"
          >
            {item.title}
          </p>
          <p className="mt-1.5 m-0 line-clamp-2 text-[0.8rem] leading-5 text-[#566159]">
            {item.excerpt}
          </p>
          <span className="mt-2 inline-flex text-[0.72rem] font-medium tracking-[0.08em] text-[#315e13] uppercase">
            {newsGalleryCopy.readLabel} →
          </span>
        </div>
      </Link>
    </li>
  )
}

interface NewsroomGalleryProps {
  items: NewsListItem[]
  failed?: boolean
}

export function NewsroomGallery({ items, failed = false }: NewsroomGalleryProps) {
  const categories = useMemo(() => newsCategories(items), [items])

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [featuredOnly, setFeaturedOnly] = useState(false)

  useEffect(() => {
    const syncFromHash = () => {
      const matched = categoryFromHash(window.location.hash, categories)
      setActiveCategory(matched)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [categories])

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category)
    const hash = category ? `#${categoryToHash(category)}` : ""
    window.history.replaceState(null, "", `${window.location.pathname}${hash}`)
    const section = document.getElementById("newsroom-gallery")
    if (section) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    }
  }

  const filtered = useMemo(
    () =>
      filterNewsArticles(items, {
        category: activeCategory,
        featuredOnly,
      }),
    [items, activeCategory, featuredOnly]
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)")
    const cards = document.querySelectorAll(".js-news-card")
    if (!cards.length) return

    if (!media.matches) {
      gsap.set(cards, { opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
      }
    )

    return () => {
      tween.kill()
    }
  }, [filtered, activeCategory, featuredOnly])

  const emptyMessage =
    activeCategory || featuredOnly
      ? newsGalleryCopy.emptyFilter
      : newsGalleryCopy.emptyAll

  return (
    <section
      id="newsroom-gallery"
      aria-labelledby="newsroom-gallery-title"
      className="canvas-panel scroll-mt-32 bg-[#eef3eb] px-5 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="newsroom-gallery-title"
          className="m-0 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(1.5rem,2.8vw,2rem)] font-medium tracking-[-0.03em] text-[#1b241d]"
        >
          {newsPageCopy.galleryHeading}
        </h2>

        {failed ? (
          <p className="mt-10 text-sm leading-6 text-[#566159]">
            {newsGalleryCopy.failed}
          </p>
        ) : (
          <>
            <div
              className="relative mt-10 flex flex-wrap gap-6 border-b border-[#d9e1d8]"
              role="tablist"
              aria-label="News categories"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === null}
                onClick={() => handleCategoryChange(null)}
                className={cn(
                  "relative -mb-px border-0 bg-transparent py-2.5 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.8rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]",
                  activeCategory === null
                    ? "text-[#1b241d]"
                    : "text-[#8a958c] hover:text-[#315e13]"
                )}
              >
                {newsGalleryCopy.tabAll}
                {activeCategory === null ? (
                  <span
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-[#1b241d]"
                    aria-hidden
                  />
                ) : null}
              </button>
              {categories.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "relative -mb-px border-0 bg-transparent py-2.5 font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.8rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]",
                      isActive
                        ? "text-[#1b241d]"
                        : "text-[#8a958c] hover:text-[#315e13]"
                    )}
                  >
                    {category}
                    {isActive ? (
                      <span
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-[#1b241d]"
                        aria-hidden
                      />
                    ) : null}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFeaturedOnly(false)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[0.72rem] font-medium tracking-[0.06em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]",
                  !featuredOnly
                    ? "border-[#1b241d] bg-[#1b241d] text-[#f4f7f2]"
                    : "border-[#d9e1d8] bg-transparent text-[#566159] hover:border-[#315e13]/40 hover:text-[#315e13]"
                )}
              >
                {newsGalleryCopy.yearAll}
              </button>
              <button
                type="button"
                onClick={() => setFeaturedOnly(true)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[0.72rem] font-medium tracking-[0.08em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]",
                  featuredOnly
                    ? "border-[#1b241d] bg-[#1b241d] text-[#f4f7f2]"
                    : "border-[#d9e1d8] bg-transparent text-[#566159] hover:border-[#315e13]/40 hover:text-[#315e13]"
                )}
              >
                {newsGalleryCopy.featuredOnly}
              </button>
            </div>

            <div className="mt-10" role="region" aria-live="polite">
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-[#566159]">{emptyMessage}</p>
              ) : (
                <ul className="m-0 grid list-none grid-cols-1 gap-x-4 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

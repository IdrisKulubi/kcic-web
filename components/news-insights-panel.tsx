"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { RemoteThumbnail } from "@/components/remote-thumbnail"
import type { KcicYouTubeFeed, YouTubeEpisode } from "@/lib/youtube"

const TITLE_ID = "news-insights-title"

export interface NewsInsightsArticle {
  id: string
  title: string
  excerpt: string
  thumbnail: string
  category: string
  slug: string
  publishedAt: string
}

interface NewsInsightsPanelProps {
  articles: NewsInsightsArticle[]
  newsFailed: boolean
  youtube: KcicYouTubeFeed | null
  youtubeFailed: boolean
  channelUrl: string
}

function formatLongDate(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function PlayMark({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#7fcc2f] text-[#1b241d] ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="size-3.5 translate-x-px fill-current">
        <path d="M4 3.5v9l8-4.5-8-4.5z" />
      </svg>
    </span>
  )
}

function FeaturedPlayControl() {
  return (
    <span
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-[#1b241d] shadow-lg ring-1 ring-black/10">
        <svg viewBox="0 0 24 24" className="size-7 translate-x-0.5 fill-current">
          <path d="M8 5.5v13l11-6.5-11-6.5z" />
        </svg>
      </span>
    </span>
  )
}

function PodcastColumn({
  youtube,
  youtubeFailed,
  channelUrl,
}: {
  youtube: KcicYouTubeFeed | null
  youtubeFailed: boolean
  channelUrl: string
}) {
  if (youtubeFailed || !youtube) {
    return (
      <div className="flex flex-col gap-4 px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-9">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#1b241d]">Latest podcast</p>
            <p className="mt-0.5 text-sm text-[#5a665c]">
              Sustainably Speaking Africa
            </p>
          </div>
          <Link
            href="/newsroom/podcast"
            className="text-sm font-medium text-[#5a8f1f] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
          >
            All episodes
          </Link>
        </div>
        <p className="rounded-xl border border-[#dfe6df] bg-[#f8faf7] px-4 py-5 text-sm leading-relaxed text-[#4f5a52]">
          Podcast episodes are temporarily unavailable. Visit the official KCIC
          YouTube channel for the latest Sustainably Speaking Africa uploads.
        </p>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#1b241d] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
        >
          Open KCIC on YouTube
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    )
  }

  const { featured, more } = youtube

  return (
    <div className="flex flex-col gap-5 px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-9">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#1b241d]">Latest podcast</p>
          <p className="mt-0.5 text-sm text-[#5a665c]">
            Sustainably Speaking Africa
          </p>
        </div>
        <Link
          href="/newsroom/podcast"
          className="text-sm font-medium text-[#5a8f1f] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
        >
          All episodes
        </Link>
      </div>

      <FeaturedEpisode episode={featured} />

      {more.length > 0 ? (
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8a948c] uppercase">
            More episodes
          </p>
          <ul className="divide-y divide-[#e3e9e3]">
            {more.map((episode) => (
              <MoreEpisodeItem key={episode.videoId} episode={episode} />
            ))}
          </ul>
        </div>
      ) : null}

      <Link
        href="/newsroom/podcast"
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#1b241d] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
      >
        Browse all episodes
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  )
}

function FeaturedEpisode({ episode }: { episode: YouTubeEpisode }) {
  return (
    <a
      href={episode.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group js-news-fade relative block overflow-hidden rounded-xl border border-[#dfe6df] bg-[#1b241d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
      aria-label={`Watch on YouTube: ${episode.title}`}
    >
      <span className="relative block aspect-video w-full overflow-hidden">
        <RemoteThumbnail
          src={episode.thumbnailUrl}
          alt=""
          className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <FeaturedPlayControl />
      </span>
      <span className="flex flex-col gap-1 bg-[#1f2a22]/95 px-4 py-3 text-white sm:flex-row sm:items-center sm:gap-3">
        <span className="text-[10px] font-semibold tracking-[0.16em] text-[#b8c4b8] uppercase">
          Latest episode
        </span>
        <span className="hidden text-[#7a857a] sm:inline" aria-hidden="true">
          /
        </span>
        <span className="text-sm leading-snug font-medium">{episode.title}</span>
      </span>
    </a>
  )
}

function MoreEpisodeItem({ episode }: { episode: YouTubeEpisode }) {
  return (
    <li>
      <a
        href={episode.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group js-news-fade flex items-start justify-between gap-4 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm leading-snug font-semibold text-[#1b241d] group-hover:underline">
            {episode.title}
          </span>
          <span className="mt-1 block text-xs text-[#7a857a]">
            {formatLongDate(episode.publishedAt)}
          </span>
        </span>
        <PlayMark className="mt-0.5 transition group-hover:scale-105" />
      </a>
    </li>
  )
}

function StoriesColumn({
  articles,
  newsFailed,
}: {
  articles: NewsInsightsArticle[]
  newsFailed: boolean
}) {
  return (
    <div className="flex flex-col gap-5 border-t border-[#e3e9e3] px-5 py-6 sm:px-7 sm:py-8 lg:border-t-0 lg:border-l lg:px-8 lg:py-9">
      <p className="js-news-fade text-sm font-semibold text-[#1b241d]">
        Latest stories
      </p>

      {newsFailed ? (
        <p className="rounded-xl border border-[#dfe6df] bg-[#f8faf7] px-4 py-5 text-sm leading-relaxed text-[#4f5a52]">
          News stories could not be loaded right now. Visit the newsroom for the
          latest updates.
        </p>
      ) : null}

      {!newsFailed && articles.length === 0 ? (
        <p className="text-sm leading-relaxed text-[#5a665c]">
          No stories have been published yet.
        </p>
      ) : null}

      {!newsFailed && articles.length > 0 ? (
        <ul className="divide-y divide-[#e3e9e3]">
          {articles.map((article) => (
            <li key={article.id} className="js-news-fade">
              <article className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    <span className="text-[#5a8f1f]">{article.category}</span>
                    <span className="text-[#c5cdc5]" aria-hidden="true">
                      |
                    </span>
                    <time
                      dateTime={article.publishedAt}
                      className="text-[#8a948c] normal-case tracking-normal"
                    >
                      {formatLongDate(article.publishedAt)}
                    </time>
                  </p>
                  {article.slug ? (
                    <Link
                      href={`/newsroom/news/${article.slug}`}
                      className="mt-2 block text-base leading-snug font-semibold text-[#1b241d] underline decoration-[#c5cdc5] underline-offset-4 hover:decoration-[#7fcc2f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
                    >
                      {article.title}
                    </Link>
                  ) : (
                    <h3 className="mt-2 text-base leading-snug font-semibold text-[#1b241d]">
                      {article.title}
                    </h3>
                  )}
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5a665c]">
                    {article.excerpt}
                  </p>
                </div>
                <RemoteThumbnail
                  src={article.thumbnail}
                  alt={article.title}
                  className="size-[4.75rem] shrink-0 rounded-md border border-[#e3e9e3] object-cover sm:size-20"
                />
              </article>
            </li>
          ))}
        </ul>
      ) : null}

      <Link
        href="/newsroom"
        className="js-news-fade group mt-auto inline-flex w-full items-center gap-3 rounded-lg border border-[#dfe6df] bg-white px-4 py-3.5 text-sm font-semibold text-[#1b241d] transition hover:border-[#cfd8cf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
      >
        <span
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-[#e87722] text-white"
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-2">
            <path d="M6 14l8-8M8 6h6v6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        Explore newsroom
      </Link>
    </div>
  )
}

export function NewsInsightsPanel({
  articles,
  newsFailed,
  youtube,
  youtubeFailed,
  channelUrl,
}: NewsInsightsPanelProps) {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        section.current?.querySelectorAll(".js-news-fade, .js-news-shell") ??
          [],
        { clearProps: "all" }
      )
    })

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        if (!context.conditions?.motion || !section.current) return

        gsap
          .timeline({
            defaults: { duration: 0.8, ease: "power3.out" },
            scrollTrigger: {
              trigger: section.current,
              start: "top 78%",
              once: true,
            },
          })
          .from(".js-news-heading", { y: 22, autoAlpha: 0 })
          .from(".js-news-shell", { y: 28, autoAlpha: 0 }, "-=0.55")
          .from(
            ".js-news-fade",
            { y: 18, autoAlpha: 0, stagger: 0.06 },
            "-=0.45"
          )
      }
    )

    return () => {
      media.revert()
    }
  }, [])

  return (
    <section
      ref={section}
      aria-labelledby={TITLE_ID}
      className="canvas-panel scroll-mt-24 bg-[#eef3ee] px-4 py-14 sm:px-8 sm:py-16 lg:px-[clamp(2rem,5vw,4.25rem)] lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="js-news-heading mx-auto max-w-2xl text-center">
          <h2
            id={TITLE_ID}
            className="text-[clamp(1.75rem,3.2vw,2.35rem)] leading-tight font-semibold tracking-tight text-[#1b241d]"
          >
            News &amp; Insights
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5a665c] sm:text-base">
            Latest episode of Sustainably Speaking Africa, with more conversations
            and newsroom stories alongside it.
          </p>
        </header>

        <div className="js-news-shell mt-10 overflow-hidden rounded-2xl border border-[#d8e0d8] bg-[#fbfcfa] shadow-[0_18px_50px_-40px_rgba(27,36,29,0.45)]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <PodcastColumn
              youtube={youtube}
              youtubeFailed={youtubeFailed}
              channelUrl={channelUrl}
            />
            <StoriesColumn articles={articles} newsFailed={newsFailed} />
          </div>
        </div>
      </div>
    </section>
  )
}

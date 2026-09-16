import { cn } from "@/lib/utils"

/** Shared frame for hero / card thumbnails — keeps any aspect ratio inside the box. */
export const newsThumbnailFrameClass =
  "relative flex w-full min-h-[11rem] max-h-[min(65vh,28rem)] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#e8ece8] ring-1 ring-[#1b241d]/8 sm:min-h-[13rem]"

export const newsThumbnailImageClass =
  "max-h-[min(65vh,28rem)] w-full max-w-full object-contain object-center"

/** Prose wrapper for CMS body — images, figures, embeds stay within the reading column. */
export const newsArticleBodyClassName = cn(
  "news-article-body prose prose-base max-w-none text-[#566159] leading-[1.75]",
  "prose-headings:font-['Gotham','Century_Gothic',Arial,sans-serif] prose-headings:tracking-[-0.02em] prose-headings:text-[#1b241d]",
  "prose-p:leading-[1.75] prose-a:text-[#005a7c]",
  "prose-img:m-0 prose-img:max-w-full prose-img:rounded-[1rem]",
  "prose-figcaption:text-sm prose-figcaption:text-[#566159]",
  "[&_img]:box-border [&_img]:mx-auto [&_img]:block [&_img]:h-auto [&_img]:max-h-[min(70vh,28rem)] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain",
  "[&_figure]:my-8 [&_figure]:max-w-full [&_figure]:overflow-hidden",
  "[&_figure_img]:mx-auto",
  "[&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:max-h-[28rem] [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:rounded-[1rem]",
  "[&_video]:mx-auto [&_video]:block [&_video]:max-h-[28rem] [&_video]:w-full [&_video]:max-w-full [&_video]:rounded-[1rem] [&_video]:object-contain",
  "[&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto"
)

/** Gallery card frame (4:3) — crop from center when image is not 4:3. */
export const newsCardThumbnailImageClass =
  "absolute inset-0 size-full object-cover object-center"

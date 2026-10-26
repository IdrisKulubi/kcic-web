"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState, useTransition } from "react"
import {
  createNewsArticle,
  updateNewsArticle,
  type NewsData,
} from "@/lib/actions/news"
import { slugifyTitle } from "@/lib/staff/slug"
import { RichTextEditor } from "@/components/staff/rich-text-editor"
import { ThumbnailField } from "@/components/staff/thumbnail-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ArrowSquareOut, CalendarBlank, WarningCircle } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface NewsFormProps {
  mode: "create" | "edit"
  article?: NewsData
  categories: string[]
}

type FieldName = "title" | "slug" | "excerpt" | "category" | "thumbnail" | "readTime"
type FieldErrors = Partial<Record<FieldName, string>>

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const TITLE_MAX = 200
const EXCERPT_MIN = 20
const EXCERPT_MAX = 500

function validate(values: {
  title: string
  slug: string
  excerpt: string
  category: string
  thumbnail: string
  readTime: string
}): FieldErrors {
  const errors: FieldErrors = {}
  const title = values.title.trim()
  const excerpt = values.excerpt.trim()
  const category = values.category.trim()

  if (title.length < 5) errors.title = "Write a headline of at least 5 characters."
  if (!values.slug.trim()) errors.slug = "Add a URL slug."
  else if (!SLUG_PATTERN.test(values.slug.trim()))
    errors.slug = "Use lowercase letters, numbers and single hyphens only."
  if (excerpt.length < EXCERPT_MIN)
    errors.excerpt = `The summary needs at least ${EXCERPT_MIN} characters (${excerpt.length} so far).`
  if (category.length < 2) errors.category = "Choose or type a category."
  if (!values.thumbnail.trim()) errors.thumbnail = "Upload a cover image."
  if (values.readTime.length > 30) errors.readTime = "Keep this under 30 characters."
  return errors
}

function readTimeFromWords(words: number) {
  if (words === 0) return ""
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export function NewsForm({ mode, article, categories }: NewsFormProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const [title, setTitle] = useState(article?.title ?? "")
  const [slug, setSlug] = useState(article?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(mode === "edit")
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "")
  const [category, setCategory] = useState(article?.category ?? "")
  const [thumbnail, setThumbnail] = useState(article?.thumbnail ?? "")
  const [content, setContent] = useState(article?.content ?? "")
  const [readTime, setReadTime] = useState(article?.readTime ?? "")
  const [readTimeTouched, setReadTimeTouched] = useState(Boolean(article?.readTime))
  const [wordCount, setWordCount] = useState(0)
  const [featured, setFeatured] = useState(article?.featured ?? false)
  const [publishedAt, setPublishedAt] = useState<Date>(
    article?.publishedAt ? new Date(article.publishedAt) : new Date()
  )
  const [dateOpen, setDateOpen] = useState(false)

  useEffect(() => {
    if (!slugTouched && mode === "create") {
      setSlug(slugifyTitle(title))
    }
  }, [title, slugTouched, mode])

  const values = { title, slug, excerpt, category, thumbnail, readTime }
  const errors: FieldErrors = submitted ? validate(values) : {}

  const otherCategories = useMemo(
    () =>
      Array.from(new Set(categories.map((c) => c.trim()).filter(Boolean))).sort(
        (a, b) => a.localeCompare(b)
      ),
    [categories]
  )

  const suggestedReadTime = readTimeFromWords(wordCount)

  function handleWordCount(words: number) {
    setWordCount(words)
    if (!readTimeTouched) setReadTime(readTimeFromWords(words))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setServerError(null)
    setSubmitted(true)

    const nextErrors = validate(values)
    const firstInvalid = Object.keys(nextErrors)[0] as FieldName | undefined
    if (firstInvalid) {
      document.getElementById(`news-${firstInvalid}`)?.focus()
      return
    }

    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content,
      thumbnail: thumbnail.trim(),
      category: category.trim(),
      slug: slug.trim(),
      readTime: readTime.trim(),
      featured,
      publishedAt,
    }

    startTransition(async () => {
      const result =
        mode === "edit" && article?.id
          ? await updateNewsArticle(article.id, payload)
          : await createNewsArticle(payload)

      if (!result.success) {
        setServerError(result.error)
        return
      }

      router.push("/staff/news")
      router.refresh()
    })
  }

  const errorCount = Object.keys(errors).length
  const isFuture = publishedAt.getTime() > Date.now()

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid w-full items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8"
    >
      {/* Writing column */}
      <div className="flex min-w-0 flex-col gap-6">
        <section
          aria-label="Headline and summary"
          className="flex flex-col gap-5 rounded-xl bg-card p-5 ring-1 ring-border md:p-7"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <Label htmlFor="news-title">Headline</Label>
              <span
                className={cn(
                  "text-xs tabular-nums text-muted-foreground",
                  title.length > TITLE_MAX - 20 && "text-foreground"
                )}
              >
                {title.length}/{TITLE_MAX}
              </span>
            </div>
            <Textarea
              id="news-title"
              rows={1}
              value={title}
              maxLength={TITLE_MAX}
              placeholder="What happened, and who made it happen?"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "news-title-error" : undefined}
              onChange={(e) => setTitle(e.target.value.replace(/\n/g, " "))}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              className="min-h-0 resize-none border-0 bg-transparent px-0 py-1 font-['Gotham','Century_Gothic',Arial,sans-serif] text-2xl leading-tight font-bold tracking-[-0.02em] shadow-none focus-visible:ring-0 md:text-[1.75rem]"
            />
            <FieldMessage id="news-title-error" error={errors.title} />
          </div>

          <div className="h-px bg-border" aria-hidden />

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <Label htmlFor="news-excerpt">Summary</Label>
              <span
                className={cn(
                  "text-xs tabular-nums text-muted-foreground",
                  excerpt.trim().length > 0 &&
                    excerpt.trim().length < EXCERPT_MIN &&
                    "text-foreground"
                )}
              >
                {excerpt.length}/{EXCERPT_MAX}
              </span>
            </div>
            <Textarea
              id="news-excerpt"
              rows={3}
              value={excerpt}
              maxLength={EXCERPT_MAX}
              placeholder="One or two sentences shown on newsroom cards and in search results."
              aria-invalid={Boolean(errors.excerpt)}
              aria-describedby={
                errors.excerpt ? "news-excerpt-error" : "news-excerpt-hint"
              }
              onChange={(e) => setExcerpt(e.target.value)}
              className="min-h-20 resize-none border-0 bg-transparent px-0 py-1 text-base leading-relaxed text-muted-foreground shadow-none focus-visible:text-foreground focus-visible:ring-0 md:text-base"
            />
            {errors.excerpt ? (
              <FieldMessage id="news-excerpt-error" error={errors.excerpt} />
            ) : (
              <p id="news-excerpt-hint" className="sr-only">
                Between {EXCERPT_MIN} and {EXCERPT_MAX} characters.
              </p>
            )}
          </div>
        </section>

        <section aria-labelledby="news-body-label" className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3 px-1">
            <Label id="news-body-label" htmlFor="news-body">
              Article body
            </Label>
            <span className="text-xs tabular-nums text-muted-foreground">
              {wordCount.toLocaleString()} {wordCount === 1 ? "word" : "words"}
            </span>
          </div>
          <RichTextEditor
            id="news-body"
            value={content}
            onChange={setContent}
            onWordCountChange={handleWordCount}
          />
        </section>
      </div>

      {/* Settings column */}
      <aside
        aria-label="Publishing settings"
        className="flex flex-col rounded-xl bg-card ring-1 ring-border lg:sticky lg:top-16 lg:max-h-[calc(100svh-5rem)] lg:overflow-y-auto"
      >
        <PanelSection title="Publish">
          <div className="flex flex-col gap-2">
            <Label htmlFor="news-published">Publish date</Label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger
                render={
                  <Button
                    id="news-published"
                    type="button"
                    variant="outline"
                    className="h-10 w-full justify-start rounded-lg font-normal"
                  >
                    <CalendarBlank className="size-4 text-muted-foreground" />
                    {format(publishedAt, "d MMMM yyyy")}
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={publishedAt}
                  defaultMonth={publishedAt}
                  onSelect={(date) => {
                    if (!date) return
                    setPublishedAt(date)
                    setDateOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
            {isFuture ? (
              <p className="text-xs text-muted-foreground">
                Future dates still show the article straight away; the date is
                only used for ordering and display.
              </p>
            ) : null}
          </div>

          <div className="flex items-start justify-between gap-4 rounded-lg bg-muted/60 p-3">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="news-featured">Feature this story</Label>
              <p id="news-featured-hint" className="text-xs text-muted-foreground">
                Appears under the newsroom&apos;s Featured filter.
              </p>
            </div>
            <Switch
              id="news-featured"
              checked={featured}
              aria-describedby="news-featured-hint"
              onCheckedChange={setFeatured}
              className="mt-0.5"
            />
          </div>

          {serverError || (submitted && errorCount > 0) ? (
            <div
              role="alert"
              className="flex gap-2 rounded-lg bg-destructive/8 p-3 text-sm text-destructive"
            >
              <WarningCircle className="mt-0.5 size-4 shrink-0" weight="fill" aria-hidden />
              <span>
                {serverError ??
                  (errorCount === 1
                    ? "One field needs attention before saving."
                    : `${errorCount} fields need attention before saving.`)}
              </span>
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={pending}
              className="h-10 w-full rounded-lg font-semibold"
            >
              {pending
                ? "Saving…"
                : mode === "edit"
                  ? "Save changes"
                  : "Publish article"}
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                className="h-9 flex-1 rounded-lg text-muted-foreground"
                render={<Link href="/staff/news" />}
              >
                Cancel
              </Button>
              {mode === "edit" && article?.slug ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 flex-1 rounded-lg text-muted-foreground"
                  render={
                    <Link
                      href={`/news/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  View live
                  <ArrowSquareOut className="size-3.5" />
                </Button>
              ) : null}
            </div>
          </div>
        </PanelSection>

        <PanelSection title="Cover image">
          <ThumbnailField
            id="news-thumbnail"
            value={thumbnail}
            onChange={setThumbnail}
            invalid={Boolean(errors.thumbnail)}
            describedBy={errors.thumbnail ? "news-thumbnail-error" : undefined}
          />
          <FieldMessage id="news-thumbnail-error" error={errors.thumbnail} />
        </PanelSection>

        <PanelSection title="Details">
          <div className="flex flex-col gap-2">
            <Label htmlFor="news-category">Category</Label>
            <Input
              id="news-category"
              value={category}
              maxLength={50}
              placeholder="e.g. Programme update"
              list="news-category-options"
              autoComplete="off"
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? "news-category-error" : undefined}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10"
            />
            <datalist id="news-category-options">
              {otherCategories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
            {otherCategories.length > 0 ? (
              <div className="flex flex-wrap gap-1.5" aria-label="Existing categories">
                {otherCategories.map((cat) => {
                  const selected = cat.toLowerCase() === category.trim().toLowerCase()
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs ring-1 transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        selected
                          ? "bg-secondary font-medium text-secondary-foreground ring-ring/40"
                          : "text-muted-foreground ring-border hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            ) : null}
            <FieldMessage id="news-category-error" error={errors.category} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="news-slug">URL</Label>
            <div
              className={cn(
                "flex h-10 items-center overflow-hidden rounded-lg border border-input bg-transparent text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                errors.slug && "border-destructive focus-within:ring-destructive/20"
              )}
            >
              <span className="flex h-full items-center bg-muted px-2.5 text-muted-foreground select-none">
                /news/
              </span>
              <input
                id="news-slug"
                value={slug}
                spellCheck={false}
                autoComplete="off"
                aria-invalid={Boolean(errors.slug)}
                aria-describedby={errors.slug ? "news-slug-error" : "news-slug-hint"}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
                }}
                className="h-full min-w-0 flex-1 bg-transparent px-2.5 font-mono text-[0.8rem] outline-none"
              />
            </div>
            {errors.slug ? (
              <FieldMessage id="news-slug-error" error={errors.slug} />
            ) : (
              <p id="news-slug-hint" className="text-xs text-muted-foreground">
                {mode === "edit"
                  ? "Changing this breaks links already shared."
                  : slugTouched
                    ? "Custom URL. Clear it to regenerate from the headline."
                    : "Generated from the headline."}
              </p>
            )}
            {mode === "create" && slugTouched ? (
              <button
                type="button"
                onClick={() => {
                  setSlugTouched(false)
                  setSlug(slugifyTitle(title))
                }}
                className="w-fit text-xs text-muted-foreground underline underline-offset-3 hover:text-foreground"
              >
                Reset to headline
              </button>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="news-readTime">Read time</Label>
            <Input
              id="news-readTime"
              value={readTime}
              maxLength={30}
              placeholder={suggestedReadTime || "e.g. 4 min read"}
              aria-invalid={Boolean(errors.readTime)}
              aria-describedby="news-readTime-hint"
              onChange={(e) => {
                setReadTimeTouched(true)
                setReadTime(e.target.value)
              }}
              className="h-10"
            />
            {readTimeTouched && suggestedReadTime && readTime !== suggestedReadTime ? (
              <button
                id="news-readTime-hint"
                type="button"
                onClick={() => {
                  setReadTimeTouched(false)
                  setReadTime(suggestedReadTime)
                }}
                className="w-fit text-xs text-muted-foreground underline underline-offset-3 hover:text-foreground"
              >
                Use estimate ({suggestedReadTime})
              </button>
            ) : (
              <p id="news-readTime-hint" className="text-xs text-muted-foreground">
                Estimated from the article length.
              </p>
            )}
            <FieldMessage id="news-readTime-error" error={errors.readTime} />
          </div>
        </PanelSection>
      </aside>
    </form>
  )
}

function PanelSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4 border-b p-5 last:border-b-0">
      <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

function FieldMessage({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-destructive">
      <WarningCircle className="size-4 shrink-0" weight="fill" aria-hidden />
      {error}
    </p>
  )
}

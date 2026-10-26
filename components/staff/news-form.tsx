"use client"

import "@uploadthing/react/styles.css"
import { useRouter } from "next/navigation"
import { RemoteThumbnail } from "@/components/remote-thumbnail"
import { useEffect, useMemo, useState, useTransition } from "react"
import {
  createNewsArticle,
  updateNewsArticle,
  type NewsData,
} from "@/lib/actions/news"
import { estimateReadTime, slugifyTitle } from "@/lib/staff/slug"
import { RichTextEditor } from "@/components/staff/rich-text-editor"
import { UploadDropzone } from "@/utils/uploadthing"
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
import { CalendarBlank } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface NewsFormProps {
  mode: "create" | "edit"
  article?: NewsData
  categories: string[]
}

export function NewsForm({ mode, article, categories }: NewsFormProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState(article?.title ?? "")
  const [slug, setSlug] = useState(article?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(mode === "edit")
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "")
  const [category, setCategory] = useState(article?.category ?? "")
  const [thumbnail, setThumbnail] = useState(article?.thumbnail ?? "")
  const [content, setContent] = useState(article?.content ?? "")
  const [readTime, setReadTime] = useState(article?.readTime ?? "")
  const [readTimeTouched, setReadTimeTouched] = useState(Boolean(article?.readTime))
  const [featured, setFeatured] = useState(article?.featured ?? false)
  const [publishedAt, setPublishedAt] = useState<Date>(
    article?.publishedAt
      ? new Date(article.publishedAt)
      : new Date()
  )

  useEffect(() => {
    if (!slugTouched && mode === "create") {
      setSlug(slugifyTitle(title))
    }
  }, [title, slugTouched, mode])

  const categorySuggestions = useMemo(() => {
    const set = new Set(categories.map((c) => c.trim()).filter(Boolean))
    if (category.trim()) set.add(category.trim())
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [categories, category])

  function handleWordCount(words: number) {
    if (readTimeTouched) return
    if (words === 0) {
      setReadTime("")
      return
    }
    const minutes = Math.max(1, Math.ceil(words / 200))
    setReadTime(`${minutes} min read`)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

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
        setError(result.error)
        return
      }

      router.push("/staff/news")
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid w-full min-w-0 gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d9e1d8] pb-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#315e13]">Newsroom</p>
          <h1 className="mt-1 font-['Gotham','Century_Gothic',Arial,sans-serif] text-2xl font-semibold tracking-[-0.02em] text-[#1b241d]">
            {mode === "edit" ? "Edit article" : "New article"}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            className="border-[#d9e1d8] bg-[#fbfcfb] text-[#1b241d]"
            onClick={() => router.push("/staff/news")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={pending || !thumbnail}
            className="bg-[#7fcc2f] text-[#1b241d] hover:bg-[#6fb828]"
          >
            {pending
              ? "Saving…"
              : mode === "edit"
                ? "Save changes"
                : "Publish article"}
          </Button>
        </div>
      </div>

      <div className="grid min-w-0 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid min-w-0 gap-6">
          <FormField label="Title" htmlFor="news-title" hint={`${title.length}/200 characters`}>
            <Input
              id="news-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
              className={controlClass}
            />
          </FormField>

          <FormField
            label="URL slug"
            htmlFor="news-slug"
            hint="Lowercase letters, numbers, and hyphens. On edit, the public URL stays put until you change this."
          >
            <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
              <span className="text-sm text-[#566159]">/news/</span>
              <Input
                id="news-slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(e.target.value)
                }}
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                className={controlClass}
              />
            </div>
          </FormField>

          <FormField
            label="Excerpt"
            htmlFor="news-excerpt"
            hint={`${excerpt.length}/500 characters. At least 20.`}
          >
            <Textarea
              id="news-excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={5}
              maxLength={500}
              className={cn(controlClass, "field-sizing-fixed min-h-32 resize-y")}
            />
          </FormField>

          <FormField label="Article body">
            <RichTextEditor
              value={content}
              onChange={setContent}
              onWordCountChange={handleWordCount}
            />
          </FormField>
        </div>

        <aside className="grid min-w-0 content-start gap-5 xl:sticky xl:top-6">
          <FormField label="Thumbnail">
            {thumbnail ? (
              <div className="mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-[#e8ece8] ring-1 ring-[#1b241d]/8">
                <RemoteThumbnail
                  src={thumbnail}
                  alt="Article thumbnail preview"
                  className="size-full object-cover"
                />
              </div>
            ) : null}
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(files) => {
                const url = files[0]?.url
                if (url) setThumbnail(url)
              }}
              onUploadError={(err) => setError(err.message)}
            />
            {thumbnail ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 border-[#d9e1d8] text-[#1b241d]"
                onClick={() => setThumbnail("")}
              >
                Remove thumbnail
              </Button>
            ) : null}
          </FormField>

          <FormField label="Category" htmlFor="news-category">
            <Input
              id="news-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              maxLength={50}
              list="news-category-suggestions"
              className={controlClass}
            />
            <datalist id="news-category-suggestions">
              {categorySuggestions.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
            {categories.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {categories.map((cat) => {
                  const selected = category.trim().toLowerCase() === cat.toLowerCase()
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        selected
                          ? "bg-[#315e13] text-[#f4f7f2]"
                          : "bg-[#e8ece8] text-[#1b241d] hover:bg-[#d7e4d8]"
                      )}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </FormField>

          <FormField label="Published date">
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      controlClass,
                      "justify-start font-normal hover:bg-[#f4f7f2]"
                    )}
                  >
                    <CalendarBlank className="mr-2 size-4 text-[#315e13]" />
                    {publishedAt ? format(publishedAt, "d MMMM yyyy") : "Pick a date"}
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={publishedAt}
                  onSelect={(date) => date && setPublishedAt(date)}
                />
              </PopoverContent>
            </Popover>
          </FormField>

          <FormField
            label="Read time"
            htmlFor="news-read-time"
            hint="Suggested from the article length until you type your own."
          >
            <Input
              id="news-read-time"
              value={readTime}
              onChange={(e) => {
                setReadTimeTouched(true)
                setReadTime(e.target.value)
              }}
              placeholder={estimateReadTime(content) || "4 min read"}
              maxLength={30}
              className={controlClass}
            />
          </FormField>

          <div className="flex items-start gap-3 rounded-xl bg-[#eef3ec] px-3 py-3 ring-1 ring-[#d9e1d8]">
            <Switch
              id="news-featured"
              checked={featured}
              onCheckedChange={setFeatured}
            />
            <div className="min-w-0">
              <Label htmlFor="news-featured" className="text-[#1b241d]">
                Featured article
              </Label>
              <p className="mt-0.5 text-sm leading-5 text-[#566159]">
                Shows in the newsroom featured filter.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {error ? (
        <p className="text-sm text-[#b42318]" role="alert">{error}</p>
      ) : null}
    </form>
  )
}

const controlClass =
  "field-sizing-fixed! h-11 w-full min-w-0 rounded-lg border-[#d9e1d8] bg-[#fbfcfb] text-[#1b241d] shadow-none placeholder:text-[#918f8f] focus-visible:border-[#315e13] focus-visible:ring-[#315e13]/25"

function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid min-w-0 gap-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-[#1b241d]">
        {label}
      </Label>
      {children}
      {hint ? <p className="text-sm leading-5 text-[#566159]">{hint}</p> : null}
    </div>
  )
}

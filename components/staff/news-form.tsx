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
import { Badge } from "@/components/ui/badge"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
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
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="news-title">Title</FieldLabel>
          <Input
            id="news-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
          />
          <FieldDescription>{title.length}/200 characters</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="news-slug">URL slug</FieldLabel>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/news/</span>
            <Input
              id="news-slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true)
                setSlug(e.target.value)
              }}
              required
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            />
          </div>
          <FieldDescription>
            Lowercase letters, numbers, and hyphens only. Leave auto-generated on
            create unless you need a custom URL.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="news-excerpt">Excerpt</FieldLabel>
          <Textarea
            id="news-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            rows={3}
            maxLength={500}
          />
          <FieldDescription>{excerpt.length}/500 characters (min 20)</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="news-category">Category</FieldLabel>
          <Input
            id="news-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            maxLength={50}
            list="news-category-suggestions"
          />
          <datalist id="news-category-suggestions">
            {categorySuggestions.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="cursor-pointer"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </Field>

        <Field>
          <FieldLabel>Thumbnail</FieldLabel>
          {thumbnail ? (
            <div className="relative mb-3 aspect-[16/10] max-w-md overflow-hidden rounded-lg border bg-muted">
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
              className="mt-2"
              onClick={() => setThumbnail("")}
            >
              Remove thumbnail
            </Button>
          ) : null}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Published date</FieldLabel>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !publishedAt && "text-muted-foreground"
                    )}
                  >
                    <CalendarBlank className="mr-2 size-4" />
                    {publishedAt ? format(publishedAt, "PPP") : "Pick a date"}
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
          </Field>

          <Field>
            <FieldLabel htmlFor="news-read-time">Read time</FieldLabel>
            <Input
              id="news-read-time"
              value={readTime}
              onChange={(e) => {
                setReadTimeTouched(true)
                setReadTime(e.target.value)
              }}
              placeholder={estimateReadTime(content) || "e.g. 4 min read"}
              maxLength={30}
            />
            <FieldDescription>
              Auto-suggested from word count until you edit this field.
            </FieldDescription>
          </Field>
        </div>

        <Field orientation="horizontal">
          <Switch
            id="news-featured"
            checked={featured}
            onCheckedChange={setFeatured}
          />
          <div className="space-y-0.5">
            <Label htmlFor="news-featured">Featured article</Label>
            <FieldDescription>
              Featured stories are highlighted in the newsroom filters.
            </FieldDescription>
          </div>
        </Field>

        <Field>
          <FieldLabel>Article body</FieldLabel>
          <RichTextEditor
            value={content}
            onChange={setContent}
            onWordCountChange={handleWordCount}
          />
        </Field>
      </FieldGroup>

      {error ? (
        <p className="text-sm text-destructive" role="alert">{error}</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending || !thumbnail}>
          {pending
            ? "Saving…"
            : mode === "edit"
              ? "Save changes"
              : "Publish article"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={() => router.push("/staff/news")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

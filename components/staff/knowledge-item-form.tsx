"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { format } from "date-fns"
import {
  createKnowledgeItem,
  updateKnowledgeItem,
} from "@/lib/actions/knowledge-hub"
import {
  getKnowledgeSection,
  knowledgeSections,
  toDateInputValue,
  type KnowledgeItem,
  type KnowledgeSectionSlug,
} from "@/lib/data/knowledge-hub"
import { slugifyTitle } from "@/lib/staff/slug"
import { RichTextEditor } from "@/components/staff/rich-text-editor"
import { ThumbnailField } from "@/components/staff/thumbnail-field"
import {
  AttachmentField,
  type AttachmentValue,
} from "@/components/staff/attachment-field"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ArrowSquareOut, CalendarBlank, WarningCircle } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface KnowledgeItemFormProps {
  mode: "create" | "edit"
  item?: KnowledgeItem
  defaultSection: KnowledgeSectionSlug
}

type FieldName = "title" | "slug" | "summary" | "coverImage"
type FieldErrors = Partial<Record<FieldName, string>>

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const TITLE_MAX = 200
const SUMMARY_MIN = 20
const SUMMARY_MAX = 500

function validate(values: {
  title: string
  slug: string
  summary: string
  coverImage: string
}): FieldErrors {
  const errors: FieldErrors = {}
  const summary = values.summary.trim()

  if (values.title.trim().length < 5) errors.title = "Write a title of at least 5 characters."
  if (!values.slug.trim()) errors.slug = "Add a URL slug."
  else if (!SLUG_PATTERN.test(values.slug.trim()))
    errors.slug = "Use lowercase letters, numbers and single hyphens only."
  if (summary.length < SUMMARY_MIN)
    errors.summary = `The summary needs at least ${SUMMARY_MIN} characters (${summary.length} so far).`
  if (!values.coverImage.trim()) errors.coverImage = "Upload a cover image."
  return errors
}

/** Local calendar date chosen in the picker → `YYYY-MM-DD`. */
function toDay(date: Date) {
  return format(date, "yyyy-MM-dd")
}

/** `YYYY-MM-DD` → local Date at midnight for the picker. */
function fromDay(day: string) {
  const [year, month, date] = day.split("-").map(Number)
  return new Date(year, month - 1, date)
}

export function KnowledgeItemForm({ mode, item, defaultSection }: KnowledgeItemFormProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const [section, setSection] = useState<KnowledgeSectionSlug>(item?.section ?? defaultSection)
  const [title, setTitle] = useState(item?.title ?? "")
  const [slug, setSlug] = useState(item?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(mode === "edit")
  const [summary, setSummary] = useState(item?.summary ?? "")
  const [coverImage, setCoverImage] = useState(item?.coverImage ?? "")
  const [content, setContent] = useState(item?.content ?? "")
  const [wordCount, setWordCount] = useState(0)
  const [attachment, setAttachment] = useState<AttachmentValue>({
    url: item?.attachmentUrl ?? "",
    name: item?.attachmentName ?? "",
    size: item?.attachmentSize ?? null,
  })
  const [publishedOn, setPublishedOn] = useState(
    item?.publishedAt ? toDateInputValue(item.publishedAt) : toDay(new Date())
  )
  const [dateOpen, setDateOpen] = useState(false)

  useEffect(() => {
    if (!slugTouched && mode === "create") {
      setSlug(slugifyTitle(title))
    }
  }, [title, slugTouched, mode])

  const values = { title, slug, summary, coverImage }
  const errors: FieldErrors = submitted ? validate(values) : {}
  const sectionInfo = getKnowledgeSection(section)
  const listHref = `/staff/knowledge-hub?section=${section}`

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setServerError(null)
    setSubmitted(true)

    const nextErrors = validate(values)
    const firstInvalid = Object.keys(nextErrors)[0] as FieldName | undefined
    if (firstInvalid) {
      document.getElementById(`kh-${firstInvalid}`)?.focus()
      return
    }

    const payload = {
      section,
      title: title.trim(),
      slug: slug.trim(),
      summary: summary.trim(),
      content,
      coverImage: coverImage.trim(),
      attachmentUrl: attachment.url,
      attachmentName: attachment.name,
      attachmentSize: attachment.size,
      publishedOn,
    }

    startTransition(async () => {
      const result =
        mode === "edit" && item?.id
          ? await updateKnowledgeItem(item.id, payload)
          : await createKnowledgeItem(payload)

      if (!result.success) {
        setServerError(result.error)
        return
      }

      router.push(listHref)
      router.refresh()
    })
  }

  const errorCount = Object.keys(errors).length
  const publishedDate = fromDay(publishedOn)

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid w-full items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8"
    >
      {/* Writing column */}
      <div className="flex min-w-0 flex-col gap-6">
        <section
          aria-label="Title and summary"
          className="flex flex-col gap-5 rounded-xl bg-card p-5 ring-1 ring-border md:p-7"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <Label htmlFor="kh-title">Title</Label>
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
              id="kh-title"
              rows={1}
              value={title}
              maxLength={TITLE_MAX}
              placeholder="e.g. Country Focus Report 2026 - Kenya"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "kh-title-error" : undefined}
              onChange={(e) => setTitle(e.target.value.replace(/\n/g, " "))}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              className="min-h-0 resize-none border-0 bg-transparent px-0 py-1 font-['Gotham','Century_Gothic',Arial,sans-serif] text-2xl leading-tight font-bold tracking-[-0.02em] shadow-none focus-visible:ring-0 md:text-[1.75rem]"
            />
            <FieldMessage id="kh-title-error" error={errors.title} />
          </div>

          <div className="h-px bg-border" aria-hidden />

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <Label htmlFor="kh-summary">Summary</Label>
              <span
                className={cn(
                  "text-xs tabular-nums text-muted-foreground",
                  summary.trim().length > 0 &&
                    summary.trim().length < SUMMARY_MIN &&
                    "text-foreground"
                )}
              >
                {summary.length}/{SUMMARY_MAX}
              </span>
            </div>
            <Textarea
              id="kh-summary"
              rows={3}
              value={summary}
              maxLength={SUMMARY_MAX}
              placeholder="A short brief shown at the top of the page and in search results."
              aria-invalid={Boolean(errors.summary)}
              aria-describedby={errors.summary ? "kh-summary-error" : "kh-summary-hint"}
              onChange={(e) => setSummary(e.target.value)}
              className="min-h-20 resize-none border-0 bg-transparent px-0 py-1 text-base leading-relaxed text-muted-foreground shadow-none focus-visible:text-foreground focus-visible:ring-0 md:text-base"
            />
            {errors.summary ? (
              <FieldMessage id="kh-summary-error" error={errors.summary} />
            ) : (
              <p id="kh-summary-hint" className="sr-only">
                Between {SUMMARY_MIN} and {SUMMARY_MAX} characters.
              </p>
            )}
          </div>
        </section>

        <section aria-labelledby="kh-body-label" className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3 px-1">
            <Label id="kh-body-label" htmlFor="kh-body">
              Body
            </Label>
            <span className="text-xs tabular-nums text-muted-foreground">
              {wordCount.toLocaleString()} {wordCount === 1 ? "word" : "words"}
            </span>
          </div>
          <RichTextEditor
            id="kh-body"
            value={content}
            onChange={setContent}
            onWordCountChange={setWordCount}
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
            <Label htmlFor="kh-section">Section</Label>
            <NativeSelect
              id="kh-section"
              value={section}
              onChange={(e) => setSection(e.target.value as KnowledgeSectionSlug)}
              className="w-full"
            >
              {knowledgeSections.map((option) => (
                <NativeSelectOption key={option.slug} value={option.slug}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="kh-published">Publish date</Label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger
                render={
                  <Button
                    id="kh-published"
                    type="button"
                    variant="outline"
                    className="h-10 w-full justify-start rounded-lg font-normal"
                  >
                    <CalendarBlank className="size-4 text-muted-foreground" />
                    {format(publishedDate, "d MMMM yyyy")}
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={publishedDate}
                  defaultMonth={publishedDate}
                  onSelect={(date) => {
                    if (!date) return
                    setPublishedOn(toDay(date))
                    setDateOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              Shown on the card. Newest dates appear first.
            </p>
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
                  : `Publish ${sectionInfo?.singular.toLowerCase() ?? "item"}`}
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                className="h-9 flex-1 rounded-lg text-muted-foreground"
                render={<Link href={listHref} />}
              >
                Cancel
              </Button>
              {mode === "edit" && item?.slug ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 flex-1 rounded-lg text-muted-foreground"
                  render={
                    <Link
                      href={`/knowledge-hub/${item.section}/${item.slug}`}
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
            id="kh-coverImage"
            value={coverImage}
            onChange={setCoverImage}
            invalid={Boolean(errors.coverImage)}
            describedBy={errors.coverImage ? "kh-coverImage-error" : undefined}
          />
          <FieldMessage id="kh-coverImage-error" error={errors.coverImage} />
        </PanelSection>

        <PanelSection title="Download (optional)">
          <AttachmentField id="kh-attachment" value={attachment} onChange={setAttachment} />
          <p className="text-xs text-muted-foreground">
            Readers get a download button on the detail page.
          </p>
        </PanelSection>

        <PanelSection title="Details">
          <div className="flex flex-col gap-2">
            <Label htmlFor="kh-slug">URL</Label>
            <div
              className={cn(
                "flex h-10 items-center overflow-hidden rounded-lg border border-input bg-transparent text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                errors.slug && "border-destructive focus-within:ring-destructive/20"
              )}
            >
              <span className="flex h-full items-center bg-muted px-2.5 text-muted-foreground select-none">
                /{section}/
              </span>
              <input
                id="kh-slug"
                value={slug}
                spellCheck={false}
                autoComplete="off"
                aria-invalid={Boolean(errors.slug)}
                aria-describedby={errors.slug ? "kh-slug-error" : "kh-slug-hint"}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
                }}
                className="h-full min-w-0 flex-1 bg-transparent px-2.5 font-mono text-[0.8rem] outline-none"
              />
            </div>
            {errors.slug ? (
              <FieldMessage id="kh-slug-error" error={errors.slug} />
            ) : (
              <p id="kh-slug-hint" className="text-xs text-muted-foreground">
                {mode === "edit"
                  ? "Changing this breaks links already shared."
                  : slugTouched
                    ? "Custom URL."
                    : "Generated from the title."}
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
                Reset to title
              </button>
            ) : null}
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

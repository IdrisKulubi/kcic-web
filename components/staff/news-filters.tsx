"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { MagnifyingGlass } from "@phosphor-icons/react"

interface NewsFiltersProps {
  categories: string[]
}

export function NewsFilters({ categories }: NewsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()

  const q = searchParams.get("q") ?? ""
  const category = searchParams.get("category") ?? ""

  function applyFilters(next: { q?: string; category?: string }) {
    const params = new URLSearchParams()
    const query = next.q ?? q
    const cat = next.category ?? category
    if (query.trim()) params.set("q", query.trim())
    if (cat) params.set("category", cat)
    startTransition(() => {
      const qs = params.toString()
      router.push(qs ? `/staff/news?${qs}` : "/staff/news")
    })
  }

  return (
    <form
      role="search"
      aria-busy={pending}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        applyFilters({ q: String(data.get("q") ?? "") })
      }}
    >
      <div className="relative flex-1 sm:max-w-sm">
        <Label htmlFor="news-search" className="sr-only">
          Search articles
        </Label>
        <MagnifyingGlass
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id="news-search"
          name="q"
          type="search"
          placeholder="Search headlines and summaries"
          defaultValue={q}
          className="h-10 bg-card pl-9"
        />
      </div>
      <div className="sm:w-52">
        <Label htmlFor="news-filter-category" className="sr-only">
          Category
        </Label>
        <NativeSelect
          id="news-filter-category"
          name="category"
          defaultValue={category}
          className="w-full [&_select]:h-10 [&_select]:bg-card"
          onChange={(event) => applyFilters({ category: event.target.value })}
        >
          <NativeSelectOption value="">All categories</NativeSelectOption>
          {categories.map((cat) => (
            <NativeSelectOption key={cat} value={cat}>{cat}</NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <Button type="submit" variant="outline" disabled={pending} className="h-10 rounded-lg">
        {pending ? "Searching…" : "Search"}
      </Button>
    </form>
  )
}

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
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
      onSubmit={(event) => {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)
        applyFilters({
          q: String(data.get("q") ?? ""),
          category: String(data.get("category") ?? ""),
        })
      }}
    >
      <div className="flex min-w-[200px] flex-1 flex-col gap-1.5">
        <Label htmlFor="news-search">Search</Label>
        <Input
          id="news-search"
          name="q"
          placeholder="Title or excerpt"
          defaultValue={q}
        />
      </div>
      <div className="flex w-full flex-col gap-1.5 sm:w-48">
        <Label htmlFor="news-category">Category</Label>
        <NativeSelect id="news-category" name="category" defaultValue={category}>
          <NativeSelectOption value="">All categories</NativeSelectOption>
          {categories.map((cat) => (
            <NativeSelectOption key={cat} value={cat}>{cat}</NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Filtering…" : "Apply"}
      </Button>
    </form>
  )
}

import type { Metadata } from "next"
import { listNewsCategories } from "@/lib/actions/news"
import { NewsForm } from "@/components/staff/news-form"

export const metadata: Metadata = {
  title: "New article",
}

export default async function StaffNewNewsPage() {
  const categoriesResult = await listNewsCategories()
  const categories =
    categoriesResult.success && categoriesResult.data
      ? categoriesResult.data
      : []

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New article</h1>
        <p className="text-sm text-muted-foreground">
          Add a new story to the newsroom.
        </p>
      </div>
      <NewsForm mode="create" categories={categories} />
    </div>
  )
}

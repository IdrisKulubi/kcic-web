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

  return <NewsForm mode="create" categories={categories} />
}

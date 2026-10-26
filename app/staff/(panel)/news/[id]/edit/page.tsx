import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNewsArticle, listNewsCategories } from "@/lib/actions/news"
import { NewsForm } from "@/components/staff/news-form"

interface StaffEditNewsPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: StaffEditNewsPageProps): Promise<Metadata> {
  const { id } = await params
  const result = await getNewsArticle(id)
  return {
    title: result.success && result.data
      ? `Edit: ${result.data.title}`
      : "Edit article",
  }
}

export default async function StaffEditNewsPage({
  params,
}: StaffEditNewsPageProps) {
  const { id } = await params
  const [articleResult, categoriesResult] = await Promise.all([
    getNewsArticle(id),
    listNewsCategories(),
  ])

  if (!articleResult.success || !articleResult.data) {
    notFound()
  }

  const categories =
    categoriesResult.success && categoriesResult.data
      ? categoriesResult.data
      : []

  return (
    <NewsForm
      mode="edit"
      article={articleResult.data}
      categories={categories}
    />
  )
}

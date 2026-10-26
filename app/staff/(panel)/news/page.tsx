import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { listNews, listNewsCategories } from "@/lib/actions/news"
import { formatNewsDate } from "@/lib/data/news"
import { NewsFilters } from "@/components/staff/news-filters"
import { NewsFeaturedSwitch } from "@/components/staff/news-featured-switch"
import { NewsDeleteButton } from "@/components/staff/news-delete-button"
import { RemoteThumbnail } from "@/components/remote-thumbnail"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowSquareOut, PencilSimple, Plus } from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "News",
}

const PAGE_SIZE = 10

interface StaffNewsPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    page?: string
  }>
}

export default async function StaffNewsPage({ searchParams }: StaffNewsPageProps) {
  const params = await searchParams
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1)
  const search = params.q?.trim() ?? ""
  const category = params.category?.trim() ?? ""

  const [listResult, categoriesResult] = await Promise.all([
    listNews({
      search: search || undefined,
      category: category || undefined,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    }),
    listNewsCategories(),
  ])

  const articles =
    listResult.success && listResult.data ? listResult.data.articles : []
  const total = listResult.success && listResult.data ? listResult.data.total : 0
  const categories =
    categoriesResult.success && categoriesResult.data
      ? categoriesResult.data
      : []

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const listError = !listResult.success ? listResult.error : null

  function pageHref(nextPage: number) {
    const qs = new URLSearchParams()
    if (search) qs.set("q", search)
    if (category) qs.set("category", category)
    if (nextPage > 1) qs.set("page", String(nextPage))
    const query = qs.toString()
    return query ? `/staff/news?${query}` : "/staff/news"
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">News</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage newsroom articles.
          </p>
        </div>
        <Button render={<Link href="/staff/news/new" />}>
          <Plus className="size-4" />
          New article
        </Button>
      </div>

      <Suspense fallback={null}>
        <NewsFilters categories={categories} />
      </Suspense>

      {listError ? (
        <p className="text-sm text-destructive" role="alert">{listError}</p>
      ) : null}

      <div className="overflow-hidden rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[72px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No articles match your filters.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => {
                const published =
                  article.publishedAt instanceof Date
                    ? article.publishedAt.toISOString()
                    : String(article.publishedAt)

                return (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div className="size-12 overflow-hidden rounded-md bg-muted">
                        <RemoteThumbnail
                          src={article.thumbnail}
                          alt=""
                          className="size-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[240px] font-medium">
                      <span className="line-clamp-2">{article.title}</span>
                    </TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatNewsDate(published)}
                    </TableCell>
                    <TableCell>
                      {article.id ? (
                        <NewsFeaturedSwitch
                          articleId={article.id}
                          featured={article.featured}
                        />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {article.slug ? (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            render={
                              <Link
                                href={`/news/${article.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View live article"
                              />
                            }
                          >
                            <ArrowSquareOut className="size-4" />
                          </Button>
                        ) : null}
                        {article.id ? (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            render={
                              <Link
                                href={`/staff/news/${article.id}/edit`}
                                aria-label="Edit article"
                              />
                            }
                          >
                            <PencilSimple className="size-4" />
                          </Button>
                        ) : null}
                        {article.id ? (
                          <NewsDeleteButton
                            articleId={article.id}
                            title={article.title}
                          />
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Page {page} of {totalPages} ({total} articles)
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              render={<Link href={pageHref(page - 1)} />}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              render={<Link href={pageHref(page + 1)} />}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { listNews, listNewsCategories } from "@/lib/actions/news"
import { formatNewsDate } from "@/lib/data/news"
import { NewsFilters } from "@/components/staff/news-filters"
import { NewsFeaturedSwitch } from "@/components/staff/news-featured-switch"
import { NewsDeleteButton } from "@/components/staff/news-delete-button"
import { RemoteThumbnail } from "@/components/remote-thumbnail"
import { StaffPageHeader } from "@/components/staff/staff-page-header"
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
      live: false,
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

  const isFiltered = Boolean(search || category)

  return (
    <div className="flex flex-col gap-6">
      <StaffPageHeader
        title="News"
        description={`${total.toLocaleString()} ${total === 1 ? "article" : "articles"} ${isFiltered ? "match these filters" : "in the newsroom"}.`}
        actions={
          <Button
            className="h-10 rounded-lg px-4 font-semibold"
            render={<Link href="/staff/news/new" />}
          >
            <Plus className="size-4" weight="bold" />
            New article
          </Button>
        }
      />

      <Suspense fallback={null}>
        <NewsFilters categories={categories} />
      </Suspense>

      {listError ? (
        <p className="rounded-lg bg-destructive/8 p-3 text-sm text-destructive" role="alert">
          Articles could not be loaded: {listError}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[76px] pl-4">
                <span className="sr-only">Cover image</span>
              </TableHead>
              <TableHead>Article</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="py-16 text-center">
                  <p className="font-medium">
                    {isFiltered ? "No articles match these filters" : "No articles yet"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isFiltered ? (
                      <Link href="/staff/news" className="underline underline-offset-3 hover:text-foreground">
                        Clear filters
                      </Link>
                    ) : (
                      <>
                        Your first story will appear on the newsroom as soon as you{" "}
                        <Link href="/staff/news/new" className="underline underline-offset-3 hover:text-foreground">
                          publish it
                        </Link>
                        .
                      </>
                    )}
                  </p>
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
                    <TableCell className="py-3 pl-4">
                      <div className="aspect-[4/3] w-14 overflow-hidden rounded-md bg-muted ring-1 ring-border">
                        <RemoteThumbnail
                          src={article.thumbnail}
                          alt=""
                          className="size-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[28rem] py-3 whitespace-normal">
                      <Link
                        href={`/staff/news/${article.id}/edit`}
                        className="line-clamp-2 font-medium hover:underline hover:underline-offset-3 focus-visible:underline focus-visible:outline-none"
                      >
                        {article.title}
                      </Link>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {article.excerpt}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {article.category}
                      </span>
                    </TableCell>
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

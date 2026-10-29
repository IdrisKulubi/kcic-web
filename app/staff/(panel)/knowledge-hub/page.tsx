import type { Metadata } from "next"
import Link from "next/link"
import { listKnowledgeItems } from "@/lib/actions/knowledge-hub"
import {
  formatKnowledgeDate,
  getKnowledgeSection,
  knowledgeSections,
} from "@/lib/data/knowledge-hub"
import { KnowledgeDeleteButton } from "@/components/staff/knowledge-delete-button"
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
import { cn } from "@/lib/utils"
import {
  ArrowSquareOut,
  FileText,
  PencilSimple,
  Plus,
} from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "Knowledge Hub",
}

interface StaffKnowledgePageProps {
  searchParams: Promise<{ section?: string }>
}

export default async function StaffKnowledgePage({ searchParams }: StaffKnowledgePageProps) {
  const params = await searchParams
  const section = getKnowledgeSection(params.section ?? "") ?? knowledgeSections[0]

  const result = await listKnowledgeItems({ live: false })
  const allItems = result.success && result.data ? result.data : []
  const items = allItems.filter((item) => item.section === section.slug)
  const listError = !result.success ? result.error : null

  return (
    <div className="flex flex-col gap-6">
      <StaffPageHeader
        title="Knowledge Hub"
        description={`${items.length.toLocaleString()} ${items.length === 1 ? "item" : "items"} in ${section.label.toLowerCase()}.`}
        actions={
          <Button
            className="h-10 rounded-lg px-4 font-semibold"
            render={<Link href={`/staff/knowledge-hub/new?section=${section.slug}`} />}
          >
            <Plus className="size-4" weight="bold" />
            New {section.singular.toLowerCase()}
          </Button>
        }
      />

      <nav aria-label="Knowledge Hub sections" className="flex flex-wrap gap-1.5">
        {knowledgeSections.map((option) => {
          const active = option.slug === section.slug
          const count = allItems.filter((item) => item.section === option.slug).length
          return (
            <Link
              key={option.slug}
              href={`/staff/knowledge-hub?section=${option.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm ring-1 transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                active
                  ? "bg-secondary font-medium text-secondary-foreground ring-ring/40"
                  : "text-muted-foreground ring-border hover:bg-muted hover:text-foreground"
              )}
            >
              {option.label}
              <span className="ml-1.5 tabular-nums opacity-70">{count}</span>
            </Link>
          )
        })}
      </nav>

      {listError ? (
        <p className="rounded-lg bg-destructive/8 p-3 text-sm text-destructive" role="alert">
          Items could not be loaded: {listError}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[76px] pl-4">
                <span className="sr-only">Cover image</span>
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Download</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="py-16 text-center">
                  <p className="font-medium">No {section.label.toLowerCase()} yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    They appear on the{" "}
                    <Link
                      href={`/knowledge-hub/${section.slug}`}
                      target="_blank"
                      className="underline underline-offset-3 hover:text-foreground"
                    >
                      public page
                    </Link>{" "}
                    as soon as you{" "}
                    <Link
                      href={`/staff/knowledge-hub/new?section=${section.slug}`}
                      className="underline underline-offset-3 hover:text-foreground"
                    >
                      publish one
                    </Link>
                    .
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-3 pl-4">
                    <div className="aspect-[4/3] w-14 overflow-hidden rounded-md bg-muted ring-1 ring-border">
                      <RemoteThumbnail
                        src={item.coverImage}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[28rem] py-3 whitespace-normal">
                    <Link
                      href={`/staff/knowledge-hub/${item.id}/edit`}
                      className="line-clamp-2 font-medium hover:underline hover:underline-offset-3 focus-visible:underline focus-visible:outline-none"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {item.summary}
                    </p>
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {formatKnowledgeDate(item.publishedAt)}
                  </TableCell>
                  <TableCell>
                    {item.attachmentUrl ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        <FileText className="size-3.5" aria-hidden />
                        Attached
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        render={
                          <Link
                            href={`/knowledge-hub/${item.section}/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View live page"
                          />
                        }
                      >
                        <ArrowSquareOut className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        render={
                          <Link
                            href={`/staff/knowledge-hub/${item.id}/edit`}
                            aria-label="Edit item"
                          />
                        }
                      >
                        <PencilSimple className="size-4" />
                      </Button>
                      <KnowledgeDeleteButton itemId={item.id} title={item.title} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

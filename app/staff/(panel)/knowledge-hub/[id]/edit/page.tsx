import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getKnowledgeItem } from "@/lib/actions/knowledge-hub"
import { getKnowledgeSection } from "@/lib/data/knowledge-hub"
import { KnowledgeItemForm } from "@/components/staff/knowledge-item-form"
import { StaffPageHeader } from "@/components/staff/staff-page-header"

interface StaffEditKnowledgePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: StaffEditKnowledgePageProps): Promise<Metadata> {
  const { id } = await params
  const result = await getKnowledgeItem(id)
  return {
    title: result.success && result.data
      ? `Edit: ${result.data.title}`
      : "Edit item",
  }
}

export default async function StaffEditKnowledgePage({
  params,
}: StaffEditKnowledgePageProps) {
  const { id } = await params
  const result = await getKnowledgeItem(id)

  if (!result.success || !result.data) {
    notFound()
  }

  const item = result.data
  const section = getKnowledgeSection(item.section)

  return (
    <>
      <StaffPageHeader
        title={`Edit ${section?.singular.toLowerCase() ?? "item"}`}
        back={{
          href: `/staff/knowledge-hub?section=${item.section}`,
          label: section?.label ?? "Knowledge Hub",
        }}
      />
      <KnowledgeItemForm mode="edit" item={item} defaultSection={item.section} />
    </>
  )
}

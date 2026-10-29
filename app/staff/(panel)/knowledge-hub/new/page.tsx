import type { Metadata } from "next"
import { KnowledgeItemForm } from "@/components/staff/knowledge-item-form"
import { StaffPageHeader } from "@/components/staff/staff-page-header"
import { getKnowledgeSection, knowledgeSections } from "@/lib/data/knowledge-hub"

export const metadata: Metadata = {
  title: "New Knowledge Hub item",
}

interface StaffNewKnowledgePageProps {
  searchParams: Promise<{ section?: string }>
}

export default async function StaffNewKnowledgePage({
  searchParams,
}: StaffNewKnowledgePageProps) {
  const params = await searchParams
  const section = getKnowledgeSection(params.section ?? "") ?? knowledgeSections[0]

  return (
    <>
      <StaffPageHeader
        title={`New ${section.singular.toLowerCase()}`}
        back={{
          href: `/staff/knowledge-hub?section=${section.slug}`,
          label: section.label,
        }}
      />
      <KnowledgeItemForm mode="create" defaultSection={section.slug} />
    </>
  )
}

import type { OpportunityData } from "@/lib/actions/opportunities"
import type { CareerListItem } from "@/lib/data/careers"
import { deriveOpportunityStatus } from "@/lib/opportunity/status"

export function toCareerListItem(opportunity: OpportunityData): CareerListItem {
  return {
    id: opportunity.id,
    title: opportunity.title,
    slug: opportunity.slug,
    summary: opportunity.summary,
    location: opportunity.location,
    employmentType: opportunity.employmentType,
    workMode: opportunity.workMode,
    deadline: opportunity.deadline?.toISOString() ?? null,
    hasExternalApply: Boolean(opportunity.applicationLink),
    status: deriveOpportunityStatus(opportunity),
  }
}

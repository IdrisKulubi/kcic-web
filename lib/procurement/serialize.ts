import type { OpportunityData } from "@/lib/actions/opportunities"
import type { ProcurementListItem } from "@/lib/data/procurement"
import { deriveProcurementStatus } from "@/lib/procurement/status"

export function toProcurementListItem(
  opportunity: OpportunityData
): ProcurementListItem {
  return {
    id: opportunity.id,
    title: opportunity.title,
    slug: opportunity.slug,
    type: opportunity.type,
    referenceNumber: opportunity.referenceNumber,
    summary: opportunity.summary,
    issuedDate: opportunity.issuedDate?.toISOString() ?? null,
    deadline: opportunity.deadline?.toISOString() ?? null,
    status: deriveProcurementStatus(opportunity),
  }
}

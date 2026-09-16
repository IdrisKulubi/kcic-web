import type { OpportunityData } from "@/lib/actions/opportunities"
import {
  deriveOpportunityStatus,
  type OpportunityStatus,
} from "@/lib/opportunity/status"

export type ProcurementStatus = OpportunityStatus

export function deriveProcurementStatus(
  opportunity: Pick<OpportunityData, "isActive" | "deadline">
): ProcurementStatus {
  return deriveOpportunityStatus(opportunity)
}

export function isProcurementType(type: string): boolean {
  return type === "rfp" || type === "tender" || type === "consulting"
}

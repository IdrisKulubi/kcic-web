import type { OpportunityData } from "@/lib/actions/opportunities"

export type ProcurementStatus = "open" | "closed"

export function deriveProcurementStatus(
  opportunity: Pick<OpportunityData, "isActive" | "deadline">
): ProcurementStatus {
  if (!opportunity.isActive) return "closed"
  if (opportunity.deadline) {
    const deadlineMs = opportunity.deadline.getTime()
    if (!Number.isNaN(deadlineMs) && deadlineMs <= Date.now()) {
      return "closed"
    }
  }
  return "open"
}

export function isProcurementType(type: string): boolean {
  return type === "rfp" || type === "tender" || type === "consulting"
}

import type { OpportunityData } from "@/lib/actions/opportunities"

export type OpportunityStatus = "open" | "closed"

export function isJobType(type: string): boolean {
  return type === "job"
}

export function deriveOpportunityStatus(
  opportunity: Pick<OpportunityData, "isActive" | "deadline">
): OpportunityStatus {
  if (!opportunity.isActive) return "closed"
  if (opportunity.deadline) {
    const deadlineMs = opportunity.deadline.getTime()
    if (!Number.isNaN(deadlineMs) && deadlineMs <= Date.now()) {
      return "closed"
    }
  }
  return "open"
}

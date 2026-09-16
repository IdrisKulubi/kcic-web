export const PROCUREMENT_TYPES = ["rfp", "tender", "consulting"] as const

export type ProcurementOpportunityType = (typeof PROCUREMENT_TYPES)[number]

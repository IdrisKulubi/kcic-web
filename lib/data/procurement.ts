import type { ProcurementOpportunityType } from "@/lib/procurement/constants"
import type { OpportunityType } from "@/lib/actions/opportunities"

export const procurementMeta = {
  title: "Procurement",
  description:
    "View current KCIC tenders, RFPs, and consultancy opportunities, including reference numbers, closing dates, and supporting documents.",
}

export const procurementHero = {
  eyebrow: "About us",
  headline: "Procurement.",
  subline: "Current tenders, RFPs, and consultancy opportunities.",
}

export const procurementIntro = {
  heading: "How to bid",
  body:
    "Suppliers and consultants can respond to opportunities published here. Each notice includes a reference number, publication and closing dates, supporting documents, and instructions on how to submit.",
  pillars: [
    {
      title: "Reference numbers",
      description:
        "Use the KCIC reference on your submission so we can match it to the correct notice.",
    },
    {
      title: "Closing dates (EAT)",
      description:
        "Deadlines are shown in East Africa Time. Submissions received after the stated close are not considered.",
    },
    {
      title: "Supporting documents",
      description:
        "Download terms of reference, specifications, and annexes from each notice before you apply.",
    },
  ],
}

export const procurementListCopy = {
  heading: "Opportunities",
  openTab: "Open",
  archiveTab: "Archive",
  typeAll: "All",
  typeRfp: "RFP",
  typeTender: "Tender",
  typeConsulting: "Consulting",
  openEmpty: "No open procurement notices at the moment.",
  archiveEmpty: "No archived notices in this view.",
  viewLabel: "View",
  openStatus: "Open",
  closedStatus: "Closed",
  issuedLabel: "Published",
  closesLabel: "Closes",
  referenceLabel: "Ref.",
  timezoneLabel: "EAT",
}

export const procurementContact = {
  heading: "Need help with a notice?",
  body:
    "If you cannot find a document or need clarification on submission requirements, contact our team.",
  email: "info@kenyacic.org",
  phone: "+254 703 034 701",
  phoneHref: "tel:+254703034701",
  ctaLabel: "Email us",
}

export const procurementDetailCopy = {
  backLink: "Back to procurement",
  closedBanner:
    "This notice is closed. Submissions are no longer accepted. Documents remain available for transparency.",
  attachmentsHeading: "Supporting documents",
  applyHeading: "How to apply",
  applyExternal: "Apply online (external link)",
  applyEmail: "Submit by email",
  descriptionHeading: "Overview",
  requirementsHeading: "Requirements",
  qualificationsHeading: "Qualifications",
  responsibilitiesHeading: "Responsibilities",
}

export type ProcurementTypeFilter = "all" | ProcurementOpportunityType

export type ProcurementListItem = {
  id: string
  title: string
  slug: string
  type: OpportunityType
  referenceNumber: string | null
  summary: string
  issuedDate: string | null
  deadline: string | null
  status: "open" | "closed"
}

export function typeLabel(type: OpportunityType): string {
  switch (type) {
    case "rfp":
      return procurementListCopy.typeRfp
    case "tender":
      return procurementListCopy.typeTender
    case "consulting":
      return procurementListCopy.typeConsulting
    default:
      return type
  }
}

export const policiesMeta = {
  title: "Policies & disclosures",
  description:
    "Access KCIC governance, safeguarding, finance, privacy, and statutory disclosures in one accountable document library.",
}

export const policiesHero = {
  eyebrow: "About us",
  headline: "Policies & disclosures.",
  subline:
    "How we stay accountable to entrepreneurs, partners, and the public.",
}

export const policiesIntro = {
  heading: "Why we publish",
  body:
    "KCIC is a non-profit climate innovation organization. Integrity and professionalism are operating standards in how we work with entrepreneurs, funders, and communities. This library will hold governance, safeguarding, finance, and statutory disclosures as they are approved for publication.",
  pillars: [
    {
      title: "Integrity",
      description:
        "We keep commitments, act honestly, and make our institutional decisions traceable.",
    },
    {
      title: "Professionalism",
      description:
        "We publish clear, well-maintained documents that reflect how KCIC is governed and managed.",
    },
    {
      title: "Open access",
      description:
        "Approved policies and disclosures are available here with the metadata you need to use them confidently.",
    },
  ],
}

export type PolicyCategory =
  | "all"
  | "governance"
  | "safeguarding"
  | "finance"
  | "privacy"
  | "reports"

export const policyCategories: {
  id: PolicyCategory
  label: string
}[] = [
  { id: "all", label: "All" },
  { id: "governance", label: "Governance" },
  { id: "safeguarding", label: "Safeguarding" },
  { id: "finance", label: "Finance & anti-corruption" },
  { id: "privacy", label: "Privacy" },
  { id: "reports", label: "Reports" },
]

export type PolicyDocumentStatus = "current" | "archived" | "superseded"

export interface PolicyDocument {
  id: string
  title: string
  type: string
  category: Exclude<PolicyCategory, "all">
  publishedAt: string | null
  format: string
  fileSize: string
  href: string
  status: PolicyDocumentStatus
}

/** Populate when KCIC supplies approved files. */
export const policyDocuments: PolicyDocument[] = []

export const policiesLibrary = {
  heading: "Document library",
  emptyMessage: "Documents will appear here once KCIC publishes them.",
  emptyHint: "Category filters are ready; files will be added as they are approved.",
  earlierVersionsHeading: "Earlier versions",
  currentLabel: "Current",
  archivedLabel: "Archived",
  supersededLabel: "Superseded",
}

export const policiesContact = {
  heading: "Need a document that is not listed?",
  body: "Contact our team and we will point you to the right policy owner or disclosure file.",
  email: "info@kenyacic.org",
  phone: "+254 703 034 701",
  phoneHref: "tel:+254703034701",
  ctaLabel: "Email us",
}

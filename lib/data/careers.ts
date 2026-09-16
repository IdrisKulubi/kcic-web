export const careersMeta = {
  title: "Careers",
  description:
    "Explore open roles at KCIC and help catalyse climate entrepreneurship across Africa.",
}

export const careersHero = {
  eyebrow: "About us",
  headline: "Careers.",
  subline: "Build climate enterprise with KCIC.",
}

export const careersIntro = {
  heading: "The people behind the work.",
  body:
    "KCIC is people-centric and collaborative. Our team brings together expertise in climate innovation, enterprise support, and partnerships to help entrepreneurs scale solutions that matter for communities and markets.",
  teamLink: { label: "Meet our team", href: "/about#our-team" },
}

export const careersListCopy = {
  heading: "Currently open positions.",
  openTab: "Open",
  closedTab: "Closed",
  openEmpty: "No open roles at the moment.",
  closedEmpty: "No closed roles in this view.",
  openStatus: "Open",
  closedStatus: "Closed",
  closesLabel: "Closes",
  locationFallback: "Location to be confirmed",
  externalApply: "External application",
}

export const careersContact = {
  heading: "Interested in working with us?",
  body:
    "If you do not see a role that fits, you can still reach out. We welcome conversations with people passionate about climate enterprise.",
  email: "info@kenyacic.org",
  phone: "+254 703 034 701",
  phoneHref: "tel:+254703034701",
  ctaLabel: "Email us",
}

export const careersDetailCopy = {
  backLink: "Back to careers",
  closedBanner:
    "This vacancy is closed. Applications are no longer accepted.",
  descriptionHeading: "About the role",
  responsibilitiesHeading: "Responsibilities",
  requirementsHeading: "Requirements",
  qualificationsHeading: "Qualifications",
  applyHeading: "How to apply",
  applyExternal: "Apply online (external link)",
  applyEmail: "Submit by email",
}

export type CareerListItem = {
  id: string
  title: string
  slug: string
  summary: string
  location: string | null
  employmentType: string | null
  workMode: string | null
  deadline: string | null
  hasExternalApply: boolean
  status: "open" | "closed"
}

export function formatEngagement(
  employmentType: string | null,
  workMode: string | null
): string {
  const parts: string[] = []
  if (employmentType) {
    parts.push(
      employmentType
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("-")
    )
  }
  if (workMode) {
    parts.push(
      workMode.charAt(0).toUpperCase() + workMode.slice(1)
    )
  }
  return parts.join(" · ") || "Role"
}

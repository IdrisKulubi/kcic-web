export const impactMeta = {
  title: "Impact",
  description:
    "Dated evidence of KCIC's climate enterprise support, our theory of change, 2030 ambitions, and published impact reports.",
}

export const impactIndex = {
  eyebrow: "Impact",
  headline: "Proof, not promise.",
  lede:
    "Since 2012, KCIC has supported climate enterprises with business and technical expertise, access to finance, facilities, market intelligence, and partnerships. Its next strategy expands that work from individual ventures to stronger climate entrepreneurship ecosystems across Africa.",
  photoStamp: "Presentation snapshot",
  chapters: [
    { number: "01", title: "Overview", href: "/impact#overview" },
    {
      number: "02",
      title: "Theory of change",
      href: "/impact#theory-of-change",
    },
    { number: "03", title: "Targets", href: "/impact#targets" },
    { number: "04", title: "Impact reports", href: "/impact#reports" },
  ],
}

export const impactOverview = {
  id: "overview",
  eyebrow: "01 Overview",
  heading: "Thirteen years of climate enterprise impact.",
  snapshotNote:
    "Figures below are from the “KCIC 13 Years On” presentation slide. They are a snapshot for transparency—not live counters. KCIC will publish a common “as of” date and definitions before these are treated as approved website metrics.",
  metrics: [
    {
      id: "smes",
      value: "3,500+",
      label: "SMEs supported",
      definition: "Define “supported” and reporting period.",
    },
    {
      id: "incubated",
      value: "2,730",
      label: "Enterprises incubated and accelerated",
      definition: "Confirm whether this is a subset of SMEs supported.",
    },
    {
      id: "capital",
      value: "USD 63m",
      label: "Capital leveraged",
      definition: "Define leveraged capital and currency conversion method.",
    },
    {
      id: "policy",
      value: "73",
      label: "Policy initiatives",
      definition: "Define “initiative” and KCIC's level of contribution.",
    },
    {
      id: "commercialization",
      value: "67%",
      label: "Commercialization rate",
      definition: "Define cohort, numerator, denominator, and measurement date.",
    },
    {
      id: "revenue",
      value: "USD 85m",
      label: "Revenue generated",
      definition:
        "Clarify whether this is enterprise revenue and how it was verified.",
    },
    {
      id: "jobs",
      value: "57,517",
      label: "Jobs created",
      definition:
        "Define direct/indirect, full-time equivalent, and reporting period.",
    },
    {
      id: "women",
      value: "56%",
      label: "Women-owned",
      definition:
        "Confirm the denominator; relationship to jobs figure requires clarification.",
    },
    {
      id: "emissions",
      value: "507,149",
      unit: "tCO₂",
      label: "Emissions mitigated",
      definition: "Confirm whether the unit is tCO₂ or tCO₂e and provide methodology.",
    },
  ],
}

export const impactTheory = {
  id: "theory-of-change",
  eyebrow: "02 Theory of change",
  heading: "From support to systems change.",
  intro:
    "KCIC's 2025–2030 strategy shifts from supporting individual ventures toward building integrated climate entrepreneurship ecosystems. The presentation references an Integrated Climate Entrepreneurship Ecosystem (ICEE) model—an approved diagram and full definitions will replace this web summary when KCIC publishes them.",
  diagramNote:
    "This page describes the pathway in text. An accessible version of KCIC's official theory-of-change diagram will be added when the source file is approved.",
  stations: [
    {
      id: "support",
      title: "Support we provide",
      summary:
        "Holistic, country-driven support that combines five mutually reinforcing forms of help.",
      bullets: [
        "Innovative financing",
        "Advisory services",
        "Enabling environment",
        "Access to information",
        "Facilities and infrastructure",
      ],
    },
    {
      id: "enterprises",
      title: "Enterprises and markets",
      summary:
        "Climate technologies move from idea to viable enterprise with stronger commercial readiness.",
      bullets: [
        "Business and technical expertise",
        "Access to finance and facilities",
        "Market intelligence and partnerships",
      ],
    },
    {
      id: "systems",
      title: "Enabling systems",
      summary:
        "Policy, networks, and institutions that reduce barriers no single venture can solve alone.",
      bullets: [
        "Policy engagement and co-creation",
        "Regional and global climate innovation networks",
        "Collaborations with funders, governments, and private sector",
      ],
    },
    {
      id: "outcomes",
      title: "Intended climate outcomes",
      summary:
        "Resilient communities, green jobs, and measurable mitigation through scaled climate enterprise.",
      bullets: [
        "Jobs and inclusive enterprise growth",
        "Climate finance mobilized",
        "Emissions reduced through deployed solutions",
      ],
    },
  ],
  strategyBarriers: {
    heading: "Strategy 4.0 responds to four persistent barriers",
    items: [
      "Limited access to finance and technical assistance",
      "Inadequate market systems and enabling environments",
      "Insufficient community engagement and resilience",
      "The need for stronger institutional capacity",
    ],
  },
}

export const impactTargets = {
  id: "targets",
  eyebrow: "03 Targets",
  heading: "Vision 2030 ambitions.",
  intro:
    "The figures below are targets and ambitions—not achievements. They come from KCIC's “Vision 2030” presentation slide and must not be read alongside the 13-year snapshot in Overview.",
  horizonLabel: "2030",
  jobsConflictNote:
    "The Vision 2030 slide lists 100,000 green jobs. A separate strategy journey slide lists 72,000 jobs for 2025–2030. KCIC must confirm the approved target set and whether the figures use different scopes.",
  targets: [
    {
      id: "enterprises",
      value: "12,000+",
      label: "Enterprises supported across Africa",
    },
    {
      id: "leveraged",
      value: "USD 33m",
      label: "Leveraged to supported enterprises",
    },
    {
      id: "commercialization",
      value: "80%",
      label: "Commercialization rate",
    },
    {
      id: "finance",
      value: "USD 55m",
      label: "Climate finance mobilized",
    },
    {
      id: "jobs",
      value: "100,000",
      label: "Green jobs",
      note: "Pending confirmation against 72,000 jobs cited elsewhere in strategy materials.",
    },
    {
      id: "co2",
      value: "1.2m",
      unit: "tonnes CO₂",
      label: "CO₂ mitigated",
    },
    {
      id: "customers",
      value: "67,500",
      label: "Customers reached",
    },
    {
      id: "collaborations",
      value: "60",
      label: "New collaborations",
    },
    {
      id: "policy",
      value: "5+",
      label: "National or regional policy instruments influenced",
    },
    {
      id: "fund",
      value: "—",
      label: "KCIC Revolving Fund operationalized",
      qualitative: true,
    },
    {
      id: "countries",
      value: "10+",
      label: "African countries engaged",
    },
  ],
}

export interface ImpactReport {
  id: string
  title: string
  reportingPeriod: string
  publishedAt: string | null
  summary: string
  format: string
  fileSize: string
  href: string
}

/** Populate when KCIC supplies approved report files. */
export const impactReports: ImpactReport[] = []

export const impactReportsCopy = {
  id: "reports",
  eyebrow: "04 Impact reports",
  heading: "Results and insights.",
  intro:
    "Download KCIC impact reports with reporting period, publication date, and file details.",
  emptyMessage: "Reports will appear here once KCIC publishes them.",
  emptyHint:
    "When reports are approved, they will be listed here with download links.",
  downloadLabel: "Download",
  openLabel: "Open",
}

export const impactPageMeta = {
  theoryOfChange: {
    title: "Our theory of change",
    description: "KCIC's pathway from enterprise support to climate impact.",
  },
  targets: {
    title: "Our targets",
    description: "Vision 2030 ambitions and how they differ from past results.",
  },
  reports: {
    title: "Impact reports",
    description: "Published impact reports and reporting periods.",
  },
}

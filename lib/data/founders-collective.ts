export const FOUNDERS_COLLECTIVE_APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe8wKNLBdcahDcs691-KN0K7gqsEJsREIJlfZTwlCo05HDEDA/viewform"

export const foundersCollectiveMeta = {
  title: "Founders Collective",
  description:
    "A founder-first community connecting climate entrepreneurs to relationships, capabilities, markets, capital, intelligence, and influence.",
  tagline: "Connected for Growth. Building Climate Impact Together.",
}

export const foundersCollectiveWhat = {
  title: "What is the Founders Collective?",
  body:
    "The KCIC Founders Collective is a professionally curated, founder-first community connecting climate entrepreneurs to the relationships, capabilities, markets, capital, intelligence and influence they need to build resilient and impactful enterprises. Anchored by KCIC, the Collective brings together KCIC alumni and founders from the wider climate ecosystem, providing a platform to connect, collaborate and access opportunities as their businesses grow and evolve.",
}

export const foundersCollectiveWhy = {
  title: "Why the Founders Collective?",
  body:
    "Building a climate enterprise does not stop when programme support ends. As businesses grow, founders encounter new opportunities, markets, financing needs, partnerships and strategic questions. The Founders Collective provides a continuing connection to the KCIC ecosystem, helping founders navigate these evolving needs and opportunities throughout their growth journey.",
}

export const foundersCollectiveBenefits = [
  {
    name: "Community",
    description:
      "Connect with fellow founders through peer learning, founder-to-founder collaboration, mentorship and community activities.",
  },
  {
    name: "Capability",
    description:
      "Access expertise and targeted support in areas including governance, financial management, strategy, operations, technology, regulatory compliance and impact measurement.",
  },
  {
    name: "Capital",
    description:
      "Build investment readiness and connect with financing opportunities suited to your enterprise and its stage of growth.",
  },
  {
    name: "Markets",
    description:
      "Access connections to buyers, off-takers, procurement opportunities, regional markets and potential commercial partners.",
  },
  {
    name: "Intelligence",
    description:
      "Stay informed about relevant developments in climate sectors, finance, policy, technology and commercial opportunities.",
  },
  {
    name: "Influence",
    description:
      "Contribute your experience and perspectives to conversations shaping climate entrepreneurship, policy and the wider ecosystem.",
  },
] as const

export const foundersCollectiveEligibility = {
  title: "Who can join?",
  intro: "The Founders Collective is open to:",
  items: [
    "KCIC alumni building climate-focused enterprises.",
    "External founders whose enterprises operate in the climate space.",
  ],
  qualification:
    "To qualify, your business must operate in the climate space and contribute to climate change mitigation.",
}

export const foundersCollectiveActivities = {
  title: "What can members expect?",
  intro: "Members will have opportunities to participate in activities such as:",
  items: [
    "Founder breakfasts and thematic forums",
    "Sector and stage-specific founder circles",
    "Expert office hours and mentorship",
    "Investor and market-access sessions",
    "Founder networking and collaboration",
    "Access to member-only opportunities and information",
  ],
}

export const foundersCollectiveMembership = {
  fee: "Ksh 10,000",
  period: "per founder, annually",
  note: "Membership provides access to the Founders Collective community and member-only opportunities and activities.",
}

export const foundersCollectiveJoinSteps = [
  {
    step: "1",
    title: "Apply",
    body: "Complete the Founders Collective application form. A confirmation of payment should accompany your completed application.",
    ctaLabel: "Open application form",
    ctaHref: FOUNDERS_COLLECTIVE_APPLY_URL,
    external: true,
  },
  {
    step: "2",
    title: "Pay",
    body: "Pay the annual membership fee of Ksh 10,000 to your preferred KCIC bank account.",
    paymentDetails: true,
  },
  {
    step: "3",
    title: "Connect",
    body: "Once payment is confirmed, you will have access to the various benefits.",
  },
  {
    step: "4",
    title: "Participate",
    body: "Connect with fellow founders and access member-only opportunities and activities.",
  },
] as const

export const foundersCollectivePaymentAccounts = [
  {
    label: "KES account",
    rows: [
      { label: "Account name", value: "Kenya Climate Innovation Center" },
      { label: "Bank name", value: "Ncba Bank Kenya Plc" },
      { label: "Account number", value: "2594680245" },
      { label: "Currency", value: "KES" },
    ],
  },
  {
    label: "USD account",
    rows: [
      { label: "Account name", value: "Kenya Climate Innovation Center" },
      { label: "Bank name", value: "Ncba Bank Kenya Plc" },
      { label: "Account number", value: "2594680258" },
      { label: "Currency", value: "USD" },
    ],
  },
  {
    label: "Mobile money (if applicable)",
    rows: [
      { label: "Paybill", value: "880100" },
      { label: "Account number", value: "2594680245" },
      { label: "Reference", value: "Business Name / Applicant Name" },
    ],
  },
] as const

export const foundersCollectiveFaqs = [
  {
    question: "Is the Founders Collective only for KCIC alumni?",
    answer:
      "No. The Collective is open to both KCIC alumni and external founders whose businesses operate in the climate space and contribute to climate change mitigation.",
  },
  {
    question: "Is there a membership fee?",
    answer: "Yes. Membership costs Ksh 10,000 annually.",
  },
  {
    question: "How do I become a member?",
    answer:
      "Complete the application form and make the Ksh 10,000 annual membership payment to the designated KCIC bank account.",
  },
  {
    question: "What happens after I become a member?",
    answer:
      "You become part of the Founders Collective community and can participate in member-only activities, opportunities and engagements.",
  },
  {
    question:
      "Can I get tailor made services applicable to my current business situation?",
    answer:
      "Yes you can, a specific package will be designed based on the needs diagnostics report.",
  },
] as const

export const foundersCollectiveClosing =
  "If you are building a business that contributes to climate change mitigation, join a growing community of founders committed to building stronger enterprises and advancing climate impact."

export const faqsMeta = {
  title: "Frequently asked questions",
  description:
    "Answers about KCIC, our programmes, applications, impact reporting, careers, procurement, and how to get in touch.",
}

export const faqsPageCopy = {
  eyebrow: "FAQs",
  heading: "Ask KCIC.",
  lede:
    "Quick answers about who we are, how we work with climate enterprises, and where to go next. For anything not covered here, contact our team.",
}

export const faqsStillCopy = {
  heading: "Still looking?",
  body: "If your question is not answered here, email us or visit the contact page.",
  emailLabel: "Email us",
  contactLabel: "Contact page",
}

export interface FaqTopic {
  id: string
  label: string
}

export const faqTopics: FaqTopic[] = [
  { id: "about", label: "About" },
  { id: "programmes", label: "Programmes" },
  { id: "applying", label: "Applying" },
  { id: "impact", label: "Impact" },
  { id: "working-with-us", label: "Working with us" },
]

export type FaqAnswerSegment =
  | string
  | { text: string; href: string; external?: boolean }

export interface FaqItem {
  id: string
  topicId: string
  question: string
  answer: FaqAnswerSegment[]
}

export const faqItems: FaqItem[] = [
  {
    id: "what-is-kcic",
    topicId: "about",
    question: "What is the Kenya Climate Innovation Centre (KCIC)?",
    answer: [
      "KCIC is a non-profit organization that supports the development and scale-up of locally relevant climate technologies and enterprises in Kenya and across Africa.",
      "We combine entrepreneurship support, climate finance, technical assistance, market knowledge, partnerships, and policy engagement.",
      { text: "Learn more on our About page", href: "/about" },
    ],
  },
  {
    id: "when-established",
    topicId: "about",
    question: "When was KCIC established?",
    answer: [
      "KCIC was established in 2012 as the first centre in a global Climate Innovation Center network initiated by the World Bank’s infoDev programme.",
      "After initially operating through a consortium, KCIC became independent in 2015.",
      { text: "Read about our approach and history", href: "/about" },
    ],
  },
  {
    id: "where-located",
    topicId: "about",
    question: "Where is KCIC located?",
    answer: [
      "Our head office is in Nairobi, Kenya: KCIC Head Office, Mokoyeti Road West, off Langata Road.",
      { text: "See address, hours, and map on Contact", href: "/contact" },
    ],
  },
  {
    id: "values",
    topicId: "about",
    question: "What values guide KCIC’s work?",
    answer: [
      "KCIC’s PIPIIC values are People-centric, Innovation, Professionalism, Inclusivity, Integrity, and Collaboration.",
      { text: "Who we are and how we work", href: "/about" },
    ],
  },
  {
    id: "programme-types",
    topicId: "programmes",
    question: "What is the difference between flagship, special, and past programmes?",
    answer: [
      "Flagship programmes are KCIC’s core, ongoing facilities and initiatives. Special projects cover focused or time-bound work. Past programmes are completed and are shown for reference only.",
      { text: "Browse all programmes", href: "/programmes" },
    ],
  },
  {
    id: "founders-collective",
    topicId: "programmes",
    question: "Is the Founders Collective the same as a KCIC programme?",
    answer: [
      "No. The Founders Collective is a founder-first community for climate entrepreneurs. It has its own membership process and FAQs.",
      { text: "Visit Founders Collective", href: "/founders-collective" },
    ],
  },
  {
    id: "how-kcic-supports",
    topicId: "programmes",
    question: "How does KCIC support climate enterprises?",
    answer: [
      "We provide holistic support through five integrated forms of help: innovative financing, advisory services, enabling environment, access to information, and facilities and infrastructure.",
      { text: "Explore our approach and sectors", href: "/our-work" },
    ],
  },
  {
    id: "where-to-apply",
    topicId: "applying",
    question: "Where do I apply for an open programme?",
    answer: [
      "Open programmes show an Apply action on the programme page when applications are active. Each programme lists eligibility, process, and the correct application link.",
      { text: "Find programmes", href: "/programmes" },
    ],
  },
  {
    id: "past-programmes-apply",
    topicId: "applying",
    question: "Can I apply to a past or completed programme?",
    answer: [
      "No. Completed programmes are labelled as past and do not offer an active application. Check flagship and special programmes for current opportunities.",
      { text: "View past projects", href: "/programmes#past" },
    ],
  },
  {
    id: "founders-collective-apply",
    topicId: "applying",
    question: "How do I join the Founders Collective?",
    answer: [
      "Membership is separate from programme applications. Use the application and payment details on the Founders Collective page.",
      { text: "Founders Collective", href: "/founders-collective" },
    ],
  },
  {
    id: "impact-snapshot-vs-targets",
    topicId: "impact",
    question: "Are impact numbers on the website live counters?",
    answer: [
      "Not necessarily. Our Impact overview shows presentation snapshot figures from “KCIC 13 Years On” with definition notes. Vision 2030 items on the Targets section are ambitions, not achievements.",
      { text: "Read our impact overview", href: "/impact#overview" },
    ],
  },
  {
    id: "impact-reports",
    topicId: "impact",
    question: "Where can I find KCIC impact reports?",
    answer: [
      "Published impact reports will appear on the Impact page with download links and reporting periods as they are approved for release.",
      { text: "Impact reports", href: "/impact#reports" },
    ],
  },
  {
    id: "careers-procurement",
    topicId: "working-with-us",
    question: "How do I apply for a job or respond to a tender?",
    answer: [
      "Vacancies are listed under Careers with role details and how to apply. Procurement notices include reference numbers, closing dates, and documents. See ",
      { text: "Careers", href: "/about/careers" },
      " and ",
      { text: "Procurement", href: "/about/procurement" },
      ".",
    ],
  },
  {
    id: "policies-contact",
    topicId: "working-with-us",
    question: "Where are policies, disclosures, and office hours?",
    answer: [
      "Governance and statutory disclosures are in the Policies & disclosures library. For email, phone, visit address, and office hours, use ",
      { text: "Contact", href: "/contact" },
      " or browse ",
      { text: "Policies & disclosures", href: "/about/policies-disclosures" },
      ".",
    ],
  },
]

export function faqItemsByTopic(topicId: string) {
  return faqItems.filter((item) => item.topicId === topicId)
}

export function faqItemById(id: string) {
  return faqItems.find((item) => item.id === id)
}

export function faqAnswerPlainText(answer: FaqAnswerSegment[]) {
  return answer
    .map((segment) =>
      typeof segment === "string" ? segment : segment.text
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

export function buildFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerPlainText(item.answer),
      },
    })),
  }
}

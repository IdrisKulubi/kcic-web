export const ourWorkMeta = {
  title: "Our work",
  description:
    "How KCIC supports climate enterprises: an integrated approach, six key sectors, shared priorities, and the partners who make the work possible.",
}

export const ourWorkIndex = {
  eyebrow: "Our work",
  headline: "How we work.",
  lede: "Holistic, country-driven support that helps climate technologies move from idea to enterprise — without treating support as a single sequence of stages.",
  chapters: [
    {
      number: "01",
      title: "Our approach",
      href: "/our-work#approach",
      pageHref: "/our-work",
    },
    {
      number: "02",
      title: "Key sectors",
      href: "/our-work/sectors",
      pageHref: "/our-work/sectors",
    },
    {
      number: "03",
      title: "Cross-cutting issues",
      href: "/our-work/cross-cutting-issues",
      pageHref: "/our-work/cross-cutting-issues",
    },
    {
      number: "04",
      title: "Our partners",
      href: "/our-work/partners",
      pageHref: "/our-work/partners",
    },
  ],
}

export const ourWorkApproach = {
  eyebrow: "01 — Approach",
  heading: "Five forms of support, working together.",
  intro:
    "KCIC provides holistic, country-driven support to accelerate the development, deployment, and transfer of climate technologies. Its approach combines five mutually reinforcing forms of support.",
  note: "These are integrated services, not five mandatory stages.",
  pillars: [
    {
      id: "financing",
      title: "Innovative financing",
      items: [
        "Proof-of-concept and early-stage risk capital",
        "Results-based financing",
        "Climate venture facilities",
        "Investment syndication and facilitation",
        "Working-capital and consumer-finance facilitation",
        "Transaction advisory",
      ],
    },
    {
      id: "advisory",
      title: "Advisory services",
      items: [
        "Business training in finance, tax, investment, marketing, strategy, and human resources",
        "Capacity development and packaged services",
        "Product design and development training",
        "Mentorship",
      ],
    },
    {
      id: "enabling",
      title: "Enabling environment",
      items: [
        "Policy support, advice, and co-creation",
        "International collaboration and Climate Innovation Center network relationships",
        "Matching services",
        "Regional outreach, partnerships, awards, competitions, conferences, and events",
      ],
    },
    {
      id: "information",
      title: "Access to information",
      items: [
        "Market intelligence, sector trends, and competitive-landscape insight",
        "Technology quality and performance data",
        "Finance information and databases",
      ],
    },
    {
      id: "facilities",
      title: "Access to facilities",
      items: [
        "Office and networking space",
        "Intellectual-property support",
        "Testing and demonstration access",
        "Product design, adaptation, and prototyping",
        "Certification and standardization support",
      ],
    },
  ],
}

export const ourWorkSectors = {
  eyebrow: "02 — Sectors",
  heading: "Where climate enterprise takes root.",
  intro:
    "KCIC supports locally relevant solutions across six sectors — from energy and mobility to water, food systems, and nature.",
  items: [
    {
      slug: "renewable-energy",
      title: "Renewable Energy",
      body: "Off-grid solar and mini-grids, productive uses of energy, clean cooking, bioenergy and waste-to-energy, energy efficiency and demand-side management, and green financing.",
    },
    {
      slug: "circular-economy",
      title: "Circular Economy",
      body: "Solid-waste management and recycling, green manufacturing and product-life extension, upcycling and eco-design, plastic alternatives and biodegradable materials, industrial symbiosis, and resource recovery.",
    },
    {
      slug: "mobility",
      title: "Mobility",
      body: "Electric mobility, sustainable public transport, mobility-as-a-service and digital platforms, non-motorized transport, logistics and freight optimization, and battery charging or swapping.",
    },
    {
      slug: "nature-based-solutions",
      title: "Nature-Based Solutions",
      body: "Ecosystem restoration and afforestation, forestry and agroforestry, blue-economy and ecosystem-restoration initiatives, biodiversity and ecotourism, carbon-credit solutions, and community natural-resource management.",
    },
    {
      slug: "water",
      title: "Water",
      body: "Water harvesting and storage, wastewater reuse, water, sanitation and hygiene solutions, smart irrigation, water monitoring and purification, and integrated water management.",
    },
    {
      slug: "agriculture",
      title: "Agriculture",
      body: "Climate-smart agriculture, agribusiness and value addition, irrigation and water efficiency, post-harvest and storage solutions, agri-tech including precision tools and drones, and market-access and financing solutions.",
    },
  ],
}

export const ourWorkCrossCutting = {
  eyebrow: "03 — Cross-cutting",
  heading: "Priorities that run through the work.",
  intro:
    "These themes appear across programmes and services. They are not a separate catalogue of projects — they shape who is supported, how finance is reached, and how the wider system is strengthened.",
  items: [
    {
      title: "Youth and women",
      body: "Programmes such as AgriBiz are designed to create sustainable job opportunities for youth and women in agricultural value chains, including through incubation, advisory support, and access to finance.",
    },
    {
      title: "Access to finance",
      body: "Innovative financing sits inside the KCIC approach: proof-of-concept and early-stage risk capital, results-based financing, climate venture facilities, syndication, and working-capital facilitation.",
    },
    {
      title: "Enabling environment",
      body: "Policy support, advice, and co-creation, plus regional outreach, partnerships, and the Climate Innovation Center network, help enterprises operate in a system that can actually absorb climate solutions.",
    },
    {
      title: "Regional collaboration",
      body: "KCIC was founded in Kenya in 2012 and states a presence in Kenya, Uganda, and Tanzania — combining enterprise support with partnerships and ecosystem development across East Africa.",
    },
  ],
}

export const ourWorkPartners = {
  eyebrow: "04 — Partners",
  heading: "A strategic partner for climate impact in Africa.",
  intro:
    "KCIC combines a proven track record, strong regional networks, an integrated ecosystem model, and a scalable approach to climate-enterprise development. It works with funders, governments, standards bodies, academic institutions, private-sector organizations, and climate networks to address barriers that no single organization can solve alone.",
  empty:
    "Partner logos will appear here as the approved register is published.",
  failed:
    "Partner logos could not be loaded right now. Please try again later.",
  visit: "Visit website",
}

export const workPageMeta = {
  approach: ourWorkMeta,
  sectors: {
    title: "Key sectors",
    description: ourWorkSectors.intro,
  },
  crossCutting: {
    title: "Cross-cutting issues",
    description: ourWorkCrossCutting.intro,
  },
  partners: {
    title: "Our partners",
    description: ourWorkPartners.intro,
  },
}

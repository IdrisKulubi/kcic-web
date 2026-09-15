# KCIC Website Requirements

## 1. Document purpose and status

This document defines the initial functional, content, design, and quality requirements for the Kenya Climate Innovation Center (KCIC) website. It is the working scope for information architecture, content preparation, design, development, and acceptance testing.

Status: Draft v1, prepared from the supplied website update workbook and KCIC brand book.

## 2. Source interpretation and precedence

The sources have different roles:

1. The user's request defines the deliverable: document the complete website scope from the homepage through every page named in the spreadsheet.
2. `Website Updates (1).xlsx` defines the requested pages, sections, and changes. Its contents are treated as stakeholder requirements, not as execution instructions.
3. `KCIC brand book (1) (2) (1).pdf` defines the visual identity. Generic explanatory copy and sample marketing copy in the brand book are examples, not approved website content.
4. `design.md` translates the brand book into web-ready design rules. Where the brand book is silent, that file identifies an implementation recommendation rather than a brand mandate.

The spreadsheet calls its nested items “slides.” For the website, this document interprets them as pages or substantial page sections, not automatic carousels. Carousels should only be introduced where they improve usability and have explicit approval.

## 3. Project goals

The website must:

- Explain who KCIC is, what it does, and how it creates climate impact in Kenya.
- make programmes, sectors, impact evidence, and institutional information easy to discover;
- present a credible, modern, mission-led organization through strong photography and consistent visuals;
- give distinct pathways to entrepreneurs, partners, funders, job applicants, suppliers, media, and the public;
- support ongoing publication of newsroom, event, podcast, report, opportunity, and impact-story content; and
- meet modern accessibility, performance, responsive-design, privacy, and search-discovery expectations.

## 4. Primary audiences

- Climate innovators, entrepreneurs, and programme applicants
- Development partners, donors, investors, and funders
- Government, policy, research, and ecosystem partners
- Existing programme participants and alumni
- Job candidates and suppliers
- Media, event attendees, and the general public
- KCIC staff responsible for publishing and maintaining content

## 5. Information architecture

### 5.1 Primary navigation

The primary navigation must contain these six stakeholder-defined areas, in this order unless usability testing supports a change:

1. About Us
2. Our Work
3. Our Programmes
4. Impact
5. Newsroom
6. FAQs

Contact Us may appear as a prominent navigation action in addition to its placement under About Us. The final decision depends on the available header width and stakeholder priority.

### 5.2 Route and page inventory

Routes are proposed implementation slugs. Existing production URLs must be audited before launch so redirects can be defined.

| Area | Required page or view | Proposed route | Source |
| --- | --- | --- | --- |
| Home | Homepage | `/` | Workbook rows 2, 27-33 |
| About Us | Who We Are | `/about` | Rows 3-4 |
| About Us | Our Team: Board and Staff | `/about/team` | Row 4 |
| About Us | Policies & Disclosures | `/about/policies-disclosures` | Row 5 |
| About Us | Procurement | `/about/procurement` | Row 6 |
| About Us | Careers | `/about/careers` | Row 7 |
| About Us | Contact Us | `/contact` | Row 8 |
| Our Work | Our Approach | `/our-work` | Row 9 |
| Our Work | Key Sectors | `/our-work/sectors` | Row 10 |
| Our Work | Cross-Cutting Issues | `/our-work/cross-cutting-issues` | Row 11 |
| Our Work | Our Partners | `/our-work/partners` | Row 12 |
| Our Programmes | Flagship Programmes | `/programmes` | Row 13 |
| Our Programmes | Special Projects & Initiatives | `/programmes/special-projects` | Row 14 |
| Our Programmes | Past Projects | `/programmes/past-projects` | Row 15 |
| Impact | Impact Overview | `/impact` | Row 16 |
| Impact | Our Theory of Change | `/impact/theory-of-change` | Row 17 |
| Impact | Our Targets | `/impact/targets` | Row 18 |
| Impact | Impact Reports | `/impact/reports` | Row 19 |
| Impact | Impact Stories | `/impact/stories` | Row 20 |
| Newsroom | News | `/newsroom` | Row 21 |
| Newsroom | Blogs | `/newsroom/blogs` | Row 22 |
| Newsroom | Events | `/newsroom/events` | Row 23 |
| Newsroom | Podcast | `/newsroom/podcast` | Row 24 |
| Newsroom | Media Coverage | `/newsroom/media-coverage` | Row 25 |
| FAQs | Frequently Asked Questions | `/faqs` | Row 26 |

Content detail routes are required for scalable content, even though the workbook lists only their index views:

- `/programmes/[slug]`
- `/impact/stories/[slug]`
- `/newsroom/news/[slug]`
- `/newsroom/blogs/[slug]`
- `/newsroom/events/[slug]`
- `/newsroom/podcast/[slug]`

If a nested item has too little content for a useful standalone page, it may be implemented as an anchored section on its parent page. It must remain directly linkable and represented in navigation where appropriate.

## 6. Global requirements

### 6.1 Header and navigation

- Use a sticky header on desktop and mobile.
- Change the header background and foreground treatment after scrolling so the logo, navigation, and controls remain legible over every section.
- Provide desktop dropdown or mega-menu access to nested pages without hiding important content behind hover alone.
- Provide an accessible mobile menu with clear open, close, focus, and escape behavior.
- Indicate the current page and support visible keyboard focus.
- Use the official KCIC logo asset and preserve its proportions.

### 6.2 Page structure

- Every page must have one clear `h1`, a concise introduction, and a clear next action where relevant.
- Breadcrumbs are required on nested institutional, programme, impact, and newsroom pages.
- Alternate section backgrounds only where they improve hierarchy and maintain readable contrast.
- Reusable cards must use consistent image ratios, metadata order, spacing, and interaction states.
- Empty and no-result states must explain what is unavailable and give a useful next step.

### 6.3 Footer

The compact global footer must include:

- Quick links
- KCIC office address
- Social-media links
- Mailing-list subscription
- Legal and policy links when supplied
- Copyright and organization identification

Use a subtle brand-colored block or texture to distinguish the footer without reducing legibility. The subscription form must show success, validation, loading, and error states and must not subscribe an address without the required privacy consent.

### 6.4 Search and filtering

At minimum, filtering or clear categorization is required for programmes, reports, impact stories, news/blogs, events, and media coverage when each collection grows beyond a short list. Site-wide search is recommended if the migrated content volume warrants it and should be confirmed after the content inventory.

## 7. Homepage requirements

### 7.1 Hero

- Replace the current video treatment with one or more high-quality still images that reflect KCIC's mission.
- Lead with a short, specific KCIC value proposition and a clear primary action.
- If multiple hero messages are required, prefer an editorially controlled sequence with manual controls and pause behavior; do not auto-rotate essential content.
- Ensure text remains readable at every breakpoint and focal points survive responsive cropping.

### 7.2 The Climate Challenge

- Explain the climate problem KCIC addresses in concise, evidence-based language.
- Use an impactful Kenyan community or landscape image.
- Cite time-sensitive statistics and expose their source and date.

### 7.3 What We Believe

- Present KCIC's beliefs or values in a concise, scannable structure.
- Add meaningful, stylistically consistent icons.
- Do not use icons as the only way to communicate meaning.

### 7.4 Our Impact Journey

- Show a clear sequence of meaningful milestones or stages.
- Each milestone needs a date or period, title, concise explanation, and optional supporting metric or media.
- The mobile treatment must remain chronological and readable without horizontal-only interaction.

### 7.5 Awards & Recognitions

- Display approved award names, issuing organizations, years, and logos or imagery where usage rights permit.
- Link to supporting information when available.
- Do not display unverified claims or third-party marks without approval.

### 7.6 News & Insights

- Display the latest approved content from the Newsroom rather than maintaining a separate duplicate list.
- Show content type, publication date, title, image, short excerpt, and destination link.
- Provide a clear link to the full Newsroom.

## 8. About Us requirements

### 8.1 Who We Are

- Explain KCIC's identity, mandate, history, and role in the climate-innovation ecosystem.
- Present Vision and Mission as equal-sized, visually balanced cards with meaningful icons or consistent visual treatments.
- Present organizational Values.
- Add an “Our Strategy” section below Values, as requested in the workbook.

### 8.2 Our Team

- Present “The Board” before “The Staff.”
- Each person card should support name, role/title, headshot, short biography, and optional professional link.
- Provide graceful handling for missing headshots and maintain consistent image treatment.
- Confirm whether team members require individual detail pages or expandable biographies.

### 8.3 Policies & Disclosures

- Provide a structured, accessible document library.
- Each document needs a title, document type, publication or effective date where applicable, file format, file size, and download/open action.
- Support categories and ordering once the relevant documents are compiled.
- Clearly label documents that are superseded or archived.

### 8.4 Procurement

- Show current opportunities and a clearly separated archive.
- Each opportunity should support title, reference number, publication date, closing date and time with timezone, status, supporting documents, and submission instructions.
- Expired opportunities must change status automatically where reliable deadline data exists, but remain accessible when required for transparency.

### 8.5 Careers

- Show open roles and a clearly labeled no-openings state.
- Each role should support title, location, engagement type, closing date, description, requirements, and application method.
- Clearly identify external application links and expired vacancies.

### 8.6 Contact Us

- Include verified office address, phone, email, office hours if applicable, map or directions, and social links.
- Provide an accessible contact form with name, email, subject/category, message, consent where needed, validation, spam protection, and success/error feedback.
- Define the receiving mailbox, response owner, retention period, and privacy wording before launch.

## 9. Our Work requirements

### 9.1 Our Approach

- Rename the current “How We Work” label to “Our Work.”
- Explain the KCIC approach using the stakeholder-supplied content.
- Use a coherent process or pathway visualization only where the sequence is real and understandable on mobile.

### 9.2 Key Sectors

- Present each sector with a sector-specific photograph or meaningful icon.
- Each sector must have a name, concise explanation, and links to related programmes, impact stories, or resources where available.
- Avoid generic stock imagery that does not distinguish one sector from another.

### 9.3 Cross-Cutting Issues

- Define each issue and explain how it informs work across sectors and programmes.
- Link issues to relevant programmes, resources, and impact evidence where content relationships exist.

### 9.4 Our Partners

- Present approved partner logos with accessible names and links where appropriate.
- Support partner categories if needed, such as funders, implementing partners, government, and ecosystem partners.
- Normalize visual weight without distorting logos and record permission or usage restrictions.

## 10. Our Programmes requirements

### 10.1 Programme presentation

- Use image-led programme cards with consistent metadata and clear click targets.
- Flagship Programmes must be the primary view.
- Special Projects & Initiatives and Past Projects may be collapsible sections, as proposed in the workbook, but their headings and content must remain keyboard accessible and linkable.
- Do not collapse all programme content by default when that would hide the main purpose of the page.

### 10.2 Programme detail

Each programme should support:

- Programme name and status
- Hero or featured image
- Short summary and full description
- Target participants or beneficiaries
- Sector and cross-cutting issue tags
- Geographic coverage
- Start and end dates where applicable
- Partners or funders
- Application status, deadline, eligibility, and application action where applicable
- Outcomes, resources, related stories, and contact information

Past projects must be visibly labelled as completed and must not show an active application action.

## 11. Impact requirements

### 11.1 Overview

- Use a hero image that clearly communicates real-world impact.
- Summarize KCIC's impact with verifiable, dated metrics and links to supporting detail.
- Avoid unsupported counters or ambiguous totals.

### 11.2 Our Theory of Change

- Present the approved theory of change in an accessible web-native format.
- Provide a downloadable source document if one exists.
- Any diagram must have a text equivalent and remain understandable on small screens.

### 11.3 Our Targets

- Show each target with its metric definition, baseline if applicable, target value, target date, current value, last-updated date, and source or methodology.
- Clearly distinguish targets from achieved results.
- Do not imply live data unless the update process is genuinely automated.

### 11.4 Impact Reports

- Provide a report library with cover image where available, title, reporting period, publication date, summary, file type, file size, and download/open action.
- Support filtering by year or report type when content volume warrants it.

### 11.5 Impact Stories

- Use image-led feature-story cards inspired by the interaction pattern referenced in the workbook, without copying another organization's design.
- Every card must include an image, title, excerpt, and link.
- Story detail pages should support publication date, author or source, programme/sector relationships, body content, pull quotes, media, and related stories.

## 12. Newsroom requirements

### 12.1 News and Blogs

- Keep News and Blogs distinguishable by type while allowing a coherent Newsroom landing experience.
- Cards must support image, title, publication date, excerpt, category/type, and link.
- Detail pages should support author where relevant, rich body content, social sharing metadata, related content, and canonical URL.

### 12.2 Events

- Use event photographs and visually prominent dates.
- Support upcoming and past states.
- Each event should include title, start and end date/time with timezone, location or online status, description, registration action, image, organizer/contact, and post-event resources where applicable.

### 12.3 Podcast

- Use episode artwork, thumbnails, or a restrained waveform visual.
- Each episode should support title, episode number if used, publication date, duration, description, audio/embed destination, transcript where available, and platform links.
- Embedded players must be keyboard accessible and must not autoplay.

### 12.4 Media Coverage

- List external coverage with outlet, headline, publication date, short context, optional thumbnail, and clearly identified external link.
- External links must use safe link handling and should not imply that KCIC authored third-party coverage.

## 13. FAQs requirements

- Group questions by useful topic when the list is long.
- Use an accessible accordion or a simple expanded list.
- Accordions must expose button semantics, keyboard operation, focus states, and expanded/collapsed state.
- Support direct links to individual questions where practical.
- Keep answers concise and link to authoritative pages for detailed information.
- Provide a contact pathway when a visitor's question is not answered.

## 14. Content and publishing model

The implementation must avoid hard-coding frequently updated collections. A CMS or equivalent structured content source is required for programmes, people, documents, procurement items, careers, impact metrics, reports, impact stories, newsroom entries, events, podcasts, media coverage, FAQs, awards, partners, and global contact/footer details.

All publishable entries should support, where relevant:

- Draft, preview, publish, unpublish, and archive workflow
- Stable slug and redirect history
- Publish date and optional expiry date
- Featured image with alt text, caption, focal point, and credit
- SEO title, description, social image, and canonical URL
- Author or owner
- Categories, tags, and relationships to other content
- Last reviewed or last updated date

Roles and approval workflow must be agreed with KCIC. At minimum, separate content editing from final publishing if organizational governance requires approval.

## 15. Accessibility and inclusive design

- Target WCAG 2.2 Level AA.
- All functionality must be operable by keyboard and expose visible focus states.
- Use semantic headings, landmarks, lists, buttons, links, labels, and error messages.
- Meet a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text and meaningful interface graphics.
- Do not use color, icons, motion, position, or imagery as the only carrier of meaning.
- Provide useful alt text for informative images and empty alt attributes for decorative images.
- Provide captions or transcripts for time-based media where required.
- Respect reduced-motion preferences.
- Maintain usable zoom, reflow, touch-target sizing, and error recovery on mobile.

## 16. Responsive behavior

- Design mobile-first and support common phone, tablet, laptop, and wide-screen layouts.
- No essential interaction may depend on hover.
- Cards, data displays, timelines, diagrams, menus, and accordions must reflow without horizontal page scrolling.
- Editorial users must be able to set image focal points for responsive crops.
- Test at 320 CSS pixels wide and at 200% browser zoom as part of acceptance.

## 17. Performance and media

- Prefer responsive, optimized still images for the homepage hero as requested.
- Serve correctly sized modern image formats with width and height metadata to prevent layout shift.
- Lazy-load below-the-fold media; do not lazy-load the primary above-the-fold hero image.
- Self-host or efficiently load approved fonts and use only the weights needed by the interface.
- Set the launch target at Core Web Vitals “good” thresholds at the 75th percentile: LCP at or below 2.5 s, INP at or below 200 ms, and CLS at or below 0.1.
- Avoid autoplaying video or audio and avoid animation that delays content access.

## 18. SEO and discoverability

- Provide unique page titles, meta descriptions, canonical URLs, and share images.
- Generate XML sitemap and robots directives.
- Use descriptive URLs and preserve or redirect valuable existing URLs.
- Add appropriate structured data where content supports it, including Organization, BreadcrumbList, Article, Event, PodcastEpisode, and FAQPage. Structured data must match visible content.
- Provide meaningful internal links among sectors, programmes, impact stories, reports, and newsroom content.
- Define Open Graph and social-sharing fallbacks.

## 19. Privacy, security, and integrations

- Collect only necessary personal data through contact, mailing-list, application, or registration flows.
- Display approved privacy language and consent controls where required.
- Define form destinations, data retention, access, deletion, and incident ownership before launch.
- Validate and sanitize all submitted data, rate-limit public endpoints, and use spam protection that does not create unnecessary accessibility barriers.
- Keep secrets outside the client bundle and restrict CMS permissions by role.
- Confirm integrations for mailing list, analytics, maps, event registration, podcast hosting, careers, and applications before implementation.
- Analytics must respect the approved privacy and cookie policy.

## 20. Browser and quality assurance

- Support current stable versions of Chrome, Edge, Firefox, and Safari, plus current common mobile browsers.
- Test navigation, forms, downloads, external links, filters, structured content, responsive images, and error states.
- Test with keyboard-only navigation and representative screen-reader flows.
- Verify there are no broken internal links, missing required metadata, inaccessible document links, or accidental draft content at launch.
- Provide a custom 404 experience with recovery links and error monitoring for production failures.

## 21. Acceptance criteria

The initial website scope is complete when:

- All six navigation areas and every workbook-listed nested item are implemented as an approved page or directly linkable section.
- The homepage includes all six required content sections and the compact footer.
- The sticky header remains readable before and after scrolling on all approved templates.
- Vision and Mission cards are equal in size, Our Strategy appears below Values, and Board appears before Staff.
- Programme cards use featured images; Special Projects and Past Projects use the approved accessible expanded/collapsible treatment.
- Impact includes overview, theory of change, targets, reports, and image-led stories.
- Newsroom includes news, blogs, events, podcast, and media coverage with the required metadata.
- FAQs and every interactive component pass keyboard and state testing.
- Brand typography, colors, imagery, logo handling, and graphic language follow `design.md`.
- Responsive, accessibility, performance, SEO, security, privacy, and content-governance checks in this document pass or have documented stakeholder-approved exceptions.
- Redirects, analytics, integrations, content ownership, and launch responsibilities are documented.

## 22. Required content and decisions still outstanding

The sources identify several areas but do not supply the final material needed to publish them:

- Approved page copy for Our Approach, sectors, cross-cutting issues, programme pages, impact pages, and institutional pages
- Official logo files in SVG or another production-ready format, including full-color and reversed versions
- Licensed Gotham webfont files or written approval of the fallback strategy
- Team and board roster, roles, biographies, headshots, and ordering
- Policies and disclosure documents currently being compiled
- Procurement and careers publishing process, owners, and destination/application method
- Partner names, categories, URLs, logo files, and usage permission
- Programme inventory, status, imagery, eligibility, application links, dates, outcomes, partners, and owners
- Approved theory-of-change source, target definitions, baselines, current values, methodology, and update frequency
- Impact report files and impact stories
- News, blog, event, podcast, and media-coverage migration inventory
- Climate Challenge statistics and sources
- Impact Journey milestones and dates
- Awards and recognition evidence and logo permissions
- Verified office address, phone, email, office hours, social URLs, and map preference
- Mailing-list provider, form destination, consent wording, privacy policy, and retention rules
- CMS choice, editorial roles, approval workflow, analytics platform, cookie policy, and integration credentials
- Current production URL inventory, redirect plan, hosting constraints, and browser analytics
- Confirmation that spreadsheet “slides” should be implemented using the page/section model proposed here

## 23. Traceability summary

| Workbook requirement | Covered in |
| --- | --- |
| Sticky, contrast-changing navigation | 6.1 |
| About Us: Who We Are, Team, Policies, Procurement, Careers, Contact | 8 |
| Vision/Mission equality, icons, Values, Our Strategy | 8.1 |
| Board before Staff | 8.2 |
| Rename How We Work to Our Work | 5.1, 9.1 |
| Our Approach, Key Sectors, Cross-Cutting Issues, Partners | 9 |
| Image-led programme cards; collapsible Special/Past sections | 10 |
| Impact hero, Theory of Change, Targets, Reports, Stories | 11 |
| News, Blogs, Events, Podcast, Media Coverage | 12 |
| FAQs | 13 |
| Homepage hero image, Climate Challenge, beliefs, journey, awards, latest news | 7 |
| Compact footer with quick links, address, social, mailing list, texture/block | 6.3 |


# KCIC Website Design System

## 1. Purpose and source status

This file translates the supplied KCIC brand book into implementation rules for the website. It is intended to guide interface design and frontend development.

The brand book is the authority for the KCIC logo, core colors, and typeface family. It does not define web accessibility behavior, responsive layouts, spacing, component states, or digital color values. Those rules are documented here as web implementation decisions and should be reviewed with KCIC before final visual sign-off.

## 2. Design direction

The site should feel:

- Credible and institutional, without feeling bureaucratic
- Optimistic and active, without making unsupported impact claims
- Kenyan and locally grounded through authentic people, place, enterprise, and landscape photography
- Clear and useful to entrepreneurs, partners, funders, job applicants, suppliers, media, and the public
- Modern through strong hierarchy, generous space, editorial layouts, and restrained motion

Use the brand's circles, arcs, overlaps, green, cyan, and gray as a recognizable system. Avoid turning every section into a collection of competing circles or filling the interface with decorative environmental clichés.

## 3. Logo system

The brand book identifies three logo assets:

- Signature: brandmark plus “Kenya Climate Innovation Center” logotype
- Brandmark: the four-part radiating symbol
- Logotype: the organization name

### 3.1 Usage

- Use the complete signature as the default website logo.
- Use only official supplied artwork. Do not redraw, typeset, trace, recolor, stretch, rotate, crop, add effects to, or change the relationship between the brandmark and logotype.
- Use the full-color logo on white or very light, quiet backgrounds.
- Use the approved reversed/white logo over dark color or photography.
- When used over photography, choose an uncluttered region or add an accessible overlay behind the logo and adjacent text.
- The standalone brandmark may be used as a decorative or compact identifier only after confirming that the context still identifies KCIC clearly.
- Partner and funder logos must remain visually separate from the KCIC signature.

### 3.2 Pending logo rules

The supplied brand book does not state minimum digital size or clear-space measurements. Until KCIC provides them:

- reserve clear space around the logo at least equal to a visually agreed unit derived from the brandmark;
- reject placements where the logotype is unreadable; and
- request production-ready SVG assets and an approved small-size variant before final header implementation.

These are temporary safeguards, not additions to the official logo standard.

## 4. Color system

### 4.1 Core brand colors

The brand book supplies CMYK values. The RGB and hex values below are taken from the rendered PDF swatches and are the initial web implementation values. They should be confirmed against official digital artwork before launch.

| Token | Brand-book value | Web value | Use |
| --- | --- | --- | --- |
| `--kcic-green` | C 50.2, M 0, Y 96.9, K 0 | `#7FCC2F` / `rgb(127 204 47)` | Primary brand recognition, accents, selected states, large graphic shapes |
| `--kcic-gray` | C 0, M 0, Y 0, K 50 | `#918F8F` / `rgb(145 143 143)` | Secondary brand color and restrained graphic shapes |
| `--kcic-cyan` | C 100, M 0, Y 0, K 0 | `#00ADEF` / `rgb(0 173 239)` | Secondary highlight, links or data accents when contrast permits |

### 4.2 Accessible digital support colors

These colors are derived for interface accessibility and are not presented as official brand-book colors.

| Token | Value | Purpose |
| --- | --- | --- |
| `--kcic-ink` | `#1B241D` | Primary text on light surfaces |
| `--kcic-forest` | `#315E13` | Accessible dark green surface, headings, visited/strong states |
| `--kcic-deep-cyan` | `#005A7C` | Accessible dark cyan surface and text link color |
| `--kcic-charcoal` | `#27332A` | Dark footer, overlays, and high-contrast surfaces |
| `--kcic-paper` | `#FFFFFF` | Primary surface |
| `--kcic-mist` | `#F4F7F2` | Quiet alternate section surface |
| `--kcic-line` | `#D9E1D8` | Borders and separators |
| `--kcic-muted-text` | `#566159` | Secondary text on light surfaces |
| `--kcic-error` | `#B42318` | Errors and destructive feedback |
| `--kcic-warning` | `#8A4B08` | Warning feedback |
| `--kcic-success` | `#236B2C` | Success feedback |

### 4.3 Contrast rules

- Use `--kcic-ink` on `--kcic-green`; this pair is approximately 8.0:1.
- Use `--kcic-ink` on `--kcic-cyan`; this pair is approximately 6.3:1.
- Do not use white body-sized text directly on KCIC green, cyan, or gray. Their approximate white-text ratios are 2.0:1, 2.6:1, and 3.2:1 respectively.
- White text may be used on `--kcic-forest`, `--kcic-deep-cyan`, or `--kcic-charcoal` after testing the actual size and weight.
- Use the bright brand colors for large shapes, borders, icons, and non-text accents when a darker foreground or adjacent label provides meaning.
- Test text, icons, controls, focus indicators, charts, images, overlays, hover states, and disabled states in context. Token-level assumptions do not replace component-level contrast testing.

### 4.4 Recommended color balance

- 60-70% white or mist surfaces
- 15-25% photography and dark neutral surfaces
- 10-15% combined green, cyan, and gray accents

This balance is an implementation guide, not a rigid quota.

## 5. Typography

### 5.1 Brand fonts

The brand book specifies:

- Gotham Thin and Thin Italic
- Gotham Light and Light Italic
- Gotham Book and Book Italic
- Gotham Medium and Medium Italic
- Gotham Bold and Bold Italic
- Gotham Black and Black Italic
- Century Gothic

Gotham is a commercially licensed typeface. The website must not fetch unlicensed copies or assume that it is installed on visitors' devices. KCIC must provide licensed webfont files and usage rights.

### 5.2 Web font stack

```css
font-family: "Gotham", "Century Gothic", Arial, sans-serif;
```

Use Century Gothic as the brand-aligned fallback, then Arial and the system sans-serif fallback. If KCIC cannot provide licensed Gotham webfonts, use Century Gothic temporarily and approve a metrically and stylistically suitable open-source replacement before production.

### 5.3 Weight mapping

Load only the weights the interface needs:

| Role | Preferred face | CSS weight |
| --- | --- | --- |
| Display and major page title | Gotham Bold | 700 |
| Section heading | Gotham Bold or Medium | 600-700 |
| Card title and navigation | Gotham Medium | 500 |
| Body and form text | Gotham Book | 400 |
| Supporting text | Gotham Book | 400 |
| Emphasis | Gotham Medium or Book Italic | 500 or italic 400 |

Do not use Thin or Light for essential text. Black should be reserved for rare editorial emphasis rather than routine headings.

### 5.4 Type scale

Use fluid sizes so hierarchy survives small screens without abrupt jumps:

| Token | Suggested value | Typical use |
| --- | --- | --- |
| `--text-display` | `clamp(2.75rem, 6vw, 5.5rem)` | Homepage campaign statement |
| `--text-h1` | `clamp(2.25rem, 4.5vw, 4.25rem)` | Page title |
| `--text-h2` | `clamp(1.75rem, 3vw, 3rem)` | Major section heading |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Card group or subsection |
| `--text-lg` | `1.125rem` | Introductory copy |
| `--text-base` | `1rem` | Body and control text |
| `--text-sm` | `0.875rem` | Metadata and supporting text |

Body text should use a line height near 1.6 and a comfortable reading measure of about 60-75 characters. Headings should use a tighter line height near 1.05-1.2 and avoid all caps for long phrases.

## 6. Layout and spacing

### 6.1 Grid

- Use a mobile-first fluid layout.
- Use a maximum content width around `80rem` (1280 px), subject to visual testing.
- Use 4 columns on small screens, 8 on tablets, and 12 on desktop.
- Use responsive outer gutters: approximately 20 px on mobile, 32 px on tablet, and 48-64 px on desktop.
- Allow selected hero and image treatments to extend full bleed while keeping text aligned to the content grid.

### 6.2 Spacing scale

Use an 8 px-based scale with a 4 px half-step for compact details:

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
```

Default section spacing should be generous but responsive, roughly 64-96 px on desktop and 40-64 px on mobile.

## 7. Shape and graphic language

The brand book repeatedly uses:

- Large circles and cropped arcs
- Overlapping green, cyan, gray, and photographic shapes
- Thin rules
- Strong white space
- The four-part radiating brandmark

Translate this to the web as follows:

- Use one dominant circular or arced gesture per major composition, not a cluster of unrelated decorations.
- Crop large shapes beyond the canvas edge to create energy and depth.
- Use transparent overlaps sparingly and verify the resulting color still supports readable content.
- Keep text outside visually busy overlaps unless placed on a tested solid or darkened surface.
- Use thin rules to separate metadata or editorial groups.
- Do not turn the brandmark into a repeating background pattern without explicit approval.
- Decorative shapes must be hidden from assistive technology and must not intercept pointer events.

## 8. Photography and media

### 8.1 Image direction

Prioritize authentic, high-resolution imagery showing:

- Kenyan climate innovators, founders, workers, and communities
- Clean technologies in real use
- Agriculture, water, energy, waste, transport, buildings, and other approved sectors
- Kenyan landscapes and environments connected to the story
- Observable outcomes rather than generic symbolic greenery

Avoid overused globe-in-hands imagery, staged handshakes, anonymous office stock photography, artificial green color casts, and images that portray communities only as passive beneficiaries.

### 8.2 Image requirements

- Record photographer or source, rights, credit, caption, alt text, and focal point.
- Preserve natural skin tones and avoid heavy filters.
- Define consistent aspect ratios by component: hero, landscape card, portrait, report cover, and logo.
- Use overlays only as much as required for readability.
- Never place essential text inside the image file.
- Do not autoplay video or audio.

## 9. Iconography

- Use one coherent icon family with rounded or softly geometric construction that complements the brandmark.
- Prefer simple line icons at a consistent optical size and stroke weight.
- Use sector-specific and concept-specific icons rather than generic leaves for every topic.
- Pair icons with visible text when the meaning is not universally understood.
- Do not mix filled, outline, photorealistic, and illustrative icon styles in one view.

## 10. Core components

### 10.1 Header

- Transparent or quiet treatment at the top of compatible hero pages; solid accessible surface after scroll.
- Full logo, six primary navigation items, optional Contact action, and mobile-menu control.
- Clear current, hover, focus-visible, and expanded states.
- Scrolled-state transition must be brief and must respect reduced motion.

### 10.2 Buttons and links

- Primary button: KCIC green surface with KCIC ink text.
- Dark primary alternative: KCIC forest surface with white text.
- Secondary button: transparent surface with an ink or deep-cyan border and text.
- Tertiary action: descriptive text link with a visible underline or persistent non-color cue.
- Minimum touch target: approximately 44 by 44 CSS pixels.
- Never remove focus outlines without providing a stronger replacement.

### 10.3 Cards

Use reusable variants for programmes, impact stories, newsroom entries, events, people, reports, awards, and partners. Cards must:

- maintain a consistent image ratio within a collection;
- show only metadata relevant to that content type;
- preserve a visible focus state for linked cards;
- avoid nested interactive controls inside one large link; and
- support missing optional imagery without collapsing the layout.

### 10.4 Accordions

Use for FAQs and, if approved, Special Projects and Past Projects. The heading itself should contain a real button with visible expanded/collapsed state. Content must remain available without pointer-only interaction and should not animate excessively.

### 10.5 Forms

- Labels remain visible above or beside controls; placeholders are examples, not labels.
- Required and optional fields are identified in text.
- Validation appears beside the relevant field and in a summary for long forms.
- Error, success, loading, disabled, and submitted states must be designed.
- Use plain-language consent copy and provide a privacy-policy link.

### 10.6 Data, impact, and timelines

- Always pair a number with its unit, period, definition, and last-updated or source context.
- Distinguish targets from achieved results visually and in text.
- Charts must use accessible colors, direct labels where possible, and a text/table alternative where needed.
- Timelines become a vertical sequence on narrow screens.

## 11. Motion and interaction

- Motion should explain state, hierarchy, or progression rather than decorate every scroll event.
- Favor subtle fades, small position shifts, and shape reveals between roughly 150 and 300 ms.
- Do not use scroll-jacking, forced horizontal narratives, autoplay carousels for essential content, or parallax that harms readability.
- Pause or remove non-essential motion when `prefers-reduced-motion: reduce` is active.
- Hover enhancements must have equivalent keyboard and touch behavior.

## 12. Voice and interface copy

- Write in clear, direct, specific English.
- Lead with what KCIC does and the concrete value or action for the visitor.
- Prefer evidence and defined outcomes over broad claims such as “transforming the future.”
- Use sentence case for headings, buttons, navigation, and labels.
- Use action labels that describe the destination: “View programme,” “Download report,” “Register for event,” or “Read impact story.”
- Show dates in a clear Kenyan/international format such as `15 September 2026`; always include the timezone for deadlines and event times.
- Define acronyms on first use outside familiar brand contexts.

## 13. Accessibility design rules

- Target WCAG 2.2 AA.
- Design every component in default, hover, focus-visible, active, disabled, loading, error, success, selected, and expanded states as applicable.
- Keep reading and focus order aligned with visual order.
- Do not place body text over uncontrolled photography without an overlay or separate surface.
- Maintain 4.5:1 contrast for normal text and 3:1 for large text and meaningful interface graphics.
- Support 200% zoom, text resizing, 320 px reflow, keyboard operation, and reduced motion.
- Avoid center-aligned long body copy and excessive line length.
- Ensure document download links state the file type and, when available, file size.

## 14. Design tokens

The initial CSS token contract is:

```css
:root {
  --kcic-green: #7fcc2f;
  --kcic-gray: #918f8f;
  --kcic-cyan: #00adef;

  --kcic-ink: #1b241d;
  --kcic-forest: #315e13;
  --kcic-deep-cyan: #005a7c;
  --kcic-charcoal: #27332a;
  --kcic-paper: #ffffff;
  --kcic-mist: #f4f7f2;
  --kcic-line: #d9e1d8;
  --kcic-muted-text: #566159;
  --kcic-error: #b42318;
  --kcic-warning: #8a4b08;
  --kcic-success: #236b2c;

  --font-brand: "Gotham", "Century Gothic", Arial, sans-serif;

  --text-display: clamp(2.75rem, 6vw, 5.5rem);
  --text-h1: clamp(2.25rem, 4.5vw, 4.25rem);
  --text-h2: clamp(1.75rem, 3vw, 3rem);
  --text-h3: clamp(1.25rem, 2vw, 1.75rem);
  --text-lg: 1.125rem;
  --text-base: 1rem;
  --text-sm: 0.875rem;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-pill: 999px;

  --shadow-card: 0 12px 32px rgb(27 36 29 / 0.10);
  --content-max: 80rem;
  --reading-max: 45rem;
}
```

Shadows and rounded corners are supporting interface values, not brand-book elements. Use them lightly. Large circles and arcs should carry more of the KCIC visual identity than pill-shaped containers.

## 15. Page-template direction

### Homepage

Use immersive mission photography, a strong value proposition, alternating editorial sections, a clearly readable impact journey, and a latest-content area fed from the Newsroom. Reserve the most expressive brand graphics for this page.

### Institutional pages

Use calm layouts, clear hierarchy, readable measures, document metadata, and restrained graphic accents. Avoid campaign-style visual noise around policies, procurement, careers, and contact tasks.

### Programmes and Our Work

Use image-led cards, relational tags, and sector-specific media. Make status and application actions obvious. Connect programmes to sectors, cross-cutting issues, partners, and impact evidence.

### Impact

Use evidence-forward layouts, dated metrics, accessible diagrams, report covers, and human-centered stories. Visual prominence must not outrun the quality of the underlying evidence.

### Newsroom

Use an editorial rhythm with strong imagery, dates, content-type labels, and useful filters. Events and podcasts should have distinct metadata without becoming visually disconnected from the Newsroom.

## 16. Design approval checklist

Before development sign-off, confirm:

- Official logo SVG files and reversed variants are available.
- Digital RGB/hex values have been confirmed by KCIC.
- Gotham webfont files and license are available, or a fallback has been approved.
- Desktop and mobile header states work over light, dark, and photographic backgrounds.
- Every text/background pair and focus indicator passes contrast checks.
- Photography has rights, credits, alt text, and usable focal points.
- Programme, story, event, report, person, document, partner, and FAQ component states are designed.
- Forms include error, success, loading, consent, and spam-protection behavior.
- Timelines, theory-of-change diagrams, impact metrics, and accordions work at 320 px and 200% zoom.
- Reduced-motion behavior is defined.
- The homepage and at least one nested page from every primary navigation area have been reviewed at mobile, tablet, and desktop widths.


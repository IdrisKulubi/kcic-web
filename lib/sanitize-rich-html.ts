/**
 * React 19 refuses to render <script> nodes from dangerouslySetInnerHTML.
 * Strip executable tags from CMS HTML before injection.
 */
export function sanitizeRichHtml(html: string): string {
  const trimmed = html.trim()
  if (!trimmed) return trimmed

  return trimmed
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/?>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
}

/** CMS HTML for articles: strip scripts and fixed img dimensions so layout CSS can scale media. */
export function sanitizeArticleHtml(html: string): string {
  const safe = sanitizeRichHtml(html)
  return safe.replace(/<img\b([^>]*?)>/gi, (_, attrs: string) => {
    const cleaned = attrs
      .replace(/\s(width|height)\s*=\s*["'][^"']*["']/gi, "")
      .replace(/\sstyle\s*=\s*["'][^"']*["']/gi, "")
    return `<img${cleaned}>`
  })
}

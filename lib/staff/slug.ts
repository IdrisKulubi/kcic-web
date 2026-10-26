export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function estimateReadTime(html: string): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const words = text ? text.split(" ").length : 0
  if (words === 0) return ""
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

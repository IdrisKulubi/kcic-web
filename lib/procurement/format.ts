const TIMEZONE = "Africa/Nairobi"

export function formatProcurementDate(iso: string | null | Date | undefined) {
  if (!iso) return "—"
  const date = iso instanceof Date ? iso : new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-KE", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatProcurementDateTime(iso: string | null | Date | undefined) {
  if (!iso) return "—"
  const date = iso instanceof Date ? iso : new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  const formatted = date.toLocaleString("en-KE", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  return `${formatted} EAT`
}

export function formatFileSize(bytes: number | null | undefined) {
  if (bytes == null || bytes <= 0) return ""
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

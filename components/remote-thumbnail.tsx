"use client"

interface RemoteThumbnailProps {
  src: string
  alt: string
  className?: string
}

/** Renders validated remote thumbnails without expanding Next image remote patterns. */
export function RemoteThumbnail({ src, alt, className }: RemoteThumbnailProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
}

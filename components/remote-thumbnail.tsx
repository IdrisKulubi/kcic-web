"use client"

import type { ImgHTMLAttributes } from "react"

interface RemoteThumbnailProps {
  src: string
  alt: string
  className?: string
  onError?: ImgHTMLAttributes<HTMLImageElement>["onError"]
}

/** Renders validated remote thumbnails without expanding Next image remote patterns. */
export function RemoteThumbnail({
  src,
  alt,
  className,
  onError,
}: RemoteThumbnailProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={onError}
    />
  )
}

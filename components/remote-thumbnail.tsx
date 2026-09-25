"use client"

import type { ImgHTMLAttributes } from "react"

interface RemoteThumbnailProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  onError?: ImgHTMLAttributes<HTMLImageElement>["onError"]
}

/** Renders validated remote thumbnails without expanding Next image remote patterns. */
export function RemoteThumbnail({
  src,
  alt,
  className,
  width = 4,
  height = 3,
  onError,
}: RemoteThumbnailProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      decoding="async"
      onError={onError}
    />
  )
}

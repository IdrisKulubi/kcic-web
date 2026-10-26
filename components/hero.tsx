import { getImageProps } from "next/image"
import Link from "next/link"

import heroDesktop from "@/public/hero-desktop.webp"
import heroMobile from "@/public/hero-mobile.webp"

const heroAlt =
  "Climate enterprises working across agriculture, recycling, solar energy, and electric mobility"

export function Hero() {
  const common = { alt: heroAlt, sizes: "100vw" as const }
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: heroDesktop,
    width: heroDesktop.width,
    height: heroDesktop.height,
    quality: 70,
  })
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: heroMobile,
    width: heroMobile.width,
    height: heroMobile.height,
    quality: 68,
  })

  return (
    <section
      className="canvas-panel isolate grid min-h-[calc(100svh-2*var(--canvas-gutter))] grid-cols-1 grid-rows-1"
      aria-labelledby="hero-title"
    >
      <link
        rel="preload"
        as="image"
        imageSrcSet={mobile}
        imageSizes="100vw"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet={desktop}
        imageSizes="100vw"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <picture className="absolute inset-0 -z-20">
        <source media="(max-width: 767px)" srcSet={mobile} sizes="100vw" />
        <source media="(min-width: 768px)" srcSet={desktop} sizes="100vw" />
        <img
          {...rest}
          alt={heroAlt}
          className="size-full object-cover object-center"
          style={{
            backgroundImage: `url(${heroDesktop.blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,rgba(18,45,28,0.42)_0%,rgba(18,45,28,0.78)_55%,rgba(18,45,28,0.88)_100%)]"
      />
      <div className="col-start-1 row-start-1 flex min-h-[inherit] flex-col items-center justify-center px-5 py-20 text-center sm:px-8 sm:py-24 md:px-[clamp(2rem,5vw,4.25rem)]">
        <h1
          id="hero-title"
          className="m-0 max-w-5xl text-balance font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2rem,4.5vw,4.75rem)] leading-[1.1] font-medium tracking-[-0.04em] text-[#f7fbf5]"
        >
          Catalyzing climate entrepreneurship in Africa.
        </h1>
        <Link
          href="/programmes"
          prefetch={false}
          className="mt-7 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#7fcc2f] px-[1.15rem] font-['Gotham','Century_Gothic',Arial,sans-serif] text-[0.72rem] font-medium tracking-[0.12em] text-[#f7fbf5] uppercase transition-colors duration-200 ease-out hover:bg-[#7fcc2f] hover:text-[#1b241d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7fcc2f]"
        >
          Explore our programmes
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

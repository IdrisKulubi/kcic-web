import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"

import slideSolar from "@/public/hero/slide-1.jpg"
import slideMobility from "@/public/hero/slide-2.jpg"
import slideAquaculture from "@/public/hero/slide-3.jpg"

// Each slide holds for SLIDE_SECONDS, overlapping the next by FADE_SECONDS.
const SLIDE_SECONDS = 6
const FADE_SECONDS = 1.5

const slides = [
  {
    src: slideSolar,
    alt: "Rooftop solar panels under a bright blue sky",
  },
  {
    src: slideMobility,
    alt: "An entrepreneur presenting an electric motorcycle in a workshop",
  },
  {
    src: slideAquaculture,
    alt: "A team in white lab coats outside a fish processing facility",
  },
]

// Pure-CSS crossfade loop: every slide runs the same keyframes, offset by its
// index. Slides after the first stay hidden until their delay elapses.
function slideKeyframes(count: number) {
  const total = count * SLIDE_SECONDS
  const pct = (seconds: number) => `${((seconds / total) * 100).toFixed(3)}%`
  return `
    @keyframes hero-slide {
      0% { opacity: 0; transform: scale(1.06); }
      ${pct(FADE_SECONDS)} { opacity: 1; }
      ${pct(SLIDE_SECONDS)} { opacity: 1; }
      ${pct(SLIDE_SECONDS + FADE_SECONDS)} { opacity: 0; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }
    .hero-slide {
      opacity: 0;
      animation: hero-slide ${total}s linear infinite;
      animation-delay: calc(var(--hero-slide-index) * ${SLIDE_SECONDS}s - ${FADE_SECONDS}s);
    }
    .hero-slide:first-child { opacity: 1; }
    @media (prefers-reduced-motion: reduce) {
      .hero-slide { animation: none; }
    }
  `
}

export function Hero() {
  return (
    <section
      className="canvas-panel isolate grid min-h-[calc(100svh-2*var(--canvas-gutter))] grid-cols-1 grid-rows-1"
      aria-labelledby="hero-title"
    >
      <style>{slideKeyframes(slides.length)}</style>
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {slides.map((slide, index) => (
          <Image
            key={slide.src.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            quality={70}
            placeholder="blur"
            preload={index === 0}
            className="hero-slide object-cover object-center"
            style={{ "--hero-slide-index": index } as CSSProperties}
          />
        ))}
      </div>
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

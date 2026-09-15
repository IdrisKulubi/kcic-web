import Image from "next/image"
import Link from "next/link"

import heroImage from "@/public/hero.png"

export function Hero() {
  return (
    <section
      className="relative isolate grid min-h-svh grid-cols-1 grid-rows-1 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <Image
        src={heroImage}
        alt="Climate enterprises working across agriculture, recycling, solar energy, and electric mobility"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[18%_center] md:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,45,28,0.93)_0%,rgba(18,45,28,0.76)_35%,rgba(18,45,28,0.12)_72%),linear-gradient(0deg,rgba(237,246,239,0.96)_0%,transparent_18%)] max-md:bg-[linear-gradient(0deg,rgba(18,45,28,0.92)_0%,rgba(18,45,28,0.58)_52%,rgba(18,45,28,0.10)_100%)]"
      />
      <div className="flex flex-col items-start justify-center px-5 pt-28 pb-12 max-sm:justify-end max-sm:pt-22 max-sm:pb-8 sm:px-8 md:w-1/2 md:px-[clamp(2rem,5vw,4.25rem)]">
        <h1
          id="hero-title"
          className="m-0 text-left font-['Gotham','Century_Gothic',Arial,sans-serif] text-[clamp(2.6rem,5.4vw,4.75rem)] leading-[1.02] font-medium tracking-[-0.04em] text-[#f7fbf5] max-sm:text-[clamp(2.15rem,11vw,3rem)]"
        >
          Catalyzing
          <br />
          climate
          <br />
          entrepreneurship
          <br />
          in Africa.
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

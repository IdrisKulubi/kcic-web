import Image from "next/image"
import Link from "next/link"

import heroImage from "@/public/hero.png"

import styles from "./hero.module.css"

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image
        src={heroImage}
        alt="Climate enterprises working across agriculture, recycling, solar energy, and electric mobility"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.lockup}>
        <h1 id="hero-title" className={styles.title}>
          Catalyzing
          <br />
          climate
          <br />
          entrepreneurship
          <br />
          in Africa.
        </h1>
   
        <Link href="/programmes" prefetch={false} className={styles.action}>
          Explore our programmes
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

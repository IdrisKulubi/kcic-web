import Image from "next/image"

import heroImage from "@/public/hero.png"

import styles from "./page.module.css"

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
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
        <div className={styles.overlay} aria-hidden="true" />
        <h1 id="hero-title" className={styles.title}>
          Catalyzing Climate Entrepreneurship in Africa
        </h1>
      </section>
    </main>
  )
}

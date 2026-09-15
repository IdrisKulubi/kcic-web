import { Hero } from "@/components/hero"

import styles from "./page.module.css"

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <Hero />
    </main>
  )
}

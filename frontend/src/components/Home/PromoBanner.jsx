'use client'

import styles from './PromoBanner.module.css'

export default function PromoBanner() {
  return (
    <section className={styles.promoBanner}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.scriptText}>Big things are happening!</p>
        <p className={styles.readyText}>Are you ready?</p>
      </div>
    </section>
  )
}
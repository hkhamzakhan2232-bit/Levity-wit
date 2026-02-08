'use client'

import Image from 'next/image'
import styles from './MeetBeth.module.css'

export default function MeetBeth() {
  return (
    <section className={styles.meetBethSection}>
      <div className={styles.container}>
        {/* Left Side - Images */}
        <div className={styles.imageContent}>
          {/* Main Beth Image */}
          <div className={styles.bethImage}>
            <Image
              src="/images/meet-beth/beth-portrait.jpg"
              alt="Beth - Personal Stylist"
              width={540}
              height={608}
              className={styles.mainImage}
            />
          </div>

          {/* Necklace Image - overlapping */}
          <div className={styles.necklaceImage}>
            <Image
              src="/images/meet-beth/necklace.jpg"
              alt="Gold Necklace"
              width={220}
              height={160}
              className={styles.necklace}
            />
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className={styles.textContent}>
          <h2 className={styles.heading}>
            Meet Beth, your<br />Personal Stylist
          </h2>
          
          <p className={styles.description}>
            We're here when you need us, seven days a week. We'll ensure that you and 
            your family get the very best quality health care.
          </p>
        </div>
      </div>
    </section>
  )
}
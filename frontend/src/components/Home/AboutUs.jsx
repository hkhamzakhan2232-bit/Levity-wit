'use client'

import Image from 'next/image'
import styles from './AboutUs.module.css'

export default function AboutUs() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Left Side - Text Content */}
        <div className={styles.textContent}>
          <h2 className={styles.heading}>About Us</h2>
          
          <p className={styles.description}>
            Vitae nunc sed velit dignissim sodales ut eu sem integer. Sit amet 
            consectetur adipiscing elit pellentesque habitant morbi. Amet venenatis 
            urna cursus eget nunc scelerisque viverra.
          </p>

          <button className={styles.strokeBtn}>Learn More</button>
        </div>

        {/* Right Side - Images */}
        <div className={styles.imageContent}>
          {/* Circular Badge - LEFT side */}
          <Image
            src="/images/about/badge-logo-v2.png"
            alt="Blondes Have More Fun"
            width={250}
            height={250}
            className={styles.badge}
          />

          <Image
            src="/images/about/store-necklace.jpg"
            alt="Store and necklace"
            width={700}
            height={600}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  )
}

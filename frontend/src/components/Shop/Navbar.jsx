'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiSearch, FiShoppingBag } from 'react-icons/fi'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoText}>
            <span className={styles.brandName}>levity&wit</span>
            <span className={styles.tagline}>live your style</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/store-services">Store Services</Link>
          <Link href="/about">About Us</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/shop">Shop</Link>
        </div>

        <div className={styles.divider}>|</div>

        {/* Icons */}
        <div className={styles.navIcons}>
          <button className={styles.iconBtn} aria-label="Search">
            <FiSearch size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="Shopping Cart">
            <FiShoppingBag size={20} />
          </button>
          <button 
            className={styles.menuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - BUG: This needs slide-in animation */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
        </div>
      )}
    </nav>
  )
}
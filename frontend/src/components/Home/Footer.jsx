'use client'

import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Contact Section */}
          <div className={styles.section}>
            <h3 className={styles.heading}>Contact</h3>
            <p className={styles.text}>Info@La-Studioweb.Com</p>
            <p className={styles.text}>8502 Preston Rd. Inglewood</p>
            <p className={styles.text}>(308) 555-0121</p>
          </div>

          {/* Logo and Social Section */}
          <div className={styles.centerSection}>
            <div className={styles.logoContainer}>
              <Image 
  src="/logo-footer.png"
  alt="Footer Logo"
  width={300}
  height={130}
/>
            </div>
            
            {/* Social Media Icons */}
            <div className={styles.socialContainer}>
              <a 
                href="https://facebook.com" 
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <span className={styles.divider}>|</span>
              <a 
                href="https://x.com" 
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <span className={styles.divider}>|</span>
              <a 
                href="https://instagram.com" 
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Working Hours Section */}
          <div className={styles.sectionRight}>
            <h3 className={styles.heading}>Working Hours</h3>
            <p className={styles.text}>Working Days: 9AM - 9PM</p>
            <p className={styles.text}>Saturday: 10AM - 8PM</p>
            <p className={styles.text}>Sunday: Closed</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              Copyright By LEVITY © Designed By Sproutland Media
            </p>
            <div className={styles.links}>
              <a href="#" className={styles.link}>
                Terms & Conditions
              </a>
              <a href="#" className={styles.link}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
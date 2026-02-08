'use client'
import { useState } from 'react';
import styles from './contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState({ sending: false, success: null, error: null })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.sending) return
    setStatus({ sending: true, success: null, error: null })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, message: form.message })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Request failed')
      }
      setStatus({ sending: false, success: true, error: null })
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (err) {
      setStatus({ sending: false, success: null, error: err.message })
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>
            levity<span className={styles.ampersand}>&</span>wit
          </h1>
          <p className={styles.tagline}>Live your dream lifestyle</p>
        </div>
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        </div>
        {/* Lorem Text Section */}
      <section className={styles.introText}>
        <p>
          Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit Voluptatem 
          Accusantium Doloremque Laudantium, Totam Rem Aperiam, Eaque 
          Ipsa Quae Ab Illo Inventore Veritatis Et Quasi Architecto Beatae 
          Vitae Dicta Sunt Explicabo. Nemo Enim Ipsam Voluptatem Quia 
          Voluptas Sit Aspernatur Aut Odit Aut Fugit, Sed Quia Consequuntur 
          Magni Dolores Eos Qui Ratione Voluptatem Sequi Nesciunt.
        </p>
      </section>
      </header>

      

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <img 
            src="/images/contact/map.png" 
            alt="Location Map - New York" 
            className={styles.map}
          />
          <div className={styles.mapPin}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#d4a5a5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>Get In Touch</h2>
        
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input 
              type="text" 
              placeholder="Full Name*" 
              className={styles.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input 
              type="tel" 
              placeholder="Phone Number*" 
              className={styles.input}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          
          <input 
            type="email" 
            placeholder="Email Address*" 
            className={styles.inputFull}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          
          <textarea 
            placeholder="Your Message" 
            className={styles.textarea}
            rows="6"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>
          
          <button type="submit" className={styles.submitBtn} disabled={status.sending}>
            {status.sending ? 'Sending...' : 'Send Message'}
          </button>
          {status.success && <p className={styles.successNote}>Thanks! We’ll reply shortly.</p>}
          {status.error && <p className={styles.errorNote}>Failed to send. Please try again.</p>}
        </form>
      </section>
    </div>
  );
}

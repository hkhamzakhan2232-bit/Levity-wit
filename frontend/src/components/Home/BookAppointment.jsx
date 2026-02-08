'use client'

import { useState } from 'react'
import styles from './BookAppointment.module.css'

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({ sending: false, success: null, error: null })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status.sending) return
    setStatus({ sending: true, success: null, error: null })
    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Request failed')
      }
      setStatus({ sending: false, success: true, error: null })
      setFormData({ fullName: '', email: '', message: '' })
    } catch (err) {
      setStatus({ sending: false, success: null, error: err.message })
    }
  }

  return (
    <section className={styles.appointmentSection}>
      <div className={styles.container}>
        {/* Left Side - Feature Cards */}
        <div className={styles.featuresContent}>
          {/* Card 1 - Medical Staff */}
          <div className={`${styles.featureCard} ${styles.pinkCard}`}>
            <div className={styles.iconCircle}>
              <div
  className={styles.icon}
  style={{ backgroundImage: "url('/images/appointment/user.png')", width: '35px', height: '31px' }}
/>
            </div>
            <h3 className={styles.cardTitle}>Medical staff</h3>
            <p className={styles.cardDescription}>
              All of our staff are trained medical professionals who care about every patient.
            </p>
          </div>

          {/* Card 2 - Qualified doctors */}
          <div className={styles.featureCard}>
            <div className={styles.iconCircle}>
              <div
  className={styles.icon}
  style={{ backgroundImage: "url('/images/appointment/approved.png')", width: '35px', height: '31px' }}
/>
            </div>
            <h3 className={styles.cardTitle}>Qualified doctors</h3>
            <p className={styles.cardDescription}>
              The doctors at our clinic are experts in their fields, and give you top quality care.
            </p>
          </div>

          {/* Card 3 - Best technology */}
          <div className={styles.featureCard}>
            <div className={styles.iconCircle}>
              <div
  className={styles.icon}
  style={{ backgroundImage: "url('/images/appointment/heart.png')", width: '35px', height: '31px' }}
/>
            </div>
            <h3 className={styles.cardTitle}>Best technology</h3>
            <p className={styles.cardDescription}>
              We use cutting edge technologies and tools to ensure you get accurate results, quickly.
            </p>
          </div>

          {/* Card 4 - Emergency help */}
          <div className={styles.featureCard}>
            <div className={styles.iconCircle}>
             <div
  className={styles.icon}
  style={{ backgroundImage: "url('/images/appointment/medkit.png')", width: '35px', height: '31px' }}
/>

            </div>
            <h3 className={styles.cardTitle}>Emergency help</h3>
            <p className={styles.cardDescription}>
              We provide an extensive range of emergency services, including blood labs, EKG, and more.
            </p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className={styles.formContent}>
          <div className={styles.formWrapper}>
            <h2 className={styles.formHeading}>Book Your Appointment</h2>
            <p className={styles.formSubheading}>
              To Cut Down On Your Waiting Time, Simply Book Your Appointment Online.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows={5}
                />
              </div>

              <button type="submit" className={styles.strokeBtn} disabled={status.sending}>
                {status.sending ? 'Sending...' : 'Book Appointment'}
              </button>
              {status.success && <p className={styles.successNote}>We received your request. Check your email.</p>}
              {status.error && <p className={styles.errorNote}>Failed to send. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

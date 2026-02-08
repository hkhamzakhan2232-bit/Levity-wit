// ContactSection.js
'use client'
import { useState } from 'react';
import './ContactSection.css';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ sending: false, success: null, error: null });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.sending) return;
    setStatus({ sending: true, success: null, error: null });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Request failed');
      }
      setStatus({ sending: false, success: true, error: null });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ sending: false, success: null, error: err.message });
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-left">
        <h2>Stay In Touch</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name*"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
          />
          <button type="submit" className='strokeBtn' disabled={status.sending}>
            {status.sending ? 'Sending...' : 'Send Message'}
          </button>
          {status.success && <p className="successNote">Thanks! We’ll reply shortly.</p>}
          {status.error && <p className="errorNote">Failed to send. Please try again.</p>}
        </form>
      </div>
      <div className="contact-right">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.199271874051!2d120.9873!3d14.6514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9a25d1c6c1b%3A0x2c28e0eaa342e05f!2sNew%20Era%20University!5e0!3m2!1sen!2sph!4v1707010620000!5m2!1sen!2sph"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <style jsx>{`
        .strokeBtn {
  position: relative;
  background: transparent;
  border: none;
  padding: 12px 36px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  color: #333;
  font-family: inherit;
  display: inline-block;
  width: fit-content;
}

.strokeBtn::before {
  content: "";
  position: absolute;
  inset: -5px;
  border: 2px solid rgba(0, 0, 0, 0.35);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  transform: rotate(-3deg);
  transition: all 0.3s ease;
  pointer-events: none;
}

.strokeBtn:hover::before {
  transform: rotate(2deg) scale(1.05);
  border-color: rgba(0, 0, 0, 0.6);
}
      `}</style>
    </section>
  );
}

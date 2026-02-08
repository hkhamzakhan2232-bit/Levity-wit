'use client';

import { useState } from 'react';

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      title: 'Beautiful Dress',
      text: 'Eget nullam non nisi est sit amet facilisis. Ut aliquam purus sit amet luctus. Morbi tincidunt augue interdum velit euismod in pellentesque. Congue quisque egestas diam in arcu cursus euismod quis viverra.',
      author: 'Harry Peter',
      role: 'Client',
      image: '/images/testimonials/testimonial1.jpg', // Replace with your actual image path
    },
    {
      id: 2,
      title: 'Amazing Quality',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Jane Doe',
      role: 'Client',
      image: '/images/testimonials/testimonial2.png',
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="title">What People Are Saying</h2>

        <div className="testimonial-content">
          {/* Left Arrow */}
          <button className="arrow-btn left" onClick={prevSlide} aria-label="Previous testimonial" disabled={isAnimating}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M25 30L15 20L25 10" stroke="#d4c4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Image Section */}
          <div className={`image-container ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="image-wrapper">
              <img 
                src={currentTestimonial.image} 
                alt={currentTestimonial.author}
              />
            </div>
            
            {/* Social Icons */}
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none"/>
                  <circle cx="18" cy="6" r="1.5" fill="white"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Testimonial Text */}
          <div className={`testimonial-text ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="quote-icon">
              <svg width="60" height="48" viewBox="0 0 60 48" fill="none">
                <path d="M0 24C0 10.7 10.7 0 24 0C24 13.3 13.3 24 0 24V48H24V24H0Z" fill="#d4a9a0"/>
                <path d="M36 24C36 10.7 46.7 0 60 0C60 13.3 49.3 24 36 24V48H60V24H36Z" fill="#d4a9a0"/>
              </svg>
            </div>
            
            <h3 className="testimonial-title">{currentTestimonial.title}</h3>
            
            <p className="testimonial-description">{currentTestimonial.text}</p>
            
            <div className="author-info">
              <span className="author-name">{currentTestimonial.author}</span>
              <span className="author-role"> - <em>{currentTestimonial.role}</em></span>
            </div>
          </div>

          {/* Right Arrow */}
          <button className="arrow-btn right" onClick={nextSlide} aria-label="Next testimonial" disabled={isAnimating}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M15 30L25 20L15 10" stroke="#d4c4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: 100px 20px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .title {
          font-family: 'Brush Script MT', cursive;
          font-size: 64px;
          text-align: center;
          color: #c9a9a0;
          margin-bottom: 80px;
          font-weight: normal;
        }

        .testimonial-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .arrow-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          transition: opacity 0.3s ease;
          flex-shrink: 0;
        }

        .arrow-btn:hover:not(:disabled) {
          opacity: 0.7;
        }

        .arrow-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .image-container {
          flex-shrink: 0;
          position: relative;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .testimonial-text {
          flex: 1;
          max-width: 600px;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .fade-in {
          opacity: 1;
          transform: translateX(0);
        }

        .fade-out {
          opacity: 0;
          transform: translateX(-20px);
        }

        .image-wrapper {
          width: 280px;
          height: 350px;
          border-radius: 8px 8px 0 0;
          overflow: hidden;
          background: #e8d5d0;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          background: rgba(212, 169, 160, 0.85);
          padding: 18px;
          border-radius: 0 0 8px 8px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }

        .social-icon:hover {
          opacity: 0.7;
        }

        .quote-icon {
          margin-bottom: 30px;
        }

        .testimonial-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          color: #2a2a2a;
          margin-bottom: 25px;
          font-weight: 700;
        }

        .testimonial-description {
          font-size: 16px;
          color: #6a6a6a;
          line-height: 1.8;
          margin-bottom: 30px;
          font-weight: 300;
        }

        .author-info {
          font-size: 18px;
        }

        .author-name {
          color: #2a2a2a;
          font-weight: 600;
        }

        .author-role {
          color: #2a2a2a;
          font-weight: 400;
        }

        @media (max-width: 1024px) {
          .testimonial-content {
            gap: 40px;
          }

          .image-wrapper {
            width: 240px;
            height: 300px;
          }

          .testimonial-title {
            font-size: 32px;
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 48px;
            margin-bottom: 50px;
          }

          .testimonial-content {
            flex-direction: column;
            gap: 40px;
          }

          .arrow-btn.left,
          .arrow-btn.right {
            display: none;
          }

          .image-wrapper {
            width: 100%;
            max-width: 350px;
            height: 400px;
          }

          .testimonial-text {
            text-align: center;
          }

          .quote-icon {
            display: flex;
            justify-content: center;
          }

          .fade-out {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
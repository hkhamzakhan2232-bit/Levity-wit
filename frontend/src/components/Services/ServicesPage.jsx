'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ServicesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Carousel slides data
  const slides = [
    {
      id: 1,
      image: '/images/services/slide1.jpg',
      sideImage1: '/images/services/side1-1.jpg',
      sideImage2: '/images/services/side1-2.jpg',
    },
    {
      id: 2,
      image: '/images/services/slide2.jpg',
      sideImage1: '/images/services/slide1.jpg',
      sideImage2: '/images/services/side1-1.jpg',
    },
    {
      id: 3,
      image: '/images/services/slide3.jpg',
      sideImage1: '/images/services/side1-2.jpg',
      sideImage2: '/images/services/slide1.jpg',
    },
  ]

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [currentSlide])

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 600)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 600)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Services</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">{'>'}</span>
            <span>Pages</span>
            <span className="separator">{'>'}</span>
            <span className="current">Services</span>
          </div>
        </div>
      </section>

      {/* Grow Your Business Section */}
      <section className="grow-business">
        <div className="grow-container">
          <div className="grow-content">
            <h2 className="grow-title">Grow your Business</h2>
            <p className="grow-text">
              The doctors at our clinic are experts in their fields,
              and give you top quality care.
            </p>
            <button className="read-more-btn">Book Now</button>
          </div>
          <div className="grow-images">
            <div className="single-image-wrapper">
              <Image
                src="/images/services/image.png"
                alt="Fashion collection"
                width={542}
                height={529}
                className="fashion-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-container">
          <p className="quote-text">
            "Finding a good stylist is like finding a good lawyer <span className="pink-box"></span> you
          </p>
          <p className="quote-subtext">
            gotta go to the same guy"
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-wrapper">
            {/* Left Side Image */}
            <div className="side-image left-side" style={{ marginLeft: '-20px'}}>
              <div className={`side-image-inner ${isAnimating ? 'animating' : ''}`}>
                <img 
                  src={slides[currentSlide].sideImage1} 
                  alt="Side image 1" 
                />
              </div>
            </div>

            {/* Main Carousel */}
            <div className="main-carousel">
              <div className="carousel-slides">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`carousel-slide ${
                      index === currentSlide ? 'active' : ''
                    } ${
                      index < currentSlide ? 'prev' : ''
                    } ${
                      index > currentSlide ? 'next' : ''
                    }`}
                  >
                    <img src={slide.image} alt={`Slide ${slide.id}`} />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button 
                className="carousel-btn prev-btn" 
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="carousel-btn next-btn" 
                onClick={handleNext}
                aria-label="Next slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="carousel-dots">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side Image */}
            <div className="side-image right-side" style={{ marginRight: '-20px' }}>
              <div className={`side-image-inner ${isAnimating ? 'animating' : ''}`}>
                <img 
                  src={slides[currentSlide].sideImage2} 
                  alt="Side image 2" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-page {
          width: 100%;
          background: #fff;
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 400px;
          background-image: url('/images/shop-products/hero-bg.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #fff;
        }

        .hero-title {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: clamp(4rem, 8vw, 7rem);
          font-weight: 400;
          margin: 0;
          color: #fff;
        }

        .breadcrumb {
          margin-top: 2rem;
          display: flex;
          gap: 0.8rem;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
        }

        .breadcrumb :global(a) {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb :global(a):hover {
          color: #e8b4a8;
        }

        .separator {
          opacity: 0.6;
        }

        .current {
          font-weight: 500;
        }

        /* Grow Your Business Section */
        .grow-business {
          padding: 100px 40px;
          background: #fff;
        }

        .grow-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 80px;
          align-items: center;
        }

        .grow-content {
          flex: 1;
          max-width: 400px;
        }

        .grow-title {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: #000;
          margin-bottom: 30px;
          line-height: 1.2;
        }

        .grow-text {
          font-size: 15px;
          line-height: 1.8;
          color: #666;
          margin-bottom: 40px;
        }

        .read-more-btn {
          background: transparent;
          border: 1px solid #333;
          padding: 12px 28px;
          font-size: 12px;
          letter-spacing: 1px;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 25px;
        }

        .read-more-btn:hover {
          background: #333;
          color: #fff;
        }

        .grow-images {
          flex: 1;
        }

        .single-image-wrapper {
          max-width: 542px;
          width: 100%;
        }

        .fashion-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 4px;
          transition: transform 0.4s ease;
        }

        .fashion-image:hover {
          transform: scale(1.02);
        }

        /* Quote Section */
        .quote-section {
          padding: 80px 40px;
          background: #fff;
        }

        .quote-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .quote-text {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: #000;
          margin-bottom: 5px;
          line-height: 1.5;
          position: relative;
          display: inline-block;
        }

        .pink-box {
          display: inline-block;
          width: 40px;
          height: 15px;
          background: #d4a5a5;
          margin: 0 8px;
          vertical-align: middle;
        }

        .quote-subtext {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: #000;
          margin: 0;
        }

        /* Carousel Section */
        .carousel-section {
          width: 100%;
          padding: 100px 20px;
          background: #1a1a1a;
          overflow: hidden;
        }

        .carousel-container {
          max-width: 1600px;
          margin: 0 auto;
        }

        .carousel-wrapper {
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: center;
        }

        /* Side Images */
        .side-image {
          flex-shrink: 0;
          width: 300px;
          height: 450px;
          overflow: hidden;
          border-radius: 8px;
          position: relative;
        }

        .side-image-inner {
          width: 100%;
          height: 100%;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .side-image-inner.animating {
          transform: scale(1.05);
          opacity: 0.7;
        }

        .side-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Main Carousel */
        .main-carousel {
          flex: 1;
          max-width: 1000px;
          height: 500px;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #000;
        }

        .carousel-slides {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .carousel-slide.active {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
          z-index: 2;
        }

        .carousel-slide.prev {
          transform: translateX(-100%) scale(0.95);
        }

        .carousel-slide.next {
          transform: translateX(100%) scale(0.95);
        }

        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Navigation Buttons */
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .carousel-btn:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .carousel-btn:active {
          transform: translateY(-50%) scale(0.95);
        }

        .prev-btn {
          left: 20px;
        }

        .next-btn {
          right: 20px;
        }

        /* Dots Indicator */
        .carousel-dots {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }

        .dot.active {
          background: #fff;
          width: 32px;
          border-radius: 6px;
        }

        /* Responsive Design */
        @media (max-width: 1400px) {
          .side-image {
            width: 160px;
            height: 400px;
          }

          .main-carousel {
            max-width: 600px;
            height: 450px;
          }
        }

        @media (max-width: 1200px) {
          .carousel-wrapper {
            gap: 15px;
          }

          .side-image {
            width: 140px;
            height: 350px;
          }

          .main-carousel {
            max-width: 550px;
            height: 400px;
          }
        }

        @media (max-width: 1024px) {
          .carousel-section {
            padding: 80px 20px;
          }

          .grow-container {
            gap: 50px;
          }

          .side-image {
            width: 120px;
            height: 320px;
          }

          .main-carousel {
            max-width: 500px;
            height: 380px;
          }

          .carousel-btn {
            width: 45px;
            height: 45px;
          }
        }

        @media (max-width: 900px) {
          .carousel-wrapper {
            gap: 10px;
          }

          .side-image {
            width: 100px;
            height: 280px;
          }

          .main-carousel {
            max-width: 450px;
            height: 340px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            height: 300px;
          }

          .grow-business {
            padding: 60px 20px;
          }

          .grow-container {
            flex-direction: column;
            gap: 40px;
          }

          .grow-content {
            max-width: 100%;
          }

          .single-image-wrapper {
            max-width: 80%;
            margin: 0 auto;
          }

          .quote-section {
            padding: 60px 20px;
          }

          .carousel-section {
            padding: 60px 15px;
          }

          .side-image {
            display: none;
          }

          .main-carousel {
            max-width: 100%;
            height: 400px;
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
          }

          .prev-btn {
            left: 15px;
          }

          .next-btn {
            right: 15px;
          }

          .carousel-dots {
            bottom: 20px;
          }
        }

        @media (max-width: 480px) {
          .hero {
            height: 250px;
          }

          .grow-business {
            padding: 40px 15px;
          }

          .single-image-wrapper {
            max-width: 90%;
          }

          .quote-section {
            padding: 40px 15px;
          }

          .pink-box {
            width: 30px;
            height: 12px;
          }

          .carousel-section {
            padding: 40px 10px;
          }

          .main-carousel {
            height: 350px;
            border-radius: 8px;
          }

          .carousel-btn {
            width: 36px;
            height: 36px;
          }

          .prev-btn {
            left: 10px;
          }

          .next-btn {
            right: 10px;
          }

          .carousel-dots {
            bottom: 15px;
            gap: 8px;
          }

          .dot {
            width: 10px;
            height: 10px;
          }

          .dot.active {
            width: 24px;
          }
        }

        @media (max-width: 375px) {
          .single-image-wrapper {
            max-width: 95%;
          }

          .grow-business {
            padding: 30px 10px;
          }

          .main-carousel {
            height: 320px;
          }

          .carousel-btn {
            width: 32px;
            height: 32px;
          }

          .carousel-btn svg {
            width: 18px;
            height: 18px;
          }
        }

        @media (max-width: 320px) {
          .single-image-wrapper {
            max-width: 100%;
          }

          .main-carousel {
            height: 280px;
          }

          .carousel-dots {
            gap: 6px;
          }

          .dot {
            width: 8px;
            height: 8px;
          }

          .dot.active {
            width: 20px;
          }
        }
      `}</style>
    </div>
  )
}
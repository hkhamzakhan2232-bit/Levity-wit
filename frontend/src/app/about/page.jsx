'use client';

export const dynamic = 'force-dynamic';

import LatestNewsSection from '@/components/Home/LatestNewsSection';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import Link from 'next/link';
import './about.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <style jsx>{`
        .header {
          background-color: #e8b4a8;
          padding: 1.5rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 1.8rem;
          color: #2b2b2b;
          margin: 0;
          line-height: 1;
        }

        .logo-ampersand {
          color: #2b2b2b;
        }

        .tagline {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: 1rem;
          color: #2b2b2b;
          font-style: italic;
          margin-top: 0.2rem;
        }

        .nav {
          display: flex;
          gap: 3rem;
          align-items: center;
        }

        .nav a {
          color: #2b2b2b;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          transition: color 0.3s ease;
        }

        .nav a:hover {
          color: #fff;
        }

        .header-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #2b2b2b;
          font-size: 1.2rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .icon-btn:hover {
          color: #fff;
        }

        .menu-btn {
          display: none;
        }

        .hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('/images/shop-products/hero-bg.jpg');
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
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
          color: #fff;
          margin: 0;
          line-height: 1;
        }

        .breadcrumb {
          margin-top: 2rem;
          display: flex;
          gap: 0.8rem;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          color: #fff;
        }

        .breadcrumb a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb a:hover {
          color: #e8b4a8;
        }

        .breadcrumb-separator {
          color: #fff;
          opacity: 0.6;
        }

        .breadcrumb-current {
          color: #fff;
          font-weight: 500;
        }

        @media (max-width: 968px) {
          .nav {
            display: none;
          }

          .menu-btn {
            display: block;
          }

          .hero {
            height: 300px;
          }

          .hero-title {
            font-size: clamp(3rem, 10vw, 5rem);
          }
        }

        @media (max-width: 600px) {
          .header {
            padding: 1rem 1.5rem;
          }

          .logo {
            font-size: 1.4rem;
          }

          .tagline {
            font-size: 0.8rem;
          }

          .header-actions {
            gap: 1rem;
          }

          .icon-btn {
            font-size: 1rem;
          }

          .hero {
            height: 250px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">About Us</h2>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">{'>'}</span>
            <span>Pages</span>
            <span className="breadcrumb-separator">{'>'}</span>
            <span className="breadcrumb-current">About Us</span>
          </div>
        </div>
      </section>

      {/* Julia Palacci Section */}
      <section className="about-julia-section">
        <div className="julia-grid">
          {/* Left Column - Text */}
          <div className="julia-text-col">
            <h2 className="julia-name">Julia Palacci</h2>
            <div className="julia-bio">
              <p>
                <span className="font-bold">Profile</span>My name is Julia Palacci and I'm a professional model, actress, and director. I love bringing life to creative ideas and projects of all sorts. I enjoying being on the stage and behind the scenes, in front of a camera and holding it. 2009-2015For the past several years, I have worked on stages across North America and Europe, discovering the energy and life of cities and countries, and enjoying the interactions between actors and audiences.Skillsin addition to acting, I have trained as a dancer, singer and professional mime. The stage is in my blood, and whenever I encounter a new field or area that interests me, I explore it to its roots.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="julia-image-col">
            <div className="main-image-wrapper">
              <img src="/images/about/image.png" alt="Julia Palacci" className="main-image" />
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <LatestNewsSection />
    </div>
  );
}

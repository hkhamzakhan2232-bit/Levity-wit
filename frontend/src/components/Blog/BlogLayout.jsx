'use client'

import Link from 'next/link'

export default function BlogLayout({ children, sidebar }) {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Blog</h2>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">{'>'}</span>
            <span>Pages</span>
            <span className="breadcrumb-separator">{'>'}</span>
            <span className="breadcrumb-current">Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Layout */}
      <div className="blog-layout">
        <div className="blog-container">
          <main className="blog-main">
            {children}
          </main>
          <aside className="blog-sidebar">
            {sidebar}
          </aside>
        </div>
      </div>

      <style jsx>{`
        /* Hero Section */
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

        .breadcrumb :global(a) {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb :global(a):hover {
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

        /* Blog Layout */
        .blog-layout {
          width: 100%;
          background: #fff;
          min-height: 100vh;
        }

        .blog-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px;
          display: flex;
          gap: 60px;
          align-items: flex-start;
        }

        .blog-main {
          flex: 1;
          min-width: 0;
          width: 100%;
        }

        .blog-sidebar {
          width: 350px;
          flex-shrink: 0;
          position: sticky;
          top: 20px;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
        }

        /* Tablet */
        @media (max-width: 1200px) {
          .blog-container {
            gap: 40px;
            padding: 50px 30px;
          }

          .blog-sidebar {
            width: 300px;
          }
        }

        /* Mobile/Tablet - Stack Layout */
        @media (max-width: 992px) {
          .hero {
            height: 300px;
          }

          .hero-title {
            font-size: clamp(3rem, 10vw, 5rem);
          }

          .blog-container {
            flex-direction: column;
            gap: 0;
            padding: 40px 25px;
          }

          .blog-main {
            width: 100%;
          }

          .blog-sidebar {
            width: 100%;
            max-width: 100%;
            position: static;
            margin-top: 60px;
            max-height: none;
            overflow-y: visible;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .blog-container {
            padding: 30px 20px;
          }

          .blog-sidebar {
            margin-top: 50px;
          }
        }

        /* Mobile Small */
        @media (max-width: 600px) {
          .hero {
            height: 250px;
          }

          .breadcrumb {
            font-size: 0.85rem;
            gap: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .blog-container {
            padding: 20px 15px;
          }

          .blog-sidebar {
            margin-top: 40px;
          }
        }
      `}</style>
    </>
  )
}
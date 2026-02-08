'use client'

import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function HeroSection() {
  return (
    <>
      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #e8ddd5 0%, #d4c4b8 50%, #c9bdb3 100%);
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/images/hero/bg.png');
          background-size: cover;
          background-position: center left;
          opacity: 0.4;
          z-index: 0;
        }

        .container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .left-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          margin-left: 100px;
        }

        .title {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          line-height: 1;
        }

        .unveiling {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: clamp(3.5rem, 7vw, 6.5rem);
          font-weight: 400;
          color: #2b2b2b;
          margin: 0;
          line-height: 0.9;
        }

        .rebrand {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: clamp(3.5rem, 7vw, 6.5rem);
          font-weight: 400;
          color: #F4D3CE;
          margin: 0;
          margin-top: -0.5rem;
          line-height: 0.9;
        }

        .buttons {
          display: flex;
          gap: 3rem;
          align-items: center;
        }

        .btn {
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

.btn::before {
  content: "";
  position: absolute;
  inset: -12px;
  border: 2px solid rgba(0, 0, 0, 0.35);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  transform: rotate(-3deg);
  transition: all 0.3s ease;
  pointer-events: none;
}

.btn:hover::before {
  transform: rotate(2deg) scale(1.05);
  border-color: rgba(0, 0, 0, 0.6);
}

        .social {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-left: 150px
        }

        .social a {
          color: #2b2b2b;
          font-size: 1.1rem;
          transition: color 0.3s ease;
          text-decoration: none;
        }

        .social a:hover {
          color: #e8b4a8;
        }

        .divider {
          color: #2b2b2b;
          opacity: 0.3;
        }

        .right-content {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .polaroid-stack {
          position: relative;
          width: 100%;
          max-width: 1000px;
          height: 800px;
        }

        .polaroid-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
          transform: rotate(-5deg);
        }

        @media (max-width: 968px) {
          .container {
            grid-template-columns: 1fr;
            gap: 4rem;
            text-align: center;
            padding: 3rem 2rem;
          }

          .left-content {
            align-items: center;
          }

          .buttons {
            justify-content: center;
          }

          .social {
            justify-content: center;
          }

          .polaroid-stack {
            max-width: 400px;
            height: 500px;
          }
        }

        @media (max-width: 600px) {
          .container {
            padding: 2rem 1.5rem;
            gap: 3rem;
          }

          .unveiling,
          .rebrand {
            font-size: clamp(2.5rem, 10vw, 4rem);
          }
          
          .left-content {
            margin: 0 auto;
          }

          .buttons {
            flex-direction: column;
            gap: 3rem;
            width: 100%;
          }

          .social {
            margin: 0 auto;
          }

          .btn {
            width: 100%;
          }

          .polaroid-stack {
            max-width: 320px;
            height: 400px;
          }
        }
      `}</style>

      <section className="hero">
        <div className="container">
          <div className="left-content">
            <h1 className="title">
              <span className="unveiling">Unveiling Our</span>
              <span className="rebrand">Rebrand</span>
            </h1>

            <div className="buttons">
              <button className="btn">Keep Me Posted</button>
              <button className="btn">More Info</button>
            </div>

            <div className="social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <span className="divider">|</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <span className="divider">|</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="right-content">
            <div className="polaroid-stack">
              <Image
                src="/images/hero/header-image.png"
                alt="Polaroid photos"
                fill
                className="polaroid-image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section style={{
        width: '100%',
        padding: '2rem 0',
        display: 'flex',
        justifyContent: 'center',
        background: '#fff'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '1400px',
          width: '100%'
        }}>
          <div style={{
            width: '311px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FAF8F5'
          }}>
            <span style={{
              fontSize: '1.8rem',
              fontFamily: 'Georgia, serif',
              color: '#e8b4a8',
              letterSpacing: '0.2em',
              fontWeight: 300
            }}>HOBO</span>
          </div>
          
          <div style={{
            width: '311px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FBF3F0'
          }}>
            <span style={{
              fontSize: '1.4rem',
              fontFamily: 'Georgia, serif',
              color: '#e8b4a8',
              fontWeight: 300
            }}>
              Jennifer <span style={{ fontWeight: 400 }}>King</span>
            </span>
          </div>
          
          <div style={{
            width: '311px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F3EAE1'
          }}>
            <span style={{
              fontSize: '0.8rem',
              fontFamily: 'Arial, sans-serif',
              color: '#e8b4a8',
              letterSpacing: '0.2em', 
              textAlign: 'center',
              lineHeight: 1.5
            }}>FRENCH<br/>CONNECTION</span>
          </div>
          
          <div style={{
            width: '311px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEEBE4'
          }}>
            <span style={{
              fontSize: '1.6rem',
              fontFamily: 'Arial, sans-serif',
              color: '#e8b4a8',
              letterSpacing: '0.3em',
              fontWeight: 300
            }}>Z SUPPLY</span>
          </div>
        </div>
      </section>
    </>
  )
}
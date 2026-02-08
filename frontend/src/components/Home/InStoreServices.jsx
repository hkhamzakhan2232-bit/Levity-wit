'use client'

export default function InStoreServices() {
  return (
    <section className="in-store-services">
      <div className="container">
        <h2 className="title">In-Store Services</h2>
        
        <div className="services-grid">
          {/* Save time */}
          <div className="service-card">
            <div className="icon">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" stroke="#4a4a4a" strokeWidth="2.5"/>
                <circle cx="30" cy="30" r="3" fill="#4a4a4a"/>
                <line x1="30" y1="30" x2="30" y2="12" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="30" y1="30" x2="43" y2="30" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="30" y1="8" x2="30" y2="4" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="30" y1="56" x2="30" y2="52" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="52" y1="30" x2="56" y2="30" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="4" y1="30" x2="8" y2="30" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="service-title">Save time</h3>
            <p className="service-description">
              All of our staff are trained medical professionals who care about every patient.
            </p>
            <button className="strokeBtn">Learn More</button>
          </div>

          {/* Grow your business */}
          <div className="service-card">
            <div className="icon">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 52 L18 35 L28 42 L38 25 L48 32 L52 20" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <rect x="45" y="8" width="8" height="12" fill="#4a4a4a"/>
                <rect x="36" y="14" width="8" height="6" fill="#4a4a4a"/>
                <rect x="27" y="17" width="8" height="3" fill="#4a4a4a"/>
              </svg>
            </div>
            <h3 className="service-title">Grow your business</h3>
            <p className="service-description">
              The doctors at our clinic are experts in their fields, and give you top quality care.
            </p>
            <button className="strokeBtn">Learn More</button>
          </div>

          {/* Friendly support */}
          <div className="service-card">
            <div className="icon">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 35 C10 20, 15 15, 30 15 C45 15, 50 20, 50 35 C50 40, 48 44, 44 46 L44 52 L36 46 L30 46 C15 46, 10 42, 10 35 Z" stroke="#4a4a4a" strokeWidth="2.5" fill="none"/>
                <circle cx="20" cy="30" r="2.5" fill="#4a4a4a"/>
                <circle cx="30" cy="30" r="2.5" fill="#4a4a4a"/>
                <circle cx="40" cy="30" r="2.5" fill="#4a4a4a"/>
              </svg>
            </div>
            <h3 className="service-title">Friendly support</h3>
            <p className="service-description">
              We use cutting edge technologies and tools to ensure you get accurate results, quickly.
            </p>
            <button className="strokeBtn">Learn More</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .in-store-services {
          background: linear-gradient(to bottom, #e8d5d0 0%, #d4c4bf 100%);
          padding: 80px 20px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .title {
          font-family: 'Brush Script MT', cursive;
          font-size: 56px;
          text-align: center;
          color: #4a4a4a;
          margin-bottom: 60px;
          font-weight: normal;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .service-card {
          background: rgba(228, 189, 180, 0.5);
          border-radius: 8px;
          padding: 60px 40px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 30px;
        }

        .service-title {
          font-family: 'Brush Script MT', cursive;
          font-size: 32px;
          color: #4a4a4a;
          margin-bottom: 20px;
          font-weight: normal;
        }

        .service-description {
          font-size: 15px;
          color: #6a6a6a;
          line-height: 1.6;
          margin-bottom: 35px;
          font-weight: 300;
        }

        .learn-more-btn {
          background: transparent;
          border: 1.5px solid #4a4a4a;
          color: #4a4a4a;
          padding: 12px 40px;
          border-radius: 25px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 400;
        }

        .learn-more-btn:hover {
          background: rgba(74, 74, 74, 0.1);
        }

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
  inset: -12px;
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

        @media (max-width: 768px) {
          .title {
            font-size: 42px;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
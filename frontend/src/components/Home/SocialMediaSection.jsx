'use client';

export default function SocialMediaSection() {
  const socialButtons = [
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'Facebook', url: 'https://facebook.com' },
  { name: 'Pinterest', url: 'https://pinterest.com' },
  { name: 'Tiktok', url: 'https://tiktok.com' },
];

  return (
    <section className="social-media-section">
      <div className="container">
        <h2 className="title">Connect Us On Social Media</h2>

        {/* Images Grid */}
        <div>
          {/* Large left image */}
          <div className="image-large">
            <img src="/images/socialmedia/social-images.jpg" alt="Fashion showcase" />
          </div>
        </div>

        {/* Social Media Buttons */}
        <div className="social-buttons">
          {socialButtons.map((button) => (
            <a 
              key={button.name} 
              href={button.url} 
              className="strokeBtn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {button.name}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .social-media-section {
          background: #faf8f7;
          padding: 100px 20px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
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

        .title {
          font-family: 'Brush Script MT', cursive;
          font-size: 64px;
          text-align: center;
          color: #c9a9a0;
          margin-bottom: 80px;
          font-weight: normal;
        }

        .images-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 60px;
        }

        .image-large {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          overflow: hidden;
          background: #e8d5d0;
        }

        .image-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .images-column {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .image-medium {
          width: 100%;
          height: 50%;
          border-radius: 4px;
          overflow: hidden;
          background: #e8d5d0;
        }

        .image-medium img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-small-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          height: 50%;
        }

        .image-small {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          overflow: hidden;
          background: #e8d5d0;
        }

        .image-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .social-buttons {
          display: flex;
          justify-content: center;
          margin-top: 100px;
          gap: 5rem;
          flex-wrap: wrap;
        }

        .social-btn {
          background: transparent;
          border: 1.5px solid #4a4a4a;
          color: #4a4a4a;
          padding: 14px 50px;
          border-radius: 30px;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 400;
          text-decoration: none;
          display: inline-block;
        }

        .social-btn:hover {
          background: rgba(74, 74, 74, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .title {
            font-size: 52px;
            margin-bottom: 60px;
          }
        }

        @media (max-width: 768px) {
          .social-media-section {
            padding: 80px 20px;
          }

          .title {
            font-size: 42px;
            margin-bottom: 50px;
          }

          .images-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .image-large {
            height: 400px;
          }

          .image-medium {
            height: 300px;
          }

          .social-buttons {
            gap: 2rem;
          }

          .social-btn {
            padding: 12px 40px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 36px;
          }

          .social-buttons {
            flex-direction: column;
            align-items: center;
          }

          .social-btn {
            width: 100%;
            max-width: 300px;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
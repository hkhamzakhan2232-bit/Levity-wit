'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LatestNewsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        setItems(data.items || []);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="latest-news-section">
      <h2 className="section-title">Latest News</h2>

      <div className="news-grid">
        {(loading ? Array.from({ length: 4 }).map((_, i) => ({ id: i })) : items).map((item) => (
          <div key={item.id} className="news-card">
            <div className="news-image">
              {loading ? (
                <div className="skeleton" />
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
            {loading ? (
              <div className="news-content">
                <div className="line small" />
                <div className="line" />
                <div className="line" />
              </div>
            ) : (
              <div className="news-content">
                <p className="news-date">{item.date}</p>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-description">{item.description}</p>
                <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" className="read-more">
                  Continue Reading
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .latest-news-section {
          padding: 100px 20px;
          background: #fff;
          text-align: center;
        }

        .section-title {
          font-family: 'Brush Script MT', cursive;
          font-size: 48px;
          margin-bottom: 80px;
          color: #c9a9a0;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .news-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .news-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .skeleton {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #eee, #f5f5f5, #eee);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }
        .line {
          height: 14px;
          background: #f0f0f0;
          margin: 8px 0;
        }
        .line.small {
          width: 40%;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .news-date {
          font-size: 12px;
          color: #888;
          margin-bottom: 8px;
        }

        .news-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .news-description {
          font-size: 14px;
          color: #555;
          margin-bottom: 12px;
        }

        .read-more {
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          color: #000;
          border-bottom: 1px solid #000;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .news-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 36px;
            margin-bottom: 50px;
          }
        }
      `}</style>
    </section>
  );
}

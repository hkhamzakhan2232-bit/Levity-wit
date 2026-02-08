'use client';

import Image from 'next/image';

const newsItems = [
  {
    id: 1,
    date: '20 JULY, 2023',
    title: 'Volutpat Ac Tincidunt',
    description: 'Lacus luctus accumsan tortor posuere ac. Cursus risus at ultrices mi tempus imperdiet',
    image: '/images/news/news1.jpg',
  },
  {
    id: 2,
    date: '20 JULY, 2023',
    title: 'Lacus Luctus Accumsan',
    description: 'Leo duis ut diam quam nulla porttitor massa id. Urna molestie at elementum eu facilisis',
    image: '/images/news/news2.jpg',
  },
  {
    id: 3,
    date: '20 JULY, 2023',
    title: 'Suscipit Tellus Mauris',
    description: 'Nisl nunc mi ipsum faucibus vitae aliquet. Sem viverra aliquet eget sit amet.',
    image: '/images/news/news3.jpg',
  },
  {
    id: 4,
    date: '20 JULY, 2023',
    title: 'Lorem Donec Massa',
    description: 'Fames ac turpis egestas integer. Suscipit tellus mauris a diam maecenas sed.',
    image: '/images/news/news4.jpg',
  },
];

export default function LatestNewsSection() {
  return (
    <section className="latest-news-section">
      <h2 className="section-title">Latest News</h2>

      <div className="news-grid">
        {newsItems.map((item) => (
          <div key={item.id} className="news-card">
            <div className="news-image">
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="news-content">
              <p className="news-date">{item.date}</p>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>
              <a href="#" className="read-more">
                Continue Reading
              </a>
            </div>
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

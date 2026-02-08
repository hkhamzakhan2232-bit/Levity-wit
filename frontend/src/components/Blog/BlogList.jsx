'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function BlogList({ posts }) {
  const router = useRouter()

  if (!posts?.length) return <p>No posts found.</p>

  return (
    <div className="blog-posts-container">
      {posts.map(p => (
        <article key={p.slug} className="post-card">
          <div className="post-image-wrapper">
            <Image
              src={p.cover}
              alt={p.title}
              width={900}
              height={600}
              className="post-image"
            />
          </div>

          <div className="post-content">
            <time className="post-date">
              {new Date(p.date).toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </time>

            <h2 className="post-title">{p.title}</h2>

            <p className="post-excerpt">{p.excerpt}</p>

            <button
              className="strokeBtn"
              onClick={() => router.push(`/blog/${p.slug}`)}
              aria-label={`Read more about ${p.title}`}
              style={{ marginLeft: '30px' }}
            >
              READ MORE
            </button>
          </div>
        </article>
      ))}

      <style jsx>{`
        .blog-posts-container {
          flex: 1;
          width: 100%;
          max-width: 100%;
        }

        .strokeBtn {
  position: relative;
  background: transparent;
  border: none;
  padding: 16px 40px;
  font-size: 18px;
  cursor: pointer;
}

.strokeBtn::before {
  content: "";
  position: absolute;
  inset: -12px; /* gives that oversized oval look */
  border: 2px solid rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  transform: rotate(-6deg) scaleX(1.15);
  pointer-events: none;
}

.strokeBtn:hover::before {
  transform: rotate(2deg) scale(1.05);
  border-color: rgba(0, 0, 0, 0.6);
}

        .post-card {
          margin-bottom: 70px;
        }

        .post-card:last-child {
          margin-bottom: 0;
        }

        .post-image-wrapper {
          width: 100%;
          margin-bottom: 25px;
          overflow: hidden;
          border-radius: 2px;
        }

        .post-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .post-image-wrapper:hover .post-image {
          transform: scale(1.05);
        }

        .post-content {
          padding: 0;
          width: 100%;
        }

        .post-date {
          display: block;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: #999;
          margin-bottom: 12px;
          text-transform: uppercase;
          font-weight: 400;
        }

        .post-title {
          font-family: 'Dancing Script', cursive;
          font-size: 38px;
          font-weight: 400;
          color: #333;
          margin-bottom: 18px;
          line-height: 1.3;
          cursor: pointer;
          transition: color 0.3s ease;
          word-wrap: break-word;
        }

        .post-title:hover {
          color: #666;
        }

        .post-excerpt {
          font-size: 14px;
          line-height: 1.9;
          color: #666;
          margin-bottom: 28px;
          font-weight: 300;
        }

        .post-card :global(.strokeBtn) {
          font-size: 10px;
          letter-spacing: 2px;
          padding: 13px 22px;
          min-width: 130px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .post-title {
            font-size: 32px;
          }
        }

        /* Mobile Large */
        @media (max-width: 768px) {
          .blog-posts-container {
            padding: 0;
          }

          .post-card {
            margin-bottom: 50px;
          }

          .post-title {
            font-size: 28px;
          }

          .post-excerpt {
            font-size: 13px;
            line-height: 1.8;
          }

          .post-card :global(.strokeBtn) {
            font-size: 9px;
            padding: 11px 18px;
            min-width: 110px;
          }
        }

        /* Mobile Small */
        @media (max-width: 480px) {
          .post-card {
            margin-bottom: 40px;
          }

          .post-title {
            font-size: 24px;
            margin-bottom: 15px;
          }

          .post-date {
            font-size: 10px;
            margin-bottom: 10px;
          }

          .post-excerpt {
            font-size: 12px;
            line-height: 1.7;
            margin-bottom: 20px;
          }

          .post-card :global(.strokeBtn) {
            font-size: 9px;
            padding: 10px 16px;
            min-width: 100px;
            letter-spacing: 1.5px;
          }
        }
      `}</style>
    </div>
  )
}
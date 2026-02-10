'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaSearch, FaTwitter } from 'react-icons/fa'

export default function BlogSidebar({ categories, recent, tags, currentCategory }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [user, setUser] = useState(null)
  const [insta, setInsta] = useState([])

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) return
        const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'
        const res = await fetch(`${base}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        })
        if (!res.ok) return
        const data = await res.json()
        setUser(data.user)
      } catch (e) {
        // ignore
      }
    }
    fetchUser()
  }, [])
  
  useEffect(() => {
    async function fetchInsta() {
      try {
        const res = await fetch('/api/instagram')
        const data = await res.json()
        setInsta(data.items || [])
      } catch (e) {
        setInsta([])
      }
    }
    fetchInsta()
  }, [])

  function onSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (currentCategory) params.set('category', currentCategory)
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <aside className="sidebar">
      {/* Search Box */}
      <div className="search-box">
        <h3 className="sidebar-title">Search</h3>
        <form className="search-form" onSubmit={onSearch}>
          <input 
            type="text"
            placeholder="Search" 
            value={q} 
            onChange={e => setQ(e.target.value)} 
            className="search-input"
          />
          <button type="submit" aria-label="search" className="search-btn">
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Author Box */}
      <div className="author-box">
        <div className="author-avatar">
          <Image 
            src="/images/meet-beth/beth-portrait.jpg" 
            alt="Cristofer Vetrows" 
            width={80} 
            height={80}
            className="avatar-image"
          />
        </div>
        <div className="author-info">
          <h4 className="author-name">Cristofer Vetrows</h4>
          <p className="author-role">Fashion Blogger</p>
          <div className="author-social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
          {user && (
            <div className="user-box">
              <div className="user-line"><strong>User:</strong> {user.username}</div>
              <div className="user-line"><strong>Email:</strong> {user.email}</div>
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="sidebar-section categories">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="categories-list">
          {categories.map(c => (
            <li key={c.name} className="category-item">
              <Link href={`/blog?category=${encodeURIComponent(c.name)}`}>
                <span className={currentCategory?.toLowerCase() === c.name.toLowerCase() ? 'active' : ''}>
                  {c.name}
                </span>
                <span className="count">({c.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="sidebar-section recent-posts">
        <h3 className="sidebar-title">Recent Post</h3>
        <ul className="recent-list">
          {recent.map(r => (
            <li key={r.slug} className="recent-item">
              <Link href={`/blog/${r.slug}`} className="recent-link">
                <div className="recent-thumbnail">
                  <Image 
                    src={r.cover} 
                    alt={r.title} 
                    width={60} 
                    height={60}
                    className="recent-image"
                  />
                </div>
                <div className="recent-content">
                  <time className="recent-date">
                    {new Date(r.date).toLocaleDateString('en-US', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    }).toUpperCase()}
                  </time>
                  <h4 className="recent-title">{r.title}</h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="sidebar-section tags">
        <h3 className="sidebar-title">Tags</h3>
        <div className="tag-list">
          {tags.map(t => (
            <Link key={t} href={`/blog?q=${encodeURIComponent(t)}`} className="tag">
              {t}
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Banner Placeholder */}
      <div className="ad-banner">
        <div className="ad-content">
          <h3>Ads Banner</h3>
        </div>
      </div>

      {/* Instagram Section */}
      <InstagramGrid />

      <style jsx>{`
        .sidebar {
          width: 100%;
          max-width: 350px;
        }

        /* Search Box */
        .search-box {
          margin-bottom: 40px;
        }

        .sidebar-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
          text-transform: capitalize;
        }

        .search-form {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 100%;
          padding: 12px 45px 12px 15px;
          border: 1px solid #e5e5e5;
          font-size: 13px;
          color: #666;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          border-color: #ccc;
        }

        .search-input::placeholder {
          color: #999;
        }

        .search-btn {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #999;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .search-btn:hover {
          color: #333;
        }

        /* Author Box */
        .author-box {
          background: #f9f9f9;
          padding: 30px 20px;
          text-align: center;
          margin-bottom: 40px;
        }

        .author-avatar {
          margin-bottom: 15px;
        }

        .avatar-image {
          border-radius: 50%;
          width: 80px;
          height: 80px;
          object-fit: cover;
        }

        .author-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .author-role {
          font-size: 13px;
          color: #999;
          margin-bottom: 15px;
        }

        .author-social {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .author-social a {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          font-size: 12px;
          transition: color 0.3s ease;
        }

        .author-social a:hover {
          color: #666;
        }
        .user-box {
          margin-top: 12px;
          text-align: left;
          background: #fff;
          padding: 10px 12px;
          border: 1px solid #eee;
        }
        .user-line {
          font-size: 12px;
          color: #555;
          margin: 4px 0;
        }

        /* Categories */
        .sidebar-section {
          margin-bottom: 40px;
        }

        .categories-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .category-item {
          border-bottom: 1px solid #f0f0f0;
        }

        .category-item a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          font-size: 13px;
          color: #666;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .category-item a:hover {
          color: #333;
        }

        .category-item a span.active {
          color: #333;
          font-weight: 500;
        }

        .category-item .count {
          color: #999;
          font-size: 12px;
        }

        /* Recent Posts */
        .recent-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .recent-item {
          margin-bottom: 20px;
        }

        .recent-item:last-child {
          margin-bottom: 0;
        }

        .recent-link {
          display: flex;
          gap: 15px;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .recent-link:hover {
          opacity: 0.8;
        }

        .recent-thumbnail {
          flex-shrink: 0;
        }

        .recent-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
        }

        .recent-content {
          flex: 1;
        }

        .recent-date {
          display: block;
          font-size: 10px;
          color: #ff6b9d;
          margin-bottom: 5px;
          letter-spacing: 0.5px;
        }

        .recent-title {
          font-size: 13px;
          color: #333;
          line-height: 1.5;
          font-weight: 400;
          margin: 0;
        }

        /* Tags */
        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tag {
          display: inline-block;
          padding: 6px 14px;
          background: #f5f5f5;
          color: #666;
          font-size: 11px;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.3s ease;
          text-transform: lowercase;
          border: 3px solid black;
        }

        .tag:hover {
          background: #e5e5e5;
          color: #333;
        }

        /* Ad Banner */
        .ad-banner {
          background: #333;
          padding: 60px 20px;
          text-align: center;
          margin-bottom: 40px;
        }

        .ad-content h3 {
          color: #fff;
          font-size: 24px;
          font-style: italic;
          margin: 0;
        }

        /* Instagram Grid */
        .instagram-section {
          margin-bottom: 40px;
        }
        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 5px;
        }
        .insta-item {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          background: #f0f0f0;
        }
        .insta-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .sidebar {
            max-width: 300px;
          }
        }

        @media (max-width: 992px) {
          .sidebar {
            max-width: 100%;
            margin-top: 60px;
          }

          .instagram-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            margin-top: 50px;
          }

          .search-box,
          .author-box,
          .sidebar-section,
          .ad-banner {
            margin-bottom: 35px;
          }
        }

        @media (max-width: 480px) {
          .author-box {
            padding: 25px 15px;
          }

          .sidebar-title {
            font-size: 15px;
          }

          .instagram-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </aside>
  )
}

function InstagramGrid() {
  const [items, setItems] = useState([])
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/instagram')
        const data = await res.json()
        setItems(data.items || [])
      } catch {
        setItems([])
      }
    }
    load()
  }, [])
  return (
    <div className="sidebar-section instagram-section">
      <h3 className="sidebar-title">Instagram</h3>
      <div className="instagram-grid">
        {items.map(item => (
          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="insta-item">
            <img src={item.image} alt="Instagram item" />
          </a>
        ))}
      </div>
    </div>
  )
}

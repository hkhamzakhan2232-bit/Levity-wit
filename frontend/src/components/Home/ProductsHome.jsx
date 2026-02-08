'use client';

import { useEffect, useState } from 'react';

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState('New Arrival');
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabs = ['New Arrival', 'Clothing', 'Jewelry', 'Sunglasses'];

  const allProducts = [
    // Page 1
    { id: 1, name: 'V Neck T Shirt Dress', price: 299, image: '/images/products-home/product1.png' },
    { id: 2, name: 'LIDO SLUB MIDI - LAVENDAR', price: 299, image: '/images/products-home/product2.png' },
    { id: 3, name: 'Lex Triblend Dress', price: 299, image: '/images/products-home/product3.png' },
    { id: 4, name: 'LIDO SLUB WATERCOLOR', price: 299, image: '/images/products-home/product4.png' },
    
    // Page 2
    { id: 5, name: 'V Neck T Shirt Dress', price: 299, image: '/images/products-home/product1.png' },
    { id: 6, name: 'LIDO SLUB MIDI - LAVENDAR', price: 299, image: '/images/products-home/product2.png' },
    { id: 7, name: 'Lex Triblend Dress', price: 299, image: '/images/products-home/product3.png' },
    { id: 8, name: 'LIDO SLUB WATERCOLOR', price: 299, image: '/images/products-home/product4.png' },
    
    // Page 3
    { id: 9, name: 'V Neck T Shirt Dress', price: 299, image: '/images/products-home/product1.png' },
    { id: 10, name: 'LIDO SLUB MIDI - LAVENDAR', price: 299, image: '/images/products-home/product2.png' },
    { id: 11, name:'Lex Triblend Dress', price: 299, image: '/images/products-home/product3.png' },
    { id: 12, name:'LIDO SLUB WATERCOLOR', price: 299, image: '/images/products-home/product4.png' },
    
    // Page 4
    { id: 13, name: 'V Neck T Shirt Dress', price: 299, image: '/images/products-home/product1.png' },
    { id: 14, name:'LIDO SLUB MIDI - LAVENDAR', price: 299, image: '/images/products-home/product2.png' },
    { id: 15, name: 'Lex Triblend Dress', price: 299, image: '/images/products-home/product3.png' },
    { id: 16, name: 'LIDO SLUB WATERCOLOR', price: 299, image: '/images/products-home/product4.png' },
    
    // Page 5
    { id: 17, name: 'V Neck T Shirt Dress', price: 299, image: '/images/products-home/product1.png' },
    { id: 18, name: 'LIDO SLUB MIDI - LAVENDAR', price: 299, image: '/images/products-home/product2.png' },
    { id: 19, name: 'Lex Triblend Dress', price: 299, image: '/images/products-home/product3.png' },
    { id: 20, name: 'LIDO SLUB WATERCOLOR', price: 299, image: '/images/products-home/product4.png' },
    
    // Page 6
    { id: 21, name: 'V Neck T Shirt Dress', price: 299, image: '/images/products-home/product1.png' },
    { id: 22, name: 'LIDO SLUB MIDI - LAVENDAR', price: 299, image: '/images/products-home/product2.png' },
    { id: 23, name: 'Lex Triblend Dress', price: 299, image: '/images/products-home/product3.png' },
    { id: 24, name: 'LIDO SLUB WATERCOLOR', price: 299, image: '/images/products-home/product4.png' },
  ];

  const productsPerPage = 4;
  const totalSlides = Math.ceil(allProducts.length / productsPerPage);

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle all products on mount, tab change, or visibility change
  const [shuffledAllProducts, setShuffledAllProducts] = useState([]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setShuffledAllProducts(shuffleArray(allProducts));
      }
    };

    // Initial shuffle
    setShuffledAllProducts(shuffleArray(allProducts));

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Shuffle when tab changes
  useEffect(() => {
    setShuffledAllProducts(shuffleArray(allProducts));
    setCurrentSlide(0); // Reset to first page when tab changes
  }, [activeTab]);

  // Get current page products
  const startIndex = currentSlide * productsPerPage;
  const currentProducts = shuffledAllProducts.slice(startIndex, startIndex + productsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="products-section">
      <div className="container">
        <h2 className="title">Products</h2>

        {/* Tabs */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="divider"></div>

        {/* Products Grid */}
        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="carousel-controls">
          <button className="arrow-btn" onClick={prevSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#c9a9a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="dots">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          <button className="arrow-btn" onClick={nextSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#c9a9a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .products-section {
          background: #faf8f7;
          padding: 80px 20px 100px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .title {
          font-family: 'Brush Script MT', cursive;
          font-size: 64px;
          text-align: center;
          color: #c9a9a0;
          margin-bottom: 50px;
          font-weight: normal;
        }

        .tabs {
          display: flex;
          justify-content: center;
          gap: 50px;
          margin-bottom: 30px;
        }

        .tab {
          background: none;
          border: none;
          font-size: 16px;
          color: #a8a8a8;
          cursor: pointer;
          padding: 10px 0;
          transition: color 0.3s ease;
          position: relative;
          font-weight: 400;
        }

        .tab.active {
          color: #c9a9a0;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #c9a9a0;
        }

        .tab:hover {
          color: #c9a9a0;
        }

        .divider {
          width: 100%;
          max-width: 800px;
          height: 1px;
          background: #e0d5d0;
          margin: 0 auto 60px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 50px;
        }

        .product-card {
          text-align: left;
        }

        .product-image {
          width: 100%;
          aspect-ratio: 3/4;
          background: #f5f0ed;
          margin-bottom: 20px;
          overflow: hidden;
          border-radius: 4px;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-name {
          font-size: 16px;
          color: #4a4a4a;
          margin-bottom: 10px;
          font-weight: 400;
        }

        .product-price {
          font-size: 16px;
          color: #c9a9a0;
          font-weight: 400;
        }

        .carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
        }

        .arrow-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }

        .arrow-btn:hover {
          opacity: 0.7;
        }

        .dots {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e0d5d0;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s ease;
        }

        .dot.active {
          background: #c9a9a0;
        }

        .dot:hover {
          background: #c9a9a0;
        }

        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 48px;
          }

          .tabs {
            gap: 25px;
            flex-wrap: wrap;
          }

          .tab {
            font-size: 14px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .product-name {
            font-size: 14px;
          }

          .product-price {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
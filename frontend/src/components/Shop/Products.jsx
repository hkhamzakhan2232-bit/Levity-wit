'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

// Helper function to create URL-friendly slugs
function createSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// All products data - EXPANDED with more products in each category
const allProducts = [
  // Dresses
  { id: 1, name: "Amalfi Slub Dip-Dye", price: 68.00, image: "/images/shop-products/product1.png", category: "Dresses" },
  { id: 2, name: "Nicola Crinkle Tier", price: 78.00, image: "/images/shop-products/product3.png", category: "Dresses" },
  { id: 3, name: "Silk Evening Dress", price: 120.00, image: "/images/shop-products/product2.png", category: "Dresses" },
  { id: 4, name: "Casual Cotton Dress", price: 55.00, image: "/images/shop-products/product3.png", category: "Dresses" },
  { id: 5, name: "Beach Dress", price: 62.00, image: "/images/shop-products/product1.png", category: "Dresses" },
  { id: 6, name: "Maxi Dress", price: 85.00, image: "/images/shop-products/product3.png", category: "Dresses" },
  { id: 7, name: "Floral Print Dress", price: 72.00, image: "/images/shop-products/product1.png", category: "Dresses" },
  { id: 8, name: "Cocktail Dress", price: 98.00, image: "/images/shop-products/product3.png", category: "Dresses" },
  { id: 9, name: "Wrap Dress", price: 65.00, image: "/images/shop-products/product1.png", category: "Dresses" },
  { id: 10, name: "Summer Sundress", price: 58.00, image: "/images/shop-products/product2.png", category: "Dresses" },
  { id: 11, name: "Bodycon Dress", price: 75.00, image: "/images/shop-products/product3.png", category: "Dresses" },
  { id: 12, name: "A-Line Dress", price: 82.00, image: "/images/shop-products/product1.png", category: "Dresses" },
  { id: 13, name: "Vintage Midi Dress", price: 92.00, image: "/images/shop-products/product2.png", category: "Dresses" },
  
  // Tops
  { id: 14, name: "Varley Triblend", price: 88.00, image: "/images/shop-products/product2.png", category: "Tops" },
  { id: 15, name: "Summer Tank Top", price: 45.00, image: "/images/shop-products/product1.png", category: "Tops" },
  { id: 16, name: "Crop Top", price: 38.00, image: "/images/shop-products/product2.png", category: "Tops" },
  { id: 17, name: "Oversized Tee", price: 42.00, image: "/images/shop-products/product2.png", category: "Tops" },
  { id: 18, name: "Button Down Shirt", price: 52.00, image: "/images/shop-products/product2.png", category: "Tops" },
  { id: 19, name: "Silk Blouse", price: 95.00, image: "/images/shop-products/product1.png", category: "Tops" },
  { id: 20, name: "Striped Tee", price: 35.00, image: "/images/shop-products/product2.png", category: "Tops" },
  { id: 21, name: "V-Neck Sweater", price: 68.00, image: "/images/shop-products/product1.png", category: "Tops" },
  { id: 22, name: "Polo Shirt", price: 48.00, image: "/images/shop-products/product2.png", category: "Tops" },
  { id: 23, name: "Graphic Tee", price: 32.00, image: "/images/shop-products/product1.png", category: "Tops" },
  
  // Bottoms
  { id: 24, name: "Denim Jeans", price: 75.00, image: "/images/shop-products/product1.png", category: "Bottoms" },
  { id: 25, name: "Wide Leg Pants", price: 70.00, image: "/images/shop-products/product1.png", category: "Bottoms" },
  { id: 26, name: "High Waist Shorts", price: 48.00, image: "/images/shop-products/product1.png", category: "Bottoms" },
  { id: 27, name: "Midi Skirt", price: 58.00, image: "/images/shop-products/product3.png", category: "Bottoms" },
  { id: 28, name: "Pleated Trousers", price: 85.00, image: "/images/shop-products/product2.png", category: "Bottoms" },
  { id: 29, name: "Cargo Pants", price: 65.00, image: "/images/shop-products/product1.png", category: "Bottoms" },
  { id: 30, name: "Mini Skirt", price: 45.00, image: "/images/shop-products/product3.png", category: "Bottoms" },
  { id: 31, name: "Leather Pants", price: 125.00, image: "/images/shop-products/product2.png", category: "Bottoms" },
  { id: 32, name: "Joggers", price: 55.00, image: "/images/shop-products/product1.png", category: "Bottoms" },
  
  // Jewelry
  { id: 33, name: "Gold Necklace", price: 150.00, image: "/images/shop-products/product2.png", category: "Jewelry" },
  { id: 34, name: "Pearl Earrings", price: 130.00, image: "/images/shop-products/product2.png", category: "Jewelry" },
  { id: 35, name: "Diamond Ring", price: 250.00, image: "/images/shop-products/product2.png", category: "Jewelry" },
  { id: 36, name: "Silver Bracelet", price: 95.00, image: "/images/shop-products/product3.png", category: "Jewelry" },
  { id: 37, name: "Charm Necklace", price: 110.00, image: "/images/shop-products/product1.png", category: "Jewelry" },
  { id: 38, name: "Hoop Earrings", price: 75.00, image: "/images/shop-products/product2.png", category: "Jewelry" },
  { id: 39, name: "Anklet Set", price: 45.00, image: "/images/shop-products/product3.png", category: "Jewelry" },
  { id: 40, name: "Statement Ring", price: 180.00, image: "/images/shop-products/product1.png", category: "Jewelry" },
  { id: 41, name: "Layered Necklace", price: 120.00, image: "/images/shop-products/product2.png", category: "Jewelry" },
  { id: 42, name: "Stud Earrings", price: 65.00, image: "/images/shop-products/product3.png", category: "Jewelry" },
  { id: 43, name: "Tennis Bracelet", price: 220.00, image: "/images/shop-products/product1.png", category: "Jewelry" },
  { id: 44, name: "Pendant Necklace", price: 98.00, image: "/images/shop-products/product2.png", category: "Jewelry" },
  
  // Sun Glasses
  { id: 45, name: "Designer Sunglasses", price: 95.00, image: "/images/shop-products/product3.png", category: "Sun Glasses" },
  { id: 46, name: "Aviator Sunglasses", price: 110.00, image: "/images/shop-products/product3.png", category: "Sun Glasses" },
  { id: 47, name: "Cat Eye Sunglasses", price: 88.00, image: "/images/shop-products/product3.png", category: "Sun Glasses" },
  { id: 48, name: "Round Frame Sunglasses", price: 78.00, image: "/images/shop-products/product2.png", category: "Sun Glasses" },
  { id: 49, name: "Oversized Sunglasses", price: 105.00, image: "/images/shop-products/product1.png", category: "Sun Glasses" },
  { id: 50, name: "Sport Sunglasses", price: 85.00, image: "/images/shop-products/product3.png", category: "Sun Glasses" },
  { id: 51, name: "Retro Sunglasses", price: 92.00, image: "/images/shop-products/product2.png", category: "Sun Glasses" },
  { id: 52, name: "Polarized Sunglasses", price: 125.00, image: "/images/shop-products/product1.png", category: "Sun Glasses" },
  { id: 53, name: "Mirrored Sunglasses", price: 98.00, image: "/images/shop-products/product3.png", category: "Sun Glasses" },
  { id: 54, name: "Wayfarer Sunglasses", price: 115.00, image: "/images/shop-products/product2.png", category: "Sun Glasses" },
];

const ITEMS_PER_PAGE = 12;

export default function ShopPage() {
  // Product Grid State
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');

  // Filter State
  const [priceRange, setPriceRange] = useState([0, 5999]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 5999]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const categories = [
    { name: 'All', count: allProducts.length },
    { name: 'Clothing', count: allProducts.filter(p => ['Dresses', 'Tops', 'Bottoms'].includes(p.category)).length },
    { name: 'Jewelry', count: allProducts.filter(p => p.category === 'Jewelry').length },
    { name: 'Sun Glasses', count: allProducts.filter(p => p.category === 'Sun Glasses').length },
    { name: 'Dresses', count: allProducts.filter(p => p.category === 'Dresses').length },
    { name: 'Tops', count: allProducts.filter(p => p.category === 'Tops').length },
    { name: 'Bottoms', count: allProducts.filter(p => p.category === 'Bottoms').length },
  ];

  const tags = ['store', 'online', 'clothing', 'color', 'trend', 'curly'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Clothing') {
        filtered = filtered.filter(p => ['Dresses', 'Tops', 'Bottoms'].includes(p.category));
      } else {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
    }

    // Apply price filter
    filtered = filtered.filter(p => 
      p.price >= appliedPriceRange[0] && p.price <= appliedPriceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // latest - keep original order
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, appliedPriceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page
  };

  const handlePriceFilter = () => {
    setAppliedPriceRange(priceRange);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert('Newsletter subscription: ' + email);
    setEmail('');
  };

  return (
    <div className="shop-container">
      {/* Main Content Area */}
      <div className="shop-content">
        {/* Products Section */}
        <div className="products-section">
          {/* Header */}
          <div className="products-header">
            <div className="results-count">
              Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredProducts.length)} Of {filteredProducts.length} Results
            </div>
            <div className="sort-dropdown">
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Sort By Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Link 
                  href={`/products/${createSlug(product.name)}`}
                  key={product.id} 
                  className="product-card"
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">$ {product.price.toFixed(2)}</p>
                </Link>
              ))
            ) : (
              <div className="no-results">
                <p>No products found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-arrow"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                  <path d="M10 2L2 10L10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button 
                className="pagination-arrow"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                  <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Search */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">Search</h2>
            <form onSubmit={handleSearch} className="search-box">
              <input 
                type="text" 
                placeholder="Search" 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">Categories</h2>
            <ul className="category-list">
              {categories.map((category) => (
                <li key={category.name}>
                  <button 
                    className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    <span>{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">Price Filter</h2>
            <div className="price-filter">
              <input 
                type="range" 
                min="0" 
                max="5999" 
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
              <div className="price-range">
                <span>$ {priceRange[0]}</span>
                <span>$ {priceRange[1]}</span>
              </div>
              <button className="filter-button" onClick={handlePriceFilter}>FILTER</button>
            </div>
          </div>

          {/* Tags */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">Tags</h2>
            <div className="tags-container">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="tag-button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">Newsletter</h2>
            <form onSubmit={handleEmailSubmit} className="newsletter-form">
              <div className="email-input-wrapper">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                  required
                />
                <button type="submit" className="email-submit">
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path d="M1 8H19M19 8L12 1M19 8L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Ads Banner */}
          <div className="sidebar-section">
            <div className="ads-banner">
              <img src="/ads-banner.jpg" alt="Ads Banner" />
              <div className="ads-overlay">
                <span className="ads-text">Ads Banner</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <style jsx>
        {`
/* Main Container */
.shop-container {
  width: 100%;
  background-color: #f5f5f5;
  padding: 40px 60px;
}

.shop-content {
  display: flex;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Products Section */
.products-section {
  flex: 1;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.results-count {
  font-size: 16px;
  color: #000;
  font-weight: 400;
}

.sort-dropdown {
  position: relative;
}

.sort-select {
  font-size: 16px;
  color: #000;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding-right: 20px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23000' d='M1.41 0L6 4.59L10.59 0L12 1.41l-6 6l-6-6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right center;
  outline: none;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
  min-height: 400px;
}

.product-card {
  background-color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: #e8e4e0;
  margin-bottom: 20px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  font-size: 18px;
  font-weight: 400;
  color: #000;
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.product-price {
  font-size: 16px;
  color: #c9a58c;
  margin: 0;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #666;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 40px 0;
}

.pagination-arrow,
.pagination-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #d0d0d0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 24px;
  font-weight: 300;
  color: #000;
}

.pagination-arrow {
  color: #999;
}

.pagination-arrow:hover:not(:disabled) {
  border-color: #999;
  background-color: #f8f8f8;
}

.pagination-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-arrow svg {
  width: 12px;
  height: 20px;
}

.pagination-number:hover {
  border-color: #d4a5a5;
  transform: scale(1.05);
}

.pagination-number.active {
  background-color: #d4a5a5;
  border-color: #d4a5a5;
  color: white;
}

/* Sidebar */
.sidebar {
  width: 320px;
  background-color: #f8f8f8;
  padding: 30px 25px;
  height: fit-content;
  flex-shrink: 0;
}

.sidebar-section {
  margin-bottom: 50px;
}

.sidebar-title {
  font-family: 'Brush Script MT', cursive;
  font-size: 32px;
  font-weight: 400;
  color: #000;
  margin: 0 0 20px 0;
  font-style: italic;
}

/* Search */
.search-box {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

.search-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Categories */
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: color 0.2s;
}

.category-item:hover,
.category-item.active {
  color: #000;
  font-weight: 500;
}

.category-count {
  color: #999;
  font-size: 13px;
}

/* Price Filter */
.price-filter {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.price-slider {
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #d4a5a5 0%, #d4a5a5 100%);
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 2px;
}

.price-slider:hover {
  opacity: 1;
}

.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #d4a5a5;
  cursor: pointer;
  border-radius: 50%;
}

.price-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #d4a5a5;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}

.price-range {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.filter-button {
  padding: 12px 0;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  transition: background-color 0.2s;
}

.filter-button:hover {
  background-color: #333;
}

/* Tags */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-button {
  padding: 8px 20px;
  border: 1px solid #ddd;
  background-color: white;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 20px;
}

.tag-button:hover {
  border-color: #000;
  color: #000;
  background-color: #f5f5f5;
}

/* Newsletter */
.newsletter-form {
  width: 100%;
}

.email-input-wrapper {
  position: relative;
  width: 100%;
}

.email-input {
  width: 100%;
  padding: 12px 50px 12px 15px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
  outline: none;
}

.email-input::placeholder {
  color: #999;
}

.email-submit {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.email-submit:hover {
  color: #000;
}

/* Ads Banner */
.ads-banner {
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #2d5016 0%, #1a3a0a 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ads-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

.ads-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.ads-text {
  font-family: 'Brush Script MT', cursive;
  font-size: 36px;
  color: white;
  font-style: italic;
  text-align: center;
}

/* Responsive */
@media (max-width: 1200px) {
  .shop-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    order: -1;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .shop-container {
    padding: 20px;
  }

  .products-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .product-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .pagination-arrow,
  .pagination-number {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }

  .pagination {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .shop-container {
    padding: 12px;
  }
  .shop-content {
    gap: 20px;
  }
  .products-header {
    gap: 10px;
  }
  .results-count {
    font-size: 14px;
  }
  .sort-select {
    font-size: 14px;
  }
  .product-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }
  .product-name {
    font-size: 16px;
  }
  .product-price {
    font-size: 15px;
  }
  .pagination-number,
  .pagination-arrow {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  .sidebar {
    padding: 20px 16px;
  }
  .sidebar-title {
    font-size: 28px;
  }
  .category-item {
    font-size: 13px;
  }
  .email-input {
    padding: 12px 44px 12px 12px;
  }
}
        `}
      </style>
    </div>
  );
}

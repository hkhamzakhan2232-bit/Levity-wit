'use client';

import { useCart } from '@/app/context/CartContext';
import { allProducts, createSlug, getProductBySlug } from '@/lib/products-data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetailsPage({ slug }) {
  const router = useRouter();
  const { addToCart } = useCart();
  
  // Find product by slug
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug);
      setProduct(foundProduct);
      setLoading(false);
    }
  }, [slug]);

  // State
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Review form state
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5,
    saveInfo: false
  });

  // Related products
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Load reviews from localStorage
  useEffect(() => {
    if (product) {
      const storageKey = `reviews_${product.id}`;
      const storedReviews = localStorage.getItem(storageKey);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        // Set default review
        setReviews([{
          name: 'Leslie Alexander',
          email: 'leslie@example.com',
          comment: 'Ornare arcu odio ut sem nulla pharetra diam. Sit amet nisl suscipit adipiscing bibendum est ultricies.',
          rating: 5,
          date: 'Jan 20,2023',
          avatar: '/images/avatar.jpg'
        }]);
      }

      // Generate random related products (exclude current product)
      const otherProducts = allProducts.filter(p => p.id !== product.id);
      const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);
      setRelatedProducts(shuffled.slice(0, 4));
    }
  }, [product]);

  // Mock images for the gallery
  const productImages = product ? [
    product.image,
    "/images/shop-products/product1.png",
    "/images/shop-products/product3.png",
    "/images/shop-products/product2.png",
  ] : [];

  const sizes = ['S', 'M', 'L', 'XL'];

  // Show loading
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 20px;
          }
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #333;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loading-container p {
            color: #666;
            font-size: 16px;
          }
        `}</style>
      </div>
    );
  }

  // Show not found
  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={() => router.push('/shop')} className="back-button">
          Back to Shop
        </button>
        <style jsx>{`
          .not-found {
            text-align: center;
            padding: 100px 20px;
            max-width: 600px;
            margin: 0 auto;
          }
          .not-found h1 {
            font-size: 32px;
            margin-bottom: 20px;
            color: #000;
          }
          .not-found p {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
          }
          .back-button {
            padding: 12px 30px;
            background-color: #000;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s;
          }
          .back-button:hover {
            background-color: #333;
          }
        `}</style>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    
    // Show success message
    const message = `Added ${quantity} × ${product.name} (Size: ${selectedSize}) to cart`;
    alert(message);
    
    // Optionally redirect to cart or reset quantity
    // router.push('/cart');
    setQuantity(1);
  };

  const handleAddToWishlist = () => {
    alert(`Added ${product.name} to wishlist`);
  };

  const handleAddToCompare = () => {
    alert(`Added ${product.name} to compare`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!reviewForm.name || !reviewForm.email || !reviewForm.comment) {
      alert('Please fill in all required fields');
      return;
    }

    const newReview = {
      name: reviewForm.name,
      email: reviewForm.email,
      comment: reviewForm.comment,
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: '/images/avatar.jpg'
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    // Save to localStorage
    const storageKey = `reviews_${product.id}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedReviews));

    // Save user info if checkbox is checked
    if (reviewForm.saveInfo) {
      localStorage.setItem('reviewUserInfo', JSON.stringify({
        name: reviewForm.name,
        email: reviewForm.email
      }));
    }

    // Reset form
    setReviewForm({
      name: '',
      email: '',
      comment: '',
      rating: 5,
      saveInfo: false
    });

    alert('Review submitted successfully!');
  };

  const handleReviewInputChange = (field, value) => {
    setReviewForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => router.push('/')} className="breadcrumb-link">Home</button>
        <span className="breadcrumb-separator">&gt;</span>
        <button onClick={() => router.push('/shop')} className="breadcrumb-link">Products</button>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-current">{product.category}</span>
      </div>

      {/* Product Hero Section */}
      <div className="product-hero">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="thumbnail-column">
            {productImages.map((img, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </button>
            ))}
          </div>
          <div className="main-image">
            <img src={productImages[selectedImage]} alt={product.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">$ {product.price.toFixed(2)}</p>
          
          <p className="product-description">{product.description}</p>

          {/* Size Selector */}
          <div className="size-section">
            <label className="size-label">Size:</label>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="cart-section">
            <div className="quantity-selector">
              <button 
                className="quantity-button"
                onClick={() => handleQuantityChange(-1)}
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-button"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-button" onClick={handleAddToWishlist}>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path d="M10 17.5L8.675 16.3C3.4 11.56 0 8.52 0 4.8C0 2.04 2.04 0 4.8 0C6.32 0 7.78 0.74 10 2.24C12.22 0.74 13.68 0 15.2 0C17.96 0 20 2.04 20 4.8C20 8.52 16.6 11.56 11.325 16.3L10 17.5Z" fill="currentColor"/>
              </svg>
              Add To Wishlist
            </button>
            <button className="action-button" onClick={handleAddToCompare}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H17C18.1 21 19 20.1 19 19V5C19 3.9 18.1 3 17 3ZM17 19H3V5H17V19ZM5 7H15V9H5V7ZM5 11H15V13H5V11ZM5 15H11V17H5V15Z" fill="currentColor"/>
              </svg>
              Add To Compare
            </button>
            <div className="stock-status">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="#4CAF50" strokeWidth="2"/>
                <path d="M6 9L8 11L12 7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              In Stock
            </div>
          </div>

          {/* Product Meta */}
          <div className="product-meta">
            <div className="meta-row">
              <span className="meta-label">SKU REF:</span>
              <span className="meta-value">{product.sku}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Categories:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Tags:</span>
              <span className="meta-value">{product.tags.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
        </div>
        <div className="tabs-content">
          {activeTab === 'description' && (
            <div className="tab-panel description-panel">
              <div className="description-with-video">
                <div className="description-text">
                  <h3>• Mattis Pellentesque Id</h3>
                  <p>Nec sagittis aliquam malesuada bibendum arcu vitae elementum. Augue ut lectus arcu bibendum at varius vel pharetra. Viverra suspendisse potenti nullam ac tortor. Urna porttitor rhoncus dolor purus non enim. At risus viverra</p>
                  
                  <h3>• Sed Viverra Tellus</h3>
                  <p>Nec sagittis aliquam malesuada bibendum arcu vitae elementum. Augue ut lectus arcu bibendum at varius vel pharetra</p>
                </div>
                <div className="video-placeholder">
                  <img src="/images/shop-products/product1.png" alt="Product video" />
                  <button className="play-button">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="29" stroke="white" strokeWidth="2"/>
                      <path d="M24 20L40 30L24 40V20Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-panel reviews-panel">
              <h3 className="reviews-count">{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</h3>
              
              {/* Reviews List */}
              <div className="reviews-list">
                {reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          <Image
                           src={review.avatar || '/images/profile.jpg'}
                           alt={review.name}
                           fill
                          />
                        </div>
                        <div className="reviewer-details">
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                            ))}
                          </div>
                          <div className="reviewer-name-date">
                            <span className="reviewer-name">{review.name}</span>
                            <span className="review-date">— {review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="add-review-section">
                <h3 className="add-review-title">Add a Review</h3>
                <form onSubmit={handleReviewSubmit} className="review-form">
                  <textarea
                    className="review-textarea"
                    placeholder="Your Comment Here..."
                    value={reviewForm.comment}
                    onChange={(e) => handleReviewInputChange('comment', e.target.value)}
                    required
                  />
                  <div className="form-row">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Name (Required)"
                      value={reviewForm.name}
                      onChange={(e) => handleReviewInputChange('name', e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Email Address"
                      value={reviewForm.email}
                      onChange={(e) => handleReviewInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={reviewForm.saveInfo}
                        onChange={(e) => handleReviewInputChange('saveInfo', e.target.checked)}
                      />
                      <span>Save my name, email, and website in this browser for the next time I comment.</span>
                    </label>
                  </div>
                  <button type="submit" className="submit-review-btn">Post</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2 className="related-title">Related Products</h2>
        <div className="related-grid">
          {relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct.id}
              href={`/products/${createSlug(relatedProduct.name)}`}
              className="related-product-card"
            >
              <div className="related-product-image">
                <img src={relatedProduct.image} alt={relatedProduct.name} />
              </div>
              <h3 className="related-product-name">{relatedProduct.name}</h3>
              <p className="related-product-price">$ {relatedProduct.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Keep all existing styles from the original component */}
      <style jsx>{`
/* Main Container */
.product-details-page {
  width: 100%;
  background-color: #ffffff;
  padding: 40px 60px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  font-size: 14px;
}

.breadcrumb-link {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #000;
}

.breadcrumb-separator {
  color: #999;
}

.breadcrumb-current {
  color: #000;
  font-weight: 500;
}

/* Product Hero */
.product-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-bottom: 80px;
}

/* Image Gallery */
.product-gallery {
  display: flex;
  gap: 20px;
}

.thumbnail-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.thumbnail {
  width: 135px;
  height: 180px;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  transition: border-color 0.2s;
}

.thumbnail.active {
  border-color: #d4a5a5;
}

.thumbnail:hover {
  border-color: #e0e0e0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-image {
  flex: 1;
  aspect-ratio: 3/4;
  background-color: #f5f5f5;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.product-title {
  font-size: 42px;
  font-weight: 400;
  color: #000;
  margin: 0;
  line-height: 1.2;
}

.product-price {
  font-size: 28px;
  color: #c9a58c;
  margin: 0;
  font-weight: 400;
}

.product-description {
  font-size: 15px;
  color: #666;
  line-height: 1.7;
  margin: 0;
}

/* Size Section */
.size-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.size-label {
  font-size: 15px;
  color: #000;
  font-weight: 500;
}

.size-options {
  display: flex;
  gap: 10px;
}

.size-button {
  width: 60px;
  height: 45px;
  border: 1px solid #ddd;
  background-color: white;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
}

.size-button:hover {
  border-color: #999;
}

.size-button.active {
  background-color: #d4a5a5;
  border-color: #d4a5a5;
  color: white;
}

/* Cart Section */
.cart-section {
  display: flex;
  gap: 15px;
  align-items: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
}

.quantity-button {
  width: 45px;
  height: 45px;
  border: none;
  background-color: white;
  color: #666;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.quantity-button:hover {
  background-color: #f5f5f5;
}

.quantity-value {
  width: 60px;
  text-align: center;
  font-size: 16px;
  color: #000;
}

.add-to-cart-button {
  flex: 1;
  height: 48px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: background-color 0.2s;
  border-radius: 4px;
}

.add-to-cart-button:hover {
  background-color: #333;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;
}

.action-button:hover {
  color: #000;
}

.action-button svg {
  width: 18px;
  height: 18px;
}

.stock-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4CAF50;
  font-size: 13px;
  font-weight: 500;
}

.stock-status svg {
  width: 18px;
  height: 18px;
}

/* Product Meta */
.product-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.meta-row {
  display: flex;
  gap: 10px;
  font-size: 14px;
}

.meta-label {
  color: #000;
  font-weight: 600;
  min-width: 100px;
}

.meta-value {
  color: #666;
}

/* Tabs */
.product-tabs {
  border-top: 1px solid #e0e0e0;
  padding-top: 40px;
  margin-bottom: 80px;
}

.tabs-header {
  display: flex;
  gap: 40px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 50px;
  justify-content: center;
}

.tab-button {
  background: none;
  border: none;
  padding: 15px 0;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
  font-family: 'Brush Script MT', cursive;
  font-style: italic;
}

.tab-button:hover {
  color: #999;
}

.tab-button.active {
  color: #000;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #000;
}

.tab-panel {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
}

/* Description Panel */
.description-panel {
  max-width: 1200px;
  margin: 0 auto;
}

.description-with-video {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.description-text h3 {
  font-size: 20px;
  color: #000;
  margin: 0 0 15px 0;
  font-weight: 400;
}

.description-text p {
  margin: 0 0 30px 0;
  color: #666;
  line-height: 1.7;
}

.video-placeholder {
  position: relative;
  aspect-ratio: 16/10;
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 8px;
}

.video-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

/* Reviews Panel */
.reviews-panel {
  max-width: 1000px;
  margin: 0 auto;
}

.reviews-count {
  font-size: 24px;
  color: #000;
  margin: 0 0 40px 0;
  font-weight: 400;
}

.reviews-list {
  margin-bottom: 60px;
}

.review-item {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #f0f0f0;
}

.review-item:last-child {
  border-bottom: none;
}

.review-header {
  margin-bottom: 15px;
}

.reviewer-info {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.reviewer-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.reviewer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reviewer-details {
  flex: 1;
}

.review-rating {
  margin-bottom: 8px;
}

.star {
  color: #ddd;
  font-size: 18px;
  margin-right: 2px;
}

.star.filled {
  color: #d4a5a5;
}

.reviewer-name-date {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 15px;
}

.reviewer-name {
  color: #000;
  font-weight: 500;
}

.review-date {
  color: #999;
}

.review-comment {
  margin: 0;
  color: #666;
  line-height: 1.7;
  font-size: 15px;
}

/* Add Review Form */
.add-review-section {
  margin-top: 60px;
}

.add-review-title {
  font-size: 24px;
  color: #000;
  margin: 0 0 30px 0;
  font-weight: 400;
  font-family: 'Brush Script MT', cursive;
  font-style: italic;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-textarea {
  width: 100%;
  min-height: 200px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
}

.review-textarea::placeholder {
  color: #999;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-input {
  padding: 15px 20px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  outline: none;
}

.form-input::placeholder {
  color: #999;
}

.form-checkbox {
  display: flex;
  align-items: flex-start;
}

.form-checkbox label {
  display: flex;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.form-checkbox input[type="checkbox"] {
  margin-top: 2px;
  flex-shrink: 0;
  cursor: pointer;
}

.submit-review-btn {
  width: 150px;
  padding: 15px 0;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  transition: background-color 0.2s;
  border-radius: 25px;
}

.submit-review-btn:hover {
  background-color: #333;
}

/* Related Products */
.related-products {
  margin-top: 80px;
  padding-top: 60px;
  border-top: 1px solid #e0e0e0;
}

.related-title {
  font-size: 36px;
  text-align: center;
  margin: 0 0 60px 0;
  font-weight: 400;
  color: #000;
  font-family: 'Brush Script MT', cursive;
  font-style: italic;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.related-product-card {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
  display: block;
}

.related-product-card:hover {
  transform: translateY(-5px);
}

.related-product-image {
  width: 100%;
  aspect-ratio: 3/4;
  background-color: #f5f5f5;
  overflow: hidden;
  margin-bottom: 15px;
}

.related-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-product-name {
  font-size: 16px;
  color: #000;
  margin: 0 0 8px 0;
  font-weight: 400;
}

.related-product-price {
  font-size: 16px;
  color: #c9a58c;
  margin: 0;
}

/* =========================
   Responsive (Clean & Fluid)
   ========================= */

/* ---------- ≤ 1024px (Tablet landscape) ---------- */
@media (max-width: 1024px) {
  .product-details-page {
    padding: 32px;
  }

  .product-hero {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .product-title {
    font-size: 34px;
  }

  .description-with-video {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ---------- ≤ 768px (Tablet / Large phones) ---------- */
@media (max-width: 768px) {
  .product-details-page {
    padding: 20px;
  }

  /* Gallery */
  .product-gallery {
    flex-direction: column;
    gap: 12px;
  }

  .main-image {
    width: 100%;
    aspect-ratio: 4 / 5;
  }

  .thumbnail-column {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 6px;
  }

  .thumbnail {
    width: 72px;
    height: 96px;
    flex-shrink: 0;
  }

  /* Product info */
  .product-title {
    font-size: 30px;
  }

  /* Cart */
  .cart-section {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .quantity-selector {
    width: 100%;
    justify-content: space-between;
  }

  .quantity-button {
    width: 48px;
    height: 48px;
  }

  .add-to-cart-button {
    width: 100%;
    height: 52px;
    font-size: 15px;
  }

  /* Action buttons */
  .action-buttons {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  /* Tabs */
  .tabs-header {
    gap: 20px;
  }

  .tab-button {
    font-size: 20px;
  }

  /* Forms */
  .form-row {
    grid-template-columns: 1fr;
  }

  /* Related */
  .related-grid {
    grid-template-columns: 1fr;
  }
}

/* ---------- ≤ 480px (Small phones) ---------- */
@media (max-width: 480px) {
  .product-details-page {
    padding: 16px;
  }

  /* Breadcrumb */
  .breadcrumb {
    flex-wrap: wrap;
    gap: 6px;
    font-size: 13px;
  }

  /* Typography */
  .product-title {
    font-size: 26px;
  }

  .product-price {
    font-size: 20px;
  }

  /* Gallery tweaks */
  .thumbnail {
    width: 64px;
    height: 86px;
  }

  /* Sizes */
  .size-button {
    width: 52px;
    height: 40px;
    font-size: 13px;
  }

  /* Quantity */
  .quantity-button {
    width: 40px;
    height: 40px;
  }

  .quantity-value {
    width: 52px;
  }

  /* Tabs (scroll-safe) */
  .tabs-header {
    overflow-x: auto;
    justify-content: flex-start;
    gap: 24px;
  }

  .tab-button {
    font-size: 18px;
    white-space: nowrap;
  }

  /* Description */
  .description-with-video {
    gap: 24px;
  }

  /* Reviews */
  .reviews-count {
    font-size: 20px;
  }

  .form-input,
  .review-textarea {
    font-size: 13px;
    padding: 14px;
  }

  .submit-review-btn {
    width: 100%;
  }

  /* Related */
  .related-title {
    font-size: 28px;
    margin-bottom: 36px;
  }

  .related-grid {
    gap: 20px;
  }

   .add-to-cart-button {
    min-height: 56px;
    padding: 16px 20px;
    font-size: 16px;
  }
}

      `}</style>
    </div>
  );
}

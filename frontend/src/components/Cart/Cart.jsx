'use client';

import { useCart } from '@/app/context/CartContext';
import '@/styles/auth.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Cart = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    country: '',
    state: '',
    city: '',
    postcode: ''
  });

  const subtotal = getCartTotal();
  const shippingCost = 10.00;
  const total = subtotal + shippingCost;

  const handleQuantityChange = (itemId, size, delta) => {
    const item = cartItems.find(i => i.id === itemId && i.size === size);
    if (item) {
      updateQuantity(itemId, size, item.quantity + delta);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      alert(`Coupon "${couponCode}" applied!`);
    }
  };

  const handleUpdateCart = () => {
    alert('Cart updated!');
  };

  const handleCalculateShipping = () => {
    if (shippingInfo.country && shippingInfo.state && shippingInfo.city && shippingInfo.postcode) {
      alert('Shipping calculated!');
    } else {
      alert('Please fill in all shipping information');
    }
  };

  return (
    <>
      <style jsx>{`
        .hero {
          position: relative;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('/images/shop-products/hero-bg.jpg');
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #fff;
        }

        .hero-title {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: clamp(4rem, 8vw, 6rem);
          font-weight: 400;
          color: #fff;
          margin: 0;
          line-height: 1;
        }

        .breadcrumb {
          margin-top: 2rem;
          display: flex;
          gap: 0.8rem;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          color: #fff;
        }

        .breadcrumb a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb a:hover {
          color: #e8b4a8;
        }

        .breadcrumb-separator {
          color: #fff;
          opacity: 0.6;
        }

        .breadcrumb-current {
          color: #fff;
          font-weight: 500;
        }

        .cart-container {
          min-height: 60vh;
          padding: 4rem 2rem;
          background-color: #fafafa;
        }

        .cart-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .empty-cart {
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
          padding: 4rem 0;
        }

        .cart-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
          background-image: url('/images/cart/cart-icon.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .empty-message {
          font-size: 1.25rem;
          color: #2b2b2b;
          margin: 0 0 2.5rem 0;
          font-weight: 400;
        }

        .return-btn {
          display: inline-block;
          padding: 0.875rem 2.5rem;
          background: #fff;
          color: #2b2b2b;
          border: 1px solid #2b2b2b;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .return-btn:hover {
          background: #2b2b2b;
          color: #fff;
        }

        /* Cart with items */
        .cart-table-wrapper {
          background: #fff;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
        }

        .cart-table thead {
          border-bottom: 1px solid #e0e0e0;
        }

        .cart-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.95rem;
          color: #2b2b2b;
        }

        .cart-table th:first-child {
          text-align: center;
          width: 50px;
        }

        .cart-table tbody tr {
          border-bottom: 1px solid #f0f0f0;
        }

        .cart-table td {
          padding: 1.5rem 1rem;
          vertical-align: middle;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 1;
          padding: 0;
          transition: color 0.3s ease;
        }

        .remove-btn:hover {
          color: #d4a5a5;
        }

        .product-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .product-image {
          width: 80px;
          height: 100px;
          object-fit: cover;
          background: #f5f5f5;
        }

        .product-name {
          font-size: 1rem;
          color: #2b2b2b;
          font-weight: 400;
        }

        .product-size {
          font-size: 0.875rem;
          color: #999;
          margin-top: 0.25rem;
        }

        .price-cell {
          font-size: 1rem;
          color: #2b2b2b;
        }

        .quantity-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-btn {
          width: 30px;
          height: 30px;
          border: 1px solid #e0e0e0;
          background: #fff;
          color: #666;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .quantity-btn:hover {
          background: #f5f5f5;
          border-color: #999;
        }

        .quantity-value {
          min-width: 40px;
          text-align: center;
          font-size: 1rem;
          color: #2b2b2b;
        }

        .subtotal-cell {
          font-size: 1rem;
          color: #2b2b2b;
          font-weight: 500;
        }

        .cart-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          background: #fff;
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
        }

        .coupon-section {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .coupon-input {
          padding: 0.75rem 1rem;
          border: 1px solid #e0e0e0;
          font-size: 0.95rem;
          min-width: 200px;
        }

        .apply-btn,
        .update-btn {
          padding: 0.75rem 1.5rem;
          background: #fff;
          color: #2b2b2b;
          border: 1px solid #2b2b2b;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .apply-btn:hover,
        .update-btn:hover {
          background: #2b2b2b;
          color: #fff;
        }

        .cart-summary {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        .shipping-calculator {
          background: #fff;
          padding: 2rem;
        }

        .calculator-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2b2b2b;
          margin: 0 0 1.5rem 0;
        }

        .calculator-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-input {
          padding: 0.875rem 1rem;
          border: 1px solid #e0e0e0;
          font-size: 0.95rem;
        }

        .calculate-btn {
          padding: 0.875rem 1.5rem;
          background: #d4a5a5;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
        }

        .calculate-btn:hover {
          background: #c99595;
        }

        .cart-total-box {
          background: #fff;
          padding: 2rem;
        }

        .total-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2b2b2b;
          margin: 0 0 1.5rem 0;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 1rem;
        }

        .total-row:last-of-type {
          border-bottom: 2px solid #e0e0e0;
          font-weight: 600;
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
        }

        .total-label {
          color: #666;
        }

        .total-value {
          color: #2b2b2b;
          font-weight: 500;
        }

        .shipping-options {
          margin: 1rem 0;
        }

        .shipping-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
          font-size: 0.95rem;
        }

        .shipping-option input[type="radio"] {
          cursor: pointer;
        }

        .shipping-option label {
          cursor: pointer;
          color: #666;
        }

        .shipping-note {
          font-size: 0.875rem;
          color: #999;
          margin: 1rem 0;
          line-height: 1.6;
        }

        .checkout-btn {
          width: 100%;
          padding: 1rem;
          background: #d4a5a5;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .checkout-btn:hover {
          background: #c99595;
        }

        @media (max-width: 1024px) {
          .cart-summary {
            grid-template-columns: 1fr;
          }

          .cart-total-box {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .hero {
            height: 300px;
          }

          .cart-container {
            padding: 2rem 1rem;
          }

          .cart-icon {
            width: 100px;
            height: 100px;
          }

          .empty-message {
            font-size: 1.1rem;
          }

          .cart-table-wrapper {
            overflow-x: auto;
            padding: 1rem;
          }

          .cart-table th,
          .cart-table td {
            padding: 0.75rem 0.5rem;
            font-size: 0.875rem;
          }

          .product-image {
            width: 60px;
            height: 75px;
          }

          .cart-actions {
            flex-direction: column;
            align-items: stretch;
            padding: 1rem;
          }

          .coupon-section {
            flex-direction: column;
            width: 100%;
          }

          .coupon-input {
            width: 100%;
          }

          .apply-btn,
          .update-btn {
            width: 100%;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Cart</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">{'>'}</span>
            <span>Pages</span>
            <span className="breadcrumb-separator">{'>'}</span>
            <span className="breadcrumb-current">Cart</span>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <div className="cart-container">
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="cart-icon"></div>
              <p className="empty-message">Your Cart Is Currently Empty.</p>
              <Link href="/shop" className="return-btn">
                RETURN TO SHOP
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Table */}
              <div className="cart-table-wrapper">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={`${item.id}-${item.size}-${index}`}>
                        <td>
                          <button 
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id, item.size)}
                            aria-label="Remove item"
                          >
                            ×
                          </button>
                        </td>
                        <td>
                          <div className="product-cell">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="product-image"
                            />
                            <div>
                              <div className="product-name">{item.name}</div>
                              <div className="product-size">Size: {item.size}</div>
                            </div>
                          </div>
                        </td>
                        <td className="price-cell">$ {item.price.toFixed(2)}</td>
                        <td>
                          <div className="quantity-cell">
                            <button 
                              className="quantity-btn"
                              onClick={() => handleQuantityChange(item.id, item.size, -1)}
                            >
                              −
                            </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button 
                              className="quantity-btn"
                              onClick={() => handleQuantityChange(item.id, item.size, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="subtotal-cell">$ {(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coupon and Update */}
              <div className="cart-actions">
                <div className="coupon-section">
                  <input
                    type="text"
                    className="coupon-input"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button className="apply-btn" onClick={handleApplyCoupon}>
                    Apply Coupon
                  </button>
                </div>
                <button className="update-btn" onClick={handleUpdateCart}>
                  Update Cart
                </button>
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                {/* Shipping Calculator */}
                <div className="shipping-calculator">
                  <h3 className="calculator-title">Calculate shipping</h3>
                  <div className="calculator-form">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Vietnam"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="State / Country"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Postcode / ZIP"
                      value={shippingInfo.postcode}
                      onChange={(e) => setShippingInfo({...shippingInfo, postcode: e.target.value})}
                    />
                    <button className="calculate-btn" onClick={handleCalculateShipping}>
                      Update
                    </button>
                  </div>
                </div>

                {/* Cart Total */}
                <div className="cart-total-box">
                  <h3 className="total-title">Cart Total</h3>
                  
                  <div className="total-row">
                    <span className="total-label">Subtotal</span>
                    <span className="total-value">$ {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="total-row">
                    <span className="total-label">Shipping</span>
                    <div>
                      <div className="shipping-options">
                        <div className="shipping-option">
                          <input type="radio" id="flat-rate" name="shipping" defaultChecked />
                          <label htmlFor="flat-rate">Flat rate: $ {shippingCost.toFixed(2)}</label>
                        </div>
                        <div className="shipping-option">
                          <input type="radio" id="local-pickup" name="shipping" />
                          <label htmlFor="local-pickup">Local pickup</label>
                        </div>
                      </div>
                      <p className="shipping-note">
                        Shipping options will be updated during checkout.
                      </p>
                    </div>
                  </div>

                  <div className="total-row">
                    <span className="total-label">Total</span>
                    <span className="total-value">$ {total.toFixed(2)}</span>
                  </div>

                  <button className="checkout-btn" onClick={() => router.push('/checkout')}>
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
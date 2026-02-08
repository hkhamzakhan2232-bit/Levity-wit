'use client';

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'UNITED STATES',
    streetAddress: '',
    postcode: '',
    city: '',
    phone: '',
    email: '',
    shipToDifferent: false,
    orderNotes: '',
    paymentMethod: 'bank-transfer'
  });

  const subtotal = getCartTotal();
  const shippingCost = 10.00;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        billingDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyName: formData.companyName,
          country: formData.country,
          streetAddress: formData.streetAddress,
          postcode: formData.postcode,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
        },
        items: cartItems,
        orderNotes: formData.orderNotes,
        paymentMethod: formData.paymentMethod,
        subtotal: subtotal,
        shipping: shippingCost,
        total: total,
        orderDate: new Date().toISOString()
      };

      // Send order to backend
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear cart
        clearCart();
        
        // Show success message
        alert('Order placed successfully! You will receive a confirmation email shortly.');
        
        // Redirect to success page or home
        router.push('/order-success?orderId=' + data.orderId);
      } else {
        throw new Error(data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart before checking out.</p>
        <button onClick={() => router.push('/shop')} className={styles.shopButton}>
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <>
    <style jsx>{`
        .header {
          background-color: #e8b4a8;
          padding: 1.5rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 1.8rem;
          color: #2b2b2b;
          margin: 0;
          line-height: 1;
        }

        .logo-ampersand {
          color: #2b2b2b;
        }

        .tagline {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: 1rem;
          color: #2b2b2b;
          font-style: italic;
          margin-top: 0.2rem;
        }

        .nav {
          display: flex;
          gap: 3rem;
          align-items: center;
        }

        .nav a {
          color: #2b2b2b;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          transition: color 0.3s ease;
        }

        .nav a:hover {
          color: #fff;
        }

        .header-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #2b2b2b;
          font-size: 1.2rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .icon-btn:hover {
          color: #fff;
        }

        .menu-btn {
          display: none;
        }

        .hero {
          position: relative;
          height: 400px;
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
          background: rgba(0, 0, 0, 0.4);
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
          font-size: clamp(4rem, 8vw, 7rem);
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

        @media (max-width: 968px) {
          .nav {
            display: none;
          }

          .menu-btn {
            display: block;
          }

          .hero {
            height: 300px;
          }

          .hero-title {
            font-size: clamp(3rem, 10vw, 5rem);
          }
        }

        @media (max-width: 600px) {
          .header {
            padding: 1rem 1.5rem;
          }

          .logo {
            font-size: 1.4rem;
          }

          .tagline {
            font-size: 0.8rem;
          }

          .header-actions {
            gap: 1rem;
          }

          .icon-btn {
            font-size: 1rem;
          }

          .hero {
            height: 250px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Shop</h2>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">{'>'}</span>
            <span>Pages</span>
            <span className="breadcrumb-separator">{'>'}</span>
            <span className="breadcrumb-current">Shop</span>
          </div>
        </div>
      </section>
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          {/* Billing Details */}
          <div className={styles.billingSection}>
            <h2 className={styles.sectionTitle}>Billing Details</h2>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>First name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Last name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Company name (optional)</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Country / Region *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="UNITED STATES">UNITED STATES</option>
                <option value="CANADA">CANADA</option>
                <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                <option value="AUSTRALIA">AUSTRALIA</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Street address *</label>
              <input
                type="text"
                name="streetAddress"
                placeholder="House number and Street name"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Postcode / ZIP (optional)</label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Town / City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="shipToDifferent"
                name="shipToDifferent"
                checked={formData.shipToDifferent}
                onChange={handleInputChange}
              />
              <label htmlFor="shipToDifferent">Ship to a different address?</label>
            </div>

            <div className={styles.formGroup}>
              <label>Order notes (optional)</label>
              <textarea
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleInputChange}
                placeholder="Notes about your order, e.g. special notes for delivery."
                rows={5}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.orderSection}>
            <h2 className={styles.sectionTitle}>Your Order</h2>
            
            <div className={styles.orderSummary}>
              <div className={styles.orderHeader}>
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              <div className={styles.orderItems}>
                {cartItems.map((item, index) => (
                  <div key={index} className={styles.orderItem}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.orderRow}>
                <span>Subtotal</span>
                <span>$ {subtotal.toFixed(2)}</span>
              </div>

              <div className={styles.orderRow}>
                <span>Shipping</span>
                <span>Flat rate: ${shippingCost.toFixed(2)}</span>
              </div>

              <div className={styles.orderTotal}>
                <span>Total</span>
                <span>$ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className={styles.paymentMethods}>
              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="bank-transfer"
                  name="paymentMethod"
                  value="bank-transfer"
                  checked={formData.paymentMethod === 'bank-transfer'}
                  onChange={handleInputChange}
                />
                <label htmlFor="bank-transfer">
                  <strong>Direct bank transfer</strong>
                  <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                </label>
              </div>

              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="check"
                  name="paymentMethod"
                  value="check"
                  checked={formData.paymentMethod === 'check'}
                  onChange={handleInputChange}
                />
                <label htmlFor="check">
                  <strong>Check payments</strong>
                  <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                </label>
              </div>

              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                />
                <label htmlFor="cod">
                  <strong>Cash on delivery</strong>
                  <p>Pay with cash upon delivery.</p>
                </label>
              </div>

              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                />
                <label htmlFor="paypal">
                  <strong>PayPal</strong>
                  <div className={styles.paymentIcons}>
                    <span>💳</span>
                    <span>💳</span>
                    <span>💳</span>
                    <span>💳</span>
                  </div>
                  <p>Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.</p>
                </label>
              </div>
            </div>

            <p className={styles.privacyNote}>
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </p>

            <button 
              type="submit" 
              className={styles.placeOrderButton}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
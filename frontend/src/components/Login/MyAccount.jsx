'use client';

import '@/styles/auth.css';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'
      const response = await axios.get(`${base}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      router.push('/login');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    router.push('/login');
  };

  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '1.2rem', color: '#666' }}>
        Loading...
      </div>
    );

  if (!user) return null;

  return (
    <>
      <style jsx>{`
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

        .account-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .account-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .account-title {
          font-size: 2rem;
          font-weight: 400;
          color: #2b2b2b;
          margin: 0;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #666;
          font-size: 1rem;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0.5rem 1rem;
        }

        .logout-btn:hover {
          color: #e8b4a8;
        }

        .account-content {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 3rem;
        }

        .user-greeting {
          font-size: 1.5rem;
          font-weight: 500;
          color: #2b2b2b;
          margin: 0 0 2.5rem 0;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e0e0e0;
        }

        .info-section {
          margin-bottom: 2.5rem;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2b2b2b;
          margin: 0 0 0.75rem 0;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2.5rem;
        }

        .info-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2b2b2b;
          margin: 0 0 0.75rem 0;
        }

        .info-value {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
        }

        .change-password-btn,
        .edit-btn {
          background: none;
          border: none;
          color: #e8b4a8;
          font-size: 0.95rem;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }

        .change-password-btn:hover,
        .edit-btn:hover {
          color: #d09b8d;
        }

        .address-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2.5rem;
        }

        .address-card {
          background: transparent;
          padding: 0;
          border-radius: 0;
        }

        .address-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2b2b2b;
          margin: 0 0 0.75rem 0;
        }

        .address-text {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 0.75rem 0;
        }

        .orders-section {
          margin-top: 3rem;
          padding-top: 2.5rem;
          border-top: 1px solid #e0e0e0;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
        }

        .orders-table th {
          text-align: left;
          padding: 1rem;
          background: transparent;
          font-weight: 600;
          color: #2b2b2b;
          border-bottom: 1px solid #e0e0e0;
          font-size: 1rem;
        }

        .orders-table td {
          padding: 1rem;
          color: #666;
          border-bottom: 1px solid #e0e0e0;
        }

        .no-orders {
          text-align: left;
          padding: 1rem;
          color: #666;
          font-style: normal;
        }

        .footer-message {
          text-align: center;
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid #e0e0e0;
        }

        .footer-text {
          font-family: 'Great Vibes', 'Brush Script MT', cursive;
          font-size: 2.5rem;
          color: #e8b4a8;
          margin: 0;
        }

        @media (max-width: 768px) {
          .account-container {
            padding: 2rem 1rem;
          }
          .address-grid {
            grid-template-columns: 1fr;
          }
          .account-content {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">My Account</h2>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">{'>'}</span>
            <span>Pages</span>
            <span className="breadcrumb-separator">{'>'}</span>
            <span className="breadcrumb-current">Account</span>
          </div>
        </div>
      </section>

      {/* Account Content */}
      <div className="account-container">
        <div className="account-header">
          <h1 className="account-title">My account</h1>
          <button className="logout-btn" onClick={handleLogout}>
            <span>←</span> Log Out
          </button>
        </div>

        <div className="account-content">
          <h2 className="user-greeting">Hello, {user.username || 'User'}</h2>

          {/* Email */}
          <div className="info-row">
            <div>
              <h3 className="info-label">Email</h3>
              <p className="info-value">{user.email}</p>
            </div>
            <button className="change-password-btn" onClick={() => alert('Change password coming soon!')}>
              Change password
            </button>
          </div>

          {/* Addresses */}
          <div className="address-grid">
            <div className="address-card">
              <h3>Billing address</h3>
              <p className="address-text">
                {user.billingAddress
                  ? `${user.billingAddress.line1}, ${user.billingAddress.city}, ${user.billingAddress.state}, ${user.billingAddress.zip}`
                  : '151 Mill St, Eunice, LA, 70535'}
              </p>
              <button className="edit-btn" onClick={() => alert('Edit billing address coming soon!')}>Edit</button>
            </div>
            <div className="address-card">
              <h3>Shipping address</h3>
              <p className="address-text">
                {user.shippingAddress
                  ? `${user.shippingAddress.line1}, ${user.shippingAddress.city}, ${user.shippingAddress.state}, ${user.shippingAddress.zip}`
                  : '151 Mill St, Eunice, LA, 70535'}
              </p>
              <button className="edit-btn" onClick={() => alert('Edit shipping address coming soon!')}>Edit</button>
            </div>
          </div>

          {/* Orders */}
          <div className="orders-section">
            <h3 className="section-title">Your recent orders #</h3>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {user.orders && user.orders.length > 0 ? (
                  user.orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.date}</td>
                      <td>{order.status}</td>
                      <td>{order.paymentMethod}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-orders">
                      You currently have no orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-message">
          <p className="footer-text">Thank you for shopping by!</p>
        </div>
      </div>
    </>
  );
};

export default MyAccount;

'use client';

import '@/styles/auth.css';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (mode === 'register' && password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';
    const url =
      mode === 'login'
        ? `${base}/api/login`
        : `${base}/api/register`;

    // For login, send `username` (could be email or username)
    // For register, send username, email, password
    const payload =
      mode === 'login'
        ? { username: username, email: username, password, rememberMe: remember }
        : { username, email, password };


    const response = await axios.post(url, payload);

    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }

    alert(mode === 'login' ? 'Login successful!' : 'Registration successful!');

    // Redirect after login/register
    window.location.href = '/';
  }catch (err) {
  console.error(err.response ? err.response.data : err); // safer logging
  alert(
    err.response?.data?.message ||
      (mode === 'login' ? 'Login failed' : 'Registration failed')
  );
}

};


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
          <h2 className="hero-title">{mode === 'login' ? 'Login' : 'Register'}</h2>

          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">{'>'}</span>
            <span>Pages</span>
            <span className="breadcrumb-separator">{'>'}</span>
            <span className="breadcrumb-current">{mode === 'login' ? 'Login' : 'Register'}</span>

          </div>
        </div>
      </section>

    <div className="auth-container">
      <div className="auth-tabs">
  <button
    type="button"
    className={`auth-tab ${mode === 'login' ? 'active' : 'inactive'}`}
    onClick={() => setMode('login')}
  >
    Login
  </button>
  <button
    type="button"
    className={`auth-tab ${mode === 'register' ? 'active' : 'inactive'}`}
    onClick={() => setMode('register')}
  >
    Register
  </button>
</div>


      <p className="auth-description">
        {mode === 'login'
          ? 'Morbi quis commodo odio aenean sed. Volutpat consequat mauris nunc congue nisi. Vivamus arcu felis bibendum ut tristique et.'
          : 'Create your account to continue. Enter your details below to register and start shopping.'}
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{mode === 'login' ? 'Username or email address' : 'Username'}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {mode === 'register' && (
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {mode === 'register' && (
          <div className="form-group">
            <label>Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        {mode === 'login' && (
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Keep me signed in</label>
          </div>
        )}

        <button className="submit-btn" type="submit">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <a href="#" className="auth-link">
        {mode === 'login' ? 'Lost your password?' : 'Already have an account? Login'}
      </a>
    </div>
  </>
);


};

export default Login;

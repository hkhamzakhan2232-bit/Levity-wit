'use client';

import { useCart } from '@/app/context/CartContext';
import { allProducts, createSlug } from '@/lib/products-data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiMenu, FiSearch, FiShoppingBag, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const searchRef = useRef(null);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query)) ||
      product.description.toLowerCase().includes(query)
    );
    
    setSearchResults(results.slice(0, 8)); // Limit to 8 results
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Close search on escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    }

    if (searchOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [searchOpen]);

  const handleProductClick = (productName) => {
    const slug = createSlug(productName);
    setSearchOpen(false);
    setSearchQuery('');
    router.push(`/products/${slug}`);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      // Focus the input after a brief delay to allow the animation
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo - Replace with your logo image */}
        <Link href="/" className={styles.logo}>
          <Image 
            src="/logo-nav.png"  // Replace with your logo path
            alt="Levity & Wit Logo" 
            width={130}  // Adjust width as needed
            height={60}  // Adjust height as needed
            priority
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/login">Login</Link>
        </div>

        <div className={styles.divider}>|</div>

        {/* Icons */}
        <div className={styles.navIcons}>
          <button 
            className={styles.iconBtn} 
            aria-label="Search"
            onClick={handleSearchToggle}
          >
            <FiSearch size={20} />
          </button>
          <Link href="/cart" className={styles.iconBtn} aria-label="Shopping Cart">
            <div className={styles.cartIconWrapper}>
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </div>
          </Link>
          <button
            className={styles.iconBtn}
            aria-label="Open menu overlay"
            onClick={() => setOverlayOpen(true)}
          >
            <Image src="/window.svg" alt="Menu" width={22} height={22} />
          </button>
          <button 
            className={styles.menuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchContainer} ref={searchRef}>
            <div className={styles.searchInputWrapper}>
              <FiSearch className={styles.searchIcon} size={20} />
              <input
                id="search-input"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button
                className={styles.searchCloseBtn}
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                aria-label="Close search"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className={styles.searchResults}>
                {searchResults.length > 0 ? (
                  <>
                    <div className={styles.searchResultsHeader}>
                      Found {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'}
                    </div>
                    <div className={styles.searchResultsList}>
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          className={styles.searchResultItem}
                          onClick={() => handleProductClick(product.name)}
                        >
                          <div className={styles.searchResultImage}>
                            <img src={product.image} alt={product.name} />
                          </div>
                          <div className={styles.searchResultInfo}>
                            <h4 className={styles.searchResultName}>{product.name}</h4>
                            <p className={styles.searchResultCategory}>{product.category}</p>
                            <p className={styles.searchResultPrice}>$ {product.price.toFixed(2)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={styles.noResults}>
                    <p>No products found for "{searchQuery}"</p>
                    <span>Try searching for something else</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay Menu */}
      {overlayOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.overlayContent}>
            <div className={styles.overlayLeft}>
              {/* Overlay Logo - Replace with your logo image */}
              <div className={styles.overlayLogo}>
                <Image 
                  src="/logo-nav.png"  // Replace with your large logo path
                  alt="Levity & Wit Logo" 
                  width={400}  // Adjust width as needed for overlay
                  height={150}  // Adjust height as needed for overlay
                  priority
                  className={styles.overlayLogoImage}
                />
              </div>
            </div>
            <div className={styles.overlayRight}>
              <button className={styles.overlayClose} onClick={() => setOverlayOpen(false)} aria-label="Close">×</button>
              <ul className={styles.overlayLinks}>
                <li><Link href="/" onClick={() => setOverlayOpen(false)} className={styles.activeLink} style={{ color: '#D9A7A0' }}>Home</Link></li>
                <li><Link href="/about" onClick={() => setOverlayOpen(false)}>About</Link></li>
                <li><Link href="/about#services" onClick={() => setOverlayOpen(false)}>Services</Link></li>
                <li><Link href="/blog" onClick={() => setOverlayOpen(false)}>Blog</Link></li>
                <li><Link href="/shop" onClick={() => setOverlayOpen(false)}>Shop</Link></li>
                <li><Link href="/login" onClick={() => setOverlayOpen(false)}>Login</Link></li>
              </ul>
              <div className={styles.overlaySocial}>
                <Link href='https://facebook.com'><FaFacebook /></Link>
                <span>l</span>
                <Link href='https://twitter.com'><FaTwitter /></Link>
                <span>l</span>
                <Link href='https://instagram.com'><FaInstagram /></Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
        </div>
      )} 

      <style jsx>{`
        /* Search Overlay Styles */
        
      `}</style>
    </nav>
  );
}
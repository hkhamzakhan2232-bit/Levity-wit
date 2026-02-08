import Link from 'next/link';
import './not-found.css';

export default function NotFound() {
  return (
    <div className="error-page">
      {/* Background Image with Overlay */}
      <div className="background-image">
        <div className="overlay" />
      </div>

      {/* Content */}
      <div className="content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        
        <Link href="/" className="home-button">
          Back To Home
        </Link>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>Copyright By LEVITY - Designed By Smartclout Media</p>
      </div>
    </div>
  );
}
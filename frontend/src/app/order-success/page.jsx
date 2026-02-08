'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './OrderSuccess.module.css';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    

<div className={styles.successPage}>
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.checkmark}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#4CAF50" strokeWidth="4"/>
              <path d="M25 40L35 50L55 30" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
 
          <h1 className={styles.title}>Thank You For Your Order!</h1>
          <p className={styles.subtitle}>Your order has been placed successfully.</p>

          {orderId && (
            <div className={styles.orderInfo}>
              <p className={styles.orderNumber}>
                Order Number: <strong>{orderId}</strong>
              </p>
              <p className={styles.confirmationText}>
                A confirmation email has been sent to your email address.
              </p>
            </div>
          )}

          <div className={styles.nextSteps}>
            <h3>What's Next?</h3>
            <ul>
              <li>You will receive an order confirmation email shortly</li>
              <li>We'll send you a shipping notification when your order ships</li>
              <li>Track your order status in your email</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <Link href="/shop" className={styles.primaryButton}>
              Continue Shopping
            </Link>
            <Link href="/" className={styles.secondaryButton}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// app/layout.js
import ClientLayout from '../components/ClientComponent';
import { CartProvider } from './context/CartContext.jsx';
import './globals.css';

// Add metadata export for Next.js 15
export const metadata = {
  title: 'Levity&Wit',
  description: 'Live your style',
}
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </CartProvider>
      </body>
    </html>
  )
}

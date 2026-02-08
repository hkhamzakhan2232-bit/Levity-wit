// app/components/ClientLayout.jsx
'use client';

import Footer from './Home/Footer';
import Navbar from './Home/Navbar';

export default function ClientLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
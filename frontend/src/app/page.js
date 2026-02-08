import BookAppointment from '@/components/Home/BookAppointment.jsx'
import ContactSection from '@/components/Home/ContactSection.jsx'
import CuratedSelection from '@/components/Home/CuratedSelection.jsx'
import FAQSection from '@/components/Home/FAQSection.jsx'
import InStoreServices from '@/components/Home/InStoreServices.jsx'
import LatestNewsSection from '@/components/Home/LatestNewsSection.jsx'
import MeetBeth from '@/components/Home/MeetBeth.jsx'
import ProductsSection from '@/components/Home/ProductsHome.jsx'
import PromoBanner from '@/components/Home/PromoBanner.jsx'
import SocialMediaSection from '@/components/Home/SocialMediaSection.jsx'
import TestimonialsSection from '@/components/Home/TestimonialsSection.jsx'
import AboutUs from '../components/Home/AboutUs.jsx'
import HeroSection from '../components/Home/HeroSection.jsx'


export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutUs />
      <PromoBanner />
      <MeetBeth />
      <BookAppointment />
      <InStoreServices />
      <ProductsSection />
      <CuratedSelection />
      <TestimonialsSection />
      <SocialMediaSection />
      <LatestNewsSection />
      <FAQSection />
      <ContactSection />
    </main>
  )
}
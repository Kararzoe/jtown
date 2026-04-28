import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TrendingBanner from "@/components/TrendingBanner";
import TrendingSection from "@/components/TrendingSection";
import FloatingChat from "@/components/FloatingChat";
import TopSellers from "@/components/TopSellers";
import JosMarketplace from "@/components/JosMarketplace";
import ScrollToTop from "@/components/ScrollToTop";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";
import CookieConsent from "@/components/CookieConsent";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <TrendingBanner />
      <Hero />
      <Categories />
      <JosMarketplace />
      <TrendingSection />
      <HowItWorks />
      <TopSellers />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      <FloatingChat />
      <ScrollToTop />
      <CookieConsent />
    </main>
  );
}

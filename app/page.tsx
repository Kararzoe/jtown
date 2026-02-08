import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TrendingBanner from "@/components/TrendingBanner";
import TrendingSection from "@/components/TrendingSection";
import FilterBar from "@/components/FilterBar";
import StatsCounter from "@/components/StatsCounter";
import FloatingChat from "@/components/FloatingChat";
import TopSellers from "@/components/TopSellers";
import TrustSection from "@/components/TrustSection";
import ScrollToTop from "@/components/ScrollToTop";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import AppDownload from "@/components/AppDownload";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";
import ProgressBar from "@/components/ProgressBar";
import CookieConsent from "@/components/CookieConsent";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ProgressBar />
      <Navbar />
      <TrendingBanner />
      <Hero />
      <Categories />
      <TrendingSection />
      <HowItWorks />
      <TopSellers />
      <FilterBar />
      <ProductGrid />
      <TrustSection />
      <Testimonials />
      <StatsCounter />
      <AppDownload />
      <FAQ />
      <Newsletter />
      <Footer />
      <FloatingChat />
      <ScrollToTop />
      <CookieConsent />
    </main>
  );
}

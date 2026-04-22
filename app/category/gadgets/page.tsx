import CategoryPage from "@/components/CategoryPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GadgetsPage() {
  return (
    <>
      <Navbar />
      <CategoryPage category="gadgets" />
      <Footer />
    </>
  );
}

import CategoryPage from "@/components/CategoryPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ElectronicsPage() {
  return (
    <>
      <Navbar />
      <CategoryPage category="electronics" />
      <Footer />
    </>
  );
}

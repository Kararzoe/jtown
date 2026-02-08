import CategoryPage from "@/components/CategoryPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FoodPage() {
  return (
    <>
      <Navbar />
      <CategoryPage category="food" />
      <Footer />
    </>
  );
}

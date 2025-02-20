import Navbar from "./Navbar";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import CartPanel from "./CartPanel";
import { useStore } from "@/context/StoreContext";

function Home() {
  const { isCartOpen } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <FilterSidebar />
        <main className="flex-1">
          <ProductGrid />
        </main>
        {isCartOpen && <CartPanel />}
      </div>
    </div>
  );
}

export default Home;

import ProductCard from "./ProductCard";
import { useStore } from "@/context/StoreContext";

const ProductGrid = () => {
  const { filteredProducts, addToCart } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          onAddToCart={() => addToCart(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;

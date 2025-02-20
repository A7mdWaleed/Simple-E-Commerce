import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, addToCart } = useStore();

  const product = getProduct(Number(id));

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
              {product.category}
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={() => {
              addToCart(product);
              // Optionally show a toast notification here
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id?: number;
  title?: string;
  price?: number;
  image?: string;
  onAddToCart?: () => void;
}

const ProductCard = ({
  id = 1,
  title = "Sample Product",
  price = 99.99,
  image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  onAddToCart,
}: ProductCardProps) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardContent className="p-0">
        <Link to={`/product/${id}`} className="block">
          <div className="aspect-square relative">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
        <div className="p-4">
          <Link to={`/product/${id}`} className="block hover:text-primary">
            <h3 className="font-semibold text-lg">{title}</h3>
          </Link>
          <p className="text-xl font-bold mt-2">${price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

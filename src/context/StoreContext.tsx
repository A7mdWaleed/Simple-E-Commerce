import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderItem extends CartItem {}

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  shipping: ShippingDetails;
  createdAt: Date;
  updatedAt: Date;
}

interface StoreContextType {
  getProduct: (id: number) => Product | undefined;
  // Orders
  orders: Order[];
  createOrder: (shipping: ShippingDetails) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  // Products
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;

  // Cart
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals alike.",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    title: "Camera Lens",
    price: 799.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6",
  },
  {
    id: 4,
    title: "Running Shoes",
    price: 89.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
];

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products] = useState<Product[]>(sampleProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(1000);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  const createOrder = (shipping: ShippingDetails) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 1, // In a real app, this would come from the auth context
      items: [...cartItems],
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      status: "pending",
      shipping,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOrders((prev) => [...prev, newOrder]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return { ...order, status, updatedAt: new Date() };
        }
        return order;
      }),
    );
  };

  const getProduct = (id: number) => {
    return products.find((product) => product.id === id);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <StoreContext.Provider
      value={{
        products,
        filteredProducts,
        getProduct,
        searchQuery,
        setSearchQuery,
        selectedCategories,
        toggleCategory,
        priceRange,
        setPriceRange,
        cartItems,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
}

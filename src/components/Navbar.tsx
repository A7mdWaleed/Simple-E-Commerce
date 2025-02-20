import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { LoginDialog } from "./LoginDialog";
import { RegisterDialog } from "./RegisterDialog";

const Navbar = () => {
  const { cartItems, toggleCart, searchQuery, setSearchQuery } = useStore();
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Store</div>

          <div className="flex-1 max-w-xl mx-8">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Hello, {user.name}
                </span>
                <Link to="/orders">
                  <Button variant="ghost">
                    <Package className="h-5 w-5 mr-2" />
                    Orders
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="ghost" onClick={() => setIsLoginOpen(true)}>
                <User className="h-5 w-5 mr-2" />
                Login
              </Button>
            )}
            <Button variant="outline" className="relative" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterDialog
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Navbar;

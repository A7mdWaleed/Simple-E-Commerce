import { X } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { CheckoutDialog } from "./CheckoutDialog";
import { LoginDialog } from "./LoginDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const CartPanel = () => {
  const { cartItems, toggleCart, updateQuantity, removeFromCart } = useStore();
  const { isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="w-96 h-screen bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <Button variant="ghost" size="icon" onClick={toggleCart}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 mb-4 border-b border-gray-100 pb-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{item.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                ${item.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full" onClick={() => setIsCheckoutOpen(true)}>
          Checkout
        </Button>
        <CheckoutDialog
          isOpen={isCheckoutOpen && isAuthenticated}
          onClose={() => setIsCheckoutOpen(false)}
        />
        <AlertDialog
          open={isCheckoutOpen && !isAuthenticated}
          onOpenChange={setIsCheckoutOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Authentication Required</AlertDialogTitle>
              <AlertDialogDescription>
                Please log in to complete your purchase.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                Login
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <LoginDialog
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSwitchToRegister={() => {
            setIsLoginOpen(false);
            // You could add state for register dialog here if needed
          }}
        />
      </div>
    </div>
  );
};

export default CartPanel;

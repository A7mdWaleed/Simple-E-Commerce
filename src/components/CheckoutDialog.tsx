import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export function CheckoutDialog({ isOpen, onClose }: CheckoutDialogProps) {
  const { user } = useAuth();
  const { cartItems, createOrder } = useStore();
  const [currentStep, setCurrentStep] = useState<"shipping" | "confirmation">(
    "shipping",
  );

  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: user?.name || "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("confirmation");
  };

  const handleConfirmOrder = () => {
    createOrder(shipping);
    onClose();
  };

  if (currentStep === "shipping") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Shipping Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={shipping.fullName}
                onChange={(e) =>
                  setShipping({ ...shipping, fullName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={shipping.address}
                onChange={(e) =>
                  setShipping({ ...shipping, address: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={shipping.zipCode}
                  onChange={(e) =>
                    setShipping({ ...shipping, zipCode: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={shipping.country}
                onChange={(e) =>
                  setShipping({ ...shipping, country: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Review Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order Confirmation</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Shipping Details</h3>
            <div className="text-sm space-y-1">
              <p>{shipping.fullName}</p>
              <p>{shipping.address}</p>
              <p>
                {shipping.city}, {shipping.zipCode}
              </p>
              <p>{shipping.country}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button onClick={handleConfirmOrder} className="w-full">
            Place Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

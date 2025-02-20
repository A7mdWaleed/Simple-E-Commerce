import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

const OrdersPage = () => {
  const { orders } = useStore();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Please Login</h2>
        <p className="text-gray-600">
          You need to be logged in to view your orders.
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-gray-600">
          Start shopping to create your first order!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.map((order) => (
        <Card key={order.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">Order #{order.id}</h3>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge variant="secondary" className={statusColors[order.status]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Items</h4>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <div className="text-sm space-y-1">
                <p>{order.shipping.fullName}</p>
                <p>{order.shipping.address}</p>
                <p>
                  {order.shipping.city}, {order.shipping.zipCode}
                </p>
                <p>{order.shipping.country}</p>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="font-semibold">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OrdersPage;

import React, { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useOrderStore from "../store/useOrderStore";
import { CircleCheck, CircleX, Clock, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cancelOrder } from "../services/orderService";

// client/src/pages/Orders.jsx

const Orders = () => {
  const { userOrders, loading, loadUserOrders } = useOrderStore();
  const { token } = useAuthStore();
  const [isCancelling, setIsCancelling] = useState({}); // State to track cancellation status

  useEffect(() => {
    if (token) {
      loadUserOrders(token);
    }
  }, [token, loadUserOrders]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }
    setIsCancelling((prev) => ({ ...prev, [orderId]: true }));
    try {
      await cancelOrder(orderId, token);
      toast.success("Order has been successfully cancelled.");
      // Reload orders to show the updated status
      loadUserOrders(token);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order.");
    } finally {
      setIsCancelling((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Shipped':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'Delivered':
        return <CircleCheck className="w-5 h-5 text-green-500" />;
      case 'Cancelled':
        return <CircleX className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  if (!token) {
    return (
      <div className="text-center p-10">
        <p>Please log in to view your orders.</p>
        <Link to="/login" className="text-green-600 hover:underline">Log In</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center p-10">Loading your orders...</div>;
  }

  if (userOrders.length === 0) {
    return (
      <div className="text-center p-10">
        <p>You have no orders yet.</p>
        <Link to="/products" className="text-green-600 hover:underline">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      <div className="space-y-6">
        {userOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow-lg p-8">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 pb-4 border-b">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-gray-800">Order #{order._id.substring(0, 8)}</span>
                <div className="flex items-center gap-1 text-sm font-medium">
                  {getStatusIcon(order.status)}
                  <span className={`capitalize ${
                    order.status === 'Pending' ? 'text-yellow-600' :
                    order.status === 'Shipped' ? 'text-blue-600' :
                    order.status === 'Delivered' ? 'text-green-600' :
                    'text-red-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-500 mt-2 md:mt-0">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Order Items List */}
            <div className="space-y-4 mb-6">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-800">₹{item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Summary and Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-bold text-gray-800">
                  Total: ₹{order.totalAmount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Payment: {order.paymentMethod}</p>
              </div>
              <div>
                {order.status === 'Pending' && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    disabled={isCancelling[order._id]}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    {isCancelling[order._id] ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
                {order.status === 'Delivered' && (
                  <button className="bg-green-500 text-white font-medium py-2 px-4 rounded-lg opacity-80 cursor-not-allowed">
                    Order Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
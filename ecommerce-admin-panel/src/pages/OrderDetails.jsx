import OrderStatusBadge from "../components/common/OrderStatusBadge";
import React, { useEffect, useState } from "react";
import StatusDropdown from "../components/common/StatusDropdown";
import useAuthStore from "../store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchOrderDetails, updateOrderStatus } from "../services/orderService";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            fetchOrderDetails(id, token)
                .then(fetchedOrder => {
                    setOrder(fetchedOrder);
                    setLoading(false);
                })
                .catch(err => {
                    setError("Failed to fetch order details.");
                    toast.error("Failed to fetch order details.");
                    setLoading(false);
                });
        }
    }, [id, token]);

    const handleStatusChange = async (newStatus) => {
        try {
            const updatedOrder = await updateOrderStatus(order._id, newStatus, token);
            setOrder(updatedOrder.order);
            toast.success(`Order status updated to ${newStatus}`);
        } catch (err) {
            toast.error("Failed to update order status.");
            console.error(err);
        }
    };

    if (loading) return <div className="p-6 bg-white rounded-lg shadow text-center">Loading order details...</div>;
    if (error) return <div className="p-6 bg-red-100 rounded-lg shadow text-red-700">{error}</div>;
    if (!order) return <div className="p-6 bg-white rounded-lg shadow text-center">Order not found.</div>;

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header and Status Update */}
                <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Order #{order._id.substring(18)}...</h2>
                        <p className="text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <StatusDropdown 
                            currentStatus={order.status} 
                            onChange={handleStatusChange} 
                            options={statusOptions}
                        />
                        <OrderStatusBadge status={order.status} />
                    </div>
                </div>

                {/* Order & Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Customer Info</h3>
                        <div className="space-y-2 text-gray-600">
                            <p><strong>Name:</strong> {order.user.fullName}</p>
                            <p><strong>Email:</strong> {order.user.email}</p>
                            <p><strong>Phone:</strong> {order.shippingInfo.phoneNumber}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Order & Payment</h3>
                        <div className="space-y-2 text-gray-600">
                            <p><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                            <p><strong>Payment Status:</strong> <span className={order.isPaid ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>{order.isPaid ? 'Paid' : 'Unpaid'}</span></p>
                        </div>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Address</h3>
                    <div className="text-gray-600">
                        <p>{order.shippingInfo.streetAddress1}, {order.shippingInfo.streetAddress2}</p>
                        <p>{order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.zipCode}</p>
                        <p>{order.shippingInfo.country}</p>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Products Ordered</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.orderItems.map((item, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{(item.quantity * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Back to Orders
                </button>

            </div>
        </div>
    );
};

export default OrderDetails;
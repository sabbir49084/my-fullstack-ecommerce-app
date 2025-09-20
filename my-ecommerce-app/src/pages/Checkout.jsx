import PaymentGateway from "../components/payment/PaymentGateway";
import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../services/orderService";

// client/src/pages/Checkout.jsx

const Checkout = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const { cartItems, clearCart } = useCartStore();

    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        country: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
    });

    const [isProcessingOrder, setIsProcessingOrder] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [paymentResult, setPaymentResult] = useState(null);

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
        0
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleOrderPlacement = async (paymentMethod) => {
        setIsProcessingOrder(true);
        try {
            if (!token) {
                toast.error("You must be logged in to place an order.");
                return;
            }

            // Basic form validation
            if (!shippingInfo.fullName || !shippingInfo.streetAddress1 || !shippingInfo.city || !shippingInfo.zipCode) {
                toast.error("Please fill in all required billing details.");
                setIsProcessingOrder(false);
                return;
            }

            const orderItems = cartItems.map((item) => ({
                name: item.product.title,
                quantity: item.quantity,
                price: item.product.price,
                product: item.product._id,
            }));

            // ✅ No mapping needed as model and state now match
            const orderData = {
                shippingInfo,
                orderItems,
                totalAmount,
                paymentMethod,
            };

            await createOrder(orderData, token);

            toast.success("Order placed successfully!");
            clearCart();
            navigate("/orders");

        } catch (error) {
            console.error("Order placement failed:", error);
            toast.error(error.response?.data?.message || "Failed to place order.");
        } finally {
            setIsProcessingOrder(false);
        }
    };

    const handleOnlinePay = async (method) => {
        await handleOrderPlacement(method);
    };

    const handleCOD = async () => {
        await handleOrderPlacement("COD");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPayment(true);
    };

    return (
        <div className="min-h-screen py-10 bg-gray-100">
            <div className="container mx-auto px-4 lg:px-20">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Billing Details Form */}
                    <div className="bg-white p-6 rounded shadow-md lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block mb-1 font-medium">Full Name *</label>
                                <input type="text" name="fullName" value={shippingInfo.fullName} onChange={handleInputChange} className="w-full border p-2 rounded" required />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-1 font-medium">Country *</label>
                                <input type="text" name="country" value={shippingInfo.country} onChange={handleInputChange} className="w-full border p-2 rounded" required />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-1 font-medium">Street Address *</label>
                                <input
                                    type="text"
                                    name="streetAddress1"
                                    value={shippingInfo.streetAddress1}
                                    onChange={handleInputChange}
                                    placeholder="House number and street name"
                                    className="w-full border p-2 rounded mb-2"
                                    required
                                />
                                <input
                                    type="text"
                                    name="streetAddress2"
                                    value={shippingInfo.streetAddress2}
                                    onChange={handleInputChange}
                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Town / City *</label>
                                <input type="text" name="city" value={shippingInfo.city} onChange={handleInputChange} className="w-full border p-2 rounded" required />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">State / County *</label>
                                <input type="text" name="state" value={shippingInfo.state} onChange={handleInputChange} className="w-full border p-2 rounded" required />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Postcode / ZIP *</label>
                                <input type="text" name="zipCode" value={shippingInfo.zipCode} onChange={handleInputChange} className="w-full border p-2 rounded" required />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Phone Number</label>
                                <input type="tel" name="phoneNumber" value={shippingInfo.phoneNumber} onChange={handleInputChange} className="w-full border p-2 rounded" />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-1 font-medium">Email Address</label>
                                <input type="email" name="email" value={shippingInfo.email} onChange={handleInputChange} className="w-full border p-2 rounded" />
                            </div>
                        </div>

                        {paymentResult && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded">
                                <p className="text-green-800">{paymentResult}</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Box + Order Now button */}
                    <div className="bg-white p-6 rounded shadow-md flex flex-col">
                        <div>
                            <h2 className="text-xl font-bold text-red-600 mb-2 uppercase">Your Order</h2>
                            <hr className="mb-4" />

                            <div className="flex justify-between font-semibold">
                                <span>Product</span>
                                <span>Subtotal</span>
                            </div>
                            <hr className="my-2" />

                            {cartItems.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <div className="flex justify-between">
                                        <span>{item.product?.title} × {item.quantity}</span>
                                        <span>R{(item.product?.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}

                            <hr className="my-4" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Subtotal</span>
                                <span>R{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition font-semibold"
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </form>

                {showPayment && (
                    <div className="mt-10">
                        <PaymentGateway
                            totalAmount={totalAmount}
                            onOnlinePay={handleOnlinePay}
                            onCOD={handleCOD}
                            isProcessing={isProcessingOrder}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
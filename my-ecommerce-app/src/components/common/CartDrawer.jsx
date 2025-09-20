import QuantityButton from "../common/QuantityButton";
import React, { useState } from "react";
import useCartStore from "../../store/useCartStore";
import { Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// src/components/common/CartDrawer.jsx


const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems = [], removeFromCart, updateQuantity } = useCartStore();
  const [loadingItems, setLoadingItems] = useState({});

  const total = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  const handleUpdateQuantity = async (itemId, productId, newQuantity) => {
    if (loadingItems[itemId] || newQuantity < 1) return;
    setLoadingItems((prev) => ({ ...prev, [itemId]: true }));
    try {
      // updateQuantity ফাংশনে productId এবং quantity পাঠানো হচ্ছে
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveFromCart = async (itemId, productId) => {
    if (loadingItems[itemId]) return;
    setLoadingItems((prev) => ({ ...prev, [itemId]: true }));
    try {
      // removeFromCart ফাংশনে productId পাঠানো হচ্ছে
      await removeFromCart(productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-white m-auto max-w-5xl h-[90vh] rounded shadow-lg p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            There are no products in your cart.
          </p>
        ) : (
          <>
            <p className="mb-4 text-gray-700 font-semibold">
              There {cartItems.length > 1 ? "are" : "is"} {cartItems.length} product
              {cartItems.length > 1 ? "s" : ""} in your cart
            </p>
            <table className="w-full text-left border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-gray-300 p-2">Product</th>
                  <th className="border border-gray-300 p-2">Unit Price</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Subtotal</th>
                  <th className="border border-gray-300 p-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-t border-gray-300 align-top">
                    <td className="border border-gray-300 p-2 flex items-center gap-3">
                      <img
                        src={item.product?.image}
                        alt={item.product?.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="font-semibold">{item.product?.title}</div>
                        <div className="text-yellow-500">⭐ {item.product?.rating || "N/A"}</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      R{item.product?.price?.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <QuantityButton
                        quantity={item.quantity}
                        // ✅ onDecrement এবং onIncrement প্রপস ব্যবহার করা হলো
                        onDecrement={() =>
                          handleUpdateQuantity(item._id, item.product._id, item.quantity - 1)
                        }
                        onIncrement={() =>
                          handleUpdateQuantity(item._id, item.product._id, item.quantity + 1)
                        }
                        isLoading={loadingItems[item._id]}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      R{(item.product?.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => handleRemoveFromCart(item._id, item.product._id)}
                        disabled={loadingItems[item._id]}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-start gap-6 flex-wrap">
              <div className="border border-gray-300 p-4 rounded w-full md:w-1/2">
                <h3 className="font-semibold mb-4 text-lg">CART TOTALS</h3>
                <div className="mb-2 flex justify-between">
                  <span>Subtotal</span>
                  <span>R{total.toFixed(2)}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span>Estimate for</span>
                  <span>South Africa</span>
                </div>
                <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-end">
                <button
                  className="bg-red-600 text-white px-4 py-2 mt-4 w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
import React, { useState } from "react";
import useCartStore from "../../store/useCartStore";
import { FiShoppingCart } from "react-icons/fi";

// src/components/common/AddToCartButton.js

const AddToCartButton = ({ product, quantity = 1, className = "", children }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdding, setIsAdding] = useState(false); // লোডিং স্টেট যুক্ত করলাম

  const handleAddToCartClick = async (e) => {
    e.stopPropagation(); // ইভেন্ট প্রোপাগেশন বন্ধ করা হলো
    if (!product || isAdding) return;

    setIsAdding(true);
    try {
      await addToCart({ ...product, quantity });
      // আপনি চাইলে এখানে একটি টোস্ট নোটিফিকেশন দেখাতে পারেন যে পণ্যটি যোগ হয়েছে
      // যেমন: toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // toast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCartClick}
      className={`
        bg-blue-600 
        text-white 
        px-4 py-2 
        rounded-lg 
        flex 
        items-center 
        justify-center 
        transition-colors 
        duration-300 
        hover:bg-red-600 
        ${isAdding ? 'opacity-75 cursor-not-allowed' : ''} 
        ${className} // কাস্টম ক্লাস যুক্ত করার জন্য
      `}
      disabled={isAdding} // লোড হওয়ার সময় বাটন ডিসেবল থাকবে
    >
      {isAdding ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <FiShoppingCart className="mr-2" />
      )}
      {children || 'Add to Cart'} {/* আপনি চাইলে বাটনের টেক্সট কাস্টমাইজ করতে পারবেন */}
    </button>
  );
};

export default AddToCartButton;
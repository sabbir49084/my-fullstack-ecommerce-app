import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

// src/components/common/QuantityButton.jsx

const QuantityButton = ({ quantity, onIncrement, onDecrement, isLoading }) => {
  return (
    <div className="flex items-center gap-1 border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={onDecrement}
        className={`px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={quantity <= 1 || isLoading}
      >
        <FiMinus className="w-4 h-4" />
      </button>
      <span className="px-2 font-semibold text-gray-800">
        {isLoading ? "..." : quantity}
      </span>
      <button
        onClick={onIncrement}
        className={`px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantityButton;

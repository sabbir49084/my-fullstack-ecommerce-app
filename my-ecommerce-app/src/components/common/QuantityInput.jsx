import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

// src/components/common/QuantityButton.js

const QuantityButton = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center gap-1 border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={onDecrease}
        className="px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        disabled={quantity <= 1} // 1 এর নিচে গেলে বাটনটি ডিসেবল থাকবে
      >
        <FiMinus className="w-4 h-4" />
      </button>
      <span className="px-2 font-semibold text-gray-800">{quantity}</span>
      <button
        onClick={onIncrease}
        className="px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantityButton;
import React, { useState } from "react";

const PriceFilter = ({ onPriceChange }) => {
  const [price, setPrice] = useState(1000);

  const handleChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice);
    onPriceChange(newPrice);
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-6">
      <h4 className="font-semibold mb-2">Filter by Price</h4>
      <input
        type="range"
        min="0"
        max="1000"
        value={price}
        onChange={handleChange}
        className="w-full"
      />
      <p className="text-sm mt-2">Up to: ${price}</p>
    </div>
  );
};

export default PriceFilter;

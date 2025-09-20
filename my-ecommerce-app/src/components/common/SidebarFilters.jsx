import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const categories = [
  "Masala",
  "Grocery",
  "Electronics",
  "Gadgets",
  "Livestock",
  "Farming Tools",
];

const ratings = [5, 4, 3, 2, 1];

const SidebarFilters = () => {
  const [price, setPrice] = useState([100, 100000]);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <div className="p-4 w-full max-w-[250px]">
      {/* Filter by Price */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Filter by Price</h3>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={100}
          max={100000}
          sx={{ color: "#7e22ce" }}
        />
        <div className="flex justify-between text-sm mt-1">
          <span>From: <strong>৳ {price[0]}</strong></span>
          <span>To: <strong>৳ {price[1]}</strong></span>
        </div>
      </div>

      {/* Product Categories (Your Client's Request) */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Product Categories</h3>
        <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto pr-2">
          {categories.map((cat, index) => (
            <label key={index} className="flex items-center gap-2 text-sm">
              <input type="radio" name="category" />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Filter by Rating */}
      <div>
        <h3 className="font-semibold mb-2">Filter by Rating</h3>
        <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto pr-2">
          {ratings.map((rate) => (
            <div key={rate} className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: rate }, (_, i) => (
                <span key={i}>★</span>
              ))}
              {Array.from({ length: 5 - rate }, (_, i) => (
                <span key={i} className="text-gray-300">★</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;

import React from "react";
import { LuScale } from "react-icons/lu";
import { Tooltip } from "react-tooltip";

// src/components/common/CompareButton.js

const CompareButton = ({ product }) => {
  const handleCompareClick = (e) => {
    e.stopPropagation();
    console.log(`Adding product to compare: ${product.title}`);
    alert(`Added ${product.title} to compare list.`);
  };

  return (
    <>
      <div
        onClick={handleCompareClick}
        data-tooltip-id="compare-tooltip"
        data-tooltip-content="Add to Compare"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-gray-600 transition-colors duration-300 cursor-pointer hover:bg-green-500 hover:text-white"
      >
        <LuScale className="w-6 h-6" />
      </div>
      <Tooltip id="compare-tooltip" effect="solid" place="top" className="text-sm z-50" />
    </>
  );
};

export default CompareButton;
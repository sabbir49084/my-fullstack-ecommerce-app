import React from "react";
import { FaChartBar, FaEgg, FaFireAlt, FaSeedling, FaTree, FaTruck } from "react-icons/fa";

const categories = [
  {
    title: "Timber & Forestry",
    icon: <FaTree className="text-4xl text-green-700 group-hover:text-white transition-all duration-300" />,
    description: "Sustainable timber supply, forest services, and plantation care.",
  },
  {
    title: "Fire & Weed Control",
    icon: <FaFireAlt className="text-4xl text-red-600 group-hover:text-white transition-all duration-300" />,
    description: "Fire management, brush clearing, and weed control for safety.",
  },
  {
    title: "Seedlings & Reforestation",
    icon: <FaSeedling className="text-4xl text-green-500 group-hover:text-white transition-all duration-300" />,
    description: "Seedling supply, advisory & carbon credit readiness.",
  },
  {
    title: "Fresh Poultry",
    icon: <FaEgg className="text-4xl text-yellow-500 group-hover:text-white transition-all duration-300" />,
    description: "Broiler chicken, fresh eggs, and recurring local deliveries.",
  },
  {
    title: "Logistics & Delivery",
    icon: <FaTruck className="text-4xl text-blue-500 group-hover:text-white transition-all duration-300" />,
    description: "Local delivery service for households and commercial partners.",
  },
  {
    title: "Analytics & Compliance",
    icon: <FaChartBar className="text-4xl text-purple-600 group-hover:text-white transition-all duration-300" />,
    description: "Track performance, manage orders, and monitor sustainability.",
  },
];

const FutureCategories = () => {
  return (
    <section className="py-16 px-4 md:px-16 bg-[#F6F6F3]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Explore Our Key Divisions</h2>
        <p className="text-gray-600 mt-3">From forests to farms — serving rural and commercial needs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-2xl shadow-lg hover:bg-green-700 transition duration-300"
          >
            <div className="mb-4">{cat.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white">{cat.title}</h3>
            <p className="mt-2 text-gray-600 group-hover:text-white">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FutureCategories;

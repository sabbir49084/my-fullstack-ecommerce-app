import ProductTrends from "../components/charts/ProductTrends";
import React from "react";
import SalesChart from "../components/charts/SalesChart";

const Analytics = () => {
  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.02] duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">Sales Overview (Jan - Dec)</h3>
          <SalesChart />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.02] duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">Product Trends</h3>
          <ProductTrends />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.02] duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">Monthly Customer Growth</h3>
          <SalesChart />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.02] duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">Order Fulfillment Status</h3>
          <ProductTrends />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

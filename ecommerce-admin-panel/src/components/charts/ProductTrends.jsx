import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Eggs", views: 200 },
  { name: "Logs", views: 600 },
  { name: "Feeds", views: 300 },
  { name: "Chickens", views: 500 },
  { name: "Machinery", views: 250 },
];

const ProductTrends = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Trending Products</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductTrends;

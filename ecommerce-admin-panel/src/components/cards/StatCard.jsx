import React from "react";

const StatCard = ({ title, value, icon, color = 'bg-blue-500' }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
      <div className={`p-3 rounded-full text-white ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;

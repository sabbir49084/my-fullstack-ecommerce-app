import React from "react";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
  { month: "Jul", sales: 8000 },
];

const ordersData = [
  { month: "Jan", orders: 240 },
  { month: "Feb", orders: 139 },
  { month: "Mar", orders: 221 },
  { month: "Apr", orders: 278 },
  { month: "May", orders: 189 },
  { month: "Jun", orders: 239 },
  { month: "Jul", orders: 349 },
];

const customersData = [
  { month: "Jan", customers: 120 },
  { month: "Feb", customers: 98 },
  { month: "Mar", customers: 140 },
  { month: "Apr", customers: 130 },
  { month: "May", customers: 170 },
  { month: "Jun", customers: 200 },
  { month: "Jul", customers: 220 },
];

const topProducts = [
  { id: 1, name: "Product A", sales: 240 },
  { id: 2, name: "Product B", sales: 180 },
  { id: 3, name: "Product C", sales: 140 },
  { id: 4, name: "Product D", sales: 120 },
  { id: 5, name: "Product E", sales: 100 },
];

const recentOrders = [
  { id: 101, customer: "John Doe", date: "2025-07-28", status: "Delivered", total: "$120" },
  { id: 102, customer: "Jane Smith", date: "2025-07-27", status: "Processing", total: "$75" },
  { id: 103, customer: "Bob Johnson", date: "2025-07-26", status: "Cancelled", total: "$0" },
  { id: 104, customer: "Alice Brown", date: "2025-07-25", status: "Shipped", total: "$200" },
];

const Dashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-gray-600">Here is your e-commerce dashboard overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white rounded p-5 shadow">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-3xl mt-2">$58,230</p>
          <p className="text-sm mt-1">Last 30 days</p>
        </div>
        <div className="bg-green-600 text-white rounded p-5 shadow">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-3xl mt-2">1,254</p>
          <p className="text-sm mt-1">Last 30 days</p>
        </div>
        <div className="bg-purple-600 text-white rounded p-5 shadow">
          <h2 className="text-lg font-semibold">Customers</h2>
          <p className="text-3xl mt-2">987</p>
          <p className="text-sm mt-1">Active this month</p>
        </div>
        <div className="bg-yellow-500 text-white rounded p-5 shadow">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-3xl mt-2">142</p>
          <p className="text-sm mt-1">Available</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Sales Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Orders Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#10b981" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">New Customers</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={customersData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#8b5cf6"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* Recent Orders Table */}
      <section className="bg-white p-6 rounded shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-2 px-4 font-mono">{order.id}</td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.date}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Processing"
                      ? "text-yellow-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-2 px-4">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Top Selling Products */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
        <ul className="divide-y divide-gray-200">
          {topProducts.map((product) => (
            <li key={product.id} className="py-3 flex justify-between items-center">
              <span>{product.name}</span>
              <span className="font-semibold">{product.sales} sales</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;

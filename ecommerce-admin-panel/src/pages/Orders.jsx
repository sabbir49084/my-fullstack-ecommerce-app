import OrderStatusBadge from "../components/common/OrderStatusBadge";
import Pagination from "../components/common/Pagination";
import React, { useEffect, useState } from "react";
import StatusDropdown from "../components/common/StatusDropdown";
import useAuthStore from "../store/useAuthStore";
import useOrderStore from "../store/useOrderStore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// client/src/pages/admin/Orders.jsx

const Orders = () => {
    const { token } = useAuthStore();
    const { adminOrders, loading, error, loadAdminOrders, updateStatus } = useOrderStore();
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    
    // ✅ নতুন: স্ট্যাটাস ড্রপডাউনের জন্য অপশন
    const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    useEffect(() => {
        if (token) {
            loadAdminOrders(token);
        }
    }, [token, loadAdminOrders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateStatus(orderId, newStatus, token);
            toast.success("Order status updated successfully!");
        } catch (err) {
            toast.error("Failed to update status. Please try again.");
        }
    };

    // Filter applied orders
    const filteredOrders = adminOrders.filter((order) => {
        const matchesSearch =
            order._id.toLowerCase().includes(searchText.toLowerCase()) ||
            order.user.fullName.toLowerCase().includes(searchText.toLowerCase());

        const matchesStatus = filterStatus && filterStatus !== 'All' ? order.status === filterStatus : true;

        const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
        const matchesDate = filterDate ? orderDate === filterDate : true;

        return matchesSearch && matchesStatus && matchesDate;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / perPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, filterStatus, filterDate]);

    if (loading) return <div className="p-6 bg-white rounded-lg shadow text-center text-lg font-medium text-gray-700">Loading orders...</div>;
    if (error) return <div className="p-6 bg-red-100 rounded-lg shadow text-red-700 font-medium">Error: {error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h2>

                {/* Filters Section */}
                <div className="mb-6 flex flex-wrap items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-grow max-w-sm border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    {/* ✅ এখানে options প্রপসটি যোগ করা হয়েছে */}
                    <StatusDropdown 
                        currentStatus={filterStatus} 
                        onChange={setFilterStatus} 
                        options={statusOptions}
                    />
                    
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 uppercase">Order ID</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase">Customer</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase">Total</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase">Date</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase">Status</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {paginatedOrders.length > 0 ? (
                                paginatedOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">{order._id.substring(18)}...</td>
                                        <td className="p-4 text-gray-600">{order.user.fullName}</td>
                                        <td className="p-4 text-gray-600">₹{order.totalAmount.toFixed(2)}</td>
                                        <td className="p-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            {/* ✅ এখানে ড্রপডাউনের সাথে badge যোগ করা হয়েছে */}
                                            <div className="flex items-center gap-2">
                                                <StatusDropdown
                                                    currentStatus={order.status}
                                                    onChange={(newStatus) => handleStatusChange(order._id, newStatus)}
                                                    options={statusOptions.filter(opt => opt !== 'All')}
                                                />
                                                <OrderStatusBadge status={order.status} />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Link
                                                to={`/admin/orders/${order._id}`}
                                                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-500">No orders found matching the criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Orders;
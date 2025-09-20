import React from "react";

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-700';
        case 'Processing':
            return 'bg-blue-100 text-blue-700';
        case 'Shipped':
            return 'bg-purple-100 text-purple-700';
        case 'Delivered':
            return 'bg-green-100 text-green-700';
        case 'Cancelled':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const OrderStatusBadge = ({ status }) => {
    const colorClass = getStatusColor(status);
    return (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${colorClass}`}>
            {status}
        </span>
    );
};

export default OrderStatusBadge;
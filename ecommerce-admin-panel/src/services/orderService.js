import axios from "axios";

// client/src/services/orderService.js

const API_URL = "http://localhost:4000/api/orders";

// Create a new order (for both COD and Online)
export const createOrder = async (orderData, token) => {
    try {
        const response = await axios.post(API_URL, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Fetch all orders for admin
export const fetchAdminOrders = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.orders;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Fetch orders for a specific user
export const fetchUserOrders = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/my-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.orders;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update order status - Used by Admin Panel
export const updateOrderStatus = async (orderId, status, token) => {
    try {
        const response = await axios.put(`${API_URL}/admin/${orderId}`, { status }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Fetch single order details by ID (for admin)
export const fetchOrderDetails = async (orderId, token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.order;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Cancel a user's order
export const cancelOrder = async (orderId, token) => {
    try {
        const response = await axios.put(`${API_URL}/${orderId}/cancel`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
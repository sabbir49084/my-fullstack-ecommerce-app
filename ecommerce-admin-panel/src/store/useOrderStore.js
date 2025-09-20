import { create } from "zustand";
import { fetchAdminOrders, updateOrderStatus } from "../services/orderService";

// client/src/store/useOrderStore.js

const useOrderStore = create((set, get) => ({
    adminOrders: [],
    loading: false,
    error: null,

    loadAdminOrders: async (token) => {
        set({ loading: true, error: null });
        try {
            const orders = await fetchAdminOrders(token);
            set({ adminOrders: orders, loading: false });
        } catch (error) {
            set({ error: error.message || "Failed to fetch orders", loading: false });
        }
    },

    updateOrderInStore: (updatedOrder) => {
        set((state) => ({
            adminOrders: state.adminOrders.map((order) =>
                order._id === updatedOrder._id ? updatedOrder : order
            ),
        }));
    },

    updateStatus: async (orderId, status, token) => {
        try {
            const updatedOrder = await updateOrderStatus(orderId, status, token);
            get().updateOrderInStore(updatedOrder.order);
        } catch (error) {
            set({ error: error.message || "Failed to update status" });
            throw error;
        }
    }
}));

export default useOrderStore;
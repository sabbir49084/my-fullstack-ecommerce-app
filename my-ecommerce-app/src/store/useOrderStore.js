import { create } from "zustand";
import { fetchAdminOrders, fetchUserOrders } from "../services/orderService";

// client/src/store/useOrderStore.js

const useOrderStore = create((set) => ({
  orders: [], // Admin orders
  userOrders: [], // ✅ New state for user orders
  loading: false,
  error: null,

  loadAdminOrders: async (token) => {
    set({ loading: true, error: null });
    try {
      const orders = await fetchAdminOrders(token);
      set({ orders, loading: false });
    } catch (error) {
      set({ error: error.message || "Failed to fetch orders", loading: false });
    }
  },

  // ✅ New action to load user's orders
  loadUserOrders: async (token) => {
    set({ loading: true, error: null });
    try {
      const userOrders = await fetchUserOrders(token);
      set({ userOrders, loading: false });
    } catch (error) {
      set({ error: error.message || "Failed to fetch user orders", loading: false });
    }
  },
  
  updateOrderInStore: (updatedOrder) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      ),
    }));
  },
}));

export default useOrderStore;
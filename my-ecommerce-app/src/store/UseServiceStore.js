import { create } from "zustand";

import {
  getAllServices,
  addService,
  updateService,
  deleteService,
} from "../services/ServiceService";

const useServiceStore = create((set, get) => ({
  services: [],
  loading: false,

  // ✅ সব services লোড
  fetchServices: async () => {
    set({ loading: true });
    try {
      const data = await getAllServices();
      set({ services: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch services:", err);
      set({ loading: false });
    }
  },

  // ✅ নতুন service add
  createService: async (formData) => {
    try {
      await addService(formData);
      await get().fetchServices(); // refresh list
    } catch (err) {
      console.error("Failed to add service:", err);
    }
  },

  // ✅ service update
  editService: async (id, formData) => {
    try {
      await updateService(id, formData);
      await get().fetchServices();
    } catch (err) {
      console.error("Failed to update service:", err);
    }
  },

  // ✅ service delete
  removeService: async (id) => {
    try {
      await deleteService(id);
      await get().fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  },
}));

export default useServiceStore;

import { create } from "zustand";

const useInvoiceStore = create((set) => ({
  invoices: [],
  loading: false,
  setInvoices: (data) => set({ invoices: data }),
  setLoading: (status) => set({ loading: status }),
}));

export default useInvoiceStore;

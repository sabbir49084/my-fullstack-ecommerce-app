import { create } from "zustand";

const useForestryStore = create((set) => ({
  forestryServices: [],
  loading: false,
  setForestryServices: (services) => set({ forestryServices: services }),
  setLoading: (val) => set({ loading: val }),
}));

export default useForestryStore;

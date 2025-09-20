import { create } from "zustand";

const useServiceStore = create((set) => ({
  services: [],
  setServices: (data) => set({ services: data }),
}));

export default useServiceStore;

import { create } from "zustand";

// clients/navstor.js

export const useNavStore = create((set) => ({
  navigations: [],
  logo: null,
  setNavs: (navs, logo) => set({ navigations: navs, logo: logo }),
  // নতুন যোগ করা ফাংশন
  addNav: (nav) => set((state) => ({ navigations: [...state.navigations, nav] })),
  updateNav: (updatedNav) =>
    set((state) => ({
      navigations: state.navigations.map((nav) =>
        nav._id === updatedNav._id ? updatedNav : nav
      ),
    })),
  deleteNav: (id) =>
    set((state) => ({
      navigations: state.navigations.filter((nav) => nav._id !== id),
    })),
  setLogo: (logo) => set({ logo: logo }), // লোগো সেট করার জন্য একটি ডেডিকেটেড ফাংশন
}));
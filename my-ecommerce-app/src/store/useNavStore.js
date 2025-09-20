import { create } from "zustand";

export const useNavStore = create((set) => ({
    navigations: [],
    logo: null,
    setNavs: (navs, logo) => set({ navigations: navs, logo: logo }),
}));
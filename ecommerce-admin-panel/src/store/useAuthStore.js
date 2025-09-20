import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUser: (user, token) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    set({ user, token });
  },

  loadUser: () => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    const token = localStorage.getItem("authToken");
    if (user && token) {
      set({ user, token });
    }
  },

  logout: () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("clientUser")) || null,
  token: localStorage.getItem("clientToken") || null,
  // ✅ এখানে isLoggedIn স্টেটটি যোগ করা হয়েছে
  isLoggedIn: !!localStorage.getItem("clientToken"),

  // ✅ Login / Signup success এ call হবে
  setUser: (user, token) => {
    localStorage.setItem("clientUser", JSON.stringify(user));
    localStorage.setItem("clientToken", token);
    set({ user, token, isLoggedIn: true });
  },

  // ✅ Logout
  logout: () => {
    localStorage.removeItem("clientUser");
    localStorage.removeItem("clientToken");
    set({ user: null, token: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
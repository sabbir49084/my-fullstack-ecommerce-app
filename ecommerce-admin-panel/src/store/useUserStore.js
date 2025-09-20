import { create } from "zustand";

// store/useUserStore.js

const useUserStore = create((set, get) => ({
  users: [],
  total: 0,
  page: 1,
  limit: 10,
  search: "",
  roleFilter: "",
  statusFilter: "",
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const { page, limit, search, roleFilter, statusFilter } = get();
      const query = new URLSearchParams({
        page,
        limit,
        search,
        role: roleFilter,
        status: statusFilter,
      });

      const res = await fetch(`http://localhost:4000/api/users?${query}`);
      const data = await res.json();

      set({
        users: data.users || [],
        total: data.total || 0,
        loading: false,
      });
    } catch (err) {
      set({ error: "Failed to fetch users", loading: false });
    }
  },

  // ✅ Search state setter
  setSearch: (search) => set({ search }),

  // ✅ Page state setter
  setPage: (page) => set({ page }),

  // ✅ Filters
  setRoleFilter: (role) => set({ roleFilter: role }),
  setStatusFilter: (status) => set({ statusFilter: status }),

  // ✅ User actions
  updateRole: (userId, newRole) =>
    set((state) => ({
      users: state.users.map((u) =>
        u._id === userId ? { ...u, role: newRole } : u
      ),
    })),

  updateStatus: (userId, isActive) =>
    set((state) => ({
      users: state.users.map((u) =>
        u._id === userId ? { ...u, isActive } : u
      ),
    })),

  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((u) => u._id !== userId),
    })),
}));

export default useUserStore;

import { create } from "zustand";

// ✅ useBlogStore.jsx (src/store/useBlogStore.jsx)

export const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  addBlog: (blog) => set((state) => ({ blogs: [blog, ...state.blogs] })),
}));

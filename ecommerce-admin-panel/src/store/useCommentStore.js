import { create } from "zustand";

const useCommentStore = create((set) => ({
  comments: [],
  loading: false,

  fetchComments: async (blogId) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `http://localhost:4000/api/comments/admin/${blogId}`
      );
      const data = await response.json();
      set({ comments: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      set({ loading: false });
    }
  },

  approve: async (id) => {
    try {
      await fetch(`http://localhost:4000/api/comments/approve/${id}`, {
        method: "PUT",
      });
      set((state) => ({
        comments: state.comments.map((c) =>
          c._id === id ? { ...c, isApproved: true } : c
        ),
      }));
    } catch (error) {
      console.error("Failed to approve comment:", error);
    }
  },

  remove: async (id) => {
    try {
      await fetch(`http://localhost:4000/api/comments/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        comments: state.comments.filter((c) => c._id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  },

  reply: async (id, replyText) => {
    try {
      await fetch(`http://localhost:4000/api/comments/reply/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replyText }),
      });
      set((state) => ({
        comments: state.comments.map((c) =>
          c._id === id ? { ...c, reply: replyText } : c
        ),
      }));
    } catch (error) {
      console.error("Failed to reply to comment:", error);
    }
  }, // <-- এখানে কমা (,) যোগ করুন
}));

export default useCommentStore;
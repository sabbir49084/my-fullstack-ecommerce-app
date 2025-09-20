import { create } from "zustand";

import {
  getAllMessages,
  postMessage,
  replyToMessage,
} from "../services/messageService";

const useMessageStore = create((set) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true });
    try {
      const data = await getAllMessages();
      set({ messages: data, loading: false });
    } catch (err) {
      set({ error: "Failed to load messages", loading: false });
    }
  },

  addMessage: async (newMsg) => {
    try {
      const saved = await postMessage(newMsg);
      set((state) => ({
        messages: [...state.messages, saved],
      }));
    } catch (err) {
      console.error(err);
    }
  },

  replyMessage: async (id, replyText) => {
    try {
      const updated = await replyToMessage(id, replyText);
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === id ? { ...m, reply: updated.reply } : m
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useMessageStore;

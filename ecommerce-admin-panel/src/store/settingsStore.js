import { create } from "zustand";

/* eslint-disable no-undef */

// stores/settingsStore.js

export const useSettingsStore = create((set) => ({
  settings: {},
  loading: false,
  error: null,
  
  fetchSettings: async () => {
    set({ loading: true });
    try {
      const response = await SettingsService.getSettings();
      set({ settings: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateSettings: async (newSettings) => {
    set({ loading: true });
    try {
      const response = await SettingsService.updateSettings(newSettings);
      set({ settings: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
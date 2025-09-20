import api from "./api";

// services/settingsService.js

const SettingsService = {
  getSettings: () => {
    return api.get('/settings');
  },
  
  updateSettings: (settings) => {
    return api.put('/settings', settings);
  },
  
  // For access control
  getUsers: () => {
    return api.get('/users/access');
  },
  
  addUser: (userData) => {
    return api.post('/users/access', userData);
  },
  
  removeUser: (userId) => {
    return api.delete(`/users/access/${userId}`);
  },
  
  // For backup functionality
  createBackup: () => {
    return api.post('/backup');
  },
  
  restoreBackup: (backupId) => {
    return api.post(`/backup/${backupId}/restore`);
  },
};

export default SettingsService;
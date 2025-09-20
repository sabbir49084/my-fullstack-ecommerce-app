import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // আপনার server এর baseURL
});

// ✅ প্রতিবার request করার আগে localStorage থেকে token নিয়ে header এ বসাবে
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // login এর সময় token save করেছিলেন
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

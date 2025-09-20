import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

// Fetch কে Axios দিয়ে প্রতিস্থাপন করুন
export const signup = async (userData) => {
  const res = await axios.post(`${API}/auth/signup`, userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post(`${API}/auth/login`, credentials);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
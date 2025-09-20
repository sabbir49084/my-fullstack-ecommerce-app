import axios from "axios";

// src/services/ServiceService.js

const API_URL = "http://localhost:4000/api/services";

// সব services আনবে
export const getAllServices = async () => {
  const res = await axios.get(API_URL);
  console.log("👉 API Response:", res.data); // debug
  return res.data; // array as it is
};

// নতুন service add করবে
export const addService = async (formData) => {
  const res = await axios.post(API_URL, formData);
  return res.data;
};

// service update করবে
export const updateService = async (id, formData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData);
  return res.data;
};

// service delete করবে
export const deleteService = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// single service আনবে
export const getServiceById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

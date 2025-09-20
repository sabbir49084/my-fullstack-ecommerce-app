import axios from "axios";

const API_URL = "http://localhost:4000/api/services";

// ✅ সব services আনবে
export const getAllServices = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// ✅ নতুন service add করবে
export const addService = async (formData) => {
  await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ service update করবে
export const updateService = async (id, formData) => {
  await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ service delete করবে
export const deleteService = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// ✅ single service fetch করার জন্য
export const getServiceById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

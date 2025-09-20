import axios from "axios";

const API_URL = "http://localhost:4000/api/navs";

export const getNavs = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addNav = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateNav = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteNav = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// নতুন ফাংশন uploadLogo
export const uploadLogo = async (file) => {
  const formData = new FormData();
  formData.append("logo", file);

  const res = await axios.post(`${API_URL}/logo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

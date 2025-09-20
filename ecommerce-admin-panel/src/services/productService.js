import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createProduct = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, formData); // 👈 Headers সরিয়ে ফেলা হয়েছে
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, formData); // 👈 Headers সরিয়ে ফেলা হয়েছে
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
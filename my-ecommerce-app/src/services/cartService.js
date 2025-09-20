import axios from "axios";

// services/cartService.js


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const config = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const getCart = async (token) => {
  const response = await axios.get(`${API_URL}/cart`, config(token));
  return response.data;
};

export const addToCart = async (token, productData) => {
  const response = await axios.post(`${API_URL}/cart`, productData, config(token));
  return response.data;
};

export const updateCartItem = async (token, productId, quantity) => {
  const response = await axios.put(`${API_URL}/cart`, { productId, quantity }, config(token));
  return response.data;
};

export const removeCartItem = async (token, productId) => {
  const response = await axios.delete(`${API_URL}/cart/${productId}`, config(token));
  return response.data;
};
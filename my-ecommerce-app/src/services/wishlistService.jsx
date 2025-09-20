import axios from "axios";

// services/wishlistService.js


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const config = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const getWishlist = async (token) => {
  const response = await axios.get(`${API_URL}/wishlist`, config(token));
  return response.data;
};

export const addToWishlist = async (token, productId) => {
  const response = await axios.post(`${API_URL}/wishlist`, { productId }, config(token));
  return response.data;
};

export const removeFromWishlist = async (token, productId) => {
  const response = await axios.delete(`${API_URL}/wishlist/${productId}`, config(token));
  return response.data;
};
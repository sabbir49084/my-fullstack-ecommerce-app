import API from "./axios";

export const addToCartAPI = (productId, quantity = 1) =>
  API.post("/cart", { productId, quantity });

export const getCartAPI = () => API.get("/cart");

export const removeFromCartAPI = (productId) =>
  API.delete(`/cart/${productId}`);

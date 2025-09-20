import axios from "axios";

const API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = () => axios.get(API_URL);

export const fetchProductById = (id) => axios.get(`${API_URL}/${id}`);

export const createProduct = (productData) => axios.post(API_URL, productData);

export const updateProduct = (id, productData) => axios.put(`${API_URL}/${id}`, productData);

export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

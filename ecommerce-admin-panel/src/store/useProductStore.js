import { create } from "zustand";

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductById, // ✅ New import for fetching a single product
} from "../services/productService";

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  // Action to fetch all products
  loadProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProducts();
      set({ products: data, loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to fetch products.", loading: false });
    }
  },

  // ✅ New action to fetch a single product by ID
  getProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProductById(id);
      set({ loading: false });
      return data;
    } catch (err) {
      set({ error: err.message || "Failed to fetch product.", loading: false });
      return null;
    }
  },

  // Action to add a new product
  addProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await createProduct(productData);
      set((state) => ({ 
        products: [...state.products, newProduct], 
        loading: false 
      }));
      get().loadProducts(); 
    } catch (err) {
      set({ error: err.message || "Failed to add product.", loading: false });
      throw err;
    }
  },

  // Action to update an existing product
  updateProduct: async (id, productData) => {
    set({ loading: true, error: null });
    try {
      const updatedProduct = await updateProduct(id, productData);
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? updatedProduct : p
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Failed to update product.", loading: false });
      throw err;
    }
  },

  // Action to delete a product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Failed to delete product.", loading: false });
      throw err;
    }
  },
}));

export default useProductStore;

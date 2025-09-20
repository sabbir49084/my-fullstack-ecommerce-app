import useAuthStore from "./useAuthStore";
import { create } from "zustand";

// store/useCartStore.js

import { 
  addToCart as addToCartApi,
  getCart, 
  updateCartItem as updateCartItemApi,
  removeCartItem as removeCartItemApi 
} from "../services/cartService";

const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,
  loading: false,
  error: null,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  fetchCart: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loading: true, error: null });
    try {
      const cart = await getCart(token);
      set({ cartItems: cart.items || [], loading: false });
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      set({ error: "Failed to fetch cart.", loading: false });
    }
  },

  addToCart: async (product) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const updatedCart = await addToCartApi(token, {
        productId: product._id,
        quantity: product.quantity,
      });

      set({ cartItems: updatedCart.items, loading: false });
      
    } catch (err) {
      console.error("Failed to add to cart:", err);
      set({ error: "Failed to add to cart.", loading: false });
      throw err;
    }
  },

  updateQuantity: async (productId, quantity) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    const oldCart = get().cartItems;
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product._id === productId ? { ...item, quantity: quantity } : item
      ),
    }));

    try {
      await updateCartItemApi(token, productId, quantity);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      set({ cartItems: oldCart, error: "Failed to update quantity." });
    }
  },

  removeFromCart: async (productId) => {
    const token = useAuthStore.getState().token;
    if (!token) return;
    
    const oldCart = get().cartItems;
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product._id !== productId),
    }));

    try {
      await removeCartItemApi(token, productId);
    } catch (err) {
      console.error("Failed to remove item:", err);
      set({ cartItems: oldCart, error: "Failed to remove item." });
    }
  },
}));

export default useCartStore;
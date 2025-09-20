import useAuthStore from "./useAuthStore";
import { create } from "zustand";

// store/useWishlistStore.js

import {
  addToWishlist as addToWishlistApi,
  getWishlist,
  removeFromWishlist as removeFromWishlistApi,
} from "../services/wishlistService";

const useWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,
  error: null,

  fetchWishlist: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ loading: true, error: null });
    try {
      const wishlistData = await getWishlist(token);
      set({ wishlist: wishlistData.items || [], loading: false });
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      set({ error: "Failed to fetch wishlist.", loading: false });
    }
  },

  addItem: async (product) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      // Handle not logged in state
      return;
    }

    const { wishlist } = get();
    // Check if the product is already in the wishlist before making API call
    if (wishlist.some(item => item.product?._id === product._id)) {
        console.log("Product is already in wishlist.");
        return;
    }

    try {
      const updatedWishlist = await addToWishlistApi(token, product._id);
      set({ wishlist: updatedWishlist.items });
      return { success: true, message: "Product added to wishlist!" };
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      return { success: false, message: "Failed to add product to wishlist." };
    }
  },

  removeItem: async (productId) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    const oldWishlist = get().wishlist;
    // Optimistic update
    set({
      wishlist: oldWishlist.filter((item) => item.product?._id !== productId),
    });

    try {
      await removeFromWishlistApi(token, productId);
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      set({ wishlist: oldWishlist, error: "Failed to remove from wishlist." });
    }
  },
}));

export default useWishlistStore;
import { create } from "zustand";
import { getProductReviews, submitNewReview } from "../services/reviewService";

// store/useReviewStore.js


const useReviewStore = create((set) => ({
  reviews: [],
  loading: false,
  error: null,

  /**
   * Fetches reviews for a given product and updates the store.
   * @param {string} productId - The ID of the product.
   */
  fetchReviews: async (productId) => {
    set({ loading: true, error: null });
    try {
      const reviews = await getProductReviews(productId);
      set({ reviews, loading: false });
    } catch (err) {
      set({ error: "Failed to load reviews.", loading: false });
    }
  },

  /**
   * Submits a new review.
   * @param {object} reviewData - The review data to submit.
   * @param {string} token - The user's authentication token.
   */
  addReview: async (reviewData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await submitNewReview(reviewData, token);
      // Optimistically add the new review to the list
      set((state) => ({
        reviews: [response.review, ...state.reviews],
        loading: false,
        error: null,
      }));
      return { success: true, message: "Review submitted successfully!" };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to submit review. Please try again.";
      set({ error: errorMessage, loading: false });
      return { success: false, message: errorMessage };
    }
  },
}));

export default useReviewStore;
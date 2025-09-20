import axios from "axios";

// services/reviewService.js


// API base URL
const API_URL = "http://localhost:4000/api/reviews";

// Helper function to create an authenticated header
const createAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Fetches all reviews for a specific product.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<Array>} A promise that resolves to an array of reviews.
 */
export const getProductReviews = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

/**
 * Submits a new review for a product.
 * @param {object} reviewData - The review data to be submitted.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<object>} A promise that resolves to the new review object.
 */
export const submitNewReview = async (reviewData, token) => {
  try {
    const response = await axios.post(
      API_URL,
      reviewData,
      createAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import useReviewStore from "../../store/useReviewStore";
import { FiStar } from "react-icons/fi";

const ReviewSection = ({ productId }) => {
  const { reviews, loading, error, fetchReviews, addReview } = useReviewStore();
  const { token, isLoggedIn } = useAuthStore();
  const [newReview, setNewReview] = useState({ reviewText: "", rating: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    fetchReviews(productId);
  }, [productId, fetchReviews]);

  const handleRatingClick = (rating) => {
    if (isLoggedIn) {
      setNewReview({ ...newReview, rating });
    } else {
      useReviewStore.setState({ error: "You must be logged in to submit a review." });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormSuccess("");
    useReviewStore.setState({ error: null });

    if (!isLoggedIn) {
      useReviewStore.setState({ error: "You must be logged in to submit a review." });
      setSubmitting(false);
      return;
    }

    const reviewData = {
      productId,
      reviewText: newReview.reviewText,
      rating: newReview.rating,
    };

    const result = await addReview(reviewData, token);
    
    if (result.success) {
      setFormSuccess(result.message);
      setNewReview({ reviewText: "", rating: 0 });
    } else {
      // The error message is already set in the store by the addReview function.
    }
    
    setSubmitting(false);
  };

  const getStarIcons = (rating, isInteractive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={`star-${i}`}
          className={`text-xl cursor-pointer transition-colors duration-200 ${
            (isInteractive && newReview.rating >= i) || (!isInteractive && rating >= i)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
          onClick={isInteractive ? () => handleRatingClick(i) : undefined}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Customer questions & answers
      </h3>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">
                {review.userName || "Anonymous"}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex mb-2">
                {getStarIcons(review.rating)}
            </div>
            <p className="text-gray-600">{review.reviewText}</p>
          </div>
        ))
      ) : (
        !loading && <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
        Add a review
      </h3>
      <form onSubmit={handleSubmitReview}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="reviewText"
          >
            Write a Review
          </label>
          <textarea
            id="reviewText"
            className="w-full h-32 p-4 border rounded-md focus:ring focus:ring-purple-200 resize-none"
            placeholder={isLoggedIn ? "Write your review here..." : "You must be logged in to write a review."}
            value={newReview.reviewText}
            onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
            required
            disabled={!isLoggedIn}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Your Rating
          </label>
          <div className="flex text-2xl text-gray-300">
            {getStarIcons(newReview.rating, true)}
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
        <button
          type="submit"
          className="py-2 px-6 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300 disabled:bg-purple-300 disabled:cursor-not-allowed"
          disabled={submitting || newReview.rating === 0 || !isLoggedIn}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
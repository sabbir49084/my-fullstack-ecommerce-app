import React from "react";
import useCartStore from "../../store/useCartStore";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../store/useWishlistStore";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { wishlist, addItem, removeItem } = useWishlistStore();

  const isInWishlist = wishlist.some((item) => item.product?._id === product._id);

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeItem(product._id);
    } else {
      addItem(product);
    }
    navigate("/mylist");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    navigate("/cart");
  };

  const handleViewDetails = () => {
    navigate(`/product-details/${product._id}`, { state: { product } });
  };

  const handleZoom = (e) => {
    e.stopPropagation();
    navigate(`/product-zoom/${product._id}`, { state: { product } });
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++)
      stars.push(<FiStar key={i} className="text-yellow-400 fill-current" />);
    for (let i = fullStars; i < 5; i++)
      stars.push(<FiStar key={i} className="text-gray-300" />);
    return stars;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer w-full max-w-sm"
      onClick={handleViewDetails}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          onClick={handleZoom}
        />
        <button
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors ${
            isInWishlist
              ? "bg-red-100 text-red-600"
              : "bg-white text-gray-600 hover:bg-red-100 hover:text-red-600"
          }`}
          onClick={handleAddToWishlist}
        >
          <FiHeart />
        </button>
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-800 mb-2 hover:text-green-600"
          onClick={handleViewDetails}
        >
          {product.title}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex">{getRatingStars(product.rating)}</div>
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <FiShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

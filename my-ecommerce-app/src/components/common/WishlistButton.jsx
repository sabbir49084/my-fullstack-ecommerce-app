import Notification from "./Notification";
import React, { useState } from "react";
import useWishlistStore from "../../store/useWishlistStore";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

// src/components/common/WishlistButton.js


const WishlistButton = ({ product }) => {
  const { wishlist, addItem, removeItem } = useWishlistStore();
  const [notification, setNotification] = useState(null);

  const isProductInWishlist = Array.isArray(wishlist) && wishlist.some((item) => item.product?._id === product?._id);

  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    if (!product) return;

    if (isProductInWishlist) {
      const wishlistItem = wishlist.find(item => item.product?._id === product._id);
      if(wishlistItem) {
        await removeItem(wishlistItem.product._id);
        setNotification({ message: "Product removed from wishlist!", type: "success" });
      }
    } else {
      const result = await addItem(product);
      if(result && result.success) {
          setNotification({ message: result.message, type: "success" });
      } else if (result && !result.success) {
          setNotification({ message: result.message, type: "error" });
      }
    }
  };

  return (
    <>
      <div
        onClick={handleToggleWishlist}
        data-tooltip-id="wishlist-tooltip"
        data-tooltip-content={isProductInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        className={`
          w-12 h-12 flex items-center justify-center rounded-full
          transition-colors duration-300 cursor-pointer
          ${isProductInWishlist 
            ? 'bg-red-500 text-white' 
            : 'bg-white text-gray-600 hover:bg-green-500 hover:text-white'
          }
        `}
      >
        {isProductInWishlist ? (
          <FaHeart className="w-6 h-6" />
        ) : (
          <FiHeart className="w-6 h-6" />
        )}
      </div>
      <Tooltip id="wishlist-tooltip" effect="solid" place="top" className="text-sm z-50" />
      {notification && <Notification message={notification.message} type={notification.type} />}
    </>
  );
};

export default WishlistButton;
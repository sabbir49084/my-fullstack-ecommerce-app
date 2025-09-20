import React, { useEffect } from "react";
import useWishlistStore from "../store/useWishlistStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// components/pages/MyList.js


const MyList = () => {
  const { wishlist, fetchWishlist, removeItem, loading } = useWishlistStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <p>Loading...</p>;

  const goToDetails = (item) => {
    navigate(`/product-details/${item.product?._id}`, { state: { product: item.product } });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">MY LIST</h1>
      <p className="mb-4 text-gray-600">
        There are <span className="font-semibold">{wishlist.length}</span>{" "}
        products in your My List
      </p>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Unit Price</th>
                <th className="px-4 py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item._id} className="border-t">
                  <td
                    className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => goToDetails(item)}
                  >
                    <img
                      src={item.product?.image}
                      alt={item.product?.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium">{item.product?.title}</span>
                  </td>
                  <td className="px-4 py-3">৳{item.product?.price}</td>
                  <td className="px-4 py-3">
                    <button
                      // ✅ removeItem ফাংশনে productId পাঠানো হচ্ছে
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyList;
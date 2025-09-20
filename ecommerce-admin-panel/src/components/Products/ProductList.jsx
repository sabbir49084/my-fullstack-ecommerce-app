import React, { useEffect } from "react";
import useProductStore from "../../store/useProductStore";
import { FiEdit, FiFileText, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  // ✅ Loading state and actions from useProductStore.
  const { products, loading, error, loadProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ✅ Function to handle product deletion
  const handleDelete = async (id) => {
    // We'll use a confirmation prompt to confirm with the user.
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        // If successful, show a message.
        alert("Product deleted successfully!");
      } catch (err) {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="ml-4 text-gray-700 dark:text-gray-300">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10 text-center">
        <FiFileText className="text-red-500 text-5xl mb-4" />
        <p className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">{error}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Please check your network connection and try again.</p>
        <button
          onClick={loadProducts}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Product Management</h2>
        <Link
          to="/admin/add-product"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <FiPlus className="mr-2" /> Add New Product
        </Link>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products by name, category..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <select className="w-full md:w-auto border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
          <option>All Categories</option>
          <option>Feed</option>
          <option>Poultry</option>
          <option>Egg</option>
        </select>
        <select className="w-full md:w-auto border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
          <option>All Stock Status</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      {/* Product Table */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No products found. Add a new product to get started!</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={product.images[0] || 'https://placehold.co/40x40/E5E7EB/4B5563?text=No+Img'} alt={product.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{product.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{product.description.substring(0, 30)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                      {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* ✅ Clicking the edit button will navigate to the edit page */}
                    <Link to={`/admin/edit-product/${product._id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 mx-2">
                      <FiEdit className="inline-block" />
                    </Link>
                    {/* ✅ Clicking the delete button will delete the product */}
                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">
                      <FiTrash2 className="inline-block" />
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

export default ProductList;

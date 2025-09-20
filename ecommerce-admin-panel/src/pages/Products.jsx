import Modal from "../components/common/Modal";
import Pagination from "../components/common/Pagination";
import useProductStore from "../store/useProductStore";
import { useEffect, useState } from "react";
import { FiBox, FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  // Zustand store ব্যবহার করে state management
  const { products, loading, error, loadProducts, deleteProduct } = useProductStore();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterConfig, setFilterConfig] = useState({ category: 'all', stockStatus: 'all' });
  
  const navigate = useNavigate();

  // স্টোর থেকে পণ্য লোড করা
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedProductId);
      setModalOpen(false);
      setSelectedProductId(null);
    } catch {
      alert("Failed to delete product. Please try again.");
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setSelectedProductId(null);
  };

  // Zustand স্টোরের পণ্য তালিকা থেকে ফিল্টার করা
  const filteredProducts = products.filter(product => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);

    const matchesCategory = filterConfig.category === 'all' || product.category === filterConfig.category;

    const matchesStock = filterConfig.stockStatus === 'all' ||
      (filterConfig.stockStatus === 'inStock' && product.stock > 10) ||
      (filterConfig.stockStatus === 'lowStock' && product.stock > 0 && product.stock <= 10) ||
      (filterConfig.stockStatus === 'outOfStock' && product.stock === 0);
      
    return matchesSearch && matchesCategory && matchesStock;
  });

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600 bg-red-100" };
    if (stock <= 10) return { text: "Low Stock", color: "text-yellow-600 bg-yellow-100" };
    return { text: "In Stock", color: "text-green-600 bg-green-100" };
  };

  // স্টোরের ডেটার উপর ভিত্তি করে পরিসংখ্যান গণনা করা
  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.stock > 10).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  const categories = ['all', ...new Set(products.map(product => product.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory and listings</p>
        </div>
        <Link
          to="/admin/add-product"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="text-lg" />
          Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FiBox className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <h3 className="text-2xl font-bold">{totalProducts}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FiBox className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">In Stock</p>
              <h3 className="text-2xl font-bold">{inStockCount}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <FiBox className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Low Stock</p>
              <h3 className="text-2xl font-bold">{lowStockCount}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <FiBox className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Out of Stock</p>
              <h3 className="text-2xl font-bold">{outOfStockCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products by name, category..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterConfig.category}
              onChange={(e) => setFilterConfig({...filterConfig, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterConfig.stockStatus}
              onChange={(e) => setFilterConfig({...filterConfig, stockStatus: e.target.value})}
            >
              <option value="all">All Stock Status</option>
              <option value="inStock">In Stock</option>
              <option value="lowStock">Low Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List Table */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={product.images[0] || 'https://placehold.co/40x40/E5E7EB/4B5563?text=No+Img'} alt={product.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                        <div className="text-sm text-gray-500">{product.description.substring(0, 30)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatus(product.stock).color}`}>
                      {getStockStatus(product.stock).text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                      className="text-blue-600 hover:text-blue-900 mx-2"
                      title="Edit"
                    >
                      <FiEdit className="inline-block" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <FiTrash2 className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default Products;

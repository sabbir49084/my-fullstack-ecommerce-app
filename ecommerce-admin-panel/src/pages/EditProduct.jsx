import React, { useEffect, useState } from "react";
import { FiSave, FiTrash2, FiUpload, FiXCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    tags: "",
    seoTitle: "",
    seoDescription: "",
    images: [],
    rating: ""
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct({
          ...productData,
          images: [],
        });
        setImagePreviews(productData.images || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to load product data.");
        setLoading(false);
        navigate("/admin/products");
      }
    };
    loadProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const selectedFiles = Array.from(files).slice(0, 4);
      setProduct({ ...product, images: selectedFiles });
      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const removeImage = (indexToRemove) => {
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      product.images.forEach((img) => formData.append("images", img));
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("tags", product.tags);
      formData.append("seoTitle", product.seoTitle);
      formData.append("seoDescription", product.seoDescription);
      formData.append("rating", product.rating);

      await updateProduct(id, formData);
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Basic Information</h3>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={product.tags}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* SEO Optimization */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">SEO Optimization</h3>
          <div>
            <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">SEO Title</label>
            <input
              type="text"
              id="seoTitle"
              name="seoTitle"
              value={product.seoTitle}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">SEO Description</label>
            <textarea
              id="seoDescription"
              name="seoDescription"
              value={product.seoDescription}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Product Images */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Product Images</h3>
          <div className="flex items-center space-x-4">
            <label htmlFor="images" className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FiUpload className="mr-2" /> Upload Images
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">You can upload up to 4 images.</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                <img src={preview} alt={`Product preview ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FiXCircle className="mr-2" /> Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiSave className="mr-2" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

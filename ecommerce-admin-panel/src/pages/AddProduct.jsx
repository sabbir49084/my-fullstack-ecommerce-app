import React, { useEffect, useState } from "react";
import useProductStore from "../store/useProductStore";
import { FiEdit, FiEye, FiImage, FiPlus, FiSearch, FiTrash2, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProductStore();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    stock: "",
    category: "",
    tags: "",
    unit: "unit", // New state for product unit
    weight: "", // New state for product weight
    seoTitle: "",
    seoDescription: "",
    images: [],
    additionalInfo: [],
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [seoScore, setSeoScore] = useState(0);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [newInfoKey, setNewInfoKey] = useState("");
  const [newInfoValue, setNewInfoValue] = useState("");

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

  // 1. SEO Score: useEffect hook to re-calculate score when relevant fields change
  useEffect(() => {
    const calculateSeoScore = () => {
      let score = 0;
      // SEO Title length check
      if (product.seoTitle.length >= 30 && product.seoTitle.length <= 60) {
        score += 40;
      }
      // SEO Description length check
      if (product.seoDescription.length >= 120 && product.seoDescription.length <= 160) {
        score += 40;
      }
      // Keyword in SEO Title check
      if (product.title && product.seoTitle.toLowerCase().includes(product.title.toLowerCase())) {
        score += 20;
      }
      setSeoScore(score);
    };
    calculateSeoScore();
  }, [product.seoTitle, product.seoDescription, product.title]);

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({ ...product, images: newImages });
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleAddInfo = () => {
    if (newInfoKey && newInfoValue) {
      setProduct({
        ...product,
        additionalInfo: [...product.additionalInfo, { key: newInfoKey, value: newInfoValue }],
      });
      setNewInfoKey("");
      setNewInfoValue("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append all product data fields
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("tags", product.tags);
      formData.append("unit", product.unit); // New unit field
      formData.append("weight", product.weight); // New weight field
      formData.append("seoTitle", product.seoTitle);
      formData.append("seoDescription", product.seoDescription);
      formData.append("rating", product.rating);

      // Append image files
      product.images.forEach((img) => formData.append("images", img));

      // Append additionalInfo items
      formData.append("additionalInfo", JSON.stringify(product.additionalInfo));

      await addProduct(formData);

      alert("Product added successfully!");
      setProduct({
        title: "", description: "", price: "", rating: "", stock: "", category: "", tags: "",
        unit: "unit", weight: "", seoTitle: "", seoDescription: "", images: [], additionalInfo: []
      });
      setImagePreviews([]);
      setSeoScore(0);
      navigate("/admin/products");

    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Add New Product</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Create a new product with detailed information and SEO optimization</p>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
        <button className={`py-3 px-6 font-medium ${activeTab === "basic" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 dark:text-gray-400"}`} onClick={() => setActiveTab("basic")}>Basic Info</button>
        <button className={`py-3 px-6 font-medium ${activeTab === "images" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 dark:text-gray-400"}`} onClick={() => setActiveTab("images")}>Images</button>
        <button className={`py-3 px-6 font-medium ${activeTab === "seo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 dark:text-gray-400"}`} onClick={() => setActiveTab("seo")}>SEO Optimization</button>
        <button className={`py-3 px-6 font-medium ${activeTab === "additional" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 dark:text-gray-400"}`} onClick={() => setActiveTab("additional")}>Additional Info</button>
        <button className={`py-3 px-6 font-medium ${activeTab === "advanced" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 dark:text-gray-400"}`} onClick={() => setActiveTab("advanced")}>Advanced</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Product Title *</label>
                <input type="text" name="title" value={product.title} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Enter product title"/>
              </div>
              
              {/* 2. New Weight and Unit Input */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Price *</label>
                  <input type="number" name="price" value={product.price} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="0.00" step="0.01"/>
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Unit *</label>
                  <select name="unit" value={product.unit} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
                    <option value="unit">unit</option>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="piece">piece</option>
                  </select>
                </div>
              </div>
              
              {/* 3. New Weight Input field */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Weight (500g - 20kg)</label>
                <input type="number" name="weight" value={product.weight} onChange={handleChange} min="0.5" max="20" step="0.1" className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Enter weight"/>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Stock Quantity *</label>
                <input type="number" name="stock" value={product.stock} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Enter quantity"/>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Category *</label>
                <select name="category" value={product.category} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
                  <option value="">Select Category</option>
                  <option value="Feed">Feed</option>
                  <option value="Poultry">Poultry</option>
                  <option value="Egg">Egg</option>
                  <option value="Forestry">Forestry</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Product Description *</label>
              <textarea name="description" value={product.description} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 h-52 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Describe your product in detail..."></textarea>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{product.description.length}/2000 characters</p>
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === "images" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
              <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">Drag & drop images here or click to browse</p>
              <label className="bg-blue-600 text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300 inline-block">
                <FiImage className="inline mr-2" /> Select Images
                <input type="file" name="images" accept="image/*" multiple onChange={handleChange} className="hidden"/>
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Maximum 4 images (JPEG, PNG, WebP)</p>
            </div>
            {imagePreviews.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Image Previews</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-40 object-cover rounded-lg shadow"/>
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity duration-300">
                        <button type="button" onClick={() => removeImage(index)} className="text-white p-2 bg-red-500 rounded-full hover:bg-red-600 mx-1"><FiTrash2 /></button>
                        <button type="button" className="text-white p-2 bg-blue-500 rounded-full hover:bg-blue-600 mx-1"><FiEdit /></button>
                      </div>
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">{index === 0 ? "Main" : `Image ${index + 1}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">SEO Score</h3>
                <div className="text-2xl font-bold text-blue-600">{seoScore}/100</div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${seoScore}%` }}></div>
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Improve your SEO score by optimizing your title and description.</p>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">SEO Title</label>
              <input type="text" name="seoTitle" value={product.seoTitle} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Optimized title for search engines"/>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.seoTitle.length}/60 characters</p>
                {product.seoTitle.length >= 30 && product.seoTitle.length <= 60 ? (<p className="text-sm text-green-600">Good length</p>) : (<p className="text-sm text-red-600">Should be 30-60 characters</p>)}
              </div>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">SEO Description</label>
              <textarea name="seoDescription" value={product.seoDescription} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="Optimized description for search engines" rows="3"></textarea>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.seoDescription.length}/160 characters</p>
                {product.seoDescription.length >= 120 && product.seoDescription.length <= 160 ? (<p className="text-sm text-green-600">Good length</p>) : (<p className="text-sm text-red-600">Should be 120-160 characters</p>)}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center"><FiSearch className="mr-2" /> SEO Tips</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
                <li>Include your primary keyword in the title</li>
                <li>Write compelling descriptions that encourage clicks</li>
                <li>Use your target keywords naturally in the description</li>
                <li>Keep titles between 30-60 characters</li>
                <li>Keep descriptions between 120-160 characters</li>
              </ul>
            </div>
          </div>
        )}

        {/* Additional Info Tab */}
        {activeTab === "additional" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Add Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Attribute Name</label>
                <input type="text" value={newInfoKey} onChange={(e) => setNewInfoKey(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="e.g., Weight"/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Attribute Value</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={newInfoValue} onChange={(e) => setNewInfoValue(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="e.g., 20 LBS"/>
                  <button type="button" onClick={handleAddInfo} className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"><FiPlus /></button>
                </div>
              </div>
            </div>
            {product.additionalInfo.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Specifications</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Attribute</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                      {product.additionalInfo.map((info, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{info.key}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{info.value}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button type="button" onClick={() => {
                              const newInfo = [...product.additionalInfo];
                              newInfo.splice(index, 1);
                              setProduct({ ...product, additionalInfo: newInfo });
                            }} className="text-red-600 hover:text-red-900"><FiTrash2 /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === "advanced" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Rating (out of 5)</label>
                <input type="number" name="rating" value={product.rating} onChange={handleChange} min="0" max="5" step="0.1" className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="4.5"/>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                <input type="text" name="tags" value={product.tags} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" placeholder="tag1, tag2, tag3"/>
              </div>
            </div>
            <div className="space-y-5">
              {/* Other advanced options here */}
            </div>
          </div>
        )}

        {/* Navigation and Submit */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            {activeTab !== "basic" && (
              <button type="button" onClick={() => {
                const tabs = ["basic", "images", "seo", "additional", "advanced"];
                const currentIndex = tabs.indexOf(activeTab);
                setActiveTab(tabs[currentIndex - 1]);
              }} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">Previous</button>
            )}
          </div>
          <div className="flex space-x-4">
            {activeTab !== "advanced" && (
              <button type="button" onClick={() => {
                const tabs = ["basic", "images", "seo", "additional", "advanced"];
                const currentIndex = tabs.indexOf(activeTab);
                setActiveTab(tabs[currentIndex + 1]);
              }} className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 py-2 px-6 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition duration-300">Next</button>
            )}
            {activeTab === "advanced" && (
              <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"><FiEye className="mr-2" /> Preview & Submit</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
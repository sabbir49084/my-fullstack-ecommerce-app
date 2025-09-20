import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
        setError(null);
      } catch {
        setError("Failed to load product");
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <img src={product.images?.[0] || "/images/placeholder.png"} alt={product.title} className="w-full h-96 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-3">{product.description}</p>
      <p className="text-2xl font-semibold mb-3">${product.price.toFixed(2)}</p>
      <p className="text-yellow-500 mb-4">Rating: {product.rating} ⭐</p>

      <div className="flex items-center space-x-4 mb-6">
        <button onClick={decrement} className="px-3 py-1 bg-gray-300 rounded">-</button>
        <span>{quantity}</span>
        <button onClick={increment} className="px-3 py-1 bg-gray-300 rounded">+</button>
      </div>

      <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;

import AddToCartButton from "../components/common/AddToCartButton";
import CompareButton from "../components/common/CompareButton";
import React, { useEffect, useState } from "react";
import WishlistButton from "../components/common/WishlistButton";
import axios from "axios";
import useWishlistStore from "../store/useWishlistStore";
import { FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { wishlist, fetchWishlist, loading: wishlistLoading } = useWishlistStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        fetchWishlist();
    }, [fetchWishlist]);

    const handleViewDetails = (product) => {
        navigate(`/product-details/${product._id}`, { state: { product } });
    };

    const handleZoom = (product) => {
        navigate(`/product-zoom/${product._id}`, { state: { product } });
    };

    const getRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FiStar key={i} className="text-yellow-400 fill-current" />);
        }
        for (let i = fullStars; i < 5; i++) {
            stars.push(<FiStar key={`empty-${i}`} className="text-gray-300" />);
        }
        return stars;
    };

    if (loading || wishlistLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#aba3a9' }}>
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    <p className="mt-4 text-white">Loading products and wishlist...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#3A945B' }}>
                <div className="flex flex-col items-center text-white">
                    <p className="text-xl font-semibold mb-4">Error!</p>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#56d2fc' }}>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Available Products
                        </h2>
                        <p className="text-red-600 max-w-2xl mx-auto">
                            We take pride in offering fresh, healthy, and high-quality products
                            for your family.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {products.length === 0 ? (
                            <p className="col-span-full text-center text-gray-200 text-lg">
                                No products found. Please add some from the admin panel.
                            </p>
                        ) : (
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group relative hover:bg-green-50"
                                >
                                    <div
                                        className="relative h-48 overflow-hidden cursor-pointer"
                                        onClick={() => handleZoom(product)}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain p-2"
                                        />

                                        <div className="absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                            <WishlistButton product={product} />
                                            <CompareButton product={product} />
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3
                                                className="text-xl font-semibold text-red-600 cursor-pointer hover:text-green-600 transition-colors duration-300"
                                                onClick={() => handleViewDetails(product)}
                                            >
                                                {product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}
                                            </h3>
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {product.category}
                                            </span>
                                        </div>

                                        <div className="flex items-center mb-4">
                                            <div className="flex">{getRatingStars(product.rating)}</div>
                                            <span className="ml-2 text-sm text-gray-600">
                                                ({product.rating})
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <span className="text-xl font-bold text-green-700">
                                                R{product.price}
                                            </span>
                                            <span className="text-gray-600 text-sm ml-1">
                                                {product.unit ? `/ ${product.unit}` : ""}
                                            </span>
                                        </div>

                                        <AddToCartButton product={product} className="w-full">
                                            Add to Cart
                                        </AddToCartButton>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
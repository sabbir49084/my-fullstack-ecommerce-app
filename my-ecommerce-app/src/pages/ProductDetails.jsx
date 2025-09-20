import AddToCartButton from "../components/common/AddToCartButton";
import CompareButton from "../components/common/CompareButton";
import QuantityButton from "../components/common/QuantityButton";
import React, { useEffect, useState } from "react";
import ReviewSection from "../components/product/ReviewSection";
import WishlistButton from "../components/common/WishlistButton";
import axios from "axios";
import { FiStar } from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("description");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchAllData = async () => {
            let productData = null;
            try {
                if (location.state?.product && location.state.product._id === id) {
                    productData = location.state.product;
                } else {
                    const response = await axios.get(`http://localhost:4000/api/products/${id}`);
                    productData = response.data;
                }
                setProduct(productData);
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [id, location.state]);

    const getRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < fullStars; i++) stars.push(<FiStar key={i} className="text-yellow-400 fill-current" />);
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) stars.push(<FiStar key={`empty-${fullStars + i}`} className="text-gray-300" />);
        return stars;
    };

    const productImages = product?.images && product.images.length > 0
        ? product.images
        : [product?.image || "https://via.placeholder.com/500"];

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

    const tabClasses = (tab) => `
        py-3 px-6 font-semibold cursor-pointer transition-colors duration-300
        ${activeTab === tab
            ? "bg-purple-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
    `;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center text-red-600">
                    <p className="text-xl font-semibold mb-4">Error!</p>
                    <p>{error || "Product not found"}</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="text-sm text-gray-600 mb-6">
                <span className="cursor-pointer" onClick={() => navigate("/")}>Home / </span>
                <span className="cursor-pointer" onClick={() => navigate("/products")}>Products / </span>
                <span className="text-gray-800">{product.title}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                            src={productImages[0]}
                            alt={product.title}
                            className="w-full h-80 object-cover"
                        />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                    <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mr-2">{getRatingStars(product.rating)}</div>
                        <span className="text-gray-600">({product.rating} rating)</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-3xl font-bold text-green-700">R{product.price}</span>
                        <span className="text-gray-600 ml-1">
                            {product.weight && product.unit ? `/ ${product.weight} ${product.unit}` : `/ ${product.unit || 'unit'}`}
                        </span>
                    </div>

                    <div className="flex items-center mb-6">
                        <span className="mr-4 text-gray-700">Quantity:</span>
                        <QuantityButton
                            quantity={quantity}
                            onIncrement={increaseQuantity}
                            onDecrement={decreaseQuantity}
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <AddToCartButton product={{ ...product, quantity }} className="flex-1" />
                        <WishlistButton product={product} />
                        <CompareButton product={product} />
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <div className="flex border-b border-gray-300">
                    <button onClick={() => setActiveTab("description")} className={tabClasses("description")}>
                        Description
                    </button>
                    <button onClick={() => setActiveTab("additionalInfo")} className={tabClasses("additionalInfo")}>
                        Additional Info
                    </button>
                    <button onClick={() => setActiveTab("reviews")} className={tabClasses("reviews")}>
                        Reviews
                    </button>
                </div>

                <div className="bg-white p-6 rounded-b-md shadow-sm">
                    {activeTab === "description" && (
                        <div>
                            <p className="text-gray-700">{product.description}</p>
                        </div>
                    )}

                    {activeTab === "additionalInfo" && (
                        <div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {product.weight && (
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Weight</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.weight} {product.unit}</td>
                                        </tr>
                                    )}
                                    {product.additionalInfo && product.additionalInfo.length > 0 &&
                                        product.additionalInfo.map((info, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{info.key}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{info.value}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {(!product.additionalInfo || product.additionalInfo.length === 0) && !product.weight && (
                                <p className="text-gray-500 italic">No additional information available for this product.</p>
                            )}
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <ReviewSection productId={id} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
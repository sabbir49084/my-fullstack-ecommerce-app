import "react-inner-image-zoom/lib/styles.min.css";
import AddToCartButton from "../components/common/AddToCartButton";
import CompareButton from "../components/common/CompareButton";
import InnerImageZoom from "react-inner-image-zoom";
import QuantityButton from "../components/common/QuantityButton";
import React, { useEffect, useState } from "react";
import WishlistButton from "../components/common/WishlistButton";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductZoom = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const productResponse = await axios.get(`http://localhost:4000/api/products/${id}`);
                const productData = productResponse.data;
                setProduct(productData);

                const images = (productData.images && productData.images.length > 0) ? productData.images : [productData.image];
                setSelectedImage(images[0]);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id]);

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
                <p>{error || "Product not found"}</p>
            </div>
        );
    }

    const productImages = product.images && product.images.length > 0 ? product.images : [product.image || "https://via.placeholder.com/500"];

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Images */}
                <div>
                    <InnerImageZoom
                        src={selectedImage}
                        zoomSrc={selectedImage}
                        zoomType="hover"
                        className="rounded-xl border w-full h-auto"
                    />
                    <div className="flex gap-2 mt-4">
                        {productImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${product.title} view ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                                    selectedImage === img ? "ring-2 ring-green-500" : ""
                                }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div>
                    <h2 className="text-4xl font-bold text-green-800">{product.title}</h2>
                    {product.description && (
                        <p className="text-gray-700 mt-3">{product.description}</p>
                    )}
                    <p className="text-2xl mt-4 font-semibold text-green-700">
                        R{product.price}
                        <span className="text-gray-600 text-base ml-1">
                            {product.unit ? `/ ${product.unit}` : ""}
                        </span>
                    </p>

                    <div className="mt-6 flex flex-col gap-4">
                        {/* Quantity and Add to Cart Button */}
                        <div className="flex items-center gap-4">
                            <QuantityButton
                                quantity={quantity}
                                onDecrement={handleDecreaseQuantity}
                                onIncrement={handleIncreaseQuantity}
                            />
                            <AddToCartButton product={product} quantity={quantity} className="flex-1 px-6 py-3">
                                Add To Cart
                            </AddToCartButton>
                        </div>

                        {/* Wishlist and Compare Buttons */}
                        <div className="flex items-center gap-4">
                            <WishlistButton product={product} />
                            <CompareButton product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductZoom;
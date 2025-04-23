import React, { useState, useEffect } from "react";
import api from "../../../utils/axios.js";

const UpdateProductForm = ({ product }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MAX_IMAGES = 3;
    const DEFAULT_IMAGE = "/placeholder.png";

    // Fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    // Populate form with product data when component mounts or product changes
    useEffect(() => {
        if (product) {
            console.log('Product data received:', product);
            setName(product.name || "");
            setCategory(product.category_id || "");
            setPrice(product.price || "");
            setDiscountPercentage(product.discount_percentage || "");
            setDescription(product.description || "");

            // Reset image states
            setImages([]);
            setImagePreviews([]);

            // Handle product images
            if (product.images && product.images.length > 0) {
                // If images is a string, convert to array with single item
                const imageArray = Array.isArray(product.images)
                    ? product.images
                    : [product.images];

                setImages(imageArray);

                // Create preview URLs
                const previews = imageArray.map(img => {
                    if (!img) return DEFAULT_IMAGE;
                    if (img.startsWith('data:') || img.startsWith('http')) {
                        return img;
                    } else {
                        return `${import.meta.env.VITE_STORAGE_URL}/${img}`;
                    }
                });

                setImagePreviews(previews);
            } else if (product.image) {
                setImages([product.image]);

                if (product.image.startsWith('data:') || product.image.startsWith('http')) {
                    setImagePreviews([product.image]);
                } else {
                    setImagePreviews([`${import.meta.env.VITE_STORAGE_URL}/${product.image}`]);
                }
            }
            // No need to set default image here as we'll handle empty state in the UI
        }
    }, [product]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && images.length < MAX_IMAGES) {
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const dataUrl = reader.result;
                    setImages(prev => [...prev, dataUrl]);
                    setImagePreviews(prev => [...prev, dataUrl]);
                };
                reader.readAsDataURL(file);
            } catch (err) {
                console.error("Error uploading image:", err);
                setError("Failed to upload image");
            }
        }
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updating product:", {
            id: product?.id,
            name,
            category_id: category,
            price,
            discount_percentage: discountPercentage,
            description,
            images
        });
    };

    return (
        <div className="w-full bg-transparent py-4 px-2 md:px-6">
            <h2 className="text-2xl font-semibold mb-6">Update Product</h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-full">
                {/* Product Name + Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="transition-all duration-300 hover:shadow-md">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                    </div>
                    <div className="transition-all duration-300 hover:shadow-md">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        >
                            <option value="">Select Category</option>
                            {loading ? (
                                <option value="" disabled>Loading categories...</option>
                            ) : categories.length > 0 ? (
                                categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))
                            ) : (
                                <>
                                    <option value="1">Cakes</option>
                                    <option value="2">Pastries</option>
                                    <option value="3">Cookies</option>
                                    <option value="4">Desserts</option>
                                </>
                            )}
                        </select>
                    </div>
                </div>

                {/* Price + Discount Percentage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="transition-all duration-300 hover:shadow-md">
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                    </div>
                    <div className="relative transition-all duration-300 hover:shadow-md">
                        <input
                            type="number"
                            placeholder="Discount Percentage"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs">
                          %
                        </span>
                    </div>
                </div>

                {/* Product Description */}
                <div className="transition-all duration-300 hover:shadow-md">
                    <textarea
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="border border-gray-300 rounded-lg p-3 w-full bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                </div>

                {/* Image Upload */}
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md">
                    <p className="text-sm mb-3 text-gray-600 font-medium">
                        Product Images <span className="text-xs text-gray-400">(Max 3 images)</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Show existing images */}
                        {imagePreviews.length > 0 ? (
                            imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={preview}
                                        alt={`product preview ${index + 1}`}
                                        className="w-20 h-20 rounded-lg object-cover shadow-sm"
                                        onError={(e) => {
                                            console.error(`Image ${index} failed to load:`, preview);
                                            e.target.src = DEFAULT_IMAGE;
                                            e.target.onerror = null;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="text-white p-1 mx-1 text-sm"
                                            title="Remove image"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="relative group">
                                <img
                                    src={DEFAULT_IMAGE}
                                    alt="default product"
                                    className="w-20 h-20 rounded-lg object-cover shadow-sm opacity-50"
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                                    No Image
                                </div>
                            </div>
                        )}

                        {/* Show upload button if less than MAX_IMAGES */}
                        {images.length < MAX_IMAGES && (
                            <label className="border-2 border-dashed border-gray-300 rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer bg-white/50 hover:bg-white/80 transition-all">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <span className="text-3xl text-gray-400">+</span>
                            </label>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        className="border border-gray-400 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all shadow-md"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductForm;
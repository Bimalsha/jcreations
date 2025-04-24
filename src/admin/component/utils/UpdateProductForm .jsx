import React, { useState, useEffect } from "react";
import api from "../../../utils/axios.js";
import toast from 'react-hot-toast';

const UpdateProductForm = ({ product, onSuccess }) => {
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
    const [imageErrors, setImageErrors] = useState({});

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
            toast.error("Failed to load categories");
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
            setImageErrors({});

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
        }
    }, [product]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (images.length >= MAX_IMAGES) {
            toast.error(`Maximum ${MAX_IMAGES} images allowed`);
            return;
        }

        // Validate file type
        if (!file.type.match('image.*')) {
            toast.error("Please select a valid image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result;
                setImages(prev => [...prev, dataUrl]);
                setImagePreviews(prev => [...prev, dataUrl]);

                // Clear any previous error for this image
                setImageErrors(prev => {
                    const newErrors = {...prev};
                    delete newErrors[images.length];
                    return newErrors;
                });
            };
            reader.onerror = () => {
                toast.error("Failed to read image file");
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error("Error uploading image:", err);
            setError("Failed to upload image");
            toast.error("Failed to upload image");
        }
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));

        // Remove error for this image
        setImageErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[index];
            return newErrors;
        });
    };

    const handleImageError = (index) => {
        // Dismiss any existing toasts to prevent duplicates
        toast.dismiss();

        console.error(`Image ${index} failed to load:`, imagePreviews[index]);

        // Record this error
        setImageErrors(prev => ({
            ...prev,
            [index]: true
        }));

        // Show clear toast notification for image not found
        toast.error(`Image ${index + 1} not found or failed to load. Please replace it.`, {
            duration: 4000,
            id: `image-error-${index}`
        });
    };

    const handleCancel = () => {
        // Navigate back or close the form
        if (typeof onSuccess === 'function') {
            onSuccess();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields one by one
        if (!name.trim()) {
            toast.error("Product name is required");
            return;
        }

        if (!category) {
            toast.error("Please select a category");
            return;
        }

        if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            toast.error("Please enter a valid price");
            return;
        }

        if (!description.trim()) {
            toast.error("Product description is required");
            return;
        }

        // Check if there's at least one image
        if (images.length === 0) {
            toast.error("Please add at least one product image");
            return;
        }

        // Check if any images failed to load
        if (Object.keys(imageErrors).length > 0) {
            toast.error("Please replace all invalid images before submitting");
            return;
        }

        // All validation passed, prepare data for API
        try {
            setLoading(true);
            setError(null);

            const productData = {
                id: product.id,
                name,
                description,
                images: images,
                category_id: parseInt(category),
                price: parseFloat(price),
                discount_percentage: discountPercentage ? parseFloat(discountPercentage) : 0,
                status: product.status || "in_stock",
                created_at: product.created_at,
                updated_at: new Date().toISOString()
            };

            console.log("Sending product data:", productData);

            // Update endpoint to use the product ID
            const response = await api.post(`/admin/products/${product.id}`, productData);

            console.log("API response:", response);

            if (response.status >= 200 && response.status < 300) {
                toast.success("Product updated successfully");
                // Call success callback if provided
                if (typeof onSuccess === 'function') {
                    onSuccess();
                }
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            const errorMessage = error.response?.data?.message || "Failed to update product";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
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
                            required
                        />
                    </div>
                    <div className="transition-all duration-300 hover:shadow-md">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            required
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
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="relative transition-all duration-300 hover:shadow-md">
                        <input
                            type="number"
                            placeholder="Discount Percentage (optional)"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            min="0"
                            max="100"
                            step="0.1"
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
                        required
                    />
                </div>

                {/* Image Upload */}
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md">
                    <p className="text-sm mb-3 text-gray-600 font-medium">
                        Product Images <span className="text-xs text-gray-400">(At least 1 image required, max 3)</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Show existing images */}
                        {imagePreviews.length > 0 ? (
                            imagePreviews.map((preview, index) => (
                                <div key={index} className={`relative group ${imageErrors[index] ? 'border-2 border-red-500 rounded-lg' : ''}`}>
                                    <img
                                        src={preview}
                                        alt={`product preview ${index + 1}`}
                                        className="w-20 h-20 rounded-lg object-cover shadow-sm"
                                        onError={(e) => {
                                            e.target.src = DEFAULT_IMAGE;
                                            e.target.onerror = null;
                                            handleImageError(index);
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
                                    {imageErrors[index] && (
                                        <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                            !
                                        </div>
                                    )}
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
                    {Object.keys(imageErrors).length > 0 && (
                        <p className="text-xs text-red-500 mt-2">
                            One or more images failed to load. Please replace them.
                        </p>
                    )}
                </div>

                {/* Error message if any */}
                {error && (
                    <div className="text-red-500 bg-red-50 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-gray-400 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductForm;
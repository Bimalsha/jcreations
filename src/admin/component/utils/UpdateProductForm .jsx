import React, { useState, useEffect } from "react";
import api from "../../../utils/axios.js";
import toast from 'react-hot-toast';

const UpdateProductForm = ({ product, onSuccess }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Track image changes separately
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
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

    // Populate form with product data
    useEffect(() => {
        if (product) {
            console.log('Product data received:', product);
            setName(product.name || "");
            setCategory(product.category_id || "");
            setPrice(product.price || "");
            setDiscountPercentage(product.discount_percentage || "");
            setDescription(product.description || "");

            // Reset image states
            setExistingImages([]);
            setNewImages([]);
            setImagePreviews([]);
            setImageErrors({});

            // Handle product images
            if (product.images && product.images.length > 0) {
                // If images is a string, convert to array with single item
                const imageArray = Array.isArray(product.images)
                    ? product.images
                    : [product.images];

                // Set as existing images - these are paths, not actual files
                setExistingImages(imageArray);

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
                setExistingImages([product.image]);

                const preview = product.image.startsWith('data:') || product.image.startsWith('http')
                    ? product.image
                    : `${import.meta.env.VITE_STORAGE_URL}/${product.image}`;

                setImagePreviews([preview]);
            }
        }
    }, [product]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (existingImages.length + newImages.length >= MAX_IMAGES) {
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

                // Add to new images - these need to be uploaded
                setNewImages(prev => [...prev, file]);

                // Add preview
                setImagePreviews(prev => [...prev, dataUrl]);

                // Clear any previous error
                setImageErrors(prev => {
                    const newErrors = {...prev};
                    delete newErrors[imagePreviews.length];
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
        // Need to determine if we're removing an existing or new image
        const totalExisting = existingImages.length;

        if (index < totalExisting) {
            // Removing an existing image
            setExistingImages(prev => prev.filter((_, i) => i !== index));
        } else {
            // Removing a new image (adjust index)
            const newIndex = index - totalExisting;
            setNewImages(prev => prev.filter((_, i) => i !== newIndex));
        }

        // Remove from previews
        setImagePreviews(prev => prev.filter((_, i) => i !== index));

        // Remove error
        setImageErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[index];
            return newErrors;
        });
    };

    const handleImageError = (index) => {
        toast.dismiss();
        console.error(`Image ${index} failed to load:`, imagePreviews[index]);

        setImageErrors(prev => ({
            ...prev,
            [index]: true
        }));

        toast.error(`Image ${index + 1} not found or failed to load. Please replace it.`, {
            duration: 4000,
            id: `image-error-${index}`
        });
    };

    const handleCancel = () => {
        if (typeof onSuccess === 'function') {
            onSuccess();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
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
        if (existingImages.length + newImages.length === 0) {
            toast.error("Please add at least one product image");
            return;
        }

        // Check if any images failed to load
        if (Object.keys(imageErrors).length > 0) {
            toast.error("Please replace all invalid images before submitting");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Use FormData for mixed content (text fields + files)
            const formData = new FormData();

            // Append text fields
            formData.append('name', name);
            formData.append('category_id', category);
            formData.append('price', price);
            formData.append('discount_percentage', discountPercentage || 0);
            formData.append('description', description);
            formData.append('status', product.status || 'in_stock');

            // Laravel requires _method for PUT/PATCH requests
            formData.append('_method', 'PUT');

            // Append existing image paths - use proper array notation for Laravel
            existingImages.forEach(img => {
                formData.append('existing_images[]', img);
            });

            // Append new image files - use proper array notation for Laravel
            newImages.forEach(file => {
                formData.append('images[]', file);
            });

            console.log("Sending product update with images:", {
                existingCount: existingImages.length,
                newCount: newImages.length
            });

            // Update product with FormData
            const response = await api.post(`/admin/products/${product.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log("API response:", response);

            if (response.status >= 200 && response.status < 300) {
                toast.success("Product updated successfully");
                if (typeof onSuccess === 'function') {
                    onSuccess(true); // Pass true to refresh product list
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
                        {imagePreviews.length < MAX_IMAGES && (
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
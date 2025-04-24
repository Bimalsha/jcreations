import React, { useState, useEffect } from "react";
import api from "../../../utils/axios.js";
import toast from 'react-hot-toast';

const UpdateProductForm = ({ product, onSuccess }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [description, setDescription] = useState("");
    const [existingImages, setExistingImages] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [error, setError] = useState(null);
    const [imageErrors, setImageErrors] = useState({});

    const MAX_IMAGES = 3;
    const DEFAULT_IMAGE = "/placeholder.png";
    const STORAGE_URL = "https://jcreations.1000dtechnology.com/storage";

    // Fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
            toast.success("Categories loaded successfully");
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
            setExistingImages([]);
            setNewImageFiles([]);
            setImagePreviews([]);
            setImageErrors({});

            // Handle product images
            if (product.images) {
                const imageArray = Array.isArray(product.images)
                    ? product.images
                    : [product.images];

                setExistingImages(imageArray);

                // Create preview URLs for existing images
                const previews = imageArray.map(img => {
                    if (!img) return DEFAULT_IMAGE;
                    if (img.startsWith('data:') || img.startsWith('http')) {
                        return img;
                    } else {
                        // Ensure path is properly formatted for storage URL
                        return `${STORAGE_URL}/${img.replace(/^\/+/, '')}`;
                    }
                });

                setImagePreviews(previews);
            }
        }
    }, [product]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const totalImages = existingImages.length + newImageFiles.length + files.length;
        if (totalImages > MAX_IMAGES) {
            toast.error(`Maximum ${MAX_IMAGES} images allowed per product`);
            return;
        }

        // Create a copy for validation
        const validFiles = [];
        const validationPromises = files.map((file, index) => {
            return new Promise((resolve) => {
                // Validate file type (more specific)
                const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
                if (!validTypes.includes(file.type)) {
                    toast.error(`${file.name} is not a valid image format. Use JPEG, PNG, WebP or GIF.`, {
                        duration: 4000,
                        id: `type-error-${index}`
                    });
                    resolve(false);
                    return;
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`${file.name} exceeds the 5MB size limit`, {
                        duration: 4000,
                        id: `size-error-${index}`
                    });
                    resolve(false);
                    return;
                }

                // Validate image dimensions
                const img = new Image();
                img.onload = () => {
                    URL.revokeObjectURL(img.src); // Clean up
                    if (img.width < 200 || img.height < 200) {
                        toast.error(`${file.name} is too small. Minimum dimensions are 200x200px.`, {
                            duration: 4000,
                            id: `dimension-error-${index}`
                        });
                        resolve(false);
                    } else {
                        validFiles.push(file);
                        resolve(true);
                    }
                };
                img.onerror = () => {
                    URL.revokeObjectURL(img.src); // Clean up
                    toast.error(`${file.name} could not be loaded. The file may be corrupted.`, {
                        duration: 4000,
                        id: `load-error-${index}`
                    });
                    resolve(false);
                };
                img.src = URL.createObjectURL(file);
            });
        });

        // Process all validations
        Promise.all(validationPromises).then(results => {
            const validCount = results.filter(result => result === true).length;

            if (validCount === 0) {
                toast.error('No valid images to upload');
                return;
            }

            if (validCount !== files.length) {
                toast.success(`${validCount} of ${files.length} images passed validation`, {
                    duration: 3000
                });
            } else if (validCount > 0) {
                toast.success(`${validCount} ${validCount === 1 ? 'image' : 'images'} ready for upload`);
            }

            // Add valid files to state
            setNewImageFiles(prev => [...prev, ...validFiles]);

            // Generate previews for valid files
            validFiles.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result]);
                };
                reader.onerror = () => {
                    toast.error(`Failed to generate preview for: ${file.name}`);
                };
                reader.readAsDataURL(file);
            });
        }).catch(err => {
            console.error("Error validating images:", err);
            toast.error("An unexpected error occurred while processing images");
        });
    };

    const handleRemoveImage = (index) => {
        // Determine if we're removing an existing image or a new one
        if (index < existingImages.length) {
            // Removing an existing image
            setExistingImages(prev => prev.filter((_, i) => i !== index));
        } else {
            // Removing a new image (adjust index for the newImageFiles array)
            const newIndex = index - existingImages.length;
            setNewImageFiles(prev => prev.filter((_, i) => i !== newIndex));
        }

        // Remove from previews
        setImagePreviews(prev => prev.filter((_, i) => i !== index));

        // Remove error for this image
        setImageErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[index];
            return newErrors;
        });
    };

    const handleImageError = (index) => {
        setImageErrors(prev => ({
            ...prev,
            [index]: true
        }));

        toast.error(`Image #${index + 1} failed to load correctly. Please replace it.`, {
            id: `img-error-${index}`
        });
    };

    // Upload files to storage and get their URLs
    const uploadImagesToStorage = async () => {
        if (newImageFiles.length === 0) {
            // No new images to upload, return existing images
            return existingImages;
        }

        setUploadingImages(true);
        try {
            toast.loading(`Uploading ${newImageFiles.length} ${newImageFiles.length === 1 ? 'image' : 'images'}...`, {
                id: "uploading-images"
            });

            const formData = new FormData();
            newImageFiles.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            // Upload images to the specified storage URL
            const response = await api.post('/admin/upload-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    if (percentCompleted === 100) {
                        toast.loading("Processing uploaded images...", { id: "uploading-images" });
                    }
                }
            });

            // Check if upload was successful and return image paths
            if (response.data && Array.isArray(response.data.images)) {
                toast.success(`Successfully uploaded ${newImageFiles.length} ${newImageFiles.length === 1 ? 'image' : 'images'}`, {
                    id: "uploading-images"
                });
                // Combine existing images with new uploaded image paths
                return [...existingImages, ...response.data.images];
            } else {
                throw new Error('Server response missing image paths');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload images", {
                id: "uploading-images"
            });
            console.error("Error uploading images:", error);
            throw new Error("Failed to upload images: " + (error.response?.data?.message || error.message));
        } finally {
            setUploadingImages(false);
        }
    };

    const handleCancel = () => {
        if (typeof onSuccess === 'function') {
            onSuccess();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate form fields
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

        // Check if there's at least one image (existing or new)
        if (existingImages.length === 0 && newImageFiles.length === 0) {
            toast.error("Please add at least one product image");
            return;
        }

        // Check if any images have errors
        if (Object.keys(imageErrors).length > 0) {
            toast.error("Please replace all invalid images before submitting");
            return;
        }

        try {
            setLoading(true);

            let finalImageArray;

            if (newImageFiles.length > 0) {
                // First, upload any new images and get their paths
                toast.loading("Uploading images...", { id: "uploading-images" });
                finalImageArray = await uploadImagesToStorage();
                toast.dismiss("uploading-images");
            } else {
                // No new images, just use existing ones
                finalImageArray = existingImages;
            }

            toast.loading("Updating product...", { id: "updating-product" });

            // Prepare the product data with images array
            const productData = {
                id: product.id,
                name,
                description,
                images: finalImageArray,
                category_id: parseInt(category),
                price: parseFloat(price),
                discount_percentage: discountPercentage ? parseFloat(discountPercentage) : 0,
                status: product.status || "in_stock",
                updated_at: new Date().toISOString()
            };

            // Update the product
            const response = await api.post(`/admin/products/${product.id}`, productData);

            toast.dismiss("updating-product");

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
            const errorMessage = error.response?.data?.message || error.message || "Failed to update product";
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
                        Product Images <span className="text-xs text-gray-400">(At least 1 image required, max {MAX_IMAGES})</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Show image previews */}
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
                            <label className="cursor-pointer">
                                <div className="relative border-2 border-dashed border-yellow-400 rounded-lg w-20 h-20 bg-white/50 flex flex-col items-center justify-center group hover:bg-white/80 transition-all">
                                    <img
                                        src={DEFAULT_IMAGE}
                                        alt="default product"
                                        className="w-12 h-12 object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                                    />
                                    <span className="text-xs text-gray-500 font-medium mt-1">Required</span>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 rounded-lg transition-opacity">
                                        <span className="text-xs font-medium text-gray-800">Click to add</span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}

                        {/* Show upload button if less than MAX_IMAGES and at least one image is already added */}
                        {imagePreviews.length > 0 && imagePreviews.length < MAX_IMAGES && (
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
                        disabled={loading || uploadingImages}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={loading || uploadingImages}
                    >
                        {loading || uploadingImages ? "Processing..." : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductForm;
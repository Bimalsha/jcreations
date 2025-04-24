import React, { useState, useEffect } from "react";
import api from "../../../utils/axios.js";
import toast, { Toaster } from 'react-hot-toast';

const AddProductForm = ({ onSuccess, initialData, isEditing }) => {
    // State variables remain the same
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form data and previews remain the same
    const [formData, setFormData] = useState({
        image1: null,
        image2: null,
        image3: null
    });

    const [previews, setPreviews] = useState({
        image1: null,
        image2: null,
        image3: null
    });

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const MAX_IMAGES = 3;

    // useEffects remain the same...

    // Form handling functions remain the same...

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const formDataToSend = new FormData();

        // Append text fields
        formDataToSend.append('name', name);
        formDataToSend.append('category_id', category);
        formDataToSend.append('price', price);
        formDataToSend.append('discount_percentage', discountPercentage || 0);
        formDataToSend.append('description', description);
        formDataToSend.append('status', 'in_stock');

        // Append image files
        Object.keys(formData).forEach(key => {
            if (formData[key] instanceof File) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            if (isEditing && initialData?.id) {
                formDataToSend.append('_method', 'PUT');
                await api.post(`/admin/products/${initialData.id}`, formDataToSend);
                toast.success("Product updated successfully");
            } else {
                await api.post('/admin/products', formDataToSend);
                toast.success("Product added successfully");
            }

            // Reset form
            setName("");
            setCategory("");
            setPrice("");
            setDiscountPercentage("");
            setDescription("");
            setFormData({
                image1: null,
                image2: null,
                image3: null
            });
            setPreviews({
                image1: null,
                image2: null,
                image3: null
            });

            // Short timeout to ensure toast is visible before navigation
            setTimeout(() => {
                // Call success callback with refresh=true to indicate table reload needed
                if (typeof onSuccess === 'function') {
                    onSuccess(true); // Pass true to indicate refresh is needed
                }
            }, 1000); // Short delay so user can see success message

        } catch (error) {
            console.error("Error saving product:", error);
            toast.error(isEditing ? "Failed to update product" : "Failed to add product");
            setLoading(false);
        }
    };

    // Component render remains mostly the same...
    return (
        <div className="w-full bg-transparent py-4 px-2 md:px-6">

            <h2 className="text-2xl font-semibold mb-6">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>

            {/* Form contents remain the same */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-full">
                {/* Form fields remain the same */}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => onSuccess(false)} // No refresh needed for cancel
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
                        {loading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Product" : "Add Product")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
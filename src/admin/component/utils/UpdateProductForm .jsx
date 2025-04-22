import React, { useState, useEffect } from "react";

const UpdateProductForm = ({ product }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    // Populate form with product data when component mounts or product changes
    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setCategory(product.category || "");
            setPrice(product.price || "");
            setOfferPrice(product.offerPrice || "");
            setDescription(product.description || "");

            // If product has an image, add it to the images array
            if (product.image) {
                setImages([product.image]);
            }
        }
    }, [product]);

    const handleImageUpload = (e) => {
        if (images.length >= 3) return;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages([...images, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle update logic here
        console.log("Updating product:", {
            id: product.id,
            name,
            category,
            price,
            offerPrice,
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
                            <option value="Cake">Cakes</option>
                            <option value="Pastries">Pastries</option>
                            <option value="Cookies">Cookies</option>
                            <option value="Desserts">Desserts</option>
                        </select>
                    </div>
                </div>

                {/* Price + Offer Price */}
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
                            placeholder="Offer Price"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 w-full bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs">
                          15%
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
                        Image Upload <span className="text-xs text-gray-400">(Add up to 3 images)</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <label className="border-2 border-dashed border-gray-300 rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer bg-white/50 hover:bg-white/80 transition-all">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <span className="text-3xl text-gray-400">+</span>
                        </label>

                        {images.map((img, index) => (
                            <div key={index} className="relative group">
                                <img src={img} alt="upload" className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 text-red-600 font-bold text-xs bg-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
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
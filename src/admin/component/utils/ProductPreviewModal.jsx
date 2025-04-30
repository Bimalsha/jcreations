import React from "react";

const ProductPreviewModal = ({ isOpen, onClose, product }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white backdrop-filter backdrop-blur-md rounded-xl max-w-md w-full p-6 relative shadow-lg border border-white/20">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="flex flex-col items-center text-center">

                    <img
                        src={
                            product.images
                                ? Array.isArray(product.images)
                                    ? `${import.meta.env.VITE_STORAGE_URL}/${product.images[0]}`
                                    : typeof product.images === 'string'
                                        ? `${import.meta.env.VITE_STORAGE_URL}/${product.images}`
                                        : 'https://via.placeholder.com/150'
                                : 'https://via.placeholder.com/150'
                        }
                        alt={product.name || 'Product image'}
                        className="w-24 h-24 object-cover rounded-lg mb-4 shadow-md"
                        onError={(e) => {
                            console.log(`Failed to load image for product: ${product.id} - ${product.name}`);
                            e.target.src = 'https://via.placeholder.com/150';
                            e.target.onerror = null;
                        }}
                    />
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-xl font-bold text-gray-800 mt-1">LKR {product.offerPrice}</p>
                    <p className="text-sm text-gray-600 mt-3">{product.description}</p>
                </div>

                <div className="mt-5 text-sm text-gray-700 space-y-1">
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> {product.price}LKR</p>
                    <p><strong>Discount Price:</strong> {product.discountPrice}LKR</p>
                    <p><strong>Discount:</strong> {product.discount}%</p>
                    <p><strong>List Date:</strong> {product.listDate}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPreviewModal;
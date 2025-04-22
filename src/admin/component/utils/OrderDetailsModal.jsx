import React, { useEffect, useState } from "react";

const OrderDetailsModal = ({ isOpen, onClose }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            setTimeout(() => setShowModal(false), 300);
        }
    }, [isOpen]);

    if (!showModal && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
                isOpen ? "bg-white/30 opacity-100" : "bg-transparent opacity-0"
            }`}
            onClick={onClose}
        >
            <div
                className={`bg-white/80 backdrop-filter backdrop-blur-md shadow-xl rounded-xl w-full max-w-lg p-6 relative border border-white/20 transition-all duration-300 ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                        Order details <span className="text-gray-500">#123456</span>
                    </h2>
                    <p className="text-sm text-gray-500">Date: March 28, 2025</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mt-2">
                        Delivered
                    </span>
                </div>

                <div className="space-y-1 mb-4 text-sm text-gray-700">
                    <p>
                        <strong>Name:</strong> Sahan Kavinda
                    </p>
                    <p>
                        <strong>Contact:</strong> 0777 1232121
                    </p>
                    <p>
                        <strong>Address:</strong> No57, Colombo
                    </p>
                    <p>
                        <strong>Date & Time for Delivery:</strong> March 30, 2025
                    </p>
                    <p>
                        <strong>Payment Method:</strong> Cash On Delivery
                    </p>
                </div>

                <div className="border-t pt-4">
                    <table className="w-full text-sm text-left">
                        <thead>
                        <tr className="border-b">
                            <th className="py-2">Product#</th>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-b">
                            <td className="py-2">123</td>
                            <td>Chocolate Cake</td>
                            <td>02</td>
                            <td>7000LKR</td>
                        </tr>
                        <tr>
                            <td className="py-2">235</td>
                            <td>Birthday Cake</td>
                            <td>01</td>
                            <td>3000LKR</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="text-right mt-4 space-y-1 text-sm">
                        <p>Subtotal: <strong>LKR 10000.00</strong></p>
                        <p>Shipping: <strong>LKR 400.00</strong></p>
                        <p className="text-lg font-semibold">Total: LKR 10400.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
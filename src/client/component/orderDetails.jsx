// src/client/component/orderDetails.jsx
import '../../index.css';
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';

function OrderDetails({ orderId, order }) {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        console.log("Order received:", order);

        if (order?.orderItems && Array.isArray(order.orderItems)) {
            const processedItems = order.orderItems.map(item => ({
                ...item,
                quantity: parseInt(item.quantity) || 1,
                price: parseFloat(item.price) || 0,
                subtotal: parseFloat(item.subtotal) || 0,
                product_name: item.product_name || item.name || "Product"
            }));

            console.log("Processed items:", processedItems);
            setOrderItems(processedItems);
        } else {
            console.warn("No order items found or invalid format:", order?.orderItems);
            setOrderItems([]);
        }
    }, [order]);

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format time
    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Container variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    // Item variants for staggered animations
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    // Calculate total with shipping
    const totalWithShipping = order ? (
        (parseFloat(order.total_amount) || 0) + (parseFloat(order.shipping_charge) || 0)
    ).toFixed(2) : '0.00';

    return (
        <motion.div
            className="w-full p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-semibold block">Order details #{orderId || (order?.id || "123456")}</span>
                <h6 className="text-sm sm:text-base text-gray-600">Date: {order ? formatDate(order.order_datetime) : "March 28, 2025"}</h6>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl font-semibold block mb-2">Delivery Information</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    <h6 className="text-sm sm:text-base text-gray-700">Name: {order?.customer_name || "Customer"}</h6>
                    <h6 className="text-sm sm:text-base text-gray-700">Contact: {order?.contact_number || "N/A"}</h6>
                    <h6 className="text-sm sm:text-base text-gray-700">Address: {order?.address || "N/A"}</h6>
                    <h6 className="text-sm sm:text-base text-gray-700">Date & Time for Delivery: {order ? formatDateTime(order.req_datetime) : "N/A"}</h6>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl font-semibold block mb-2">Payment Method</span>
                <h6 className="text-sm sm:text-base text-gray-700">{order?.payment_type ?
                    order.payment_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) :
                    "Cash On Delivery"}</h6>
                <h6 className="text-sm sm:text-base text-gray-700">Status: {order?.payment_status ?
                    order.payment_status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) :
                    "Pending"}</h6>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl font-semibold block mb-2">Item Ordered</span>
                <div className="space-y-3">
                    {orderItems && orderItems.length > 0 ? (
                        orderItems.map((item, index) => (
                            <ItemOrdered key={index} item={item} />
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-500">No items found in this order</div>
                    )}
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="flex justify-center sm:justify-end"
            >
                <motion.div
                    className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-between text-sm sm:text-base mb-2">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="font-medium">LKR.{parseFloat(order?.total_amount || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base mb-2">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">LKR.{parseFloat(order?.shipping_charge || 0).toFixed(2)}</span>
                    </div>
                    <motion.hr
                        className="my-2 sm:my-3"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    />
                    <motion.div
                        className="flex justify-between font-bold text-base sm:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <span>Total </span>
                        <span className="text-amber-500">LKR.{totalWithShipping}</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// Include the ItemOrdered component directly to ensure it's available
function ItemOrdered({ item }) {
    // Handle potential missing data with defaults
    const {
        product_name = "Product Name",
        quantity = 1,
        price = 0,
        subtotal = 0,
        image = null
    } = item || {};

    // Format the image URL
    const imageUrl = image ? `${import.meta.env.VITE_STORAGE_URL}/${image}` : "/orderimo.webp";

    return (
        <motion.div
            className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg p-3 gap-3"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
        >
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                    src={imageUrl}
                    alt={product_name}
                    className="h-full w-full object-cover"
                    onError={(e) => {e.target.src = '/food-placeholder.png'}}
                />
            </div>

            <div className="flex-grow text-center sm:text-left">
                <h3 className="font-medium line-clamp-1">{product_name}</h3>
                <div className="text-sm text-gray-600">
                    <span>Rs.{parseFloat(price).toFixed(2)} × {quantity}</span>
                </div>
            </div>

            <div className="text-right font-semibold">
                Rs.{parseFloat(subtotal).toFixed(2)}
            </div>
        </motion.div>
    );
}

export default OrderDetails;
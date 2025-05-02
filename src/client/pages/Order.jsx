// src/client/pages/Order.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Orders from "../component/Orders.jsx";
import OrderDetails from "../component/orderDetails.jsx";
import { motion } from 'framer-motion';
import api from "../../utils/axios.js";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

function Order() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [limit, setLimit] = useState(10);
    const [hasMore, setHasMore] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    // Fetch orders from API
    const fetchOrders = useCallback(async (currentLimit = 10, isLoadingMore = false) => {
        try {
            if (isLoadingMore) {
                setLoadingMore(true);
            } else {
                setIsLoading(true);
            }
            setError(null);

            // Get firebase_uid from localStorage
            const uid = localStorage.getItem('jcreations_user_uid');

            if (!uid) {
                console.error("No firebase_uid found in localStorage");
                setIsLoggedIn(false);
                setIsLoading(false);
                return;
            }

            console.log(`Fetching orders for uid: ${uid} with limit: ${currentLimit}`);
            const response = await api.get(`/user/${uid}/orders/${currentLimit}`);

            // Validate and normalize order data
            if (response.data && Array.isArray(response.data)) {
                const normalizedOrders = response.data.map(order => {
                    // Map order_items to the format expected by OrderDetails component
                    const mappedOrderItems = Array.isArray(order.order_items)
                        ? order.order_items.map(item => ({
                            id: item.id,
                            order_id: item.order_id,
                            product_name: item.product_name || "Unknown Product",
                            quantity: parseInt(item.quantity) || 1,
                            price: parseFloat(item.unit_price) || 0,
                            subtotal: parseFloat(item.total_price) || 0,
                            product_id: item.product_id,
                            // Extract image from the product if available
                            image: item.product?.images?.[0],
                            // Include the entire product object
                            product: item.product
                        }))
                        : [];

                    console.log("Mapped order items with product data:", mappedOrderItems);

                    return {
                        ...order,
                        orderItems: mappedOrderItems, // Store as orderItems for component compatibility
                        total_amount: parseFloat(order.total_amount) || 0,
                        shipping_charge: parseFloat(order.shipping_charge) || 0
                    };
                });

                if (isLoadingMore) {
                    setOrders(prev => [...prev, ...normalizedOrders]);
                } else {
                    setOrders(normalizedOrders);
                }
                setHasMore(response.data.length >= 10);

                console.log("Normalized orders:", normalizedOrders);
            } else {
                if (!isLoadingMore) setOrders([]);
                console.warn("Invalid response format:", response.data);
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders. Please try again.");
            toast.error("Failed to load orders");
        } finally {
            setIsLoading(false);
            setLoadingMore(false);
        }
    }, []);

    // Initial load of orders
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchOrders();
    }, [fetchOrders]);

    // Load more orders when limit changes
    useEffect(() => {
        if (limit > 10) {
            fetchOrders(limit, true);
        }
    }, [limit, fetchOrders]);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 10);
    };

    const handleViewDetails = (orderId) => {
        const order = orders.find(order => order.id === orderId);
        if (order) {
            console.log("Selected order for details:", order);
            console.log("Order items:", order.orderItems);
            setSelectedOrderId(orderId);
            setSelectedOrder(order);
            setShowDetails(true);
        } else {
            toast.error("Order details not found");
        }
    };

    const handleBackToOrders = () => {
        setShowDetails(false);
    };


    const handleLogin = () => {
        window.location.href = '/signin';
    };



    const handleContinueAsGuest = () => {
        navigate('/menu');
    };

    if (isLoading && !loadingMore) {
        return (
            <div className="pt-20 flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7A313]"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <section className="pt-16 lg:pt-12 flex justify-center">
                <div
                    className="max-w-7xl w-full mt-10 lg:mt-0 px-5 lg:px-2 flex flex-col items-center text-center py-10">
                    <motion.div
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 0.3}}
                        className="bg-white p-8 rounded-lg shadow-lg shadow-[#FEF3E0] max-w-md w-full"
                    >
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 bg-[#FEF3E0] rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F7A313]" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-xl font-medium mb-3">Please log in to manage your account</h2>
                        <p className="text-gray-600 mb-6">Sign in to view and update your personal information, track
                            orders, and manage your preferences.</p>
                        <motion.button
                            onClick={handleLogin}
                            className="w-full px-4 py-3 bg-[#000F20] text-white rounded-full hover:bg-[#1a253a] cursor-pointer"
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.98}}
                        >
                            Log In
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-16 lg:pt-12 flex justify-center">
            <div className="max-w-7xl w-full px-4 lg:px-2">
                {!showDetails ? (
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3}}
                    >
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold">Orders</h1>
                            <h6 className="text-gray-600">Check out what you've ordered before and reorder your
                                favorites!</h6>
                        </div>

                        {error ? (
                            <div className="text-center py-10 text-red-500">{error}</div>
                        ) : orders.length > 0 ? (
                            <>
                                <Orders orders={orders} onViewDetails={handleViewDetails}/>

                                {loadingMore ? (
                                    <div className="flex justify-center mt-6 py-4">
                                        <div
                                            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F7A313]"></div>
                                    </div>
                                ) : hasMore && (
                                    <div className="flex justify-center mt-6 mb-10">
                                        <button
                                            onClick={handleLoadMore}
                                            className="bg-white text-[#F7A313] border border-[#F7A313] hover:bg-[#FEF3E0] px-6 py-2 rounded-full transition-colors"
                                        >
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <motion.div
                                className="text-center py-10 min-h-[40vh] flex flex-col items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-gray-400 mb-2 text-xl">No orders found</div>
                                <p className="text-gray-500">You haven't placed any orders yet</p>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={handleBackToOrders}
                            className="mb-4 text-[#F7A313] font-medium flex items-center"
                        >
                            ← Back to Orders
                        </button>
                        <OrderDetails orderId={selectedOrderId} order={selectedOrder} />
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Order;
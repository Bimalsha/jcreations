import React, { useState, useEffect } from 'react'
import Orders from "../component/Orders.jsx";
import OrderDetails from "../component/orderDetails.jsx";
import { motion } from 'motion/react';

function Order() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication status on component mount
    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);

        const checkAuthStatus = () => {
            setIsLoading(true);
            // Check if user UID exists in localStorage
            const uid = localStorage.getItem('jcreations_user_uid');
            setIsLoggedIn(!!uid);
            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    const handleViewDetails = (orderId) => {
        setSelectedOrderId(orderId);
        setShowDetails(true);
    };

    const handleBackToOrders = () => {
        setShowDetails(false);
    };

    const handleLogin = () => {
        window.location.href = '/signin';
    };

    if (isLoading) {
        return (
            <div className="pt-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7A313]"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <section className="pt-10 flex justify-center">
                <div className="max-w-7xl w-full mt-10 lg:mt-0 px-5 lg:px-2 flex flex-col items-center text-center py-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-8 rounded-lg shadow-lg shadow-[#FEF3E0] max-w-md w-full"
                    >
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 bg-[#FEF3E0] rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F7A313]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-xl font-medium mb-3">Please log in to view your orders</h2>
                        <p className="text-gray-600 mb-6">Sign in to view your order history, track recent orders, and reorder your favorites.</p>
                        <motion.button
                            onClick={handleLogin}
                            className="w-full px-4 py-3 bg-[#000F20] text-white rounded-full hover:bg-[#1a253a] cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
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
            <div className={'max-w-7xl px-2 w-full'}>
                {!showDetails ? (
                    <>
                        <div>
                            <h1 className={'text-2xl font-semibold'}>Orders</h1>
                            <h6>Check out what you've ordered before and reorder your favorites!</h6>
                        </div>
                        <Orders onViewDetails={handleViewDetails} />
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleBackToOrders}
                            className="mb-4 text-[#F7A313] font-medium flex items-center"
                        >
                            ← Back to Orders
                        </button>
                        <OrderDetails orderId={selectedOrderId} />
                    </>
                )}
            </div>
        </section>
    );
}

export default Order
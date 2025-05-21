import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import api from '../../utils/axios.js';

function BottomNavigator() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [cartItemCount, setCartItemCount] = useState(0);

    // Fetch cart data to get the item count
    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const cartId = localStorage.getItem('jcreations_cart_id');
                if (cartId) {
                    const response = await api.get(`/cart/${cartId}`);
                    if (response.data && response.data.items) {
                        setCartItemCount(response.data.items.length);
                    }
                }
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };

        fetchCartCount();
        
        // Set up an interval to refresh the cart count periodically
        const intervalId = setInterval(fetchCartCount, 8000); // Every 10 seconds
        
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-20">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium bg-[#000F20] rounded-t-3xl">
                <Link to={'/'} type="button"
                      className="inline-flex flex-col items-center justify-center px-5 group relative">
                    <motion.img
                        src={currentPath === '/' ? "/bottomicon/homeselect.svg" : "/bottomicon/home.svg"}
                        alt="home"
                        className="w-8"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                    <motion.span
                        className={`text-sm ${currentPath === '/' ? 'text-[#F7A313]' : 'text-white'}`}
                        animate={{ color: currentPath === '/' ? "#F7A313" : "#FFFFFF" }}
                    >
                        Home
                    </motion.span>
                    {currentPath === '/' && (
                        <motion.div
                            className="absolute -bottom-2 w-10 h-1 bg-[#F7A313] rounded-full"
                            layoutId="navIndicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </Link>

                <Link to={'/cart'} type="button"
                      className="inline-flex flex-col items-center justify-center px-5 group relative">
                    <div className="relative">
                        <motion.img
                            src={currentPath === '/cart' ? "/bottomicon/cartselect.svg" : "/bottomicon/cart.svg"}
                            alt="cart"
                            className="w-8"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                        {/* Cart badge */}
                        {cartItemCount > 0 && (
                            <motion.div
                                className="absolute -top-2 -right-2 bg-[#F7A313] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            >
                                {cartItemCount}
                            </motion.div>
                        )}
                    </div>
                    <motion.span
                        className={`text-sm ${currentPath === '/cart' ? 'text-[#F7A313]' : 'text-white'}`}
                        animate={{ color: currentPath === '/cart' ? "#F7A313" : "#FFFFFF" }}
                    >
                        Cart
                    </motion.span>
                    {currentPath === '/cart' && (
                        <motion.div
                            className="absolute -bottom-2 w-10 h-1 bg-[#F7A313] rounded-full"
                            layoutId="navIndicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </Link>

                {/* Repeat the same pattern for Order and Account links */}
                <Link to={'/order'} type="button"
                      className="inline-flex flex-col items-center justify-center px-5 group relative">
                    <motion.img
                        src={currentPath === '/order' ? "/bottomicon/orderselect.svg" : "/bottomicon/order.svg"}
                        alt="order"
                        className="w-8"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                    <motion.span
                        className={`text-sm ${currentPath === '/order' ? 'text-[#F7A313]' : 'text-white'}`}
                        animate={{ color: currentPath === '/order' ? "#F7A313" : "#FFFFFF" }}
                    >
                        Order
                    </motion.span>
                    {currentPath === '/order' && (
                        <motion.div
                            className="absolute -bottom-2 w-10 h-1 bg-[#F7A313] rounded-full"
                            layoutId="navIndicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </Link>

                <Link to={'/account'} type="button"
                      className="inline-flex flex-col items-center justify-center px-5 group relative">
                    <motion.img
                        src={currentPath === '/account' ? "/bottomicon/userselect.svg" : "/bottomicon/user.svg"}
                        alt="account"
                        className="w-8"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                    <motion.span
                        className={`text-sm ${currentPath === '/account' ? 'text-[#F7A313]' : 'text-white'}`}
                        animate={{ color: currentPath === '/account' ? "#F7A313" : "#FFFFFF" }}
                    >
                        Account
                    </motion.span>
                    {currentPath === '/account' && (
                        <motion.div
                            className="absolute -bottom-2 w-10 h-1 bg-[#F7A313] rounded-full"
                            layoutId="navIndicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </Link>
            </div>
        </div>
    )
}

export default BottomNavigator
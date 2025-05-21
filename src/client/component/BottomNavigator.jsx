import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import axios from 'axios';
import useCartStore from '../../stores/cartStore';

function BottomNavigator() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [apiCartCount, setApiCartCount] = useState(0);
    const cartItems = useCartStore(state => state.items);

    // Local store calculation
    const localCartCount = cartItems.reduce((total, item) =>
        total + (item.quantity || 1), 0);

    // Use API count when available, fallback to local count
    const cartItemCount = apiCartCount || localCartCount;

    // Fetch cart data from API
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get('/api/cart');
                // Assuming the API returns a count or items array
                if (response.data.count) {
                    setApiCartCount(response.data.count);
                } else if (response.data.items) {
                    const count = response.data.items.reduce(
                        (total, item) => total + (item.quantity || 1), 0
                    );
                    setApiCartCount(count);
                }
            } catch (error) {
                console.error('Failed to fetch cart data', error);
                // Fallback to local cart count on error
            }
        };

        fetchCartData();

        // Refresh cart data periodically
        const interval = setInterval(fetchCartData, 60000);
        return () => clearInterval(interval);
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
                        {cartItemCount > 0 && (
                            <motion.div
                                className="absolute -top-2 -right-2 bg-[#F7A313] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 17 }}
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
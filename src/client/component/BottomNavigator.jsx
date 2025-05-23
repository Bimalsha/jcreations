import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
// Import the cart store
import useCartStore from '../../stores/cartStore';

function BottomNavigator() {
    const location = useLocation();
    const currentPath = location.pathname;

    // Use cart store instead of local state
    const { itemCount, subtotal, fetchCart } = useCartStore();
    const badgeInitialized = useRef(false);

    // In your useEffect
    useEffect(() => {
        // Initial fetch - use async function to properly handle the Promise
        const loadCart = async () => {
            await fetchCart();
            console.log("Subtotal after fetch:", subtotal);
        };

        loadCart();

        // Set up an interval to refresh the cart count periodically
        const intervalId = setInterval(fetchCart, 10000); // Every 10 seconds

        return () => clearInterval(intervalId);
    }, [fetchCart]);


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

                        {/* Cart badge - now showing subtotal instead of count */}
                        {itemCount > 0 && (
                            <motion.div
                                className="absolute -top-2 -right-2 bg-[#F7A313] text-black text-[9px] font-bold rounded-full px-2 py-1 min-w-[32px] text-center"
                                initial={badgeInitialized.current ? { scale: 1 } : { scale: 0 }}
                                animate={{ scale: 1 }}
                                key={badgeInitialized.current ? undefined : "initial-badge"}
                                onAnimationComplete={() => {
                                    badgeInitialized.current = true;
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            >

                                <motion.span
                                    key={`subtotal-${itemCount}-${subtotal}`}
                                    initial={badgeInitialized.current ? {scale: 0.5, opacity: 0} : {}}
                                    animate={{scale: 1, opacity: 1}}
                                    transition={{duration: 0.2}}
                                >
                                    Rs {subtotal ? subtotal.toLocaleString() : 0}
                                </motion.span>
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
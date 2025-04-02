import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderConfirmation() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <motion.div 
                className="max-w-lg p-8 text-center bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaCheckCircle className="text-5xl text-green-500" />
                </motion.div>
                
                <h2 className="mt-4 text-xl ">Your order is confirmed!</h2>
                <p className="mt-2 text-xs text-gray-500">Thank you for shopping with JCreations! Your treats and gifts are being prepared with love.</p>
                <p className="mt-3 text-sm">Order Number: #123456</p>
                
                <Link to={'/'}>
                    <motion.button 
                        className="w-64 px-6 py-2 mt-8 text-xs font-semibold bg-yellow-500 px- rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Continue Shopping
                    </motion.button>
                </Link>
                
                <p className="mt-4 text-xs text-gray-500">Questions? Contact us at support@<span className="font-semibold">JCreations</span>.com or call 070 568 7994</p>

            </motion.div>
        </section>
    );
}

export default OrderConfirmation;

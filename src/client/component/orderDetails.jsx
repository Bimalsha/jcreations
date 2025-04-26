import '../../index.css';
import React from "react";
import ItemOrdered from "./utils/itemOrdered.jsx";
import { motion } from 'motion/react'; // Fixed import path

function OrderDetails({ orderId }) {
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

    return (
        <motion.div
            className="w-full p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-semibold block">Order details #{orderId || "123456"}</span>
                <h6 className="text-sm sm:text-base text-gray-600">Date: March 28, 2025</h6>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl font-semibold block mb-2">Delivery Information</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    <h6 className="text-sm sm:text-base text-gray-700">Name: Sahan Kavinda</h6>
                    <h6 className="text-sm sm:text-base text-gray-700">Contact: 0777 1232121</h6>
                    <h6 className="text-sm sm:text-base text-gray-700">Address: No57, Colombo</h6>
                    <h6 className="text-sm sm:text-base text-gray-700">Date & Time for Delivery: March 30, 2025</h6>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl font-semibold block mb-2">Payment Method</span>
                <h6 className="text-sm sm:text-base text-gray-700">Cash On Delivery</h6>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl font-semibold block mb-2">Item Ordered</span>
                <ItemOrdered/>
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
                        <span className="font-medium">LKR.7000.00</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base mb-2">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">LKR.400.00</span>
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
                        <span className="text-amber-500">LKR.7400.00</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default OrderDetails;
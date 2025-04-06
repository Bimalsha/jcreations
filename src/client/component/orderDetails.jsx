import '../../index.css';
import React from "react";
import ItemOrdered from "./utils/itemOrdered.jsx";
import { motion } from 'motion/react';

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
            className="w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="mb-6">
                <span className={'text-2xl font-semibold'}>Order details #{orderId || "123456"}</span>
                <h6>Date: March 28, 2025</h6>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
                <span className={'text-xl font-semibold'}>Delivery Information</span>
                <h6>Name: Sahan Kavinda</h6>
                <h6>Contact: 0777 1232121</h6>
                <h6>Address: No57, Colombo</h6>
                <h6>Date & Time for Delivery: March 30, 2025 </h6>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
                <span className={'text-xl font-semibold'}>Payment Method</span>
                <h6>Cash On Delivery</h6>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
                <span className={'text-xl font-semibold'}>Item Ordered</span>
                <ItemOrdered/>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="flex justify-end"
            >
                <motion.div
                    className="w-full md:w-1/4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-between">
                        <span>Total Amount</span>
                        <span>LKR.7000.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>LKR.400.00</span>
                    </div>
                    <motion.hr
                        className="my-2"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    />
                    <motion.div
                        className="flex justify-between font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <span>Total </span>
                        <span>LKR.7400.00</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default OrderDetails;
import React from 'react'
import '../../../index.css';
import { motion } from 'framer-motion';
import { FaArrowRightLong } from "react-icons/fa6";

function Orderitem({ order, onViewDetails }) {
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

    // Get status color based on order status
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'text-green-600';
            case 'processing':
                return 'text-blue-600';
            case 'pending':
                return 'text-amber-600';
            case 'cancelled':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    // Format status text
    const formatStatus = (status) => {
        return status ? status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Processing';
    };

    // Calculate total with shipping
    const totalWithShipping = order ? (
        (parseFloat(order.total_amount) || 0) + (parseFloat(order.shipping_charge) || 0)
    ).toFixed(2) : '0.00';

    // Get first item name from order
    const firstItemName = order?.orderItems && order.orderItems.length > 0
        ? order.orderItems[0].product_name
        : "Order Item";

    // Get first item image from order
    const firstItemImage = order?.orderItems && order.orderItems.length > 0 && order.orderItems[0].image
        ? `https://jcreations.1000dtechnology.com/storage/${order.orderItems[0].image}`
        : "/food-placeholder.png";

    // Get number of additional items
    const additionalItems = order?.orderItems?.length > 1
        ? order.orderItems.length - 1
        : 0;

    return (
        <motion.div
            className="bg-white shadow-lg rounded-3xl cursor-pointer hover:shadow-xl transition-shadow w-full mb-4"
            whileHover={{
                scale: 1.03,
                transition: {duration: 0.3}
            }}
        >
            <div className="relative p-4 sm:p-6 md:px-8 md:py-6 flex flex-col lg:flex-row justify-between gap-4">
                <motion.div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <motion.div
                        className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.2}}
                    >
                        <img
                            src={firstItemImage}
                            alt={firstItemName}
                            className="h-full w-full object-cover"
                            onError={(e) => {e.target.src = '/food-placeholder.png'}}
                        />
                    </motion.div>
                    <motion.div className="text-center sm:text-left px-0 sm:px-2 md:px-6">
                        <div className="text-sm md:text-base lg:text-lg font-bold">Order#: {order?.id || "N/A"}</div>
                        <div className="text-xs md:text-sm lg:text-base">Date: {formatDate(order?.order_datetime)}</div>
                        <div className="text-xs md:text-sm lg:text-base mt-1 line-clamp-1">
                            {firstItemName}
                            {additionalItems > 0 &&
                                <span className="text-gray-500"> +{additionalItems} more item{additionalItems > 1 ? 's' : ''}</span>
                            }
                        </div>
                        <div className="mt-1 text-xs md:text-sm lg:text-base">Status:
                            <span className={`${getStatusColor(order?.status)} font-medium`}> {formatStatus(order?.status)}</span>
                        </div>
                    </motion.div>
                </motion.div>

                <hr className="border-1 border-gray-200 lg:hidden my-2"/>

                <motion.div className="flex flex-col items-center lg:items-end">
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold">Rs.{totalWithShipping}</div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(order?.id);
                        }}
                        className="flex items-center gap-2 bg-[#F7A313] text-white rounded-3xl justify-center
                                   px-4 sm:px-6 py-2 sm:py-3 mt-2 sm:mt-4
                                   text-xs sm:text-sm md:text-base
                                   w-full sm:w-auto"
                    >
                        View Details
                        <motion.div
                            animate={{
                                x: [0, 5, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <FaArrowRightLong/>
                        </motion.div>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Orderitem
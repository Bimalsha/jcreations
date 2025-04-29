import React from 'react'
import '../../../index.css';
import {motion} from 'motion/react';
import {FaArrowRightLong} from "react-icons/fa6";

function Orderitem({ onViewDetails }) {
    const orderId = "123456"; // This would come from props in a real application

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
                    <motion.img
                        src="..//pngtree-chocolate-cake-png-image_17407867.png"
                        alt="Product"
                        className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] object-cover"
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.2}}
                    />
                    <motion.div className="text-center sm:text-left px-0 sm:px-2 md:px-6">
                        <div className="text-sm md:text-base lg:text-lg font-bold">Order#: {orderId}</div>
                        <div className="text-xs md:text-sm lg:text-base">Date: March 28, 2025</div>
                        <div className="mt-2 text-xs md:text-sm lg:text-base">Status:
                            <span className="text-green-600 font-medium"> Delivered</span>
                        </div>
                    </motion.div>
                </motion.div>

                <hr className="border-1 border-gray-200 lg:hidden my-2"/>

                <motion.div className="flex flex-col items-center lg:items-end">
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold">Rs.7400.00</div>
                    <button
                        onClick={() => onViewDetails(orderId)}
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
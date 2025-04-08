import React from 'react'
import '../../../index.css';
import {motion} from 'framer-motion';
import {FaArrowRightLong} from "react-icons/fa6";

function Orderitem({ onViewDetails }) {
    const orderId = "123456"; // This would come from props in a real application

    return (
        <motion.div
            className="bg-white shadow-lg rounded-3xl cursor-pointer hover:shadow-xl transition-shadow w-full"
            whileHover={{
                scale: 1.03,
                transition: {duration: 0.3}
            }}
        >
            <div className="relative px-8 pt-4 pb-4 lg:flex justify-between">
                <motion.div className="flex">
                    <motion.img
                        src="../../../../public/pngtree-chocolate-cake-png-image_17407867.png"
                        alt="Product"
                        className="h-[100px] w-[100px] object-cover"
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.2}}
                    />
                    <motion.div className={"px-8"}>
                        <div className={"font-bold"}>Order#:{orderId}</div>
                        <div className={""}>Date: March 28,2025</div>
                        <br/>
                        <div className={""}>Status: Delivered</div>
                    </motion.div>
                </motion.div>
                <hr className={"border-1 border-gray-200 lg:hidden"}/>
                <motion.div className={"justify-items-end"}>
                    <div className={"lg:text-2xl text-start lg:text-end font-semibold"}>Rs.7400.00</div>
                    <button
                        onClick={() => onViewDetails(orderId)}
                        className={'flex items-center gap-2 bg-[#F7A313] text-white rounded-3xl justify-center px-6 py-3 mt-4 w-46 cursor-pointer'}
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
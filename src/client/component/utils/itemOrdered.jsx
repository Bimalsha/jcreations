import React from 'react'
import '../../../index.css';
import {motion} from 'framer-motion';
import {Link} from "react-router-dom";
import {FaArrowRightLong} from "react-icons/fa6";


function itemOrdered() {
    return (
        <motion.div
            className="bg-white shadow-lg rounded-3xl cursor-pointer hover:shadow-xl transition-shadow w-full"
            whileHover={{
                scale: 1.03,
                transition: {duration: 0.3}
            }}
        >
            <div className="relative px-8 pt-4 pb-4 flex justify-between">
                <motion.div className="flex">
                    <motion.img
                        src="../../../../public/pngtree-chocolate-cake-png-image_17407867.png"
                        alt="Product"
                        className="h-[80px] w-[80px] object-cover"
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.2}}
                    />
                    <motion.dev className={"px-8"}>
                        <div className={"font-semibold"}>Chocolate Cake 1 kg  × 1</div>
                    </motion.dev>
                </motion.div>
                <motion.dev className={"justify-items-end"}>
                    <div className={"text-xl"}>Rs.3500.00</div>

                </motion.dev>
            </div>
        </motion.div>
    )
}

export default itemOrdered
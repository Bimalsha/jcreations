import React from 'react'
import '../../../index.css';
import { motion } from 'framer-motion';

function Newitem() {
    return (
        <motion.div
            className="bg-white shadow-lg rounded-3xl cursor-pointer hover:shadow-xl transition-shadow"
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 }
            }}
        >
            <div className="relative flex justify-center">
                <motion.img
                    src="../../../../public/pngtree-chocolate-cake-png-image_17407867.png"
                    alt="Product"
                    className="h-[200px] w-[200px] object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.span
                    className="absolute top-4 right-0 bg-[#F7A313] text-white px-4 py-1 text-sm rounded-tl-2xl"
                    whileHover={{
                        backgroundColor: "#e69200",
                        scale: 1.05
                    }}
                >
                    15% OFF
                </motion.span>
            </div>
            <div className="px-4 pb-3">
                <motion.h3
                    className="font-medium text-[#000F20] hover:text-[#F7A313]"
                    whileHover={{ scale: 1.01 }}
                >
                    Chocolate Birthday Cake ..
                </motion.h3>
                <p className="text-[#B7B3B3] text-[10px] mt-1 text-justify">
                    Savor the irresistible taste of our rich, moist
                    chocolate cake, layered with velvety chocolate ganache and topped with a delicate drizzle of
                    chocolate syrup. A heavenly delight for every dessert lover!
                </p>
                <div className="flex gap-3 items-center my-2">
                    <motion.span
                        className="text-xl font-semibold text-[#F7A313]"
                        whileHover={{ scale: 1.05 }}
                    >
                        Rs.3500.00
                    </motion.span>
                    <span className="text-sm text-[12px] font-medium text-[#9F9A9A99] line-through">
                        Rs.3500.00
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export default Newitem
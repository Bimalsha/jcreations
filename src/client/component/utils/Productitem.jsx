import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

function Productitem() {
    return (
        <>
            <motion.div
                className="bg-white rounded-2xl shadow-md overflow-hidden flex"
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Left Side: Image and Discount */}
                <div className="relative w-1/3">
                    <motion.div
                        className="absolute top-0 left-0 bg-[#F7A313] text-white py-1 px-6 rounded-br-2xl text-sm w-full text-center font-semibold"
                        whileHover={{
                            backgroundColor: "#e69200",
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        15% OFF
                    </motion.div>
                    <div className={'w-full h-full flex justify-center items-center'}>
                        <motion.img
                            src="../../../../public/pngtree-chocolate-cake-png-image_17407867.png"
                            alt="Chocolate Cake"
                            className="lg:w-[130px] lg:h-[130px] w-[90px] h-[90px] object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </div>
                </div>

                {/* Right Side: Description and Price */}
                <div className="p-4 w-2/3">
                    <motion.h2
                        className="lg:text-xl font-semibold text-gray-800 mb-2"
                        whileHover={{ color: "#F7A313" }}
                        transition={{ duration: 0.2 }}
                    >
                        Chocolate Cake 1 kg
                    </motion.h2>
                    <p className="text-[#A5A0A0] text-sm mb-4 text-[10px]">
                        Savor the irresistible taste of our rich, moist chocolate cake, layered with velvety
                        chocolate ganache and topped with a delicate drizzle of chocolate syrup. A
                        heavenly delight for every dessert lover!
                    </p>
                    <div className="flex items-center justify-between">
                        <motion.div
                            className={'flex items-center gap-1'}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="text-[#F7A313] lg:text-lg font-semibold">Rs.3500.00</p>
                            <p className="text-[#A5A0A0] text-[10px] line-through">Rs.4500.00</p>
                        </motion.div>
                        <motion.button
                            className="bg-[#F7A313] hover:bg-yellow-600 text-white font-bold p-2 rounded-full"
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: "#e69200"
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img src="../../../../public/bottomicon/cart.svg" alt="" className={'lg:w-6 lg:h-6 w-4 h-4'}/>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Productitem
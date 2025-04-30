import React from 'react'
import '../../../index.css';
import { motion } from 'framer-motion';

function Newitem({ product }) {
    // Calculate effective price after discount
    const effectivePrice = product.discount_percentage
        ? product.price - (product.price * product.discount_percentage / 100)
        : product.price;

    // Limit description length
    const truncateDescription = (text, maxLength = 120) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

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
                    src={`${import.meta.env.VITE_STORAGE_URL}/${product.images[0]}`}
                    alt={product.name}
                    className="h-[200px] w-[200px] object-cover rounded-3xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                />
                {product.discount_percentage > 0 && (
                    <motion.span
                        className="absolute top-4 right-0 bg-[#F7A313] text-white px-4 py-1 text-sm rounded-tl-2xl"
                        whileHover={{
                            backgroundColor: "#e69200",
                            scale: 1.05
                        }}
                    >
                        {Math.round(product.discount_percentage)}% OFF
                    </motion.span>
                )}
            </div>
            <div className="px-4 pb-3">
                <motion.h3
                    className="font-medium text-[#000F20] hover:text-[#F7A313]"
                    whileHover={{ scale: 1.01 }}
                >
                    {product.name}
                </motion.h3>
                <p className="text-[#B7B3B3] text-[10px] mt-1 text-justify">
                    {truncateDescription(product.description)}
                </p>
                <div className="flex gap-3 items-center my-2">
                    <motion.span
                        className="text-xl font-semibold text-[#F7A313]"
                        whileHover={{ scale: 1.05 }}
                    >
                        Rs.{effectivePrice.toFixed(2)}
                    </motion.span>
                    {product.discount_percentage > 0 && (
                        <span className="text-sm text-[12px] font-medium text-[#9F9A9A99] line-through">
                            Rs.{product.price.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default Newitem
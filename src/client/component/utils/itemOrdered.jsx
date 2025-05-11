// src/client/component/utils/itemOrdered.jsx
import React from 'react';
import { motion } from 'framer-motion';

function ItemOrdered({ item = {} }) {
    // Default values if item is not provided
    const {
        product_name = "Product Name",
        quantity = 1,
        price = 0,
        subtotal = 0,
        image = "/orderimo.webp"
    } = item;

    return (
        <motion.div
            className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg p-3 gap-3"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
        >
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                    src={image}
                    alt={product_name}
                    className="h-full w-full object-cover"
                    onError={(e) => {e.target.src = '/food-placeholder.png'}}
                />
            </div>

            <div className="flex-grow text-center sm:text-left">
                <h3 className="font-medium line-clamp-1">{product_name}</h3>
                <div className="text-sm text-gray-600">
                    <span>Rs.{parseFloat(price).toFixed(2)} × {quantity}</span>
                </div>
            </div>

            <div className="text-right font-semibold">
                Rs.{parseFloat(subtotal).toFixed(2)}
            </div>
        </motion.div>
    );
}

export default ItemOrdered;
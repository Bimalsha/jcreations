import React from "react";
import { motion } from "framer-motion";

const CartItem = ({ item, onRemove, onIncreaseQuantity, onDecreaseQuantity, isRemoving }) => {
  return (
      <motion.div
          className={`relative flex flex-col bg-white border border-gray-300 rounded-lg p-4 mb-4 ${
              isRemoving ? "opacity-50 scale-95" : "opacity-100 scale-100"
          } transition-all duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
      >
        {/* Remove Button */}
        <button
            onClick={() => onRemove(item.id)}
            className="absolute top-4 right-4"
            aria-label="Remove item"
        >
          <img
              src="/bottomicon/remove.png"
              alt="Remove item"
              className="h-5 w-5 sm:h-6 sm:w-6 hover:opacity-80"
          />
        </button>

        {/* Product Image and Details */}
        <div className="flex">
          {/* Left: Product Image */}
          <img
              src={item.image}
              alt={item.name}
              className="h-14 w-14 sm:h-16 sm:w-16 object-cover rounded-md"
          />

          {/* Right: Product Details and Bottom Controls */}
          <div className="ml-4 flex flex-col flex-grow">
            {/* Product Details */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-800">{item.name}</h3>

              {/* Price Display - Show discount if applicable */}
              {item.discount_percentage > 0 ? (
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                      {item.quantity} x
                    </p>
                    <span className="">
                    Rs.{item.effectivePrice.toFixed(2)}
                  </span>
                    <span className="text-gray-400 line-through text-xs">
                    Rs.{item.price.toFixed(2)}
                  </span>
                  </div>
              ) : (
                  <p className="text-xs sm:text-sm text-gray-600">
                    {item.quantity} x Rs.{item.price.toFixed(2)}
                  </p>
              )}
            </div>

            {/* Bottom Row: Total Price and Quantity Controls */}
            <div className="flex justify-between items-center mt-3">
              {/* Total Price */}
              <div className="text-base sm:text-lg font-semibold text-amber-500">
                LKR.{(item.effectivePrice * item.quantity).toFixed(2)}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center">
                <button
                    onClick={() => onDecreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                    className="w-5 h-5 rounded-full bg-black hover:bg-gray-200 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-base sm:text-lg font-bold">-</span>
                </button>
                <span className="mx-2 sm:mx-3 text-base sm:text-lg font-medium">{item.quantity}</span>
                <button
                    onClick={() => onIncreaseQuantity(item.id)}
                    className="w-5 h-5 rounded-full bg-amber-500 hover:bg-gray-200 flex items-center justify-center text-gray-700"
                >
                  <span className="text-base sm:text-lg font-bold">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

export default CartItem;
import React from "react";
import { AnimatePresence } from "framer-motion";
import CartItem from "./CartItem.jsx";

const CartItemDemo = ({ cartItems, onRemove, onIncreaseQuantity, onDecreaseQuantity }) => {
  return (
      <div className="flex flex-col space-y-4">
        <AnimatePresence>
          {cartItems.length > 0 ? (
              cartItems.map((item) => (
                  <CartItem
                      key={item.id}
                      item={item}
                      onRemove={onRemove}
                      onIncreaseQuantity={onIncreaseQuantity}
                      onDecreaseQuantity={onDecreaseQuantity}
                  />
              ))
          ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default CartItemDemo;
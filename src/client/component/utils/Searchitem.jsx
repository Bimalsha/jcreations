// src/client/component/utils/SearchItem.jsx
import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

function SearchItem({ product }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/singleproduct/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (product.status !== "in_stock") {
      toast.error("This product is currently out of stock");
      return;
    }

    try {
      const existingCartId = localStorage.getItem("jcreations_cart_id");
      const payload = {
        product_id: product.id,
        quantity: 1
      };
      if (existingCartId) {
        payload.cart_id = existingCartId;
      }

      const response = await api.post("/cart/items", payload);
      if (response.data && response.data.cart_id) {
        localStorage.setItem("jcreations_cart_id", response.data.cart_id);
      }

      toast.success("Add to cart successfully");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.response?.data?.message || "Failed to add item to cart");
    }
  };

  // Helper function to safely get image URL
  const getImageUrl = () => {
    if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
      return '/default-product.jpg';
    }
    return `${import.meta.env.VITE_STORAGE_URL}/${product.images[0]}`;
  };

  return (
      <motion.div
          className="bg-white rounded-2xl border-2 border-[#F0F0F0] overflow-hidden flex cursor-pointer"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.3 }}
          onClick={handleProductClick}
      >
        <div className="relative w-1/3">
          {product.discount_percentage > 0 && product.status === "in_stock" && (
              <motion.div
                  className="absolute top-0 left-0 bg-[#F7A313] text-white py-1 px-6 rounded-br-2xl text-sm w-full text-center font-semibold"
                  whileHover={{
                    backgroundColor: "#e69200",
                    y: [0, -2, 0],
                  }}
                  transition={{ duration: 0.5 }}
              >
                {product.discount_percentage}% OFF
              </motion.div>
          )}

          {product.status !== "in_stock" && (
              <motion.div
                  className="absolute top-0 left-0 bg-gray-500 text-white py-1 px-6 rounded-br-2xl text-sm w-full text-center font-semibold"
                  whileHover={{
                    backgroundColor: "#3a3a3a",
                    y: [0, -2, 0],
                  }}
                  transition={{ duration: 0.5 }}
              >
                Out of Stock
              </motion.div>
          )}

          <div className="w-full h-full flex justify-center items-center">
            <motion.img
                src={getImageUrl()}
                alt={product.name}
                className={`lg:w-[130px] lg:h-[130px] w-[90px] h-[90px] object-cover rounded-2xl ${product.status !== "in_stock" ? 'opacity-70' : ''}`}
                whileHover={{ scale: product.status === "in_stock" ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                onError={(e) => {
                  e.target.src = '/default-product.jpg';
                }}
            />
          </div>
        </div>

        <div className="p-4 w-2/3">
          <motion.h2
              className="lg:text-xl font-semibold text-gray-800 mb-2"
              whileHover={{ color: "#F7A313" }}
              transition={{ duration: 0.2 }}
          >
            {product.name}
          </motion.h2>
          <p className="text-[#A5A0A0] text-sm mb-2 text-[10px]">
            {product.description && (product.description.length > 100 ? product.description.slice(0, 100) + "..." : product.description)}
          </p>

          <div className="mb-2 flex items-center">
            {product.status === "in_stock" ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              In Stock
            </span>
            ) : (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <motion.div
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
              {product.discount_percentage > 0 ? (
                  <>
                    <p className="text-[#F7A313] lg:text-lg font-semibold">
                      Rs.{(product.price * (1 - product.discount_percentage / 100)).toFixed(2)}
                    </p>
                    <p className="text-[#A5A0A0] text-[10px] line-through">
                      Rs.{product.price?.toFixed(2)}
                    </p>
                  </>
              ) : (
                  <p className="text-[#F7A313] lg:text-lg font-semibold">
                    Rs.{product.price?.toFixed(2)}
                  </p>
              )}
            </motion.div>

            <motion.button
                className={`${product.status === "in_stock" ? 'bg-[#F7A313] hover:bg-yellow-600' : 'bg-gray-400 cursor-not-allowed'} text-white font-bold p-2 rounded-full`}
                whileHover={{
                  scale: product.status === "in_stock" ? 1.1 : 1,
                  backgroundColor: product.status === "in_stock" ? "#e69200" : undefined,
                }}
                whileTap={{ scale: product.status === "in_stock" ? 0.95 : 1 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => product.status === "in_stock" && handleAddToCart(e)}
            >
              <img
                  src="/bottomicon/cart.svg"
                  alt="Add to cart"
                  className="lg:w-6 lg:h-6 w-4 h-4"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
  );
}

export default SearchItem;
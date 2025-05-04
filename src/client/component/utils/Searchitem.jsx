// src/client/component/utils/Searchitem.jsx
import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

function SearchItem({ product }) {
  const navigate = useNavigate();
  console.log("SearchItem received product:", product);

  if (!product) {
    console.error("SearchItem received null or undefined product");
    return null;
  }

  // Safe access to product data with fallbacks
  const safeProduct = {
    id: product?.id || 0,
    name: product?.name || "Unknown Product",
    description: product?.description || "",
    price: typeof product?.price === 'number' ? product.price :
        parseFloat(product?.price) || 0,
    discount_percentage: typeof product?.discount_percentage === 'number' ?
        product.discount_percentage :
        parseFloat(product?.discount_percentage) || 0,
    status: product?.status || "out_of_stock",
    images: Array.isArray(product?.images) ? product.images :
        (product?.images ? [product.images] : [])
  };

  const handleProductClick = () => {
    if (safeProduct.id) {
      navigate(`/singleproduct/${safeProduct.id}`);
    } else {
      toast.error("Product details unavailable");
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (safeProduct.status !== "in_stock") {
      toast.error("This product is currently out of stock");
      return;
    }

    try {
      // Add to cart logic
      const existingCartId = localStorage.getItem("jcreations_cart_id");
      const payload = {
        product_id: safeProduct.id,
        quantity: 1
      };
      if (existingCartId) {
        payload.cart_id = existingCartId;
      }

      console.log("Adding to cart:", payload);
      const response = await api.post("/cart/items", payload);

      if (response.data && response.data.cart_id) {
        localStorage.setItem("jcreations_cart_id", response.data.cart_id);
      }

      toast.success("Added to cart successfully");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.response?.data?.message || "Failed to add item to cart");
    }
  };

  // Helper function to safely get image URL
  const getImageUrl = () => {
    if (!safeProduct.images || safeProduct.images.length === 0) {
      return '/default-product.jpg';
    }

    // Check if the image URL already contains the storage URL
    const imgPath = safeProduct.images[0];
    if (!imgPath) return '/default-product.jpg';

    if (imgPath.startsWith('http')) {
      return imgPath;
    }

    // If VITE_STORAGE_URL is not defined, use a relative path
    const storageUrl = import.meta.env.VITE_STORAGE_URL || '';
    return `${storageUrl}/${imgPath}`;
  };

  // Calculate discounted price
  const originalPrice = safeProduct.price;
  const discountPercentage = safeProduct.discount_percentage || 0;
  const discountedPrice = originalPrice * (1 - (discountPercentage / 100));

  return (
      <motion.div
          className="bg-white rounded-2xl border-2 border-[#F0F0F0] overflow-hidden flex cursor-pointer w-full"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.3 }}
          onClick={handleProductClick}
      >
        <div className="relative w-1/3 min-h-[140px] flex items-center justify-center">
          {/* Discount or out of stock badge */}
          {discountPercentage > 0 && safeProduct.status === "in_stock" && (
              <motion.div
                  className="absolute top-0 left-0 bg-[#F7A313] text-white py-1 px-3 rounded-br-2xl text-sm w-full text-center font-semibold z-10"
              >
                {discountPercentage}% OFF
              </motion.div>
          )}

          {safeProduct.status !== "in_stock" && (
              <motion.div
                  className="absolute top-0 left-0 bg-gray-500 text-white py-1 px-3 rounded-br-2xl text-sm w-full text-center font-semibold z-10"
              >
                Out of Stock
              </motion.div>
          )}

          {/* Product image */}
          <div className="w-full h-full flex justify-center items-center p-3">
            <motion.img
                src={getImageUrl()}
                alt={safeProduct.name}
                className={`w-full h-auto max-h-[120px] object-contain rounded-xl ${
                    safeProduct.status !== "in_stock" ? "opacity-70" : ""
                }`}
                whileHover={{ scale: safeProduct.status === "in_stock" ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.src = '/default-product.jpg';
                }}
            />
          </div>
        </div>

        <div className="p-4 w-2/3 flex flex-col justify-between">
          <div>
            <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
              {safeProduct.name}
            </h2>

            <p className="text-[#A5A0A0] text-xs mb-2 line-clamp-2">
              {safeProduct.description || "No description available"}
            </p>

            <div className="mb-2">
              {safeProduct.status === "in_stock" ? (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                In Stock
              </span>
              ) : (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                Out of Stock
              </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1">
              {discountPercentage > 0 ? (
                  <>
                    <p className="text-[#F7A313] text-base lg:text-lg font-semibold">
                      Rs.{discountedPrice.toFixed(2)}
                    </p>
                    <p className="text-[#A5A0A0] text-xs line-through">
                      Rs.{originalPrice.toFixed(2)}
                    </p>
                  </>
              ) : (
                  <p className="text-[#F7A313] text-base lg:text-lg font-semibold">
                    Rs.{originalPrice.toFixed(2)}
                  </p>
              )}
            </div>

            <motion.button
                className={`${
                    safeProduct.status === "in_stock"
                        ? 'bg-[#F7A313] hover:bg-yellow-600'
                        : 'bg-gray-400 cursor-not-allowed'
                } text-white font-bold p-2 rounded-full`}
                whileHover={{
                  scale: safeProduct.status === "in_stock" ? 1.1 : 1,
                }}
                whileTap={{ scale: safeProduct.status === "in_stock" ? 0.95 : 1 }}
                onClick={(e) => safeProduct.status === "in_stock" && handleAddToCart(e)}
            >
              <img
                  src="/bottomicon/cart.svg"
                  alt="Add to cart"
                  className="w-5 h-5"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
  );
}

export default SearchItem;
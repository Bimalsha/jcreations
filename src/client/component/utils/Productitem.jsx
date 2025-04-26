import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

const Productitem = forwardRef(({ onLoadingChange }, ref) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchProducts = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      if (onLoadingChange) onLoadingChange(true);

      // Calculate offset based on page number
      const offset = (pageNum - 1) * limit;
      console.log(`Fetching products with offset ${offset}, limit ${limit}`);

      // Modified API call to use proper pagination parameters
      const response = await api.get(`/products/${limit}`, {
        params: { page: pageNum, offset: offset },
      });

      const newProducts = response.data;
      console.log(`Received ${newProducts.length} products from API`);

      // Update hasMore if fewer products are returned than the limit
      if (newProducts.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      // If we're appending, make sure to filter out any potential duplicates
      if (append) {
        const existingIds = new Set(products.map(product => product.id));
        const uniqueNewProducts = newProducts.filter(product => !existingIds.has(product.id));

        if (uniqueNewProducts.length === 0) {
          console.log("No new unique products received");
          setHasMore(false);
        } else {
          setProducts(prev => [...prev, ...uniqueNewProducts]);
        }
      } else {
        setProducts(newProducts);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
      if (onLoadingChange) onLoadingChange(false);
    }
  };

  useEffect(() => {
    // Initial load of first 10 products
    fetchProducts(1, false);
  }, []);

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    console.log(`Loading more products, page ${nextPage}`);
    setPage(nextPage);
    fetchProducts(nextPage, true);
  };

  const handleProductClick = (productId) => {
    navigate(`/singleproduct/${productId}`);
  };

  const handleAddToCart = async (productId, e) => {
    // Prevent navigation when clicking the cart button
    if (e) e.stopPropagation();

    try {
      const existingCartId = localStorage.getItem("jcreations_cart_id");
      const payload = {
        product_id: productId,
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
      if (err.response && err.response.status === 422) {
        toast.error(err.response.data.message || "Validation error");
      } else {
        toast.error("Failed to add item to cart");
      }
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    loadMoreProducts,
    hasMore
  }));

  if (loading && products.length === 0) return <div className="col-span-2 text-center">Loading products...</div>;
  if (error) return <div className="col-span-2 text-center">Error: {error}</div>;

  return (
      <>
        {products.map((product) => (
            <motion.div
                key={product.id}
                className="bg-white rounded-2xl border-2 border-[#F0F0F0] overflow-hidden flex cursor-pointer"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handleProductClick(product.id)}
            >
              {/* Left Side: Image and Discount */}
              <div className="relative w-1/3">
                {product.discount_percentage > 0 && (
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
                <div className={"w-full h-full flex justify-center items-center"}>
                  <motion.img
                      src={`https://jcreations.1000dtechnology.com/storage/${product.images[0]}`}
                      alt={product.name}
                      className="lg:w-[130px] lg:h-[130px] w-[90px] h-[90px] object-cover rounded-2xl"
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
                  {product.name}
                </motion.h2>
                <p className="text-[#A5A0A0] text-sm mb-4 text-[10px]">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <motion.div
                      className={"flex items-center gap-1"}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                  >
                    <p className="text-[#F7A313] lg:text-lg font-semibold">
                      Rs.{product.price.toFixed(2)}
                    </p>
                    {product.discount_percentage > 0 && (
                        <p className="text-[#A5A0A0] text-[10px] line-through">
                          Rs.
                          {(
                              product.price *
                              (1 + product.discount_percentage / 100)
                          ).toFixed(2)}
                        </p>
                    )}
                  </motion.div>
                  <motion.button
                      className="bg-[#F7A313] hover:bg-yellow-600 text-white font-bold p-2 rounded-full"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#e69200",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => handleAddToCart(product.id, e)}
                  >
                    <img
                        src="/bottomicon/cart.svg"
                        alt="Add to cart"
                        className={"lg:w-6 lg:h-6 w-4 h-4"}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
        ))}
        {loading && products.length > 0 && (
            <div className="col-span-2 text-center">Loading more products...</div>
        )}
      </>
  );
});

export default Productitem;
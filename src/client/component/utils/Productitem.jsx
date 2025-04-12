import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Productitem() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://jcreations.1000dtechnology.com/api/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

const handleAddToCart = async (productId) => {
    try {
        const response = await fetch(
            `https://jcreations.1000dtechnology.com/api/cart/items`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Allow credentials and cookies
                    "Accept": "application/json",
                },
                // Enable credentials to send and receive cookies
                credentials: 'include',
                body: JSON.stringify({
                    product_id: productId,
                    quantity: 1,
                }),
            }
        );

        if (response.status === 422) {
            const errorData = await response.json();
            toast.error(errorData.message);
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to add item to cart");
        }

        const data = await response.json();
        console.log("Added to cart:", data);
        toast.success("Added to cart successfully!");

        // If there's a new session cookie, it will be automatically handled by the browser
        // due to credentials: 'include'
    } catch (err) {
        console.error("Error adding to cart:", err);
        toast.error("Failed to add item to cart");
    }
};

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white rounded-2xl border-2 border-[#F0F0F0] overflow-hidden flex"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.3 }}
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
                className="lg:w-[130px] lg:h-[130px] w-[90px] h-[90px] object-cover rounded-b-2xl"
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
                onClick={() => handleAddToCart(product.id)}
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
    </>
  );
}

export default Productitem;

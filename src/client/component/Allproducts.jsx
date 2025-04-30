import React, { useState, useRef, useEffect } from 'react'
import Productitem from './utils/Productitem'
import { motion } from "framer-motion"

function Allproducts() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const productItemRef = useRef(null);

    const handleSeeMore = () => {
        if (productItemRef.current) {
            productItemRef.current.loadMoreProducts();
        }
    };

    // Check if there are more products to load
    useEffect(() => {
        const checkHasMore = () => {
            if (productItemRef.current) {
                setHasMore(productItemRef.current.hasMore);
            }
        };

        // Check on mount and whenever loading state changes
        checkHasMore();

        // Setup an interval to check hasMore regularly
        const interval = setInterval(checkHasMore, 500);
        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <>
            <section className="pt-10 flex justify-center">
                <div className={'max-w-7xl w-full lg:flex justify-between px-2'}>
                    <div className={'flex flex-col w-full'}>
                        <span className={'px-2 text-2xl'}>
                            All Products
                        </span>

                        <div className={'grid lg:grid-cols-2 mt-4 gap-4'}>
                            <Productitem
                                ref={productItemRef}
                                onLoadingChange={setIsLoading}
                            />
                        </div>

                        {hasMore && (
                            <div className={'w-full flex justify-center mt-6'}>
                                <motion.button
                                    className={'bg-[#F7A313] py-2 rounded-full px-8 text-white flex items-center gap-2 disabled:opacity-70'}
                                    onClick={handleSeeMore}
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.05, backgroundColor: "#e69200" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : "See More"}
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Allproducts
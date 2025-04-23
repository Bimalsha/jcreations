import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from "../../../utils/axios.js";

function Categoryitem() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);
    const DEFAULT_IMAGE = "/placeholder.png";

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Get image source with fallback
    const getImageSrc = (category) => {
        if (!category || !category.img) return DEFAULT_IMAGE;

        const storageUrl = import.meta.env.VITE_STORAGE_URL || 'https://jcreations.1000dtechnology.com/storage';
        return `${storageUrl}/${category.img}`;
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    // Horizontal scroll handling for touch devices
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const handleWheel = (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
            }
        };

        scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
        return () => scrollContainer.removeEventListener("wheel", handleWheel);
    }, []);

    if (loading) {
        return <div className="w-full mt-4 text-center">Loading categories...</div>;
    }

    if (error) {
        return <div className="w-full mt-4 text-center text-red-500">{error}</div>;
    }

    return (
        <motion.div
            className="w-full mt-4 overflow-visible"
            initial="hidden"
            animate="visible"
            variants={container}
        >
            {/* Desktop view - grid layout */}
            <div className="hidden md:grid md:grid-cols-6 md:gap-4">
                {categories.map((category, index) => (
                    <motion.div
                        className="flex flex-col justify-center items-center"
                        key={category.id || index}
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="rounded-full flex flex-col items-center justify-center w-36 h-36 p-4 shadow-xl shadow-gray-400 bg-[#FFF7E6]"
                            whileHover={{
                                boxShadow: "0px 8px 20px rgba(247, 163, 19, 0.3)",
                                y: -5
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.img
                                src={getImageSrc(category)}
                                alt={category.name}
                                className="w-16 h-16 object-contain"
                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                                onError={(e) => {
                                    e.target.src = DEFAULT_IMAGE;
                                    e.target.onerror = null;
                                }}
                            />
                        </motion.div>
                        <motion.span
                            className="mt-2 text-center font-medium"
                            whileHover={{ color: "#F7A313" }}
                        >
                            {category.name}
                        </motion.span>
                    </motion.div>
                ))}
            </div>

            {/* Mobile view - horizontal scroll */}
            <div
                ref={scrollRef}
                className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {categories.map((category, index) => (
                    <motion.div
                        className="flex flex-col justify-center items-center flex-shrink-0 snap-center"
                        key={category.id || index}
                        variants={item}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="rounded-full flex flex-col items-center justify-center w-20 h-20 p-3 shadow-md shadow-gray-300 bg-[#FFF7E6]"
                            whileHover={{
                                boxShadow: "0px 5px 15px rgba(247, 163, 19, 0.2)",
                                scale: 1.05
                            }}
                        >
                            <motion.img
                                src={getImageSrc(category)}
                                alt={category.name}
                                className="w-10 h-10 object-contain"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                onError={(e) => {
                                    e.target.src = DEFAULT_IMAGE;
                                    e.target.onerror = null;
                                }}
                            />
                        </motion.div>
                        <motion.span
                            className="mt-2 text-xs text-center"
                            whileHover={{ color: "#F7A313" }}
                        >
                            {category.name}
                        </motion.span>
                    </motion.div>
                ))}

                {/* Scroll indicator */}
                <motion.div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: 3, delay: 1 }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="#F7A313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            </div>

            {/* Custom CSS for hiding scrollbar */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </motion.div>
    );
}

export default Categoryitem;
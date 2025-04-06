import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
import { FiSearch, FiFilter } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import ProductItem from "./utils/Productitem.jsx";


function Search({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches] = useState(['birthday cake', 'chocolate cupcake', 'wedding cake']);
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedOffers, setSelectedOffers] = useState([]);

    // Sample data
    const categories = ['all', 'birthday cakes', 'wedding cakes', 'cupcakes', 'pastries', 'cookies'];
    const offerTypes = ['Free delivery', 'On sale', 'New arrivals', 'Bestsellers'];

    // Sample product data
    const [searchResults, setSearchResults] = useState([
        {
            id: 1,
            name: 'Chocolate Birthday Cake',
            price: 2500,
            category: 'birthday cakes',
            rating: 4.5,
            reviews: 24,
            image: 'https://source.unsplash.com/random/300x300?chocolate+cake',
            onSale: true,
            freeDelivery: false
        },
        {
            id: 2,
            name: 'Vanilla Cupcake Box',
            price: 1200,
            category: 'cupcakes',
            rating: 4.0,
            reviews: 18,
            image: 'https://source.unsplash.com/random/300x300?vanilla+cupcake',
            onSale: false,
            freeDelivery: true
        },
        {
            id: 3,
            name: 'Wedding Celebration Cake',
            price: 8500,
            category: 'wedding cakes',
            rating: 5.0,
            reviews: 32,
            image: 'https://source.unsplash.com/random/300x300?wedding+cake',
            onSale: false,
            freeDelivery: true
        },
        {
            id: 4,
            name: 'Strawberry Shortcake',
            price: 1800,
            category: 'pastries',
            rating: 4.2,
            reviews: 15,
            image: 'https://source.unsplash.com/random/300x300?strawberry+cake',
            onSale: true,
            freeDelivery: false
        },
        {
            id: 5,
            name: 'Chocolate Chip Cookies',
            price: 800,
            category: 'cookies',
            rating: 4.7,
            reviews: 42,
            image: 'https://source.unsplash.com/random/300x300?chocolate+cookies',
            onSale: false,
            freeDelivery: false
        },
        {
            id: 6,
            name: 'Red Velvet Cake',
            price: 3200,
            category: 'birthday cakes',
            rating: 4.8,
            reviews: 38,
            image: 'https://source.unsplash.com/random/300x300?red+velvet+cake',
            onSale: true,
            freeDelivery: true
        }
    ]);

    // Filtered products
    const filteredProducts = searchResults.filter(product => {
        // Filter by search query
        const matchesQuery = !searchQuery ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by category
        const matchesCategory = selectedCategory === 'all' ||
            product.category === selectedCategory;

        // Filter by price
        const matchesPrice = product.price >= priceRange[0] &&
            product.price <= priceRange[1];

        // Filter by offers
        const matchesOffers = selectedOffers.length === 0 ||
            (selectedOffers.includes('On sale') && product.onSale) ||
            (selectedOffers.includes('Free delivery') && product.freeDelivery) ||
            (selectedOffers.includes('New arrivals') && product.id > 4) ||
            (selectedOffers.includes('Bestsellers') && product.rating >= 4.5);

        return matchesQuery && matchesCategory && matchesPrice && matchesOffers;
    });

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                const searchInput = document.getElementById('search-input');
                if (searchInput) searchInput.focus();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const toggleOffer = (offer) => {
        setSelectedOffers(prev =>
            prev.includes(offer)
                ? prev.filter(item => item !== offer)
                : [...prev, offer]
        );
    };

    const handlePriceChange = (e, index) => {
        const value = parseInt(e.target.value);
        setPriceRange(prev => {
            const newRange = [...prev];
            newRange[index] = value;
            return newRange;
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-white z-50 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="max-w-7xl w-full flex flex-col">
                        <div className="flex justify-between items-center p-5 border-b">
                            <h2 className="text-xl font-medium">Search</h2>
                            <motion.button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100"
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <IoMdClose size={24} />
                            </motion.button>
                        </div>

                        <div className="p-5 border-b">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <FiSearch className="text-gray-400" size={20} />
                                </div>
                                <input
                                    id="search-input"
                                    type="text"
                                    className="w-full bg-gray-100 rounded-full py-3 pl-10 pr-14 focus:outline-none focus:ring-2 focus:ring-[#F7A313]"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <FiFilter className={`${showFilters ? 'text-[#F7A313]' : 'text-gray-400'}`} size={20} />
                                </button>
                            </div>

                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden mt-4"
                                    >
                                        {/* Categories */}
                                        <div className="mb-4">
                                            <h3 className="text-sm font-medium mb-2">Categories</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {categories.map(category => (
                                                    <button
                                                        key={category}
                                                        onClick={() => setSelectedCategory(category)}
                                                        className={`px-3 py-1 text-sm rounded-full ${
                                                            selectedCategory === category
                                                                ? 'bg-[#F7A313] text-white'
                                                                : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price Range */}
                                        <div className="mb-4">
                                            <h3 className="text-sm font-medium mb-2">Price Range</h3>
                                            <div className="px-2">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-xs text-gray-500">Rs. {priceRange[0]}</span>
                                                    <span className="text-xs text-gray-500">Rs. {priceRange[1]}</span>
                                                </div>
                                                <div className="relative py-1">
                                                    <div className="absolute h-1 bg-gray-200 inset-x-0 top-1/2 transform -translate-y-1/2 rounded-full"></div>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="10000"
                                                        value={priceRange[0]}
                                                        onChange={(e) => handlePriceChange(e, 0)}
                                                        className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
                                                        style={{
                                                            '--range-color': '#F7A313',
                                                            zIndex: 1
                                                        }}
                                                    />
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="10000"
                                                        value={priceRange[1]}
                                                        onChange={(e) => handlePriceChange(e, 1)}
                                                        className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
                                                        style={{
                                                            '--range-color': '#F7A313',
                                                            zIndex: 2
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex justify-between gap-2 mt-3">
                                                    <input
                                                        type="number"
                                                        value={priceRange[0]}
                                                        onChange={(e) => handlePriceChange(e, 0)}
                                                        className="w-full px-3 py-1 border rounded-md text-sm"
                                                        min="0"
                                                        max={priceRange[1]}
                                                    />
                                                    <input
                                                        type="number"
                                                        value={priceRange[1]}
                                                        onChange={(e) => handlePriceChange(e, 1)}
                                                        className="w-full px-3 py-1 border rounded-md text-sm"
                                                        min={priceRange[0]}
                                                        max="10000"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Offers */}
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">Offers</h3>
                                            <div className="space-y-2">
                                                {offerTypes.map(offer => (
                                                    <div
                                                        key={offer}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`offer-${offer}`}
                                                            checked={selectedOffers.includes(offer)}
                                                            onChange={() => toggleOffer(offer)}
                                                            className="w-4 h-4 accent-[#F7A313]"
                                                        />
                                                        <label
                                                            htmlFor={`offer-${offer}`}
                                                            className="ml-2 text-sm"
                                                        >
                                                            {offer}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex-1 overflow-auto p-5">
                            {!searchQuery && !showFilters && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h3>
                                    <div className="space-y-3">
                                        {recentSearches.map((search, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                whileHover={{ x: 5 }}
                                                onClick={() => setSearchQuery(search)}
                                            >
                                                <FiSearch className="text-gray-400 mr-3" size={16} />
                                                <span>{search}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(searchQuery || showFilters) && (
                                <div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                                        <p className="text-sm text-gray-500">
                                            {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                                            {searchQuery ? ` for "${searchQuery}"` : ''}
                                            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                                            {selectedOffers.length > 0 && ` with special offers`}
                                        </p>
                                        <div className="flex items-center text-sm">
                                            <span className="mr-2">Sort by:</span>
                                            <select className="border-none bg-gray-100 rounded-md px-2 py-1 text-sm">
                                                <option>Relevance</option>
                                                <option>Price: Low to High</option>
                                                <option>Price: High to Low</option>
                                                <option>Newest First</option>
                                            </select>
                                        </div>
                                    </div>

                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                            {filteredProducts.map(product => (
                                                <ProductItem key={product.id} product={product} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                                                <FiSearch className="text-gray-400" size={24} />
                                            </div>
                                            <h3 className="text-gray-700 font-medium">No products found</h3>
                                            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Search
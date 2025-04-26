import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
import { FiSearch, FiFilter } from 'react-icons/fi'
import ProductItem from "./utils/Productitem.jsx"
import api from "../../utils/axios.js"
import toast from 'react-hot-toast'

function Search({ isOpen, onClose }) {
    // Search inputs
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('jcreations_recent_searches');
        return saved ? JSON.parse(saved) : ['birthday cake', 'chocolate cupcake', 'wedding cake'];
    });

    // UI states
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedOffers, setSelectedOffers] = useState([]);
    const [sortOption, setSortOption] = useState('relevance');

    // Search data
    const [categories, setCategories] = useState(['all']);
    const [searchResults, setSearchResults] = useState([]);
    const [limit] = useState(20);

    // Refs for search optimization
    const searchCache = useRef(new Map());
    const abortControllerRef = useRef(null);
    const paramsStringRef = useRef('');
    const isMounted = useRef(false);

    const offerTypes = ['Free delivery', 'On sale', 'New arrivals', 'Bestsellers'];

    // Set mounted state
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
            // Cancel any pending requests on unmount
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Core search function - optimized with useCallback to prevent recreating on every render
    const fetchProducts = useCallback(async (forceRefresh = false) => {
        if (!isOpen || loading) return;

        // Cancel any ongoing requests
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create a new abort controller
        abortControllerRef.current = new AbortController();

        // Build search params
        const queryParams = new URLSearchParams();

        if (searchQuery.trim()) {
            queryParams.append('query', searchQuery.trim());
        }

        if (selectedCategory !== 'all') {
            queryParams.append('category', selectedCategory);
        }

        queryParams.append('min_price', priceRange[0]);
        queryParams.append('max_price', priceRange[1]);

        if (selectedOffers.includes('On sale')) {
            queryParams.append('discount', 'true');
        }

        // Sorting
        if (sortOption !== 'relevance') {
            const [sortField, sortOrder] = sortOption.split('_');
            queryParams.append('sort', sortField);
            queryParams.append('order', sortOrder || 'asc');
        }

        queryParams.append('limit', limit.toString());

        const paramsString = queryParams.toString();
        paramsStringRef.current = paramsString;

        // Return cached results if available and not forcing refresh
        if (!forceRefresh && searchCache.current.has(paramsString)) {
            console.log("Using cached results for:", paramsString);
            setSearchResults(searchCache.current.get(paramsString));
            return;
        }

        // Save search query to recents if needed
        if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
            const updatedSearches = [searchQuery, ...recentSearches.slice(0, 4)];
            setRecentSearches(updatedSearches);
            localStorage.setItem('jcreations_recent_searches', JSON.stringify(updatedSearches));
        }

        // Execute search
        try {
            setLoading(true);
            setError(null);

            console.log(`Searching with: ${paramsString}`);

            const response = await api.get(`/products/search`, {
                params: Object.fromEntries(queryParams),
                signal: abortControllerRef.current.signal
            });

            if (!isMounted.current) return;

            // Process results - ensure unique items
            if (response?.data) {
                let products = [];

                if (Array.isArray(response.data)) {
                    const uniqueIds = new Set();

                    products = response.data.filter(product => {
                        if (!product.id || uniqueIds.has(product.id)) return false;
                        uniqueIds.add(product.id);
                        return true;
                    });

                    console.log(`Received ${products.length} unique results from ${response.data.length} total`);
                }

                // Only update if this is still the latest search
                if (paramsStringRef.current === paramsString) {
                    // Cache the results
                    searchCache.current.set(paramsString, products);

                    // Limit cache size to 10 searches
                    if (searchCache.current.size > 10) {
                        const oldestKey = searchCache.current.keys().next().value;
                        searchCache.current.delete(oldestKey);
                    }

                    setSearchResults(products);
                }
            }
        } catch (err) {
            if (!isMounted.current || err.name === 'AbortError') return;

            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again.");
            toast.error("Search failed. Please check your connection.");
        } finally {
            if (isMounted.current && paramsStringRef.current === paramsString) {
                setLoading(false);
            }
        }
    }, [isOpen, searchQuery, selectedCategory, priceRange, selectedOffers, sortOption, limit, recentSearches]);

    // Load categories once
    useEffect(() => {
        if (isOpen && categories.length <= 1) {
            const loadCategories = async () => {
                try {
                    const response = await api.get('/categories');

                    if (isMounted.current && response?.data) {
                        const uniqueCategories = new Set(['all']);

                        if (Array.isArray(response.data)) {
                            response.data.forEach(cat => {
                                const name = cat.name || cat.category_name || cat;
                                if (name && typeof name === 'string') {
                                    uniqueCategories.add(name);
                                }
                            });
                        }

                        setCategories(Array.from(uniqueCategories));
                    }
                } catch (err) {
                    console.error("Error loading categories:", err);
                    // Don't block search functionality if categories fail
                }
            };

            loadCategories();
        }
    }, [isOpen, categories.length]);

    // Debounced search on criteria changes
    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(timer);
    }, [fetchProducts, isOpen]);

    // Focus search input when opened
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                document.getElementById('search-input')?.focus();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handler functions
    const toggleOffer = (offer) => {
        setSelectedOffers(prev =>
            prev.includes(offer)
                ? prev.filter(item => item !== offer)
                : [...prev, offer]
        );
    };

    const handlePriceChange = (e, index) => {
        const value = parseInt(e.target.value) || 0;
        setPriceRange(prev => {
            const newRange = [...prev];
            newRange[index] = value;

            // Ensure min <= max
            if (index === 0 && value > newRange[1]) {
                newRange[1] = value;
            } else if (index === 1 && value < newRange[0]) {
                newRange[0] = value;
            }

            return newRange;
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts(true);
    };

    const handleRecentSearchClick = (search) => {
        setSearchQuery(search);
        // Use a small timeout to ensure state updates before search
        setTimeout(() => fetchProducts(true), 10);
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
                    {/* Component UI remains the same as your current implementation */}
                    <div className="max-w-7xl w-full flex flex-col">
                        {/* Header */}
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

                        {/* Search and filters section */}
                        <div className="p-5 border-b">
                            {/* Search input form */}
                            <form onSubmit={handleSearch}>
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
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <FiFilter className={`${showFilters ? 'text-[#F7A313]' : 'text-gray-400'}`} size={20} />
                                    </button>
                                </div>
                            </form>

                            {/* Filter panel */}
                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden mt-4"
                                    >
                                        {/* Your existing filter content */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Results section */}
                        <div className="flex-1 overflow-auto p-5">
                            {/* Recent searches section */}
                            {!searchQuery && !showFilters && searchResults.length === 0 && !loading && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h3>
                                    <div className="space-y-3">
                                        {recentSearches.map((search, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                whileHover={{ x: 5 }}
                                                onClick={() => handleRecentSearchClick(search)}
                                            >
                                                <FiSearch className="text-gray-400 mr-3" size={16} />
                                                <span>{search}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Search results section */}
                            {(searchQuery || showFilters || searchResults.length > 0 || loading) && (
                                <div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                                        <p className="text-sm text-gray-500">
                                            {loading ? 'Searching...' :
                                                `${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'}`}
                                            {searchQuery ? ` for "${searchQuery}"` : ''}
                                            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                                            {selectedOffers.length > 0 && ` with special offers`}
                                        </p>
                                        <div className="flex items-center text-sm">
                                            <span className="mr-2">Sort by:</span>
                                            <select
                                                className="border-none bg-gray-100 rounded-md px-2 py-1 text-sm"
                                                value={sortOption}
                                                onChange={(e) => setSortOption(e.target.value)}
                                            >
                                                <option value="relevance">Relevance</option>
                                                <option value="price_asc">Price: Low to High</option>
                                                <option value="price_desc">Price: High to Low</option>
                                                <option value="newest">Newest First</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Results display */}
                                    {loading ? (
                                        <div className="flex justify-center items-center py-12">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7A313]"></div>
                                        </div>
                                    ) : error ? (
                                        <div className="py-8 text-center">
                                            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-red-100 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-gray-700 font-medium">Error loading products</h3>
                                            <p className="text-sm text-gray-500 mt-1">{error}</p>
                                            <button
                                                className="mt-4 px-4 py-2 bg-[#F7A313] text-white rounded-md text-sm"
                                                onClick={() => fetchProducts(true)}
                                            >
                                                Try Again
                                            </button>
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                            {searchResults.map(product => (
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
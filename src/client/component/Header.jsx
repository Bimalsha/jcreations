import React, { useState, useEffect } from 'react'
import { FiUser } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";
import Search from './Search';
import axios from 'axios';
// Import cart store
import useCartStore from '../../stores/cartStore';

function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [contactNumber, setContactNumber] = useState('070 568 7994');

    // Get cart item count from store
    const { itemCount, fetchCart } = useCartStore();

    // Fetch contact numbers
    // Fetch contact numbers - updated with proper error handling and debugging
    const fetchContactNumbers = async () => {
        try {
            // Use complete URL if needed (adjust according to your API)
            const API_BASE_URL = process.env.REACT_APP_API_URL || '';
            const response = await axios.get(`${API_BASE_URL}/mobile-numbers`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log('Contact number response:', response.data);

            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                // Make sure we're getting a valid phone number string
                const phoneNumber = response.data[0].number;
                if (phoneNumber && typeof phoneNumber === 'string') {
                    setContactNumber(phoneNumber);
                    console.log('Set contact number to:', phoneNumber);
                } else {
                    console.warn('Invalid phone number format:', phoneNumber);
                }
            } else {
                console.warn('No phone numbers returned from API');
            }
        } catch (error) {
            console.error('Error fetching contact numbers:', error);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
        }
    };
    // Fetch cart data and contact numbers
    useEffect(() => {
        fetchCart();
        fetchContactNumbers();

        // Refresh cart data periodically
        const intervalId = setInterval(fetchCart, 10000);
        return () => clearInterval(intervalId);
    }, [fetchCart]);

    // Improved scroll handling
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    // Hide when scrolling down (beyond 20px)
                    // Show when scrolling up or at the top
                    if (currentScrollY > 20 && currentScrollY > lastScrollY) {
                        setVisible(false);
                    } else {
                        setVisible(true);
                    }

                    lastScrollY = currentScrollY;
                    setScrollPosition(currentScrollY);
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
    };

    return (
        <>
            <header
                className={`flex justify-center w-full px-4 z-50 py-3 bg-white/95 backdrop-blur-sm fixed transition-all duration-300 ${
                    visible ? 'shadow-lg translate-y-0' : '-translate-y-full shadow-none'
                } ${scrollPosition > 50 ? 'rounded-b-xl' : ''}`}
            >
                {/* Logo */}
                <div className={'flex flex-col w-full lg:max-w-7xl '}>
                    <div className={'flex items-center justify-between'}>
                        <Link to={"/"} className="flex items-center space-x-2">
                            <img src="/logo.png" alt="Logo" className="w-10 h-10"/>
                            <h1 className="lg:text-xl text-sm font-bold text-[#000F20]">JCreations</h1>
                        </Link>

                        {/* Search Bar */}
                        <div className="relative w-1/3 max-w-md hidden md:block">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 text-gray-600 bg-gray-100 rounded-full focus:outline-none cursor-pointer"
                                onClick={handleSearchClick}
                                readOnly
                            />
                        </div>

                        {/* Contact Info and Icons */}
                        <div className="flex items-center space-x-4">
                            <Link to={`tel:${contactNumber}`} type={'button'} className="flex items-center space-x-2 text-gray-700">
                                <FaPhoneAlt className="text-[#000F20] w-4 "/>
                                <span className="font-medium text-[10px] lg:text-sm">{contactNumber}</span>
                            </Link>
                            <Link to={'/cart'} className="p-2 shadow-lg shadow-[#FDEAC9] rounded-full hover:bg-[#F7A313] transition-colors relative">
                                <LuShoppingBag className="text-[#000F20] w-4 lg:w-full" size={20}/>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#F7A313] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Link>
                            <Link to={'/account'} className="p-2 shadow-lg shadow-[#FDEAC9] rounded-full hover:bg-[#F7A313] transition-colors">
                                <FiUser className="text-[#000F20] w-4 lg:w-full" size={20}/>
                            </Link>
                        </div>
                    </div>

                    <div className="relative w-full lg:hidden md:hidden justify-center flex mt-4 ">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 text-gray-600 bg-gray-100 rounded-full focus:outline-none cursor-pointer"
                            onClick={handleSearchClick}
                            readOnly
                        />
                    </div>
                </div>
            </header>

            {/* Search Drawer */}
            <Search isOpen={isSearchOpen} onClose={closeSearch} />
        </>
    )
}

export default Header
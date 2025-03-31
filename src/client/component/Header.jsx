import React from 'react'
import {AiOutlineMail} from "react-icons/ai";
import {FiUser} from "react-icons/fi";
import {FaPhoneAlt} from "react-icons/fa";

function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-3 max-w-7xl bg-white shadow-md">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <img src="../../../public/logo.png" alt="Logo" className="w-10 h-10"/>
                <h1 className="text-xl font-bold text-gray-800">JCreations</h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-1/3 max-w-md hidden md:block">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 text-gray-600 bg-gray-100 rounded-full focus:outline-none"
                />
            </div>

            {/* Contact Info and Icons */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                    <FaPhoneAlt className="text-gray-600"/>
                    <span className="font-medium">070 568 7994</span>
                </div>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <AiOutlineMail className="text-gray-700" size={20}/>
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <FiUser className="text-gray-700" size={20}/>
                </button>
            </div>
        </header>
    )
}

export default Header

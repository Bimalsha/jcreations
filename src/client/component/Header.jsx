import React from 'react'
import {AiOutlineMail} from "react-icons/ai";
import {FiUser} from "react-icons/fi";
import {FaPhoneAlt} from "react-icons/fa";
import {LuShoppingBag} from "react-icons/lu";
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="flex justify-center w-full px-2   py-3 bg-white shadow-md fixed">
            {/* Logo */}
            <div className={'flex flex-col w-full lg:max-w-7xl '}>
                <div className={'flex items-center justify-between'}>
                    <Link to={"/"} className="flex items-center space-x-2">
                        <img src="../../../public/logo.png" alt="Logo" className="w-10 h-10"/>
                        <h1 className="lg:text-xl text-sm font-bold text-[#000F20]">JCreations</h1>
                    </Link>

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
                        <Link to={'tel:0705687994'} type={'button'} className="flex items-center space-x-2 text-gray-700">
                            <FaPhoneAlt className="text-[#000F20] w-4 "/>
                            <span className="font-medium text-[10px] lg:text-sm">070 568 7994</span>
                        </Link>
                        <Link to={'/cart'} className="p-2 shadow-lg shadow-[#FDEAC9] rounded-full hover:bg-[#F7A313]">
                            <LuShoppingBag className="text-[#000F20] w-4 lg:w-full" size={20}/>
                        </Link>
                        <Link to={'/account'} className="p-2 shadow-lg shadow-[#FDEAC9] rounded-full hover:bg-[#F7A313]">
                            <FiUser className="text-[#000F20] w-4 lg:w-full" size={20}/>
                        </Link>
                    </div>
                </div>

                <div className="relative w-full  lg:hidden md:hidden justify-center flex mt-4 ">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 text-gray-600 bg-gray-100 rounded-full focus:outline-none"
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
